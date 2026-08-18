---
type: page
title: "Analysis"
description: "How the data was inspected, summarized, and compared — in plain language."
---

I pulled mean NAEP scale scores for mathematics and reading, grades 4 and 8, for the U.S. national public average and for Texas, across the years NAEP actually tested: 2015, 2017, 2019, 2022, and 2024. That produced a tidy table of **40 rows** (one per jurisdiction × subject × grade × year) with **five columns**: `year`, `jurisdiction`, `subject`, `grade`, and `score`.

## The steps I took

1. **Inspected the structure.** I checked the number of rows and columns, and confirmed every cell had a value.
2. **Checked for missing or unusual values.** NAEP is biennial, so years like 2016, 2018, and 2025 return a "999" placeholder meaning "no data." I recognized those and filtered them out rather than treating them as real scores.
3. **Summarized.** I computed averages by subject and grade, the highest and lowest year for each series, and the change from before COVID to after.
4. **Compared groups.** I compared the national average to Texas, and mathematics to reading.
5. **Created charts.** I built line and bar charts to make the patterns visible.
6. **Used AI tools** to help write, run, and explain the analysis — see the [AI use section](/ai-use/) for how that was verified.

## Tools

The analysis was written in Python (using pandas and matplotlib) and ran against the NAEP Data Service API through a small command-line tool. The full code and the assembled dataset are available as appendices in the [references](/references/).

## What the analysis does not do

This is a descriptive and comparative analysis. It does not fit a predictive model, and it does not test causal hypotheses — those would require a different design, which I discuss in [limitations](/limitations/).
