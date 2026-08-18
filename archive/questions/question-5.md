---
type: question
title: "IEP Gap and State Achievement"
number: 5
classification: "Descriptive (comparative)"
description: "Do high-scoring states leave students with disabilities behind? Tests the equity–excellence tradeoff hypothesis."
tags: [iep, special-education, equity, achievement-gap, state-comparison, interaction-term]
timestamp: "2026-07-10T19:00:00Z"
---

## What is this question really asking?

The gap between students with [IEPs](/glossary/#g-iep) (Individualized Education Programs — the formal designation for students with disabilities) and their non-disabled peers is 36 points nationally — the largest single-category gap in the NAEP dataset. Some states score very high overall (Massachusetts: 283). Others score lower (Mississippi: 269). The question is whether high-scoring states achieve those high averages partly by concentrating resources on students near the proficiency threshold — the ones whose scores can push the average up — while students with disabilities fall further behind. This is an *equity–excellence tradeoff* hypothesis.

> **Why classification matters.** The primary aim is *descriptive*: through a *comparison* of the IEP gap across states at different overall achievement levels, we document whether the gap widens, narrows, or stays flat. It is not causal without additional design, but the pattern itself tells us something important about how states produce high achievement. See [How the Questions Are Classified](/classification/) for the full reasoning.

## How you would investigate it

1. **Calculate the IEP gap for each state.** For every state, subtract the average IEP student score from the average non-IEP student score. Plot these gaps against each state's overall average. If the points trend upward to the right — higher overall scores paired with bigger IEP gaps — that supports the tradeoff hypothesis.

2. **Account for who gets tested.** Some states exclude a larger share of IEP students from NAEP testing. A state could have a deceptively small IEP gap simply because it only tests its highest-performing IEP students. Control for the IEP testing rate so the comparison is fair.

3. **Check whether COVID intensified any tradeoff.** Add a *year* variable and an [interaction term](/glossary/#g-interaction) (state mean × year). If the slope got steeper after COVID — the IEP gap grew faster in high-scoring states — that suggests the pandemic made the equity–excellence tension worse.

4. **Quantify the relationship.** Run a regression: IEP gap = state overall score + IEP testing rate + special education enrollment rate + region. The [coefficient](/glossary/#g-coefficient) on state overall score tells you: for every 10-point increase in a state's average, how many points does the IEP gap grow?

## Data you would need

| What | Source | Example |
|------|--------|---------|
| State scores for IEP and non-IEP | NAEP Data API | MA non-IEP: 290, IEP: 250 → gap: 40 |
| State overall scores | NAEP Data API | MA: 283, MS: 269 |
| IEP testing rates (assessed vs. excluded) | Derived from NAEP sample | % of IEP students who took the test |
| Special education enrollment | [NCES](/glossary/#g-nces) | CA: 12% of students have IEPs |
| Inclusion rates | NCES | % of IEP students in regular class ≥80% of day |
| Federal compliance ratings | OSEP / IDEA | "Meets requirements" vs. "Needs intervention" |

**NAEP API variables:** IEP, TOTAL, MN:MN, C044007

**Analytic method:** Scatterplot + regression: IEP gap ~ state mean score + IEP testing rate + special education enrollment rate + region fixed effects. Multi-year panel with interaction term (state mean × year) to test whether the equity–excellence tradeoff intensified post-COVID.
