---
type: page
title: "Dataset"
description: "The public data behind this project."
---

## Primary dataset: NAEP (National Assessment of Educational Progress)

- **Name:** NAEP — "The Nation's Report Card"
- **Source / link:** https://www.nationsreportcard.gov/ (data via the NAEP Data Service API)
- **Created and maintained by:** the National Center for Education Statistics (NCES), part of the Institute of Education Sciences in the U.S. Department of Education
- **What it measures:** academic achievement of U.S. students in grades 4, 8, and 12, reported as average scale scores (0–500) and achievement-level percentages for the nation, each state, and a set of large urban districts
- **Important variables:** `subject` (mathematics / reading), `grade` (4 / 8), `jurisdiction` (national / state), `year`, and the mean `score`
- **Time period:** biennial administrations — this project uses 2015, 2017, 2019 (pre-COVID) and 2022, 2024 (post-COVID)
- **Unit of analysis:** one row is a jurisdiction × subject × grade × year × student-group summary (e.g., "Texas, grade 8 mathematics, 2024, all students, mean score")

**Strengths.** NAEP is the gold-standard, nationally representative measure of U.S. student achievement; its scale is comparable across states and years, which makes "before vs. after" comparisons legitimate.

**Limitations.** It is sample-based (different students each cycle, no individual or school-level scores), it skips years (no 2016, 2018, or 2025), and results for small subgroups are sometimes suppressed.

## Secondary dataset: Stanford Education Data Archive (SEDA)

- **Source / link:** https://edopportunity.org/ (Educational Opportunity Project at Stanford)
- **Created and maintained by:** Stanford University's Educational Opportunity Project, led by Sean Reardon
- **What it measures:** nationally comparable district- and state-level achievement and achievement gaps, harmonized onto a common "grade-level" scale
- **Time period:** 2009–2019 (version 5.0) plus 2019–2024 "recovery" releases

SEDA is used only as a [triangulation](/research/) check — an independent dataset (built from state tests, not NAEP) to confirm that the patterns I found are not an artifact of one test.
