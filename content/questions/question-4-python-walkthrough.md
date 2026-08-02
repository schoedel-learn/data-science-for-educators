---
type: page
title: "Python Walkthrough — How the Question 4 Scatterplot Script Works"
description: "A line-by-line explanation of the Question 4 scatterplot script, written for educators who are learning how Python supports data science work."
tags: [python, data-science, educators, naep, scatterplot, walkthrough, stem-5328]
timestamp: "2026-08-02T00:00:00Z"
---

This page explains one of the real Python scripts behind the Question 4 worked example: [`build_question4_50state_math_reading.py`](/analysis/question-4/build_question4_50state_math_reading.py). The audience here is not assumed to be programmers. The goal is to show how a data-science script is built, what each library does, and how the code turns raw education data into a chart, a CSV file, and a written summary.

If you want the result of the script first, see the [Question 4 worked example](/questions/question-4-exploration/). If you want the next stronger model after the scatterplot, see the [Question 4 Controlled Analysis Plan](/questions/question-4-controlled-analysis/).

## Why this script matters in an education data-science course

For educators, the point of learning Python is not to become a full-time software engineer. The point is to understand how a research question gets translated into a repeatable analysis. This script is a good teaching example because it does several important data-science jobs in one place:

- it downloads and reads real public data,
- it cleans messy values,
- it merges two data sources,
- it calculates simple statistics,
- it creates a chart, and
- it writes out reusable files for later interpretation.

That is a big part of what applied educational data science looks like in practice.

## Library guide: what each import is for

| Library or tool | What it does in this script | Why it matters |
|---|---|---|
| `re` | Works with regular expressions | Helps pull values out of text when the NAEP command output is not already in table form |
| `subprocess` | Runs an external command from Python | Lets the script call the local `naep-search` tool instead of rewriting that API logic from scratch |
| `urllib.request` | Downloads content from the web | Pulls the NCES Excel file directly from its public URL |
| `BytesIO` | Treats downloaded bytes like a file in memory | Lets `openpyxl` read an Excel file without saving a temporary copy first |
| `Path` | Handles file paths more safely than plain strings | Makes output-file locations clearer and easier to manage |
| `matplotlib` | Creates charts | Builds the scatterplot image |
| `numpy` | Performs numerical calculations | Computes the correlation and best-fit line |
| `pandas` | Works with table-shaped data | Builds and merges data tables called DataFrames |
| `openpyxl` | Reads Excel workbooks | Opens the NCES `.xlsx` table |

## How to read the walkthrough

The code below is broken into sections. Each section shows the exact lines from the script in an editor-style block and then explains them in plain language. Long lines wrap to the viewport, but each original script line keeps only one line number in the left gutter.

## Lines 1–15: preparing the script and importing tools

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 1–15</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 1 to 15"><code>
<span class="code-line"><span class="code-gutter">1</span><span class="code-text">#!/usr/bin/env python3</span></span>
<span class="code-line"><span class="code-gutter">2</span><span class="code-text">from __future__ import annotations</span></span>
<span class="code-line"><span class="code-gutter">3</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">4</span><span class="code-text">import re</span></span>
<span class="code-line"><span class="code-gutter">5</span><span class="code-text">import subprocess</span></span>
<span class="code-line"><span class="code-gutter">6</span><span class="code-text">import urllib.request</span></span>
<span class="code-line"><span class="code-gutter">7</span><span class="code-text">from io import BytesIO</span></span>
<span class="code-line"><span class="code-gutter">8</span><span class="code-text">from pathlib import Path</span></span>
<span class="code-line"><span class="code-gutter">9</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">10</span><span class="code-text">import matplotlib</span></span>
<span class="code-line"><span class="code-gutter">11</span><span class="code-text">matplotlib.use(&#x27;Agg&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">12</span><span class="code-text">import matplotlib.pyplot as plt</span></span>
<span class="code-line"><span class="code-gutter">13</span><span class="code-text">import numpy as np</span></span>
<span class="code-line"><span class="code-gutter">14</span><span class="code-text">import pandas as pd</span></span>
<span class="code-line"><span class="code-gutter">15</span><span class="code-text">from openpyxl import load_workbook</span></span>
  </code></pre>
</div>

- **Line 1** tells Linux which Python interpreter should run this file. This first line is called a **shebang**, which is a startup instruction for the operating system.
- **Line 2** enables a newer way of handling type annotations. A **type annotation** is a small hint about what kind of value a variable or function is expected to use.
- **Lines 4–8** import standard-library tools that come with Python itself. These cover pattern matching (`re`), running external programs (`subprocess`), downloading web content (`urllib.request`), handling in-memory files (`BytesIO`), and cleaner file paths (`Path`).
- **Line 10** imports `matplotlib`, the main charting library used here.
- **Line 11** tells `matplotlib` to use the `Agg` backend. A **backend** is the part of a plotting library that decides how images are rendered. `Agg` is useful on servers or scripts that save images to files instead of opening an on-screen window.
- **Line 12** imports `matplotlib.pyplot` as `plt`. The name `plt` is a very common nickname in Python plotting code.
- **Line 13** imports `numpy`, usually shortened to `np`, for numeric calculations.
- **Line 14** imports `pandas`, usually shortened to `pd`, for table-shaped data.
- **Line 15** imports `load_workbook` from `openpyxl`, which is the specific function used to read the NCES Excel file.

## Lines 17–33: defining where files go and which states to include

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 17–33</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 17 to 33"><code>
<span class="code-line"><span class="code-gutter">17</span><span class="code-text">BASE = Path(&#x27;/home/barry-schoedel/Documents/Obsidian Vault/🎓 Education/STEM-5328/Question 4 Exploration&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">18</span><span class="code-text">BASE.mkdir(parents=True, exist_ok=True)</span></span>
<span class="code-line"><span class="code-gutter">19</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">20</span><span class="code-text">CSV_PATH = BASE / &#x27;question-4-charter-share-vs-naep-2024-50states.csv&#x27;</span></span>
<span class="code-line"><span class="code-gutter">21</span><span class="code-text">PNG_PATH = BASE / &#x27;question-4-charter-share-vs-naep-2024-50states.png&#x27;</span></span>
<span class="code-line"><span class="code-gutter">22</span><span class="code-text">MD_PATH = BASE / &#x27;question-4-charter-share-vs-naep-2024-50states.md&#x27;</span></span>
<span class="code-line"><span class="code-gutter">23</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">24</span><span class="code-text">CHARTER_XLSX = &#x27;https://nces.ed.gov/programs/digest/d23/tables/xls/tabn216.90.xlsx&#x27;</span></span>
<span class="code-line"><span class="code-gutter">25</span><span class="code-text">STATE_CODES = &#x27;AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&#x27;</span></span>
<span class="code-line"><span class="code-gutter">26</span><span class="code-text">ALL_50_STATES = [</span></span>
<span class="code-line"><span class="code-gutter">27</span><span class="code-text">    &#x27;Alabama&#x27;,&#x27;Alaska&#x27;,&#x27;Arizona&#x27;,&#x27;Arkansas&#x27;,&#x27;California&#x27;,&#x27;Colorado&#x27;,&#x27;Connecticut&#x27;,&#x27;Delaware&#x27;,&#x27;Florida&#x27;,&#x27;Georgia&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">28</span><span class="code-text">    &#x27;Hawaii&#x27;,&#x27;Idaho&#x27;,&#x27;Illinois&#x27;,&#x27;Indiana&#x27;,&#x27;Iowa&#x27;,&#x27;Kansas&#x27;,&#x27;Kentucky&#x27;,&#x27;Louisiana&#x27;,&#x27;Maine&#x27;,&#x27;Maryland&#x27;,&#x27;Massachusetts&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">29</span><span class="code-text">    &#x27;Michigan&#x27;,&#x27;Minnesota&#x27;,&#x27;Mississippi&#x27;,&#x27;Missouri&#x27;,&#x27;Montana&#x27;,&#x27;Nebraska&#x27;,&#x27;Nevada&#x27;,&#x27;New Hampshire&#x27;,&#x27;New Jersey&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">30</span><span class="code-text">    &#x27;New Mexico&#x27;,&#x27;New York&#x27;,&#x27;North Carolina&#x27;,&#x27;North Dakota&#x27;,&#x27;Ohio&#x27;,&#x27;Oklahoma&#x27;,&#x27;Oregon&#x27;,&#x27;Pennsylvania&#x27;,&#x27;Rhode Island&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">31</span><span class="code-text">    &#x27;South Carolina&#x27;,&#x27;South Dakota&#x27;,&#x27;Tennessee&#x27;,&#x27;Texas&#x27;,&#x27;Utah&#x27;,&#x27;Vermont&#x27;,&#x27;Virginia&#x27;,&#x27;Washington&#x27;,&#x27;West Virginia&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">32</span><span class="code-text">    &#x27;Wisconsin&#x27;,&#x27;Wyoming&#x27;</span></span>
<span class="code-line"><span class="code-gutter">33</span><span class="code-text">]</span></span>
  </code></pre>
</div>

- **Line 17** creates a base folder path called `BASE`. This is where the output files will be written.
- **Line 18** makes sure that folder exists. `parents=True` means Python should create any missing parent folders too. `exist_ok=True` means it should not crash if the folder already exists.
- **Lines 20–22** define the three output files: a CSV, a PNG chart, and a markdown note.
- **Line 24** stores the URL of the NCES Excel file that contains charter-school enrollment share by state.
- **Line 25** stores the two-letter state codes used by the NAEP tool.
- **Line 26** begins a Python list named `ALL_50_STATES`.
- **Lines 27–32** fill that list with every state name so the script can enforce a full 50-state frame.
- **Line 33** closes the list.

Why this matters: the script is being explicit about the 50-state frame. That was important because an earlier version accidentally dropped Wyoming and omitted some zero-charter states.

## Lines 36–61: downloading and cleaning the charter-share table

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 36–61</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 36 to 61"><code>
<span class="code-line"><span class="code-gutter">36</span><span class="code-text">def fetch_charter_share_all_50() -&gt; pd.DataFrame:</span></span>
<span class="code-line"><span class="code-gutter">37</span><span class="code-text">    with urllib.request.urlopen(CHARTER_XLSX) as resp:</span></span>
<span class="code-line"><span class="code-gutter">38</span><span class="code-text">        data = resp.read()</span></span>
<span class="code-line"><span class="code-gutter">39</span><span class="code-text">    wb = load_workbook(filename=BytesIO(data), data_only=True)</span></span>
<span class="code-line"><span class="code-gutter">40</span><span class="code-text">    ws = wb.active</span></span>
<span class="code-line"><span class="code-gutter">41</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">42</span><span class="code-text">    charter = {}</span></span>
<span class="code-line"><span class="code-gutter">43</span><span class="code-text">    for row in ws.iter_rows(min_row=5, max_row=56, values_only=True):</span></span>
<span class="code-line"><span class="code-gutter">44</span><span class="code-text">        state = str(row[0]).replace(&#x27;\xa0&#x27;, &#x27; &#x27;).strip() if row[0] is not None else &#x27;&#x27;</span></span>
<span class="code-line"><span class="code-gutter">45</span><span class="code-text">        if state in {&#x27;United States&#x27;, &#x27;District of Columbia&#x27;, &#x27;&#x27;}:</span></span>
<span class="code-line"><span class="code-gutter">46</span><span class="code-text">            continue</span></span>
<span class="code-line"><span class="code-gutter">47</span><span class="code-text">        raw = row[16]  # 2022-23 charter enrollment share</span></span>
<span class="code-line"><span class="code-gutter">48</span><span class="code-text">        if raw == &#x27;#&#x27;:</span></span>
<span class="code-line"><span class="code-gutter">49</span><span class="code-text">            charter[state] = 0.0</span></span>
<span class="code-line"><span class="code-gutter">50</span><span class="code-text">        elif raw in (&#x27;†&#x27;, &#x27;---&#x27;, None):</span></span>
<span class="code-line"><span class="code-gutter">51</span><span class="code-text">            # For the assignment we include all 50 states; states with no charter legislation / no charters</span></span>
<span class="code-line"><span class="code-gutter">52</span><span class="code-text">            # are coded as 0% charter enrollment so every state can appear as one dot.</span></span>
<span class="code-line"><span class="code-gutter">53</span><span class="code-text">            charter[state] = 0.0</span></span>
<span class="code-line"><span class="code-gutter">54</span><span class="code-text">        else:</span></span>
<span class="code-line"><span class="code-gutter">55</span><span class="code-text">            charter[state] = float(raw)</span></span>
<span class="code-line"><span class="code-gutter">56</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">57</span><span class="code-text">    # guarantee all 50 states present</span></span>
<span class="code-line"><span class="code-gutter">58</span><span class="code-text">    for state in ALL_50_STATES:</span></span>
<span class="code-line"><span class="code-gutter">59</span><span class="code-text">        charter.setdefault(state, 0.0)</span></span>
<span class="code-line"><span class="code-gutter">60</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">61</span><span class="code-text">    return pd.DataFrame({&#x27;state&#x27;: ALL_50_STATES, &#x27;charter_enroll_pct_2022_23&#x27;: [charter[s] for s in ALL_50_STATES]})</span></span>
  </code></pre>
</div>

- **Line 36** starts a function named `fetch_charter_share_all_50`. A **function** is a reusable block of code that performs one job.
- **Line 37** opens the NCES Excel-file URL.
- **Line 38** reads the downloaded file into memory as raw bytes.
- **Line 39** opens that in-memory Excel file with `openpyxl`.
- **Line 40** selects the active worksheet inside the workbook.
- **Line 42** creates an empty Python dictionary named `charter`. A **dictionary** stores key-value pairs, like `state → charter share`.
- **Line 43** loops through rows 5 to 56 of the worksheet. The script does not scan the whole file; it goes straight to the rows that contain the state table.
- **Line 44** extracts the state name from the first column, replaces a nonstandard spacing character if needed, and strips extra whitespace. This is a data-cleaning step.
- **Lines 45–46** skip non-state rows like the United States total, the District of Columbia, or blanks.
- **Line 47** pulls the 2022–23 charter-enrollment share from column 17. Python counts from zero, so `row[16]` means the seventeenth column.
- **Lines 48–55** convert special symbols and normal numeric cells into usable numbers.
- **Lines 51–52** are comments explaining the coding decision. Comments are ignored by Python but are crucial for human readers.
- **Lines 57–59** guarantee that every state appears in the final dictionary, even if something unusual happened in the source table.
- **Line 61** converts the finished dictionary into a `pandas` DataFrame with two columns: state and charter-enrollment share.

Why this matters: real data files often contain symbols, special cases, or rows you do not want. Data science is not just statistics; it is also careful cleaning and documentation.

## Lines 64–87: asking the local NAEP tool for math or reading data

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 64–87</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 64 to 87"><code>
<span class="code-line"><span class="code-gutter">64</span><span class="code-text">def fetch_naep(subject: str) -&gt; pd.DataFrame:</span></span>
<span class="code-line"><span class="code-gutter">65</span><span class="code-text">    cmd = [</span></span>
<span class="code-line"><span class="code-gutter">66</span><span class="code-text">        &#x27;/home/barry-schoedel/bin/naep-search&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">67</span><span class="code-text">        &#x27;data&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">68</span><span class="code-text">        subject,</span></span>
<span class="code-line"><span class="code-gutter">69</span><span class="code-text">        &#x27;8&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">70</span><span class="code-text">        &#x27;-y&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">71</span><span class="code-text">        &#x27;2024&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">72</span><span class="code-text">        &#x27;-g&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">73</span><span class="code-text">        &#x27;TOTAL&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">74</span><span class="code-text">        &#x27;-t&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">75</span><span class="code-text">        &#x27;MN:MN&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">76</span><span class="code-text">        &#x27;-j&#x27;,</span></span>
<span class="code-line"><span class="code-gutter">77</span><span class="code-text">        STATE_CODES,</span></span>
<span class="code-line"><span class="code-gutter">78</span><span class="code-text">    ]</span></span>
<span class="code-line"><span class="code-gutter">79</span><span class="code-text">    out = subprocess.check_output(cmd, text=True)</span></span>
<span class="code-line"><span class="code-gutter">80</span><span class="code-text">    pat = re.compile(r&#x27;^(\d{4})\s+([A-Z]{2})\s+(.+?)\s+TOTAL\s+All students\s+1\s+All students\s+([0-9.]+)\s+1\s+0\s*$&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">81</span><span class="code-text">    rows = []</span></span>
<span class="code-line"><span class="code-gutter">82</span><span class="code-text">    for line in out.splitlines()[2:]:</span></span>
<span class="code-line"><span class="code-gutter">83</span><span class="code-text">        m = pat.match(line)</span></span>
<span class="code-line"><span class="code-gutter">84</span><span class="code-text">        if m:</span></span>
<span class="code-line"><span class="code-gutter">85</span><span class="code-text">            _, code, state, value = m.groups()</span></span>
<span class="code-line"><span class="code-gutter">86</span><span class="code-text">            rows.append({&#x27;state&#x27;: state.strip(), f&#x27;naep_{subject}_2024&#x27;: float(value), &#x27;state_code&#x27;: code})</span></span>
<span class="code-line"><span class="code-gutter">87</span><span class="code-text">    return pd.DataFrame(rows)</span></span>
  </code></pre>
</div>

- **Line 64** starts a second function, this one named `fetch_naep`.
- **Lines 65–78** build the command that will be sent to the local `naep-search` helper.
- **Line 66** points to the external program.
- **Lines 68–77** define the specific query: subject, grade, year, demographic group, statistic type, and states.
- **Line 79** runs the command and captures its text output.
- **Line 80** compiles a regular expression. A **regular expression** is a text pattern used to pull structure out of messy strings.
- **Lines 81–86** loop through the output, match valid data rows, and append cleaned values to a list.
- **Line 85** uses `_` to hold a value that exists but is not needed later.
- **Line 87** converts the whole list into a DataFrame.

Why this matters: sometimes the hardest part of data science is not the model. It is getting machine-readable values out of a tool or data service in a reliable way.

## Lines 90–112: calculating the trend and drawing one scatterplot panel

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 90–112</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 90 to 112"><code>
<span class="code-line"><span class="code-gutter">90</span><span class="code-text">def summarize(ax, df, ycol: str, title: str) -&gt; tuple[float, float]:</span></span>
<span class="code-line"><span class="code-gutter">91</span><span class="code-text">    x = df[&#x27;charter_enroll_pct_2022_23&#x27;].to_numpy()</span></span>
<span class="code-line"><span class="code-gutter">92</span><span class="code-text">    y = df[ycol].to_numpy()</span></span>
<span class="code-line"><span class="code-gutter">93</span><span class="code-text">    corr = float(np.corrcoef(x, y)[0, 1])</span></span>
<span class="code-line"><span class="code-gutter">94</span><span class="code-text">    slope, intercept = np.polyfit(x, y, 1)</span></span>
<span class="code-line"><span class="code-gutter">95</span><span class="code-text">    xs = np.linspace(x.min(), x.max(), 200)</span></span>
<span class="code-line"><span class="code-gutter">96</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">97</span><span class="code-text">    zero_mask = df[&#x27;charter_enroll_pct_2022_23&#x27;] == 0.0</span></span>
<span class="code-line"><span class="code-gutter">98</span><span class="code-text">    ax.scatter(x[~zero_mask], y[~zero_mask], s=42, alpha=0.85, color=&#x27;#2563eb&#x27;, edgecolor=&#x27;white&#x27;, linewidth=0.5, label=&#x27;States with charter share &gt; 0%&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">99</span><span class="code-text">    ax.scatter(x[zero_mask], y[zero_mask], s=52, alpha=0.95, color=&#x27;#f59e0b&#x27;, marker=&#x27;s&#x27;, edgecolor=&#x27;white&#x27;, linewidth=0.6, label=&#x27;States coded at 0% charter share&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">100</span><span class="code-text">    ax.plot(xs, slope * xs + intercept, color=&#x27;#dc2626&#x27;, linewidth=2, label=&#x27;Best-fit line&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">101</span><span class="code-text">    ax.set_title(f&#x27;{title}\nr = {corr:.2f}, slope = {slope:.2f}\nRaw, unadjusted state-level relationship; exploratory only&#x27;, fontsize=11)</span></span>
<span class="code-line"><span class="code-gutter">102</span><span class="code-text">    ax.set_xlabel(&#x27;Charter enrollment share (2022–23)&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">103</span><span class="code-text">    ax.set_ylabel(&#x27;NAEP grade 8 mean score (2024)&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">104</span><span class="code-text">    ax.grid(True, linestyle=&#x27;--&#x27;, alpha=0.25)</span></span>
<span class="code-line"><span class="code-gutter">105</span><span class="code-text">    ax.legend(frameon=False, fontsize=8, loc=&#x27;best&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">106</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">107</span><span class="code-text">    for state in [&#x27;Arizona&#x27;, &#x27;Massachusetts&#x27;, &#x27;Texas&#x27;, &#x27;Colorado&#x27;, &#x27;New Mexico&#x27;, &#x27;Florida&#x27;]:</span></span>
<span class="code-line"><span class="code-gutter">108</span><span class="code-text">        row = df[df[&#x27;state&#x27;] == state]</span></span>
<span class="code-line"><span class="code-gutter">109</span><span class="code-text">        if not row.empty:</span></span>
<span class="code-line"><span class="code-gutter">110</span><span class="code-text">            ax.annotate(state, (row.iloc[0][&#x27;charter_enroll_pct_2022_23&#x27;], row.iloc[0][ycol]), xytext=(4, 4), textcoords=&#x27;offset points&#x27;, fontsize=8)</span></span>
<span class="code-line"><span class="code-gutter">111</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">112</span><span class="code-text">    return corr, slope</span></span>
  </code></pre>
</div>

- **Line 90** starts a function named `summarize`. It takes an axis object `ax`, a DataFrame `df`, the name of the outcome column `ycol`, and a title.
- **Lines 91–92** pull the charter-share and outcome columns into NumPy arrays.
- **Line 93** calculates the Pearson correlation coefficient. A **correlation coefficient** measures how strongly two variables move together in a straight-line pattern.
- **Line 94** calculates the best-fit line using `np.polyfit`. Here the `1` means “fit a straight line rather than a curve.”
- **Line 95** creates evenly spaced x-values so the trend line can be drawn smoothly across the chart.
- **Lines 97–100** draw the points and fitted line, separating zero-charter states from the rest for visual clarity.
- **Lines 101–105** add the title, axes labels, grid, and legend.
- **Lines 107–110** label a few selected states directly on the plot.
- **Line 112** returns the correlation and slope so the main function can reuse them later.

Why this matters: visualization code is not just about making a picture. It also makes analytic choices visible, such as which states were coded at zero and which points are important enough to label.

## Lines 115–129: building the main data table and saving the image

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 115–129</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 115 to 129"><code>
<span class="code-line"><span class="code-gutter">115</span><span class="code-text">def main() -&gt; None:</span></span>
<span class="code-line"><span class="code-gutter">116</span><span class="code-text">    charter = fetch_charter_share_all_50()</span></span>
<span class="code-line"><span class="code-gutter">117</span><span class="code-text">    math_df = fetch_naep(&#x27;math&#x27;).drop(columns=[&#x27;state_code&#x27;])</span></span>
<span class="code-line"><span class="code-gutter">118</span><span class="code-text">    reading_df = fetch_naep(&#x27;reading&#x27;).drop(columns=[&#x27;state_code&#x27;])</span></span>
<span class="code-line"><span class="code-gutter">119</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">120</span><span class="code-text">    df = charter.merge(math_df, on=&#x27;state&#x27;, how=&#x27;left&#x27;).merge(reading_df, on=&#x27;state&#x27;, how=&#x27;left&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">121</span><span class="code-text">    df = df.sort_values(&#x27;charter_enroll_pct_2022_23&#x27;).reset_index(drop=True)</span></span>
<span class="code-line"><span class="code-gutter">122</span><span class="code-text">    df.to_csv(CSV_PATH, index=False)</span></span>
<span class="code-line"><span class="code-gutter">123</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">124</span><span class="code-text">    fig, axes = plt.subplots(1, 2, figsize=(14, 6), constrained_layout=True)</span></span>
<span class="code-line"><span class="code-gutter">125</span><span class="code-text">    math_corr, math_slope = summarize(axes[0], df, &#x27;naep_math_2024&#x27;, &#x27;Charter Share vs. NAEP Math&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">126</span><span class="code-text">    read_corr, read_slope = summarize(axes[1], df, &#x27;naep_reading_2024&#x27;, &#x27;Charter Share vs. NAEP Reading&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">127</span><span class="code-text">    fig.suptitle(&#x27;Question 4 Exploratory Scatterplots — All 50 States&#x27;, fontsize=15)</span></span>
<span class="code-line"><span class="code-gutter">128</span><span class="code-text">    fig.savefig(PNG_PATH, dpi=220)</span></span>
<span class="code-line"><span class="code-gutter">129</span><span class="code-text">    plt.close(fig)</span></span>
  </code></pre>
</div>

- **Line 115** starts the `main` function. This is the central workflow of the script.
- **Lines 116–118** load the charter, math, and reading data.
- **Line 120** merges the three tables together by the `state` column. A **merge** is the table operation that lines up rows from different data sources using a shared key.
- **Line 121** sorts the finished table by charter share and resets the row numbers.
- **Line 122** saves the merged data to a CSV file.
- **Line 124** creates a figure with two side-by-side panels.
- **Lines 125–126** populate those panels with mathematics and reading scatterplots.
- **Lines 127–129** add a figure title, save the PNG, and close the figure.

Why this matters: once the three data sources are combined into one clean DataFrame, the rest of the analysis becomes much easier. This is a common pattern in applied data science: build one trusted merged table, then analyze it.

## Lines 131–185: writing the human-readable summary note

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 131–185</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 131 to 185"><code>
<span class="code-line"><span class="code-gutter">131</span><span class="code-text">    no_charter_states = [s for s in ALL_50_STATES if float(df.loc[df[&#x27;state&#x27;] == s, &#x27;charter_enroll_pct_2022_23&#x27;].iloc[0]) == 0.0]</span></span>
<span class="code-line"><span class="code-gutter">132</span><span class="code-text">    nonzero = df[df[&#x27;charter_enroll_pct_2022_23&#x27;] &gt; 0].copy()</span></span>
<span class="code-line"><span class="code-gutter">133</span><span class="code-text">    math_corr_nz = float(nonzero[&#x27;charter_enroll_pct_2022_23&#x27;].corr(nonzero[&#x27;naep_math_2024&#x27;]))</span></span>
<span class="code-line"><span class="code-gutter">134</span><span class="code-text">    read_corr_nz = float(nonzero[&#x27;charter_enroll_pct_2022_23&#x27;].corr(nonzero[&#x27;naep_reading_2024&#x27;]))</span></span>
<span class="code-line"><span class="code-gutter">135</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">136</span><span class="code-text">    MD_PATH.write_text(f&#x27;&#x27;&#x27;---</span></span>
<span class="code-line"><span class="code-gutter">137</span><span class="code-text">type: analysis-note</span></span>
<span class="code-line"><span class="code-gutter">138</span><span class="code-text">title: &quot;Question 4 — 50-State 2024 Charter Share vs. NAEP Scatterplots&quot;</span></span>
<span class="code-line"><span class="code-gutter">139</span><span class="code-text">created: 2026-08-02</span></span>
<span class="code-line"><span class="code-gutter">140</span><span class="code-text">question: &quot;What is the relationship between state-level charter school penetration and aggregate NAEP performance, controlling for demographic composition?&quot;</span></span>
<span class="code-line"><span class="code-gutter">141</span><span class="code-text">source_1: &quot;NAEP Data Service API (2024 grade 8 math and reading state means)&quot;</span></span>
<span class="code-line"><span class="code-gutter">142</span><span class="code-text">source_2: &quot;NCES Digest table 216.90 (2022–23 charter enrollment share by state)&quot;</span></span>
<span class="code-line"><span class="code-gutter">143</span><span class="code-text">---</span></span>
<span class="code-line"><span class="code-gutter">144</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">145</span><span class="code-text"># Question 4 — 50-State 2024 Scatterplots</span></span>
<span class="code-line"><span class="code-gutter">146</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">147</span><span class="code-text">Files created:</span></span>
<span class="code-line"><span class="code-gutter">148</span><span class="code-text">- CSV: `{CSV_PATH.name}`</span></span>
<span class="code-line"><span class="code-gutter">149</span><span class="code-text">- Chart: `{PNG_PATH.name}`</span></span>
<span class="code-line"><span class="code-gutter">150</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">151</span><span class="code-text">## Accuracy correction from the earlier draft</span></span>
<span class="code-line"><span class="code-gutter">152</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">153</span><span class="code-text">The earlier exploratory pass used 44 states because five no-charter states were omitted as “not applicable,” and Wyoming was accidentally dropped by an Excel row-slice bug. This corrected version includes **all 50 states**.</span></span>
<span class="code-line"><span class="code-gutter">154</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">155</span><span class="code-text">To make that possible, states reported by NCES as having **no charter share in 2022–23** were coded as **0% charter enrollment**. This includes both states with no charter legislation / no operating charter schools in the table and Kentucky, which is listed at 0.0%.</span></span>
<span class="code-line"><span class="code-gutter">156</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">157</span><span class="code-text">States at 0% charter enrollment in this file:</span></span>
<span class="code-line"><span class="code-gutter">158</span><span class="code-text">- {&#x27;, &#x27;.join(no_charter_states)}</span></span>
<span class="code-line"><span class="code-gutter">159</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">160</span><span class="code-text">## Math (2024)</span></span>
<span class="code-line"><span class="code-gutter">161</span><span class="code-text">- Correlation: **{math_corr:.2f}**</span></span>
<span class="code-line"><span class="code-gutter">162</span><span class="code-text">- Slope: **{math_slope:.2f}** NAEP math points per 1 percentage-point increase in charter share</span></span>
<span class="code-line"><span class="code-gutter">163</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">164</span><span class="code-text">Plain-language reading:</span></span>
<span class="code-line"><span class="code-gutter">165</span><span class="code-text">- The raw relationship is **negative**, but weak.</span></span>
<span class="code-line"><span class="code-gutter">166</span><span class="code-text">- Charter share alone shows only a **weak linear relationship** with state math performance.</span></span>
<span class="code-line"><span class="code-gutter">167</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">168</span><span class="code-text">Sensitivity check:</span></span>
<span class="code-line"><span class="code-gutter">169</span><span class="code-text">- Excluding the 0% charter-share states, the relationship stays negative but becomes smaller (**r = {math_corr_nz:.2f}**).</span></span>
<span class="code-line"><span class="code-gutter">170</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">171</span><span class="code-text">## Reading (2024)</span></span>
<span class="code-line"><span class="code-gutter">172</span><span class="code-text">- Correlation: **{read_corr:.2f}**</span></span>
<span class="code-line"><span class="code-gutter">173</span><span class="code-text">- Slope: **{read_slope:.2f}** NAEP reading points per 1 percentage-point increase in charter share</span></span>
<span class="code-line"><span class="code-gutter">174</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">175</span><span class="code-text">Plain-language reading:</span></span>
<span class="code-line"><span class="code-gutter">176</span><span class="code-text">- The raw relationship is **negative**, but weak.</span></span>
<span class="code-line"><span class="code-gutter">177</span><span class="code-text">- Charter share alone shows only a **weak linear relationship** with state reading performance.</span></span>
<span class="code-line"><span class="code-gutter">178</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">179</span><span class="code-text">Sensitivity check:</span></span>
<span class="code-line"><span class="code-gutter">180</span><span class="code-text">- Excluding the 0% charter-share states, the relationship stays negative but becomes smaller (**r = {read_corr_nz:.2f}**).</span></span>
<span class="code-line"><span class="code-gutter">181</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">182</span><span class="code-text">## Interpretation</span></span>
<span class="code-line"><span class="code-gutter">183</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">184</span><span class="code-text">These are exploratory, raw scatterplots. They show whether there is a visible relationship worth investigating, not whether charter schools cause better or worse scores. The next step is to add controls for poverty, race/ethnicity, disability, English-learner status, and possibly spending.</span></span>
<span class="code-line"><span class="code-gutter">185</span><span class="code-text">&#x27;&#x27;&#x27;)</span></span>
  </code></pre>
</div>

- **Line 131** builds a list of which states ended up at `0.0` charter share.
- **Line 132** makes a filtered copy of the data that excludes those zero-share states.
- **Lines 133–134** calculate the sensitivity-check correlations for math and reading.
- **Line 136** starts a long formatted string that will become a markdown file.
- **Lines 137–143** write YAML frontmatter. **Frontmatter** is metadata at the top of a markdown file, such as title, type, or tags.
- **Lines 145–185** write the human-readable note: file list, correction note, state list, statistical summaries, and final interpretation.

Why this matters: a good analysis script does not stop at numbers. It also leaves behind a readable explanation. In education work, that is especially important because the audience is often mixed: teachers, administrators, students, and reviewers may all need to understand the output.

## Lines 187–197: printing the outputs and running the script

<div class="code-editor-wrap">
  <div class="code-editor-label">build_question4_50state_math_reading.py · lines 187–197</div>
  <pre class="code-editor" aria-label="Python code block from build_question4_50state_math_reading.py, lines 187 to 197"><code>
<span class="code-line"><span class="code-gutter">187</span><span class="code-text">    print(f&#x27;CSV: {CSV_PATH}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">188</span><span class="code-text">    print(f&#x27;PNG: {PNG_PATH}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">189</span><span class="code-text">    print(f&#x27;MD:  {MD_PATH}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">190</span><span class="code-text">    print(f&#x27;Math correlation: {math_corr:.4f}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">191</span><span class="code-text">    print(f&#x27;Math slope: {math_slope:.4f}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">192</span><span class="code-text">    print(f&#x27;Reading correlation: {read_corr:.4f}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">193</span><span class="code-text">    print(f&#x27;Reading slope: {read_slope:.4f}&#x27;)</span></span>
<span class="code-line"><span class="code-gutter">194</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">195</span><span class="code-text"> </span></span>
<span class="code-line"><span class="code-gutter">196</span><span class="code-text">if __name__ == &#x27;__main__&#x27;:</span></span>
<span class="code-line"><span class="code-gutter">197</span><span class="code-text">    main()</span></span>
  </code></pre>
</div>

- **Lines 187–193** print the file locations and the key numeric results to the terminal. This is a quick way to confirm that the script worked and to see the headline numbers immediately.
- **Line 196** checks whether the script is being run directly.
- **Line 197** calls `main()` if it is. This pattern is called the Python **entry point guard**. It allows a file to be run as a script, but also imported later without automatically executing everything.

## What educators should notice about the script as a whole

There are four big data-science lessons in this code.

1. **A script is a workflow, not just a calculation.** It handles downloading, cleaning, merging, plotting, and writing output.
2. **Libraries are specialized helpers.** `pandas` handles tables, `numpy` handles math, `matplotlib` handles graphs, and `openpyxl` handles Excel.
3. **Data cleaning decisions are part of the analysis.** Coding some states as 0% charter share was not a neutral detail; it changed the analysis frame and required a sensitivity check.
4. **Interpretation belongs next to computation.** The markdown note at the end is not an optional extra. It is part of making the analysis understandable and auditable.

## If you are learning Python, what to practice next

A good next step for a beginner is to read the script again while asking four questions for each section:

- What data is coming in?
- What shape is it in before cleaning?
- What does this block change?
- What new file or result does this block create?

That habit helps bridge the gap between “I can read the code” and “I understand the analysis.”

## Related pages

- [Question 4](/questions/question-4/) — the research-question framing page
- [Worked Example — Question 4: Charter Share and NAEP Scores](/questions/question-4-exploration/) — the actual exploratory results
- [Question 4 Controlled Analysis Plan](/questions/question-4-controlled-analysis/) — the next stronger model for a more defensible follow-up analysis
