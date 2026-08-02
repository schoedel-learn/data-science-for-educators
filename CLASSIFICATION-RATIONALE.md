---
type: methodological-argument
title: "Classifying the Five Research Questions: Definitions and Rationale"
course: STEM-5328
author: Barry Schoedel
created: 2026-08-01
tags: [research-methods, classification, descriptive, comparative, predictive, causal, naep, apa7]
---

# Classifying the Five Research Questions

**Purpose.** The assignment asks us to list five education questions and classify
each as **descriptive, comparative, predictive, or causal**, then identify the
data each would need. This document does three things, in order:

1. Locates the site's classification table and the linked questions.
2. Defines each of the four question types, grounded in peer-reviewed
   methodological literature (APA 7 citations).
3. Argues for the correct classification of each of the five questions, with
   every factual claim backed by an APA 7 in-text citation.

> **Scope note.** The classifications live in `content/index.md` (the Contents
> table, lines 23–29) and link to `content/questions/question-1.md` through
> `question-5.md`. The live table is at
> [https://data.educatebarry.co/](https://data.educatebarry.co/).

---

## Part 1 — Where the classifications live

The site's home page renders a Contents table with three columns —
number, question (a hyperlink), and classification:

| # | Question (linked) | Current label |
|---|-------------------|---------------|
| 1 | [Math vs. reading recovery divergence](https://data.educatebarry.co/questions/question-1/) | Comparative → Causal |
| 2 | [Hispanic decline and EL mediation](https://data.educatebarry.co/questions/question-2/) | Causal (mediation) |
| 3 | [Digital assessment mode effects](https://data.educatebarry.co/questions/question-3/) | Causal (instrumentation) |
| 4 | [Charter penetration and NAEP scores](https://data.educatebarry.co/questions/question-4/) | Comparative → Predictive |
| 5 | [IEP gap and state achievement](https://data.educatebarry.co/questions/question-5/) | Comparative |

Source of the table: `content/index.md`. Source of each question: the matching
file in `content/questions/`.

---

## Part 2 — Definitions of the four question types

Before classifying anything, we need defensible definitions. A key finding from
the methodological literature: most current methodologists use a **three-part**
scheme — description, prediction, and causal inference — and treat "comparison"
as a *tool* used inside those three rather than a fourth standalone type (Ito et
al., 2025; Kamper, 2020; Shmueli, 2010). The assignment's four-type scheme
reflects a common teaching taxonomy in which comparison is named as its own
category (Newton et al., 2004). Both schemes appear in peer-reviewed sources;
the definitions below honor the assignment's four labels while noting where the
literature collapses them.

### Descriptive

A descriptive question asks *what is happening* — the frequency, distribution, or
level of something — without relating it to another variable or forecasting it.
A descriptive question "aims to quantify and describe the frequency and
distribution of a given" condition in a population (Ito et al., 2025).
Descriptive work answers *who, where, when,* and *how much* (Newton et al.,
2004).

> Example: "What was the national 8th-grade NAEP math score in 2024?"

### Comparative

A comparative question asks whether two or more groups **differ** on some
outcome. Newton et al. (2004) identify "questions of comparison" as a distinct
class of research question. A comparison documents that a difference exists but,
on its own, does not explain it: because group membership in observational data
is not randomly assigned, an observed gap is entangled with other differences
between the groups, so association cannot be read as explanation (Shmueli, 2010).

> Example: "Do students with IEPs score differently from students without IEPs?"

### Predictive

A predictive question asks whether knowing X improves our ability to **forecast**
Y. Prediction concerns association, not intervention. Shmueli (2010) defines
"*predictive modeling* as the process of applying a statistical model or data
mining algorithm to data for the purpose of predicting new or future
observations" (p. 291), and draws the foundational contrast with explanation: "In
explanatory modeling *f* represents an underlying causal function, and *X* is
assumed to cause *Y*. In predictive modeling *f* captures the association between
*X* and *Y*" (Shmueli, 2010, p. 293). Critically, she shows the two goals can
diverge — "the 'wrong' model can sometimes predict better than the correct one"
(Shmueli, 2010, p. 293) — so predictive strength does not certify causal
structure: "While explanatory power provides information about the strength of an
underlying causal relationship, it does not imply its predictive power" (Shmueli,
2010, p. 290).

> **The core "predictive of" vs. "cause of" distinction.**
>
> - **Predictive of** = X and Y are associated, so X helps *forecast* Y; in
>   predictive modeling the function "captures the association between *X* and
>   *Y*" and X need not cause Y (Shmueli, 2010, p. 293).
> - **Cause of** = intervening on X would *change* Y — a counterfactual claim
>   that, from observational data, requires emulating a target trial and ruling
>   out confounding (Hernán et al., 2025).
>
> A factor that merely *accompanies* an outcome is *predictive of* it; calling
> that same factor a *cause of* the outcome is a stronger claim that
> observational association alone does not establish (Shmueli, 2010; Hernán et
> al., 2025).

### Causal

A causal question asks whether changing X would change Y — the effect of a
well-defined intervention or exposure on an outcome (Kamper, 2020). The
randomized experiment is the reference standard because randomization severs the
link between treatment and confounders (Ito et al., 2025). When randomization is
infeasible, Hernán et al. (2025) argue that credible causal inference from
observational data should emulate a *target trial* with explicit assumptions,
and that without this discipline association is routinely misinterpreted as
causation. Two observational designs are relevant here:

- **Interrupted time series (ITS).** Lopez Bernal et al. (2017) define ITS as "a
  valuable study design for evaluating the effectiveness of population-level
  health interventions that have been implemented at a clearly defined point in
  time" (p. 348). The design compares the post-intervention trend against "the
  hypothetical scenario under which the intervention had not taken place and the
  trend continues unchanged … referred to as the 'counterfactual'" (Lopez Bernal
  et al., 2017, p. 349). It requires "a clear differentiation of the
  pre-intervention period and the post-intervention period" (Lopez Bernal et al.,
  2017, p. 349), which is why a discrete, well-dated intervention is essential.
- **Causal mediation analysis.** To interpret a mediated effect causally, the
  sequential-ignorability assumption must hold. Imai et al. (2010) prove that
  "under a particular version of sequential ignorability assumption, the average
  causal mediation effect (ACME) is nonparametrically identified" (p. 51), while
  cautioning that "the proposed assumption may be too strong for the typical
  situations in which causal mediation analysis is employed" and "cannot be
  directly tested even in randomized experiments" (Imai et al., 2010, pp. 52–53).
  Applied mediation studies are further criticized for asserting mechanism
  without establishing it (Gelfand et al., 2009).

---

## Part 3 — Argument for classifying each question

Each classification is derived by applying the cited definitions from Part 2 to
what the question asks and what its data can support. Every factual and
methodological claim is tied to a peer-reviewed source.

### Governing principles

1. Association is not causation, and prediction is not explanation: a variable
   that travels with an outcome is *predictive of* it, whereas establishing that
   it is a *cause of* it is a separate, stronger claim (Shmueli, 2010).
2. Credible causal inference from observational data requires emulating a target
   trial with explicit assumptions; absent that discipline, association is
   routinely misread as causation (Hernán et al., 2025).

All five questions draw on NAEP, a repeated cross-sectional assessment in which
different students are sampled each cycle. Under the cited framework, this design
supports description and comparison, supports prediction, and supports causal
claims only under added quasi-experimental structure and untestable assumptions
(Hernán et al., 2025; Lopez Bernal et al., 2017).

### Question 1 — Math vs. reading recovery divergence

**What it asks.** Whether math and reading trajectories split after 2022, and
what changed differently for reading (candidate factors: ESSER spending, state
reading laws).

**Analysis.** Documenting the split is comparative. The second step correlates
non-randomized, self-selected state policies with score changes, so any
association is confounded with other state differences and cannot be read as
explanation (Shmueli, 2010). A comparative ITS can support a causal reading when
an intervention occurs at a defined time point against a parallel control series
(Lopez Bernal et al., 2017), but the COVID shock hit all states at once and the
policy contrasts are non-randomized groupings. The identified factors therefore
*accompany* and forecast the divergence rather than being shown to cause it
(Shmueli, 2010; Hernán et al., 2025).

**Verdict: Comparative → Predictive** (current "Comparative → Causal" overreaches
on its second half).

### Question 2 — Hispanic decline and English-learner mediation

**What it asks.** Whether English-learner status is the pathway through which
Hispanic identity connects to the post-2022 decline.

**Analysis.** A causal interpretation of a mediated effect requires sequential
ignorability — no unmeasured confounding across the treatment–outcome,
treatment–mediator, and mediator–outcome relationships (Imai et al., 2010). In
NAEP's observational cross-section, plausible confounders are unmeasured and
neither ethnicity nor EL status is manipulable, so that assumption is untestable
here, and mediation work is specifically criticized for asserting mechanism
without it (Gelfand et al., 2009). What the data support is a comparison of
differential decline across race × EL subgroups.

**Verdict: Comparative (mediational framing)** — the standalone "Causal
(mediation)" label claims more than observational NAEP data can identify (Imai
et al., 2010; Gelfand et al., 2009).

### Question 3 — Digital assessment mode effects

**What it asks.** Whether NAEP's 2017 paper-to-tablet switch caused a score shift
that contaminates pre/post-COVID comparisons.

**Analysis.** This is the strongest causal case because the treatment is a
discrete change at a clearly defined point in time — the condition under which
ITS functions as a quasi-experimental causal design (Lopez Bernal et al., 2017).
Comparing 2015 → 2017 → 2019 and testing whether lower-device-access students
dropped more approximates a causal contrast. The limitation, from the same
source, is history bias: other 2017 changes could produce the same signal (Lopez
Bernal et al., 2017).

**Verdict: Causal (measurement) — retained, sharpened.** Defensible as a
quasi-experimental ITS question about measurement validity, provided the
history-bias caveat is stated (Lopez Bernal et al., 2017).

### Question 4 — Charter penetration and NAEP scores

**What it asks.** Whether state charter-enrollment share helps forecast state
NAEP scores after adjusting for demographics.

**Analysis.** Cross-state regression of scores on charter share is an
associational/predictive exercise: it quantifies forecasting value, not whether
charters cause scores (Shmueli, 2010). The question already disclaims causation
and flags an instrumental-variable step as the additional design a causal claim
would require, consistent with the demand that observational causal inference
carry explicit identifying assumptions (Hernán et al., 2025).

**Verdict: Comparative → Predictive — retained** (already honest under Shmueli,
2010).

### Question 5 — IEP gap and state achievement

**What it asks.** Whether the IEP/non-IEP achievement gap differs across states
at different overall achievement levels.

**Analysis.** This compares a gap across preexisting state groups, with no
manipulated treatment and no forecasting target — a question of comparison
(Newton et al., 2004). It documents whether the gap varies, not why.

**Verdict: Comparative — retained** (Newton et al., 2004).

---

## Summary of recommendations

| # | Current label | Recommended label | Governing source |
|---|---------------|-------------------|------------------|
| 1 | Comparative → Causal | **Comparative → Predictive** | Shmueli (2010); Hernán et al. (2025) |
| 2 | Causal (mediation) | **Comparative (mediational framing)** | Imai et al. (2010); Gelfand et al. (2009) |
| 3 | Causal (instrumentation) | **Causal (measurement)** — sharpened | Lopez Bernal et al. (2017) |
| 4 | Comparative → Predictive | **Comparative → Predictive** — retained | Shmueli (2010) |
| 5 | Comparative | **Comparative** — retained | Newton et al. (2004) |

For Questions 1 and 2, the identified factors accompany and forecast the
outcomes but are not shown to cause them; under the cited framework these are
predictive and comparative claims rather than causal ones (Shmueli, 2010; Hernán
et al., 2025). Only Question 3, which studies a discrete intervention at a fixed
time point, sustains a causal label, and only as a quasi-experimental ITS with an
acknowledged history-bias caveat (Lopez Bernal et al., 2017).

---

## References

Gelfand, L. A., Mensinger, J. L., & TenHave, T. (2009). Mediation analysis: A retrospective snapshot of practice and more recent directions. *The Journal of General Psychology, 136*(2), 153–178. https://doi.org/10.3200/GENP.136.2.153-178

Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. https://doi.org/10.7326/ANNALS-24-01871

Imai, K., Keele, L., & Yamamoto, T. (2010). Identification, inference and sensitivity analysis for causal mediation effects. *Statistical Science, 25*(1), 51–71. https://doi.org/10.1214/10-STS321

Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. https://doi.org/10.1212/WNL.0000000000210171

Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. https://doi.org/10.2519/jospt.2020.0703

Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. https://doi.org/10.1093/ije/dyw098

Newton, J. T., Bower, E. J., & Williams, A. C. (2004). Research in primary dental care. Part 2: Developing a research question. *British Dental Journal, 196*(10), 605–608. https://doi.org/10.1038/sj.bdj.4811285

Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310. https://doi.org/10.1214/10-STS330

---

## Source verification note

Every source cited is a peer-reviewed journal article. Two verification passes
were performed:

1. **Bibliographic verification (Crossref, August 1, 2026).** All eight
   references were checked field-by-field against Crossref, the authoritative DOI
   registry. Authors, titles, journal, year, volume, issue, pages/article
   number, and DOI are confirmed against publisher-deposited metadata. Two
   locators were corrected during this pass: Hernán et al. (2025) is pages
   402–407 (not 402–411), and Ito et al. (2025) is issue 4 (not issue 5).

2. **Direct-quotation verification (full text).** The three load-bearing sources
   were retrieved in full text and quoted verbatim with page anchors: Shmueli
   (2010, *Statistical Science*, open access via Project Euclid), Imai et al.
   (2010, *Statistical Science*, open access via Project Euclid), and Lopez
   Bernal et al. (2017, *International Journal of Epidemiology*, open access via
   PMC under CC BY 4.0). Page numbers for quotations correspond to the published
   article ranges. The remaining sources (Gelfand et al., 2009; Hernán et al.,
   2025; Ito et al., 2025; Kamper, 2020; Newton et al., 2004) are cited by
   paraphrase from their abstracts and verified metadata; their full texts sit
   behind paywalls and were not quoted directly. No inferred or unverified
   locators remain.
