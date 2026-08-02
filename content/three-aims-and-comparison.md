---
okf_version: "0.1"
type: page
title: "The Three Aims of Data Analysis and the Cross-Cutting Role of Comparison"
description: "A public explainer of the three-aim framework used on this site: descriptive, predictive, and causal, with comparison treated as a cross-cutting analytic approach rather than a fourth aim."
tags: [research-methods, descriptive, predictive, causal, comparative, stem-5328]
timestamp: "2026-08-02T00:00:00Z"
---

This page explains the framework used throughout this website for classifying quantitative research questions. The argument comes from the STEM-5328 course materials in the Obsidian vault, but it is presented here as a public-facing reference for educators who want a clearer explanation of why the site uses **three aims** — descriptive, predictive, and causal — and treats **comparison** as a cross-cutting analytic approach rather than a fourth aim.

If you want the shorter practical version first, start with [How the Questions Are Classified](/classification/). This page goes one level deeper and explains the argument behind that shorter page.

## Why this framework matters

When people first learn data analysis, it is easy to mix up a method with an aim. A scatterplot, a regression, or a group comparison tells you **how** an analysis is done, but it does not by itself tell you **what kind of claim** the analysis can support. This site uses the three-aim framework because it helps educators separate those two questions:

- What is the goal of the analysis?
- What technique is being used to pursue that goal?

That distinction matters because the same technique can support different kinds of claims depending on the surrounding design and assumptions.

## The three aims

Methodologists commonly sort quantitative questions into three families: **description**, **prediction**, and **causal inference** (Ito et al., 2025; Kamper, 2020; Shmueli, 2010). The course argument preserved here adopts that three-aim scheme.

### Descriptive

A **descriptive** question asks what is happening — the frequency, level, or distribution of a characteristic in a population (Ito et al., 2025; Newton et al., 2004). Descriptive work answers questions such as who is affected, where a pattern appears, when it appears, and how large it is.

### Predictive

A **predictive** question asks whether known inputs help forecast an outcome. The model uses association between predictors and outcomes rather than requiring a proven causal relationship, so a useful predictor does not have to be a cause (Shmueli, 2010).

### Causal

A **causal** question asks whether changing something would change the outcome (Kamper, 2020). Because association alone does not establish that relationship, causal inference from observational data has to be built deliberately, ideally by approximating the experiment one would have run and stating its assumptions clearly (Hernán et al., 2025).

## Why comparison is cross-cutting, not a fourth type

Some teaching schemes list **comparison** as its own question type. The argument in the course note is that comparison is better understood as an **operation** than as an **aim**.

Comparison tells you that two groups, times, or places are being contrasted. It does not, by itself, tell you whether the goal is to describe a difference, use that difference to predict an outcome, or estimate a causal effect. In other words, comparison describes the *form* of the analysis, while description, prediction, and causal inference describe the *goal* of the analysis.

## How the same comparison can serve different aims

The same comparison can be used in three different ways.

### Comparison used descriptively

Used **descriptively**, a comparison documents that two groups differ. It records that a difference exists without claiming to explain why it exists.

### Comparison used predictively

Used **predictively**, the variable that defines the groups becomes an input that helps forecast the outcome. The grouping may be informative even if it is not causal.

### Comparison used causally

Used **causally**, comparison becomes part of a design that tries to estimate what would have happened under a different intervention or exposure. For example, an interrupted time series compares outcomes before and after a clearly defined event while reasoning about the counterfactual trend that would have been expected otherwise (Lopez Bernal et al., 2017).

Across all three cases, the comparison may look similar on the surface, but the aim and the assumptions are different.

## What this means for this website

This site classifies questions by **aim**, not by surface technique.

- A question is **descriptive** when it asks what pattern exists.
- A question is **predictive** when it asks whether one factor helps forecast another.
- A question is **causal** when it asks whether changing one thing would change another.
- A label like **Predictive (comparative)** means that the primary aim is predictive, and comparison is one of the analytic moves being used to pursue it.

That is why the site does not treat comparison as a fourth top-level family alongside descriptive, predictive, and causal.

## How this applies to the Question 4 work

The current Question 4 analysis compares states with different levels of charter-school enrollment share and asks whether charter share helps describe or forecast state NAEP score patterns. That makes it **predictive (comparative)** rather than causal. The comparison across states is real, but the goal is still prediction/association unless a stronger causal design is added.

For that reason, the site presents the Question 4 materials as a three-step sequence:

1. [Question 4](/questions/question-4/) — the research-question framing page.
2. [Worked Example — Question 4: Charter Share and NAEP Scores](/questions/question-4-exploration/) — the exploratory evidence.
3. [Question 4 Controlled Analysis Plan](/questions/question-4-controlled-analysis/) — the stronger next-step design.

## Conclusion

Because these categories are defined by the aim of the analysis rather than by its technique (Ito et al., 2025; Kamper, 2020; Shmueli, 2010), and because comparison takes its meaning from whichever aim it serves, comparison is most accurately treated as an approach that can attach to any of the three aims — descriptive, predictive, or causal — rather than as a category of its own.

## References

Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. https://doi.org/10.7326/ANNALS-24-01871

Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. https://doi.org/10.1212/WNL.0000000000210171

Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. https://doi.org/10.2519/jospt.2020.0703

Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. https://doi.org/10.1093/ije/dyw098

Newton, J. T., Bower, E. J., & Williams, A. C. (2004). Research in primary dental care. Part 2: Developing a research question. *British Dental Journal, 196*(10), 605–608. https://doi.org/10.1038/sj.bdj.4811285

Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310. https://doi.org/10.1214/10-STS330
