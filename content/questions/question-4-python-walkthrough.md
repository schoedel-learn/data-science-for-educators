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

The code below is broken into sections. Each section shows the exact lines from the script and then explains them in plain language. Blank lines are not listed individually; they are there to visually separate ideas.

## Lines 1–15: preparing the script and importing tools

```python
  1 | #!/usr/bin/env python3
  2 | from __future__ import annotations
  3 | 
  4 | import re
  5 | import subprocess
  6 | import urllib.request
  7 | from io import BytesIO
  8 | from pathlib import Path
  9 | 
 10 | import matplotlib
 11 | matplotlib.use('Agg')
 12 | import matplotlib.pyplot as plt
 13 | import numpy as np
 14 | import pandas as pd
 15 | from openpyxl import load_workbook
```

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

```python
 17 | BASE = Path('/home/barry-schoedel/Documents/Obsidian Vault/🎓 Education/STEM-5328/Question 4 Exploration')
 18 | BASE.mkdir(parents=True, exist_ok=True)
 19 | 
 20 | CSV_PATH = BASE / 'question-4-charter-share-vs-naep-2024-50states.csv'
 21 | PNG_PATH = BASE / 'question-4-charter-share-vs-naep-2024-50states.png'
 22 | MD_PATH = BASE / 'question-4-charter-share-vs-naep-2024-50states.md'
 23 | 
 24 | CHARTER_XLSX = 'https://nces.ed.gov/programs/digest/d23/tables/xls/tabn216.90.xlsx'
 25 | STATE_CODES = 'AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY'
 26 | ALL_50_STATES = [
 27 |     'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
 28 |     'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
 29 |     'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
 30 |     'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
 31 |     'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
 32 |     'Wisconsin','Wyoming'
 33 | ]
```

- **Line 17** creates a base folder path called `BASE`. This is where the output files will be written.
- **Line 18** makes sure that folder exists. `parents=True` means Python should create any missing parent folders too. `exist_ok=True` means it should not crash if the folder already exists.
- **Lines 20–22** define the three output files: a CSV, a PNG chart, and a markdown note.
- **Line 24** stores the URL of the NCES Excel file that contains charter-school enrollment share by state.
- **Line 25** stores the two-letter state codes used by the NAEP tool.
- **Line 26** begins a Python list named `ALL_50_STATES`.
- **Line 27** lists the first group of state names.
- **Line 28** continues the list with more state names.
- **Line 29** continues the list again.
- **Line 30** continues the list again.
- **Line 31** continues the list again.
- **Line 32** finishes the list with Wisconsin and Wyoming.
- **Line 33** closes the list.

Why this matters: the script is being explicit about the 50-state frame. That was important because an earlier version accidentally dropped Wyoming and omitted some zero-charter states.

## Lines 36–61: downloading and cleaning the charter-share table

```python
 36 | def fetch_charter_share_all_50() -> pd.DataFrame:
 37 |     with urllib.request.urlopen(CHARTER_XLSX) as resp:
 38 |         data = resp.read()
 39 |     wb = load_workbook(filename=BytesIO(data), data_only=True)
 40 |     ws = wb.active
 41 | 
 42 |     charter = {}
 43 |     for row in ws.iter_rows(min_row=5, max_row=56, values_only=True):
 44 |         state = str(row[0]).replace('\xa0', ' ').strip() if row[0] is not None else ''
 45 |         if state in {'United States', 'District of Columbia', ''}:
 46 |             continue
 47 |         raw = row[16]  # 2022-23 charter enrollment share
 48 |         if raw == '#':
 49 |             charter[state] = 0.0
 50 |         elif raw in ('†', '---', None):
 51 |             # For the assignment we include all 50 states; states with no charter legislation / no charters
 52 |             # are coded as 0% charter enrollment so every state can appear as one dot.
 53 |             charter[state] = 0.0
 54 |         else:
 55 |             charter[state] = float(raw)
 56 | 
 57 |     # guarantee all 50 states present
 58 |     for state in ALL_50_STATES:
 59 |         charter.setdefault(state, 0.0)
 60 | 
 61 |     return pd.DataFrame({'state': ALL_50_STATES, 'charter_enroll_pct_2022_23': [charter[s] for s in ALL_50_STATES]})
```

- **Line 36** starts a function named `fetch_charter_share_all_50`. A **function** is a reusable block of code that performs one job.
- **Line 37** opens the NCES Excel-file URL.
- **Line 38** reads the downloaded file into memory as raw bytes.
- **Line 39** opens that in-memory Excel file with `openpyxl`.
- **Line 40** selects the active worksheet inside the workbook.
- **Line 42** creates an empty Python dictionary named `charter`. A **dictionary** stores key-value pairs, like `state → charter share`.
- **Line 43** loops through rows 5 to 56 of the worksheet. The script does not scan the whole file; it goes straight to the rows that contain the state table.
- **Line 44** extracts the state name from the first column, replaces a nonstandard spacing character if needed, and strips extra whitespace. This is a data-cleaning step.
- **Line 45** checks whether the current row is not really a state row we want to keep, such as the United States total, the District of Columbia, or an empty line.
- **Line 46** skips those rows.
- **Line 47** pulls the 2022–23 charter-enrollment share from column 17 (Python counts from zero, so `row[16]` means the seventeenth column).
- **Line 48** checks whether the cell contains `#`.
- **Line 49** converts that symbol into `0.0`.
- **Line 50** checks for other nonstandard values like `†`, `---`, or `None`.
- **Lines 51–52** are comments explaining the coding decision. Comments are ignored by Python but are crucial for human readers.
- **Line 53** also converts those nonstandard entries into `0.0` so every state can still appear as one dot in the scatterplot.
- **Line 54** handles the normal case: the value is a regular number.
- **Line 55** converts the value to a floating-point number with `float(raw)`.
- **Line 57** begins a second loop as a safety check.
- **Line 58** goes through every state in the master 50-state list.
- **Line 59** uses `setdefault` to make sure every state exists in the dictionary, even if it was missing from the earlier row scan.
- **Line 61** converts the finished dictionary into a `pandas` DataFrame with two columns: state and charter-enrollment share.

Why this matters: real data files often contain symbols, special cases, or rows you do not want. Data science is not just statistics; it is also careful cleaning and documentation.

## Lines 64–87: asking the local NAEP tool for math or reading data

```python
 64 | def fetch_naep(subject: str) -> pd.DataFrame:
 65 |     cmd = [
 66 |         '/home/barry-schoedel/bin/naep-search',
 67 |         'data',
 68 |         subject,
 69 |         '8',
 70 |         '-y',
 71 |         '2024',
 72 |         '-g',
 73 |         'TOTAL',
 74 |         '-t',
 75 |         'MN:MN',
 76 |         '-j',
 77 |         STATE_CODES,
 78 |     ]
 79 |     out = subprocess.check_output(cmd, text=True)
 80 |     pat = re.compile(r'^(\d{4})\s+([A-Z]{2})\s+(.+?)\s+TOTAL\s+All students\s+1\s+All students\s+([0-9.]+)\s+1\s+0\s*$')
 81 |     rows = []
 82 |     for line in out.splitlines()[2:]:
 83 |         m = pat.match(line)
 84 |         if m:
 85 |             _, code, state, value = m.groups()
 86 |             rows.append({'state': state.strip(), f'naep_{subject}_2024': float(value), 'state_code': code})
 87 |     return pd.DataFrame(rows)
```

- **Line 64** starts a second function, this one named `fetch_naep`.
- **Line 65** begins a Python list named `cmd`.
- **Line 66** points to the local helper program `naep-search`.
- **Line 67** passes the subcommand `data`.
- **Line 68** inserts the subject, which will later be either `math` or `reading`.
- **Line 69** requests Grade 8.
- **Lines 70–71** supply the year flag `-y` and the year `2024`.
- **Lines 72–73** supply the demographic-group flag `-g` and the value `TOTAL`.
- **Lines 74–75** supply the statistic-type flag `-t` and the value `MN:MN`, which asks for the state mean score.
- **Lines 76–77** supply the jurisdiction flag `-j` and the long list of state codes.
- **Line 79** runs the command and captures its text output.
- **Line 80** compiles a regular expression. A **regular expression** is a text pattern used to pull structure out of messy strings.
- **Line 81** creates an empty list of rows.
- **Line 82** loops over the command output line by line, skipping the first two lines because they are not data rows.
- **Line 83** tries to match the regular-expression pattern against the current line.
- **Line 84** checks whether the match succeeded.
- **Line 85** extracts the matched pieces. The underscore `_` means “there is a value here, but I do not plan to use it later.”
- **Line 86** appends one cleaned row to the list, including the state name, the NAEP value, and the state code.
- **Line 87** converts the whole list into a DataFrame.

Why this matters: sometimes the hardest part of data science is not the model. It is getting machine-readable values out of a tool or data service in a reliable way.

## Lines 90–112: calculating the trend and drawing one scatterplot panel

```python
 90 | def summarize(ax, df, ycol: str, title: str) -> tuple[float, float]:
 91 |     x = df['charter_enroll_pct_2022_23'].to_numpy()
 92 |     y = df[ycol].to_numpy()
 93 |     corr = float(np.corrcoef(x, y)[0, 1])
 94 |     slope, intercept = np.polyfit(x, y, 1)
 95 |     xs = np.linspace(x.min(), x.max(), 200)
 96 | 
 97 |     zero_mask = df['charter_enroll_pct_2022_23'] == 0.0
 98 |     ax.scatter(x[~zero_mask], y[~zero_mask], s=42, alpha=0.85, color='#2563eb', edgecolor='white', linewidth=0.5, label='States with charter share > 0%')
 99 |     ax.scatter(x[zero_mask], y[zero_mask], s=52, alpha=0.95, color='#f59e0b', marker='s', edgecolor='white', linewidth=0.6, label='States coded at 0% charter share')
100 |     ax.plot(xs, slope * xs + intercept, color='#dc2626', linewidth=2, label='Best-fit line')
101 |     ax.set_title(f'{title}\nr = {corr:.2f}, slope = {slope:.2f}\nRaw, unadjusted state-level relationship; exploratory only', fontsize=11)
102 |     ax.set_xlabel('Charter enrollment share (2022–23)')
103 |     ax.set_ylabel('NAEP grade 8 mean score (2024)')
104 |     ax.grid(True, linestyle='--', alpha=0.25)
105 |     ax.legend(frameon=False, fontsize=8, loc='best')
106 | 
107 |     for state in ['Arizona', 'Massachusetts', 'Texas', 'Colorado', 'New Mexico', 'Florida']:
108 |         row = df[df['state'] == state]
109 |         if not row.empty:
110 |             ax.annotate(state, (row.iloc[0]['charter_enroll_pct_2022_23'], row.iloc[0][ycol]), xytext=(4, 4), textcoords='offset points', fontsize=8)
111 | 
112 |     return corr, slope
```

- **Line 90** starts a function named `summarize`. It takes an axis object `ax`, a DataFrame `df`, the name of the outcome column `ycol`, and a title.
- **Line 91** pulls the charter-share column into a NumPy array named `x`.
- **Line 92** pulls the selected outcome column into a NumPy array named `y`.
- **Line 93** calculates the Pearson correlation coefficient. A **correlation coefficient** measures how strongly two variables move together in a straight-line pattern.
- **Line 94** calculates the best-fit line using `np.polyfit`. Here the `1` means “fit a straight line rather than a curve.”
- **Line 95** creates evenly spaced x-values so the trend line can be drawn smoothly across the chart.
- **Line 97** creates a Boolean mask identifying which states have exactly `0.0` charter share.
- **Line 98** plots the nonzero-charter states as blue circles. Parameters like `s`, `alpha`, `color`, and `edgecolor` control marker size, transparency, fill color, and border color.
- **Line 99** plots the zero-charter states as gold squares so readers can see that they were handled specially.
- **Line 100** draws the red best-fit line.
- **Line 101** sets the panel title and also prints the correlation and slope directly on the chart.
- **Line 102** labels the x-axis.
- **Line 103** labels the y-axis.
- **Line 104** turns on a light grid to make the chart easier to read.
- **Line 105** adds a legend.
- **Line 107** begins a loop over a few selected states that are worth labeling.
- **Line 108** filters the DataFrame down to the current state.
- **Line 109** checks whether the filtered result is nonempty.
- **Line 110** writes the state name next to its point.
- **Line 112** returns the correlation and slope so the main function can reuse them later.

Why this matters: visualization code is not just about making a picture. It also makes analytic choices visible, such as which states were coded at zero and which points are important enough to label.

## Lines 115–129: building the main data table and saving the image

```python
115 | def main() -> None:
116 |     charter = fetch_charter_share_all_50()
117 |     math_df = fetch_naep('math').drop(columns=['state_code'])
118 |     reading_df = fetch_naep('reading').drop(columns=['state_code'])
119 | 
120 |     df = charter.merge(math_df, on='state', how='left').merge(reading_df, on='state', how='left')
121 |     df = df.sort_values('charter_enroll_pct_2022_23').reset_index(drop=True)
122 |     df.to_csv(CSV_PATH, index=False)
123 | 
124 |     fig, axes = plt.subplots(1, 2, figsize=(14, 6), constrained_layout=True)
125 |     math_corr, math_slope = summarize(axes[0], df, 'naep_math_2024', 'Charter Share vs. NAEP Math')
126 |     read_corr, read_slope = summarize(axes[1], df, 'naep_reading_2024', 'Charter Share vs. NAEP Reading')
127 |     fig.suptitle('Question 4 Exploratory Scatterplots — All 50 States', fontsize=15)
128 |     fig.savefig(PNG_PATH, dpi=220)
129 |     plt.close(fig)
```

- **Line 115** starts the `main` function. This is the central workflow of the script.
- **Line 116** loads the charter-share table.
- **Line 117** loads the mathematics NAEP table and drops the `state_code` column because it is no longer needed for the merge.
- **Line 118** does the same for reading.
- **Line 120** merges the three tables together by the `state` column. A **merge** is the table operation that lines up rows from different data sources using a shared key.
- **Line 121** sorts the finished table by charter share and resets the row numbers.
- **Line 122** saves the merged data to a CSV file.
- **Line 124** creates a figure with two side-by-side panels.
- **Line 125** fills the first panel with the mathematics scatterplot and stores the returned correlation and slope.
- **Line 126** does the same for reading.
- **Line 127** adds an overall title across the full figure.
- **Line 128** saves the figure to the PNG path.
- **Line 129** closes the figure to free memory.

Why this matters: once the three data sources are combined into one clean DataFrame, the rest of the analysis becomes much easier. This is a common pattern in applied data science: build one trusted merged table, then analyze it.

## Lines 131–185: writing the human-readable summary note

```python
131 |     no_charter_states = [s for s in ALL_50_STATES if float(df.loc[df['state'] == s, 'charter_enroll_pct_2022_23'].iloc[0]) == 0.0]
132 |     nonzero = df[df['charter_enroll_pct_2022_23'] > 0].copy()
133 |     math_corr_nz = float(nonzero['charter_enroll_pct_2022_23'].corr(nonzero['naep_math_2024']))
134 |     read_corr_nz = float(nonzero['charter_enroll_pct_2022_23'].corr(nonzero['naep_reading_2024']))
135 | 
136 |     MD_PATH.write_text(f'''---
137 | type: analysis-note
138 | title: "Question 4 — 50-State 2024 Charter Share vs. NAEP Scatterplots"
139 | created: 2026-08-02
140 | question: "What is the relationship between state-level charter school penetration and aggregate NAEP performance, controlling for demographic composition?"
141 | source_1: "NAEP Data Service API (2024 grade 8 math and reading state means)"
142 | source_2: "NCES Digest table 216.90 (2022–23 charter enrollment share by state)"
143 | ---
144 | 
145 | # Question 4 — 50-State 2024 Scatterplots
146 | 
147 | Files created:
148 | - CSV: `{CSV_PATH.name}`
149 | - Chart: `{PNG_PATH.name}`
150 | 
151 | ## Accuracy correction from the earlier draft
152 | 
153 | The earlier exploratory pass used 44 states because five no-charter states were omitted as “not applicable,” and Wyoming was accidentally dropped by an Excel row-slice bug. This corrected version includes **all 50 states**.
154 | 
155 | To make that possible, states reported by NCES as having **no charter share in 2022–23** were coded as **0% charter enrollment**. This includes both states with no charter legislation / no operating charter schools in the table and Kentucky, which is listed at 0.0%.
156 | 
157 | States at 0% charter enrollment in this file:
158 | - {', '.join(no_charter_states)}
159 | 
160 | ## Math (2024)
161 | - Correlation: **{math_corr:.2f}**
162 | - Slope: **{math_slope:.2f}** NAEP math points per 1 percentage-point increase in charter share
163 | 
164 | Plain-language reading:
165 | - The raw relationship is **negative**, but weak.
166 | - Charter share alone shows only a **weak linear relationship** with state math performance.
167 | 
168 | Sensitivity check:
169 | - Excluding the 0% charter-share states, the relationship stays negative but becomes smaller (**r = {math_corr_nz:.2f}**).
170 | 
171 | ## Reading (2024)
172 | - Correlation: **{read_corr:.2f}**
173 | - Slope: **{read_slope:.2f}** NAEP reading points per 1 percentage-point increase in charter share
174 | 
175 | Plain-language reading:
176 | - The raw relationship is **negative**, but weak.
177 | - Charter share alone shows only a **weak linear relationship** with state reading performance.
178 | 
179 | Sensitivity check:
180 | - Excluding the 0% charter-share states, the relationship stays negative but becomes smaller (**r = {read_corr_nz:.2f}**).
181 | 
182 | ## Interpretation
183 | 
184 | These are exploratory, raw scatterplots. They show whether there is a visible relationship worth investigating, not whether charter schools cause better or worse scores. The next step is to add controls for poverty, race/ethnicity, disability, English-learner status, and possibly spending.
185 | ''')
```

- **Line 131** builds a list of which states ended up at `0.0` charter share.
- **Line 132** makes a filtered copy of the data that excludes those zero-share states.
- **Line 133** calculates the mathematics correlation for the nonzero-only sensitivity check.
- **Line 134** calculates the reading correlation for the same sensitivity check.
- **Line 136** starts a long formatted string that will become a markdown file.
- **Lines 137–143** write YAML frontmatter. **Frontmatter** is metadata at the top of a markdown file, such as title, type, or tags.
- **Line 145** adds the visible markdown heading.
- **Lines 147–149** list the output files that were created.
- **Lines 151–158** explain the correction from the earlier flawed draft and list the states coded at 0%.
- **Lines 160–169** summarize the mathematics results in both statistical and plain-language terms.
- **Lines 171–180** do the same for reading.
- **Lines 182–184** close with an interpretation paragraph that reminds the reader this is exploratory rather than causal.
- **Line 185** finishes the long string and writes it to the markdown note path.

Why this matters: a good analysis script does not stop at numbers. It also leaves behind a readable explanation. In education work, that is especially important because the audience is often mixed: teachers, administrators, students, and reviewers may all need to understand the output.

## Lines 187–197: printing the outputs and running the script

```python
187 |     print(f'CSV: {CSV_PATH}')
188 |     print(f'PNG: {PNG_PATH}')
189 |     print(f'MD:  {MD_PATH}')
190 |     print(f'Math correlation: {math_corr:.4f}')
191 |     print(f'Math slope: {math_slope:.4f}')
192 |     print(f'Reading correlation: {read_corr:.4f}')
193 |     print(f'Reading slope: {read_slope:.4f}')
194 | 
195 | 
196 | if __name__ == '__main__':
197 |     main()
```

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
- [Question 4 Controlled Analysis Plan](/questions/question-4-controlled-analysis/) — the next stronger model for professor review
