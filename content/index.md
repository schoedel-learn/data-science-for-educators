---
okf_version: "0.1"
type: index
title: "Data Science for Educators"
description: "A beginner-friendly knowledge bundle covering five education research questions, their methods, and the data behind them — built on NAEP 2022–2024 data."
resource: "https://data.educatebarry.co"
tags: [education, data-science, naep, research-methods, stem-5328]
timestamp: "2026-07-10T19:00:00Z"
---

A beginner-friendly walkthrough of five real research questions in education, drawn from the 2022–2024 NAEP (National Assessment of Educational Progress) data. Each question shows what you would investigate, how you would design the analysis, what data you would need, and — most importantly — *why* each step makes sense.

If you are an educator curious about data science but new to the terminology, this is written for you.

## New worked example for [Question 4](#home-question-4)

A full public-facing worked example is now available for the charter-school question:

- [Question 4 Worked Example](questions/question-4-exploration) — the current 50-state exploratory analysis with scatterplots, grouped summary tables, downloadable CSV files, and APA 7 references.
- [Question 4 Controlled Analysis Plan](questions/question-4-controlled-analysis) — the next stronger follow-up design, showing which additional controls, variables, and model structure would be needed for a more defensible analysis.
- [Python Walkthrough — How the Question 4 Scatterplot Script Works](questions/question-4-python-walkthrough) — a line-by-line explanation of the actual Python script for educators who want to understand how the analysis is programmed.

If you want to see the raw comparison first, start with the worked example. If you want to see how the analysis could be strengthened, read the controlled-analysis plan next. If you want to learn how the code itself works, read the Python walkthrough.

## Where the data lives

All questions can be answered using the NAEP Data Service API at `nationsreportcard.gov` — a free, public source of U.S. student assessment data — plus a handful of external sources noted in each section.

## Contents

Each label below says what kind of claim the question can support — see [How the Questions Are Classified](classification) for the reasoning behind every label.

| # | Question | Classification |
|---|----------|----------------|
| 1 | [Math vs. reading recovery divergence](questions/question-1) | Predictive (comparative) |
| 2 | [Hispanic decline and EL mediation](questions/question-2) | Predictive (mediational framing) |
| 3 | [Digital assessment mode effects](questions/question-3) | Causal (measurement) |
| 4 | <span id="home-question-4"></span>[Charter penetration and NAEP scores](questions/question-4) | Predictive (comparative) |
| 5 | [IEP gap and state achievement](questions/question-5) | Descriptive (comparative) |

## Supporting pages

- [How the Questions Are Classified](classification) — definitions of the three main research aims and why each question gets its label
- [The Three Aims of Data Analysis and the Cross-Cutting Role of Comparison](three-aims-and-comparison) — the fuller public explainer of why this site uses a three-aim framework and treats comparison as cross-cutting rather than as a fourth top-level type
- [Question 4 Worked Example](questions/question-4-exploration) — a public-facing exploratory analysis with charts, tables, downloadable data, and APA 7 references
- [Question 4 Controlled Analysis Plan](questions/question-4-controlled-analysis) — the next stronger design for adding controls and explaining model structure for a more defensible analysis
- [Python Walkthrough — How the Question 4 Scatterplot Script Works](questions/question-4-python-walkthrough) — a line-by-line, educator-friendly explanation of the real Python script behind the scatterplots
- [Glossary](glossary) — every technical term defined in plain language
- [Work Log](log) — creation and update history
