---
type: question
title: "Hispanic Student Decline and English-Learner Mediation"
number: 2
classification: "Predictive (mediational framing)"
description: "Why did Hispanic students lose the most ground after 2022, and does English-learner status mediate the effect?"
tags: [hispanic, english-learner, mediation, achievement-gap, poverty, confound]
timestamp: "2026-07-10T19:00:00Z"
---

## What is this question really asking?

From 2022 to 2024, Hispanic students' math scores dropped 3.4 points nationally and 4.1 points in Texas — more than any other racial or ethnic group. Many Hispanic students are also classified as English learners. The question is: **did the decline happen because of something about being Hispanic, or because of something about learning English during disrupted schooling?**

> **Why classification matters.** This uses a [mediation](/glossary/#g-mediation) *framing* — asking whether English-learner status is the pathway (the mediator) between Hispanic identity and the score decline. But NAEP's snapshot data cannot rule out the hidden factors that a true causal-mechanism claim requires, so the honest aim is *predictive*: we identify which factors are most strongly *associated* with the decline, worked through a *comparison* of race × language subgroups. See [How the Questions Are Classified](/classification/) for the full reasoning.

## How you would investigate it

1. **Split Hispanic students into two groups.** Group A: Hispanic students who are classified as English learners. Group B: Hispanic students who are not. If Group A's scores dropped much more than Group B's, language interruption during remote school is a strong candidate explanation.

2. **Rule out poverty as the real driver.** Hispanic students are more likely to qualify for free or reduced-price lunch (a standard [proxy](/glossary/#g-proxy) for low family income). Compare Hispanic and White students *at the same lunch-status level*. If the gap shrinks dramatically, income — not ethnicity or language — may be the underlying factor. This is called testing for a [confound](/glossary/#g-confound).

3. **Check if the pattern is the same everywhere.** In Texas, over half of students are Hispanic. In Vermont, fewer than 5% are. If Hispanic students declined similarly in both states, the mechanism is not about being concentrated in particular schools or districts.

4. **Run a formal mediation model.** A mediation analysis quantifies how much of the Hispanic decline "flows through" the EL pathway. The classic approach (Baron & Kenny, 1986) runs three regressions. Modern alternatives use [bootstrapping](/glossary/#g-bootstrap) (Preacher & Hayes, 2004). If EL status explains 70% of the decline, language is the main story. If it explains 10%, broader forces — school funding, segregation, teacher quality — are at work.

## Data you would need

| What | Source | Example |
|------|--------|---------|
| Scores by race × English-learner status | NAEP Data API ([crosstab](/glossary/#g-crosstab)) | Hispanic EL: −5.2 pts; Hispanic non-EL: −1.8 pts |
| Scores by race × poverty status | NAEP Data API (crosstab) | Hispanic free-lunch vs. non-free-lunch |
| School % LEP enrollment | NAEP school survey | C046501 |
| State EL enrollment trends | [NCES](/glossary/#g-nces) | Texas EL: 18% → 20% of enrollment |

**NAEP API variables:** SDRACE, LEP, SLUNCH3, C046501, C044006

**Analytic method:** Mediation model with SDRACE as predictor, LEP as mediator, and 2022–2024 score change as outcome. Oaxaca-Blinder decomposition at the state level decomposes the Hispanic decline into within-EL and within-non-EL components.

**References:** Baron, R. M., & Kenny, D. A. (1986). The moderator–mediator variable distinction. *Journal of Personality and Social Psychology, 51*(6), 1173–1182. | Preacher, K. J., & Hayes, A. F. (2004). SPSS and SAS procedures for estimating indirect effects. *Behavior Research Methods, Instruments, & Computers, 36*(4), 717–731.
