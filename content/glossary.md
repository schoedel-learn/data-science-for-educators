---
type: glossary
title: "Glossary"
description: "A–Z plain-language definitions of the data-science terms used in this project."
tags: [glossary, reference, data-science]
timestamp: "2026-08-18T19:00:00Z"
---

Plain-language definitions of the data-science terms used in this project, listed A–Z.

## A

**<a id="g-adjustment">adjustment</a>**

Adding background variables to a model so the main relationship is less distorted by measured differences between cases. Adjustment strengthens a comparison, but it does not guarantee a causal result.

**<a id="g-aggregate">aggregate</a>**

Data summarized at a group level — for example, a state's average score rather than individual student scores.

**<a id="g-association">association</a>**

A relationship in which two variables tend to move together. Association can support description or prediction, but by itself it does not prove that one variable causes the other.

## B

**<a id="g-baseline">baseline</a>**

The measurement taken before an event or intervention, used as the reference for comparison. In this project, 2015–2019 is the baseline period.

**<a id="g-benchmark">benchmark</a>**

A reference score or standard against which performance is judged (for example, NAEP's achievement levels).

**<a id="g-best-fit-line">best-fit line</a>**

The straight line drawn through a scatterplot to summarize the overall linear trend. In ordinary least squares regression, it is chosen to minimize the squared distances between the points and the line.

**<a id="g-bias">bias</a>**

A systematic error that pushes an estimate off in one direction, rather than random error. Sampling bias, selection bias, and measurement bias all mean the estimate is consistently off-target.

**<a id="g-bootstrap">bootstrapping</a>**

A computational method that repeatedly resamples your data (random samples drawn *with replacement*, thousands of times) to estimate how much a statistic — like a mean or a regression coefficient — would vary across new samples.

## C

**<a id="g-causal-inference">causal inference</a>**

The part of data science that asks whether changing one thing would change another. It is stronger than prediction because it tries to estimate the effect of an intervention rather than only describe or forecast a pattern.

**<a id="g-census">census</a>**

Measuring every member of a population, as opposed to a sample.

**<a id="g-classification">classification</a>**

In machine learning, a model that assigns each case to a category (for example, "at risk / not at risk").

**<a id="g-clustering">clustering</a>**

A machine-learning method that groups similar items together without being told the categories in advance.

**<a id="g-coefficient">coefficient</a>**

The number in a regression output that tells you how much the outcome changes when a predictor increases by one unit, holding all other predictors constant.

**<a id="g-cohort">cohort</a>**

A group of individuals who share a defining characteristic or time period (for example, "the cohort of 8th graders tested in 2022").

**<a id="g-comparison">comparison</a>**

An approach in which groups, times, or places are contrasted. Comparison is a way of doing analysis, not automatically a separate research aim. (This project is built on comparison: pre-COVID vs. post-COVID, national vs. Texas.)

**<a id="g-confidence-interval">confidence interval</a>**

A range computed from the data that would capture the true value in a fixed percentage of repeated samples (for example, 95%).

**<a id="g-confound">confound</a>**

A variable that is correlated with both the predictor and the outcome, creating a false impression that the predictor caused the outcome. (Poverty is a classic confound when comparing scores across groups.)

**<a id="g-control">control</a>**

A *control group* is the comparison group that does not receive the treatment, and a *control variable* is a variable held constant in a model.

**<a id="g-correlation">correlation</a>**

A measure of how two variables move together. Correlation does not imply causation.

**<a id="g-correlation-coefficient">correlation coefficient</a>**

A number, often written as *r*, that summarizes the direction and strength of a linear relationship between two variables. Values near 1 or −1 indicate a stronger linear pattern; values near 0 indicate a weak one.

**<a id="g-counterfactual">counterfactual</a>**

The unobserved "what would have happened instead" outcome under a different treatment, policy, or exposure. Causal inference tries to estimate this missing comparison.

**<a id="g-covariate">covariate</a>**

A background variable you measure and include in your analysis so it does not distort your main finding. Sometimes called a *control variable*.

**<a id="g-crosstab">crosstab (cross-tabulation)</a>**

A table that displays the relationship between two or more categorical variables. For example, a crosstab of race/ethnicity × English-learner status shows the average score for each combination.

## D

**<a id="g-data">data</a>**

Recorded observations or measurements. In statistics, "data" is technically plural, and a single observation is a *datum*.

**<a id="g-dataframe">DataFrame</a>**

A table-like data structure used in `pandas`, where rows represent cases and columns represent variables. It is a common working format for cleaning, merging, and analyzing data in Python.

**<a id="g-descriptive">descriptive question</a>**

A question focused on what is happening in the data — the level, pattern, or distribution of something — rather than why it happened or what would happen under an intervention. (This project asks a descriptive question.)

**<a id="g-did">difference-in-differences</a>**

A design that compares the change over time in a treated group to the change over time in an untreated group. For example, when a state changes a policy, you compare the before-and-after change there to the change in states that did not change the policy.

**<a id="g-differential">differential effect</a>**

An effect that is larger for some groups than for others. If a measurement problem affects one group more than another, it is a differential effect.

**<a id="g-distribution">distribution</a>**

How the values of a variable are spread across their range (for example, a bell-shaped or skewed distribution).

## E

**<a id="g-effect-size">effect size</a>**

A standardized measure of how large an effect is (for example, a drop of 0.3 standard deviations), used to compare effects across studies.

**<a id="g-error">error</a>**

The uncertainty or variability in a measurement or estimate (sampling error, standard error, margin of error).

**<a id="g-esser">ESSER (Elementary and Secondary School Emergency Relief)</a>**

A federal funding program that distributed roughly $190 billion to U.S. schools in three waves between 2020 and 2024 to address pandemic-related needs.

## F

**<a id="g-feature">feature</a>**

In machine learning, an input variable (a column of data) fed into a model.

**<a id="g-fit">fit</a>**

How closely a model matches the observed data ("goodness of fit").

## H

**<a id="g-hallucination">hallucination</a>**

When an AI confidently generates plausible-sounding but false information.

## I

**<a id="g-iep">IEP (Individualized Education Program)</a>**

A legal document under U.S. federal law (IDEA) that describes the specialized instruction and services a student with a qualifying disability will receive. NAEP reports scores separately for students with IEPs.

**<a id="g-inference">inference</a>**

Two technical meanings: *statistical inference* is drawing conclusions about a population from a sample; in machine learning, *inference* is running a trained model to produce predictions on new data.

**<a id="g-instrument">instrumental variable (IV)</a>**

A variable that affects the predictor but has no direct effect on the outcome, used to estimate causal effects when random assignment is not possible.

**<a id="g-intercept">intercept</a>**

The predicted value of the outcome when all predictors equal zero — the point where the regression line crosses the y-axis.

**<a id="g-interaction">interaction term</a>**

A variable created by multiplying two predictors together, included in a regression to test whether the effect of one predictor depends on the level of another. For example, *income × year* tests whether the achievement gap between income groups changed over time.

**<a id="g-internal-validity">internal validity</a>**

The degree to which a study's design supports the conclusion that the predictor caused the outcome, rather than some other factor.

**<a id="g-interrupted-time-series">interrupted time series</a>**

A research design that compares the trend in an outcome before and after a specific event or interruption (like a policy change, or COVID), looking for a change in the level or the slope at the interruption point.

## L

**<a id="g-label">label</a>**

In machine learning, the target value or category a model is trained to predict.

**<a id="g-longitudinal">longitudinal</a>**

Following the same units over time, with repeated measurements.

## M

**<a id="g-mean">mean</a>**

The arithmetic average: the sum of all values divided by the count.

**<a id="g-median">median</a>**

The middle value when data are sorted — the 50th percentile.

**<a id="g-mediation">mediation analysis</a>**

A statistical method that tests whether a third variable (the mediator) explains the relationship between a predictor and an outcome.

**<a id="g-merge">merge</a>**

A table operation that joins rows from two datasets using a shared key, such as a state name or ID number.

**<a id="g-mode">mode</a>**

The most frequently occurring value in a dataset.

**<a id="g-mode-effect">mode effect</a>**

A change in test scores caused by the format of the test rather than by what students know. (When NAEP switched from paper to digital in 2017, part of any score change could be a mode effect.)

**<a id="g-model">model</a>**

A mathematical or statistical summary of the relationships in data, used to describe or predict.

## N

**<a id="g-naep">NAEP (National Assessment of Educational Progress)</a>**

Often called "The Nation's Report Card," the largest nationally representative assessment of what U.S. students know, administered since 1969 and scored on a 0–500 scale. Its data is public through the NAEP Data Service API at nationsreportcard.gov.

**<a id="g-nces">NCES (National Center for Education Statistics)</a>**

The federal entity within the U.S. Department of Education that collects and analyzes education data, including NAEP.

**<a id="g-noise">noise</a>**

Random variation in data that obscures the underlying pattern.

**<a id="g-normal-distribution">normal distribution</a>**

A bell-shaped, symmetric distribution that many statistics assume.

## O

**<a id="g-observational">observational data</a>**

Data collected without randomly assigning people, schools, or places to different conditions. Useful for description and prediction, but causal claims are harder because other differences may be mixed in.

**<a id="g-ols">OLS regression (ordinary least squares)</a>**

The most common form of regression. It fits a straight line through the data by minimizing the sum of the squared vertical distances from each point to the line.

**<a id="g-outcome">outcome variable</a>**

The result a model is trying to describe, predict, or explain. (In this project, the NAEP mathematics and reading means are the outcomes.)

**<a id="g-outlier">outlier</a>**

A data point that falls far from the rest.

## P

**<a id="g-parameter">parameter</a>**

A number that describes a population (for example, the true mean score of all U.S. 8th graders).

**<a id="g-population">population</a>**

The entire group you want to draw conclusions about (for example, all U.S. 8th graders).

**<a id="g-power">power</a>**

Statistical power is the probability that a study will detect a real effect if one exists.

**<a id="g-prediction">prediction</a>**

A model-based forecast that uses known information to estimate an unknown outcome.

**<a id="g-predictive">predictive question</a>**

A question focused on whether known information helps forecast an outcome. Predictive questions rely on useful associations, so a predictor does not have to be a proven cause.

**<a id="g-predictor">predictor</a>**

An input variable used to help describe or forecast an outcome in a model. (For example, a student's prior-year score is a common predictor of their current score.)

**<a id="g-prompt">prompt</a>**

The text instruction given to an AI model to produce a response.

**<a id="g-proxy">proxy variable</a>**

A variable that stands in for something you cannot measure directly. (Free or reduced-price lunch eligibility is a common proxy for family income.)

## R

**<a id="g-random">random</a>**

Each unit equally likely to be selected, with no systematic pattern.

**<a id="g-range">range</a>**

The difference between the largest and smallest values (a measure of spread).

**<a id="g-regression">regression</a>**

A family of methods for modeling the relationship between variables. Related: *regression to the mean*, the tendency for extreme values to move toward the average on re-measurement.

**<a id="g-reliability">reliability</a>**

Consistency of measurement: would the same instrument give a similar result again?

**<a id="g-residual">residual</a>**

The difference between an observed value and the value a model predicts.

## S

**<a id="g-sample">sample</a>**

A subset of a population, drawn so you can estimate something about the whole.

**<a id="g-scale">scale</a>**

The measurement scale or range of an instrument (NAEP's 0–500 scale).

**<a id="g-scatterplot">scatterplot</a>**

A graph that places one variable on the x-axis and another on the y-axis so each case appears as a point. Useful for seeing direction, clustering, outliers, and whether a linear pattern might exist.

**<a id="g-sensitivity">sensitivity analysis</a>**

A check on your main finding: you rerun the analysis under different plausible assumptions to see whether the conclusion holds up. (For example, recalculating the COVID-era score decline after subtracting the estimated mode effect.)

**<a id="g-significant">significant</a>**

"Statistically significant" means a result is unlikely to be due to chance alone (usually a p-value below 0.05). A result can be statistically significant but too small to matter, or large but not statistically significant.

**<a id="g-signal">signal</a>**

The real, meaningful pattern in the data, as opposed to the noise that surrounds it.

**<a id="g-skew">skew</a>**

Asymmetry in a distribution: the values pile up on one side with a tail on the other.

**<a id="g-slope">slope</a>**

In a straight-line model, the amount the outcome is expected to change when the predictor increases by one unit. A negative slope means the outcome tends to go down as the predictor goes up.

**<a id="g-standard-deviation">standard deviation</a>**

A measure of spread: roughly the typical distance of values from the mean.

**<a id="g-statistic">statistic</a>**

A number computed from a sample (for example, a sample mean), used to estimate a population parameter.

**<a id="g-survey">survey</a>**

A structured method of collecting data from a sample, usually via a questionnaire.

## T

**<a id="g-target-trial">target trial framework</a>**

A way of stating the ideal randomized study you wish you could run, then asking how closely an observational dataset can imitate it.

**<a id="g-token">token</a>**

A unit of text (roughly a word or part of a word) that a large language model processes.

**<a id="g-training">training</a>**

Fitting a model's parameters to data so it can make predictions (the "learning" in machine learning).

**<a id="g-treatment">treatment</a>**

The intervention or condition being studied (for example, a tutoring program).

## V

**<a id="g-validity">validity</a>**

Whether an instrument measures what it claims to measure.

**<a id="g-variable">variable</a>**

A measured characteristic that can take different values (each column in a dataset is a variable).

**<a id="g-variance">variance</a>**

A measure of spread: the average squared distance of values from the mean.

## W

**<a id="g-weight">weight</a>**

In machine learning, a parameter that scales the influence of a feature on the model's output.

---

*References:* Baron, R. M., & Kenny, D. A. (1986). The moderator–mediator variable distinction. *Journal of Personality and Social Psychology, 51*(6), 1173–1182. | Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. | Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. | Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. | Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. | Preacher, K. J., & Hayes, A. F. (2004). SPSS and SAS procedures for estimating indirect effects. *Behavior Research Methods, Instruments, & Computers, 36*(4), 717–731. | Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310.
