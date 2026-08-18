---
type: question
title: "Math vs. Reading Recovery Divergence"
number: 1
classification: "Predictive (comparative)"
description: "Why did math scores partially recover after COVID while reading scores kept falling? Tests whether asymmetric recovery investments explain the divergence."
tags: [math, reading, covid, recovery, esser, interrupted-time-series]
timestamp: "2026-07-10T19:00:00Z"
---

## What is this question really asking?

After the pandemic, 4th-grade math showed a small bounce-back. Reading scores at *every* tested grade continued to drop from 2022 to 2024. Normally, math and reading scores rise and fall together — they respond to the same schools, the same teachers, and the same economic pressures. When two outcomes that usually move in lockstep suddenly diverge, something specific to one of them changed. The question is: **what changed differently for reading than for math?**

> **Why classification matters.** The primary aim here is *predictive*: we look for factors — like recovery spending or reading laws — that are *associated with* the reading–math divergence and could help forecast it. The work is done through a *comparison* of groups of states, but because states were not randomly assigned their policies, those factors only accompany the split; they do not prove they caused it. See [How the Questions Are Classified](/classification/) for the full reasoning.

## How you would investigate it

1. **Plot both subjects on one timeline.** Put math and reading scores for 2019, 2022, and 2024 on the same graph. Mark where COVID hit. If the lines split after the pandemic, you have confirmed the pattern is real and not a single-year fluke. This kind of before-and-after comparison is called an [interrupted time series](/glossary/#g-interrupted-time-series) — you are looking at what happened when an interruption (COVID) occurred.

2. **Find what changed differently for each subject.** Schools received billions in [ESSER](/glossary/#g-esser) (Elementary and Secondary School Emergency Relief) funds. Did districts spend more of that money on math tutors than on reading support? Separately, many states passed Science of Reading laws between 2019 and 2024 — these mandate specific phonics-based instruction methods. A new mandate can temporarily disrupt teaching before it improves outcomes. If states that passed reading laws saw bigger reading drops, the disruption explanation gains support.

3. **Check the home environment.** Reading practice happens at home more than math practice. The NAEP student survey asks things like "Do you talk about schoolwork with your family?" and "How many books are in your home?" These are [covariates](/glossary/#g-covariate) — background variables you measure so they do not distort your main finding. If students with fewer books at home lost more ground in reading specifically, home literacy environment is part of the story.

4. **Compare groups of states.** Group states by what they did: heavy math investment, reading mandate, both, or neither. If the math-reading gap is consistently larger in one group, you have evidence that the policy mattered.

## Data you would need

| What | Source | Example |
|------|--------|---------|
| Math and reading scores, 2019–2024 | NAEP Data API | 8th math: 281 → 273 → 272 |
| Student home environment | NAEP student survey | Books in home, internet access, device availability |
| School curriculum emphasis | NAEP school survey | Standards alignment, assessment preparation focus |
| COVID recovery spending by subject | Federal ESSER reports | District X: 40% math, 10% reading |
| State reading legislation | State legislature records | Mississippi Science of Reading law (2013) |

**NAEP API variables:** TOTAL, MN:MN, B017451, B013801, B034401, C060901–C060904

**Analytic method:** Comparative interrupted time series with state-level policy variables as treatment indicators. Student-level covariates from NAEP surveys control for home literacy environment and device access.
