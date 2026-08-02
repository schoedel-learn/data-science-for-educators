---
okf_version: "0.1"
type: page
title: "How the Questions Are Classified"
description: "Why each of the five research questions is labeled descriptive, predictive, or causal — with definitions drawn from peer-reviewed methods literature."
tags: [research-methods, classification, descriptive, comparative, predictive, causal, stem-5328]
timestamp: "2026-08-01T00:00:00Z"
---

Every question on this site carries a label: *descriptive*, *predictive*, or *causal*. Those labels are not decoration — they tell you what kind of claim the question can honestly support, and therefore what kind of evidence you would need to answer it. When a question works by **comparing groups**, that approach is noted in parentheses, e.g. *Predictive (comparative)* — comparison is a method used inside the three types, not a type of its own.

This page does two things. First, it defines the three question types in plain language, using the methods literature. Second, it explains — question by question — why each one is labeled the way it is. The single idea that runs through all of it: **a factor that travels with an outcome only lets you *predict* it. Saying that factor *causes* the outcome is a much stronger claim, and observational data rarely earns it.**

If you want the longer methods argument behind this page, see [The Three Aims of Data Analysis and the Cross-Cutting Role of Comparison](/three-aims-and-comparison/).

## The three types

Most methodologists sort research questions into three families — description, prediction, and causal inference — and treat *comparison* as an approach that shows up inside all three (Ito et al., 2025; Kamper, 2020; Shmueli, 2010).

### Descriptive

A descriptive question asks *what is happening* — the level, frequency, or distribution of something. It answers *who, where, when,* and *how much* (Newton et al., 2004). Comparing groups is often how a descriptive question is answered: showing that two groups differ documents *that* a gap exists, but not *why*, because when people are not randomly sorted into groups any difference is tangled up with everything else that differs between them (Shmueli, 2010). Example: "Do students with IEPs score differently from students without IEPs?"

### Predictive

A predictive question asks whether knowing X helps you **forecast** Y. Prediction is about association, not intervention. As Shmueli (2010) puts it, "In predictive modeling *f* captures the association between *X* and *Y*" (p. 293) — X does not have to *cause* Y to be a useful predictor. In fact, predictive strength and causal truth can come apart: "While explanatory power provides information about the strength of an underlying causal relationship, it does not imply its predictive power" (Shmueli, 2010, p. 290).

**This is the "predictive of" versus "cause of" line:**

- **Predictive of** — X and Y are associated, so X helps you *guess* Y. The link may run either direction, or come from some third factor.
- **Cause of** — changing X would *change* Y. This is a stronger, counterfactual claim that, with observational data, means ruling out other explanations first (Hernán et al., 2025).

### Causal

A causal question asks whether changing X would change Y — the effect of a well-defined intervention (Kamper, 2020). The cleanest way to answer it is a randomized experiment, because randomization breaks the link between the treatment and everything else (Ito et al., 2025). Without randomization, a causal claim from observational data has to be built deliberately, imitating the experiment you *would* have run and stating its assumptions out loud (Hernán et al., 2025). Two such designs matter here:

- **[Interrupted time series](/glossary/#g-interrupted-time-series)** — Lopez Bernal et al. (2017) describe this as a design "for evaluating the effectiveness of population-level health interventions that have been implemented at a clearly defined point in time" (p. 348). It works only when there is "a clear differentiation of the pre-intervention period and the post-intervention period" (p. 349) — that is, a discrete event with a known date.
- **[Mediation analysis](/glossary/#g-mediation)** — asks whether X affects Y *through* a middle variable. To read the result as causal, it needs the "sequential ignorability" assumption, which Imai et al. (2010) note "may be too strong for the typical situations in which causal mediation analysis is employed" and "cannot be directly tested even in randomized experiments" (pp. 52–53).

## Why each question is labeled the way it is

All five questions use [NAEP](/glossary/#g-nces) data, which samples *different* students each cycle. That design is excellent for describing and comparing, workable for predicting, and only cautiously usable for causal claims — and then only with the extra structure described above (Hernán et al., 2025; Lopez Bernal et al., 2017).

### [Question 1 — Math vs. reading recovery](/questions/question-1/) → Predictive (comparative)

Showing that math and reading trajectories split after 2022 is a comparison. The next step — linking the split to state policies like recovery spending or reading laws — runs into a wall: states *chose* those policies, so the association is tangled with everything else that differs between states (Shmueli, 2010). The policy factors *accompany* and help *forecast* the divergence; they are not shown to have *caused* it. That makes this predictive, worked through a comparison of state groups.

### [Question 2 — Hispanic decline and EL status](/questions/question-2/) → Predictive (mediational framing)

This asks whether English-learner status is the *pathway* behind a decline — a mediation question. But mediation only carries a causal meaning when nothing unmeasured confounds the relationships involved, and that assumption "cannot be directly tested" (Imai et al., 2010, pp. 52–53). With NAEP's snapshot data and unmeasured factors like family income and immigration history, the honest version forecasts which factors are *associated* with the decline — it does not prove a mechanism.

### [Question 3 — Digital assessment mode effects](/questions/question-3/) → Causal (measurement)

This is the one genuinely causal question, and the reason is timing: NAEP switched from paper to tablet at a single, dated moment in 2017. That discrete event is exactly what an [interrupted time series](/glossary/#g-interrupted-time-series) needs (Lopez Bernal et al., 2017). Comparing scores before and after — and checking whether students with less device access dropped more — approximates a real causal test. The label stays causal, sharpened to *measurement* because the question is about whether the testing instrument itself shifted the scores.

### [Question 4 — Charter penetration and scores](/questions/question-4/) → Predictive (comparative)

Regressing state scores on charter-enrollment share measures how well charter share *forecasts* scores, not whether charters *cause* them (Shmueli, 2010). The question already says so, and flags the extra design work a causal claim would require. Predictive is the right call, worked through a comparison across states.

### [Question 5 — IEP gap and state achievement](/questions/question-5/) → Descriptive (comparative)

This compares the size of the IEP/non-IEP gap across states. It documents whether the gap varies — not why (Newton et al., 2004). A straightforward description, built from a comparison.

## References

Gelfand, L. A., Mensinger, J. L., & TenHave, T. (2009). Mediation analysis: A retrospective snapshot of practice and more recent directions. *The Journal of General Psychology, 136*(2), 153–178. https://doi.org/10.3200/GENP.136.2.153-178

Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. https://doi.org/10.7326/ANNALS-24-01871

Imai, K., Keele, L., & Yamamoto, T. (2010). Identification, inference and sensitivity analysis for causal mediation effects. *Statistical Science, 25*(1), 51–71. https://doi.org/10.1214/10-STS321

Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. https://doi.org/10.1212/WNL.0000000000210171

Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. https://doi.org/10.2519/jospt.2020.0703

Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. https://doi.org/10.1093/ije/dyw098

Newton, J. T., Bower, E. J., & Williams, A. C. (2004). Research in primary dental care. Part 2: Developing a research question. *British Dental Journal, 196*(10), 605–608. https://doi.org/10.1038/sj.bdj.4811285

Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310. https://doi.org/10.1214/10-STS330
