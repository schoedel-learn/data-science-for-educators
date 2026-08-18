---
type: question
title: "Digital Assessment Mode Effects"
number: 3
classification: "Causal (measurement)"
description: "Did switching NAEP from paper to computer tests in 2017 distort the scores, and does this confound pre-post COVID comparisons?"
tags: [digital-assessment, mode-effect, internal-validity, sensitivity-analysis, technology-access]
timestamp: "2026-07-10T19:00:00Z"
---

## What is this question really asking?

In 2017, NAEP moved from paper booklets to tablets. If students who rarely used computers at home suddenly took a high-stakes test on a screen, their scores might have dropped — not because they knew less, but because the format was unfamiliar. This is called a [mode effect](/glossary/#g-mode-effect). The concern: if the format change artificially lowered scores right before COVID, then some portion of the "COVID learning loss" might actually be a measurement artifact — the testing instrument changed, not the students.

> **Why classification matters.** This is the one genuinely *causal* question — but about the measuring instrument, not a policy. Because the paper-to-tablet switch happened at a single, dated moment in 2017, a before-and-after [comparison](/glossary/#g-interrupted-time-series) can test whether the format change itself moved scores. That makes it an *instrumentation* concern for [internal validity](/glossary/#g-internal-validity): the worry that the measuring tool changed between measurements. See [How the Questions Are Classified](/classification/) for the full reasoning.

## How you would investigate it

1. **Compare 2015 (paper) to 2017 (digital).** Look at the score change for all students at the transition. If there was a sharp, one-time drop in 2017 that did not continue in 2019, that pattern suggests a mode effect rather than a real decline.

2. **Split by technology access.** Group students by whether they had a computer at home, internet access, and experience with tablets at school. If students without home devices showed larger drops in 2017, the effect is [differential](/glossary/#g-differential) — it hits some groups harder than others — which is strong evidence of a mode effect.

3. **Estimate the magnitude.** If the mode effect was roughly 2 points, then the "true" COVID-era decline was 7.9 minus 2 = 5.9 points. Still a serious drop, but not historically unprecedented. This is a [sensitivity analysis](/glossary/#g-sensitivity): you recalculate your main finding under different plausible assumptions to see if it holds up.

4. **Check if the effect was temporary.** By 2019, students had more device experience. If the 2017 drop partially reversed by 2019, the mode effect was transient and does not affect COVID-era comparisons much.

## Data you would need

| What | Source | Example |
|------|--------|---------|
| Scores for 2015, 2017, 2019 | NAEP Data API | 2015: paper; 2017: first digital; 2019: second digital |
| Student device access | NAEP student survey (B034405–B034407) | Desktop/laptop, tablet, smartphone at home |
| Teacher technology training | NAEP teacher survey (T131851) | "Have you had training on classroom tech?" |
| School device availability | NAEP school survey (TECHAVS) | Device types available for student use |
| NCES mode-effect study | 2017 technical documentation | Official analysis of DBA transition |

**NAEP API variables:** B034405–B034407, B034401, B034801, T131851, T132101–T132103, TECHAVS

**Analytic method:** Interrupted time series design with 2017 as the interruption point. Device access as an interaction term. Sensitivity analysis recalculates COVID-era declines excluding the estimated mode effect. Note: the API `sample` field (R2 = accommodations not permitted, R3 = accommodations permitted) tracks accommodation policy, not assessment mode. Mode effects must be inferred from score trajectories rather than a direct mode flag.
