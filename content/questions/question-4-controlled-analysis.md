---
type: page
title: "Question 4 Controlled Analysis Plan"
description: "The next stronger follow-up design for Question 4: which controls, variables, and modeling choices would be needed to move from a raw scatterplot to a more defensible professor-review analysis."
tags: [charter-schools, naep, regression, controls, professor-review, stem-5328, apa7]
timestamp: "2026-08-02T00:00:00Z"
---

This page explains the next stronger step after the [Question 4 worked example](/questions/question-4-exploration/). The worked example showed the raw state-level relationship between charter-school enrollment share and 2024 Grade 8 NAEP scores. This page explains how that analysis should be strengthened for professor review. If you want to see how the existing exploratory analysis is programmed, read the [Python Walkthrough](/questions/question-4-python-walkthrough/).

## Why a controlled analysis is needed

The exploratory scatterplots answer an important first question: is there any visible relationship worth investigating? For Question 4, the answer was yes, but only weakly. States with larger charter sectors tended, on average, to have slightly lower 2024 NAEP mathematics and reading scores in the raw comparison. However, a raw cross-state comparison cannot tell whether charter share itself is doing the work or whether it is standing in for other state characteristics (Hernán et al., 2025; Shmueli, 2010).

That is the reason for moving to a controlled analysis. The goal is not to "prove" a charter effect. The goal is to ask a narrower and more defensible question: after accounting for major differences in student composition, funding, and geography, is charter-share still associated with state NAEP performance?

## What the stronger follow-up question looks like

A stronger version of Question 4 is:

How is state charter-school enrollment share associated with Grade 8 NAEP mathematics and reading performance after adjusting for demographic composition, disability status, English-learner status, and school funding?

That wording matters. It still asks about **association**, not **causation**. Predictive modeling focuses on how variables travel together, whereas causal claims require a design that identifies what would have happened under a different intervention or exposure level (Hernán et al., 2025; Shmueli, 2010).

## Recommended variables for the controlled follow-up

## Table 1

**Variables for a More Defensible Controlled Analysis of Question 4**

| Variable role | Example variable | Why it matters | Likely source |
|---|---|---|---|
| Outcome | 2024 Grade 8 NAEP mathematics mean | Main academic outcome | NAEP Data Service API (NCES, 2024b) |
| Outcome | 2024 Grade 8 NAEP reading mean | Second academic outcome | NAEP Data Service API (NCES, 2024b) |
| Main predictor | Charter-school enrollment share (%) | Structural predictor of interest | NCES Digest Table 216.90 (NCES, 2024a) |
| Demographic control | % Hispanic students | State composition can affect score patterns and overlaps with charter geography | NAEP Data Service API (NCES, 2024b) |
| Demographic control | % Black students | Same reason: composition differences can confound raw cross-state comparisons | NAEP Data Service API (NCES, 2024b) |
| Support-needs control | % IEP / special education | Disability composition is related to assessment averages and services | NAEP Data Service API (NCES, 2024b) |
| Support-needs control | % English learners | Language status can shape reading and mathematics performance patterns | NAEP Data Service API (NCES, 2024b) |
| Economic control | % eligible for subsidized lunch or similar poverty proxy | Poverty is one of the strongest likely confounders in state achievement comparisons | NAEP Data Service API (NCES, 2024b) |
| Resource control | Per-pupil expenditure | Funding differences can travel with achievement and state policy choices | External state finance source |
| Geographic control | Region or region fixed effects | Regional policy clusters and cost structures can distort simple comparisons | Derived / Census-style regional grouping |

*Note.* The exact final variable set depends on what is available in a common state-level frame. The purpose of the table is to show the logic of adjustment, not to claim that every control has already been merged into one finished file.

## What model would be run

The most direct next step is an [ordinary least squares](/glossary/#g-ols) regression. In plain language, this asks whether states with higher charter share still tend to have higher or lower scores after the model accounts for other measured differences among states.

A simple version would be:

NAEP score = charter share + race/ethnicity controls + poverty control + IEP control + English-learner control + per-pupil spending + region

That model should be run twice: once for mathematics and once for reading. If multiple years are pooled later, year indicators should be added so the model does not confuse time trends with state differences.

## What this stronger model would improve

A controlled model improves the analysis in three important ways.

First, it reduces the chance that charter share is merely acting as a proxy for another measured state characteristic. Second, it gives a clearer estimate of the direction and size of the adjusted association. Third, it creates a more credible professor-facing bridge between a raw descriptive visual and a more serious predictive analysis (Ito et al., 2025; Shmueli, 2010).

## What it still would not prove

Even after adding controls, the result would still not automatically become causal. Cross-state observational data do not randomize charter exposure, and they do not guarantee that all relevant confounders have been measured. Unmeasured state features — for example, local policy climate, urban concentration, family migration patterns, or differences in how charter sectors grew over time — could still shape the result (Hernán et al., 2025).

That means a controlled regression would support a stronger **predictive** claim than the scatterplot alone, but not a clean causal claim.

## What would be needed for a stronger causal design

If the goal later shifts from prediction to causation, the design would have to change, not just the number of controls. Stronger causal strategies could include:

- a policy-timing design based on a clearly dated charter-law change,
- a difference-in-differences design using states that changed charter caps versus states that did not, or
- an instrumental-variable strategy based on a defensible policy exposure that predicts charter penetration without directly reflecting current test-score conditions.

Those designs require additional assumptions and external policy-history data. They are conceptually different from a raw scatterplot or an adjusted OLS model (Hernán et al., 2025).

## How a professor could read the current sequence

The current website now supports a transparent progression:

1. [Question 4](/questions/question-4/) explains what the research question is and why it is classified as predictive rather than causal.
2. [Worked Example — Question 4: Charter Share and NAEP Scores](/questions/question-4-exploration/) shows the actual exploratory 50-state analysis, including the scatterplots, summary table, full data table, and data-cleaning corrections.
3. This page explains how the analysis should be strengthened before stronger conclusions are attempted.

That sequence is important because it makes the reasoning visible. It shows that the public-facing result is not being oversold, and it gives an instructor a clear audit trail from question framing to exploratory evidence to the next more defensible model.

## References

Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. https://doi.org/10.7326/ANNALS-24-01871

Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. https://doi.org/10.1212/WNL.0000000000210171

National Center for Education Statistics. (2024a). *Digest of Education Statistics 2023, Table 216.90: Public elementary and secondary charter schools and enrollment, and charter schools and enrollment as a percentage of total public schools and total enrollment in public schools, by state or jurisdiction: Selected school years, 2012-13 through 2022-23* [Data set]. U.S. Department of Education, Institute of Education Sciences. https://nces.ed.gov/programs/digest/d23/tables/dt23_216.90.asp

National Center for Education Statistics. (2024b). *National Assessment of Educational Progress (NAEP), Grade 8 mathematics and reading state assessments* [Data set]. U.S. Department of Education, Institute of Education Sciences. Retrieved August 2, 2026, from https://www.nationsreportcard.gov/DataService/GetAdhocData.aspx

Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310. https://doi.org/10.1214/10-STS330
