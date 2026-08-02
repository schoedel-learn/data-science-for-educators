---
type: glossary
title: "Glossary"
description: "Every technical term introduced in the five research questions, defined in plain language."
tags: [glossary, reference, data-science]
timestamp: "2026-07-10T19:00:00Z"
---

Every technical term introduced across the question pages, worked examples, and methods explainers, defined in plain language. Terms appear in the order you encounter them.

## Concepts by Question

### Question 1 Terms

**<a id="g-interrupted-time-series">interrupted time series</a>**

A research design that compares the trend in an outcome *before* and *after* a specific event or interruption (like a policy change, or COVID). You look for a change in the level (a sudden jump or drop) or a change in the slope (the trend starts moving in a new direction) at the interruption point.

**<a id="g-covariate">covariate</a>**

A background variable you measure and include in your analysis so it does not distort your main finding. For example, if you are studying whether a tutoring program raised scores, you would include prior-year scores as a covariate so the program is not credited for differences that existed before it started. Sometimes called a *control variable*.

**<a id="g-esser">ESSER (Elementary and Secondary School Emergency Relief)</a>**

A federal funding program that distributed roughly $190 billion to U.S. schools in three waves between 2020 and 2024 to address pandemic-related needs. ESSER funds could be spent on tutoring, technology, facilities, summer programs, and mental health services.

### Question 2 Terms

**<a id="g-mediation">mediation analysis</a>**

A statistical method that tests whether a third variable (the *mediator*) explains the relationship between a predictor and an outcome. In Question 2, the predictor is Hispanic identity, the outcome is the score decline, and the proposed mediator is English-learner status. The classic framework comes from Baron and Kenny (1986); modern approaches use bootstrapping (Preacher & Hayes, 2004).

**<a id="g-proxy">proxy variable</a>**

A variable that stands in for something you cannot measure directly. Free or reduced-price lunch eligibility is a common *proxy* for family income in education research because NAEP does not ask students their parents' salary. Proxies are imperfect — some families that qualify do not apply — but they are often the best available option.

**<a id="g-confound">confound</a>**

A variable that is correlated with *both* the predictor and the outcome, creating a false impression that the predictor caused the outcome. In Question 2, poverty is a potential confound: Hispanic students are more likely to be low-income, and low-income students tend to score lower.

**<a id="g-bootstrap">bootstrapping</a>**

A computational method that repeatedly resamples your data (taking random samples *with replacement* from your original dataset thousands of times) to estimate how much a statistic — like a mediation effect — would vary if you collected new data.

### Question 3 Terms

**<a id="g-mode-effect">mode effect</a>**

A change in test scores caused by the format of the test rather than by what students know. When NAEP switched from paper to digital in 2017, a mode effect would mean that some portion of the score change was due to the new delivery method rather than a real change in achievement.

**<a id="g-internal-validity">internal validity</a>**

The degree to which a study's design supports the conclusion that the predictor *caused* the outcome, rather than some other factor. A mode effect threatens internal validity because the measurement tool changed at the same time you are trying to measure real change.

**<a id="g-sensitivity">sensitivity analysis</a>**

A check on your main finding: you rerun the analysis under different plausible assumptions to see whether the conclusion holds up. In Question 3, recalculating the COVID-era score decline after subtracting the estimated mode effect is a sensitivity analysis.

**<a id="g-differential">differential effect</a>**

An effect that is larger for some groups than for others. If the mode effect was larger for students without home computers than for students with them, it is a differential mode effect — the measurement problem systematically disadvantages certain groups.

### Question 4 Terms

**<a id="g-ols">OLS regression (ordinary least squares)</a>**

The most common form of regression. It fits a straight line through your data points by minimizing the sum of the squared vertical distances from each point to the line. The output is an equation: *outcome = intercept + (coefficient₁ × predictor₁) + …*.

**<a id="g-instrument">instrumental variable (IV)</a>**

A variable that affects the predictor but has no direct effect on the outcome, used to estimate causal effects when random assignment is not possible. In Question 4, the year a state passed its charter law is a candidate instrument: it affects how many charter schools exist today, but the passage year is not caused by current student demographics.

**<a id="g-did">difference-in-differences</a>**

A design that compares the change over time in a treated group to the change over time in an untreated group. In Question 4, when a state lifts its charter school cap, you compare the before-and-after score change in that state to the before-and-after change in states that did *not* lift their caps.

### Question 5 Terms

**<a id="g-iep">IEP (Individualized Education Program)</a>**

A legal document under U.S. federal law (IDEA) that describes the specialized instruction and services a student with a qualifying disability will receive. NAEP reports scores separately for students with IEPs, making the IEP gap a widely used metric in education equity research.

**<a id="g-interaction">interaction term</a>**

A variable created by multiplying two predictors together, included in a regression to test whether the effect of one predictor depends on the level of another. In Question 5, *state mean × year* tests whether the equity–excellence tradeoff changed over time.

**<a id="g-coefficient">coefficient</a>**

The number in a regression output that tells you how much the outcome changes when a predictor increases by one unit, holding all other predictors constant. In Question 5, the coefficient on state overall score tells you: for each additional point in a state's average NAEP score, how many points wider is its IEP gap?

### Cross-Cutting Data Science Terms

**<a id="g-descriptive">descriptive question</a>**

A question focused on what is happening in the data — the level, pattern, or distribution of something — rather than why it happened or what would happen under an intervention.

**<a id="g-predictive">predictive question</a>**

A question focused on whether known information helps forecast an outcome. Predictive questions rely on useful associations, so a predictor does not have to be a proven cause.

**<a id="g-causal-inference">causal inference</a>**

The part of data science that asks whether changing one thing would change another. It is stronger than prediction because it tries to estimate the effect of an intervention rather than only describe or forecast a pattern.

**<a id="g-comparison">comparison</a>**

An approach in which groups, times, or places are contrasted. Comparison is a way of doing analysis, not automatically a separate research aim.

**<a id="g-association">association</a>**

A relationship in which two variables tend to move together. Association can support description or prediction, but by itself it does not prove that one variable causes the other.

**<a id="g-observational">observational data</a>**

Data collected without randomly assigning people, schools, or places to different conditions. Observational data are often useful for description and prediction but make causal claims harder because other differences may be mixed in.

**<a id="g-counterfactual">counterfactual</a>**

The unobserved “what would have happened instead” outcome under a different treatment, policy, or exposure. Causal inference tries to estimate this missing comparison.

**<a id="g-target-trial">target trial framework</a>**

A way of stating the ideal randomized study you wish you could run, then asking how closely an observational dataset can imitate it. The framework helps clarify what the treatment, comparison group, timing, and assumptions would need to be for a causal claim.

**<a id="g-predictor">predictor</a>**

An input variable used to help describe or forecast an outcome in a model. In the charter example, charter enrollment share is the main predictor.

**<a id="g-outcome">outcome variable</a>**

The result a model is trying to describe, predict, or explain. In Question 4, the NAEP mathematics and reading means are the outcomes.

**<a id="g-adjustment">adjustment</a>**

The act of adding background variables to a model so the main relationship is less distorted by measured differences between cases. Adjustment strengthens a comparison, but it does not guarantee a causal result.

**<a id="g-scatterplot">scatterplot</a>**

A graph that places one variable on the x-axis and another on the y-axis so each case appears as a point. It is useful for seeing direction, clustering, outliers, and whether a linear pattern might exist.

**<a id="g-correlation-coefficient">correlation coefficient</a>**

A number, often written as *r*, that summarizes the direction and strength of a linear relationship between two variables. Values near 1 or -1 indicate a stronger linear pattern; values near 0 indicate a weak one.

**<a id="g-slope">slope</a>**

In a straight-line model, the amount the outcome is expected to change when the predictor increases by one unit. A negative slope means the outcome tends to go down as the predictor goes up.

**<a id="g-best-fit-line">best-fit line</a>**

The straight line drawn through a scatterplot to summarize the overall linear trend in the data. In ordinary least squares regression, it is chosen to minimize the squared distances between the points and the line.

**<a id="g-dataframe">DataFrame</a>**

A table-like data structure used in `pandas`, where rows represent cases and columns represent variables. It is a common working format for cleaning, merging, and analyzing data in Python.

**<a id="g-merge">merge</a>**

A table operation that joins rows from two datasets using a shared key, such as a state name or ID number. Merging is how separate data sources are combined into one analytic file.

### General Terms

**<a id="g-crosstab">crosstab (cross-tabulation)</a>**

A table that displays the relationship between two or more categorical variables. In Question 2, a crosstab of *SDRACE × LEP* shows the average score for each combination of race/ethnicity and English-learner status.

**<a id="g-naep">NAEP (National Assessment of Educational Progress)</a>**

Often called "The Nation's Report Card," NAEP is the largest nationally representative assessment of what U.S. students know in mathematics, reading, science, and other subjects, administered since 1969. Scores are reported on a 0–500 scale. The data is publicly available through the NAEP Data Service API at `nationsreportcard.gov`.

**<a id="g-nces">NCES (National Center for Education Statistics)</a>**

The federal entity within the U.S. Department of Education that collects and analyzes education data, including NAEP. NCES publishes the Common Core of Data (CCD), the Digest of Education Statistics, and many other datasets.

---

*References:* Baron, R. M., & Kenny, D. A. (1986). The moderator–mediator variable distinction. *Journal of Personality and Social Psychology, 51*(6), 1173–1182. | Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. | Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. | Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. | Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. | Preacher, K. J., & Hayes, A. F. (2004). SPSS and SAS procedures for estimating indirect effects. *Behavior Research Methods, Instruments, & Computers, 36*(4), 717–731. | Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310.
