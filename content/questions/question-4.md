---
type: question
title: "Charter School Penetration and NAEP Scores"
number: 4
classification: "Predictive (comparative)"
description: "Do states with more charter schools have higher or lower NAEP scores, after controlling for demographic composition?"
tags: [charter-schools, state-comparison, ols-regression, instrumental-variable, causal-inference]
timestamp: "2026-07-10T19:00:00Z"
---

## What is this question really asking?

Charter school enrollment varies enormously by state — from near zero in West Virginia to over 15% in Arizona. The question is whether higher charter penetration is associated with better state-level NAEP scores *after accounting for differences in poverty, race, and special education rates*. Without those adjustments, you might credit (or blame) charter schools for differences that are really about which students live in which states.

> **Why classification matters.** The primary aim is *predictive*: charter share is used to model expected NAEP scores, worked through a *comparison* across states. It is not automatically causal — states with lots of charters might differ in other ways that drive scores. A causal claim would require additional design, like an [instrumental variable](/glossary/#g-instrument). See [How the Questions Are Classified](/classification/) for the short version or [The Three Aims of Data Analysis and the Cross-Cutting Role of Comparison](/three-aims-and-comparison/) for the fuller methods argument.

## How you would investigate it

1. **Make a scatterplot.** Put charter enrollment percentage on the x-axis and NAEP math scores on the y-axis — each state is one dot. A visible upward or downward slope tells you there is a raw relationship worth investigating.

2. **Add [adjustment variables](/glossary/#g-adjustment).** Run an [OLS regression](/glossary/#g-ols): NAEP score = charter share + % Black + % Hispanic + % free lunch + % IEP + per-pupil spending + region. The regression answers: if two states had the same demographics and funding levels, would the one with more charter schools score higher?

3. **Address the chicken-and-egg problem.** Did charters cause higher scores, or did low-scoring states adopt charters as a reform? Use an instrumental variable: the year a state passed its charter law affects charter penetration today but is not caused by current demographics. If charter penetration predicted by law passage year is associated with higher scores, the case for causation strengthens.

4. **Look for natural experiments.** When a state lifts its charter school cap, compare before-and-after score changes to states that did not lift their caps. This [difference-in-differences](/glossary/#g-did) design isolates the policy effect.

## Worked example now available

A full public-facing worked example for this question is now live at [Worked Example — Question 4: Charter Share and NAEP Scores](/questions/question-4-exploration/). It includes:

- a 50-state exploratory analysis page,
- a two-panel scatterplot for 2024 Grade 8 math and reading,
- grouped summary tables,
- the full state-level data table,
- downloadable CSV files,
- APA 7 references, and
- a [Python Walkthrough](/questions/question-4-python-walkthrough/) that explains the actual scatterplot script line by line for educators who are learning how data science code works.

That worked example is intentionally framed as a **first exploratory pass**. It shows the raw relationship, documents the data-cleaning choices, and explains why the result is not a causal claim.

If you want the next stronger design, see [Question 4 Controlled Analysis Plan](/questions/question-4-controlled-analysis/). That page explains which additional controls, data sources, and modeling choices would be needed before stronger claims could be made.

## Data you would need

| What | Source | Example |
|------|--------|---------|
| State NAEP scores, 2019/2022/2024 | NAEP Data API | MA: 283, AZ: 270 |
| State demographics | NAEP Data API | % Black, % Hispanic, % free lunch, % IEP |
| Charter enrollment % by state | [NCES](/glossary/#g-nces) Common Core of Data | AZ: 18%, WV: 0% |
| Charter quality ratings | CREDO (Stanford) | Ohio charters: above avg. reading |
| State charter law history | Education Commission of the States | MN: first law, 1991 |
| Per-pupil expenditure | U.S. Census Bureau | NY: $25K/student; UT: $9K/student |

**NAEP API variables:** TOTAL, MN:MN, SDRACE, SLUNCH3, IEP, CHRTRPT, C0863A1–C0863I1

**Analytic method:** State-level OLS regression with region fixed effects. Multiple years pooled. Robustness: instrumental variable using charter law passage year; difference-in-differences exploiting state-level charter cap changes.
