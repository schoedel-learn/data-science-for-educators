---
type: glossary
title: "Glossary"
description: "A–Z plain-language definitions of the data-science terms used in this project."
tags: [glossary, reference, data-science]
timestamp: "2026-08-18T19:00:00Z"
---

Plain-language definitions of the data-science terms used in this project, listed A–Z. A small amber "dual meaning" tag marks words that mean something specific — and often different — in data science compared with everyday use. Watch especially for **significant**, **model**, **bias**, and **sample**.

## A

**<a id="g-adjustment">adjustment</a>**

Adding background variables to a model so the main relationship is less distorted by measured differences between cases. Adjustment strengthens a comparison, but it does not guarantee a causal result.

**<a id="g-aggregate">aggregate</a>** <span class="dualm">dual meaning</span>

Combined into a group-level summary (for example, a state's average score). In data science, "aggregate data" means summaries across many individuals; it does not mean "a pile of gravel."

**<a id="g-association">association</a>**

A relationship in which two variables tend to move together. Association can support description or prediction, but by itself it does not prove that one variable causes the other.

## B

**<a id="g-baseline">baseline</a>** <span class="dualm">dual meaning</span>

The measurement taken before an event or intervention, used as the reference for comparison. In everyday use a "baseline" is just a starting point; in research it is specifically the pre-event value you compare against. (In this project, 2015–2019 is the baseline period.)

**<a id="g-benchmark">benchmark</a>** <span class="dualm">dual meaning</span>

A reference score or standard against which performance is judged. In assessment, a "benchmark" is a defined performance level (for example, NAEP's achievement levels), not merely a general target.

**<a id="g-best-fit-line">best-fit line</a>**

The straight line drawn through a scatterplot to summarize the overall linear trend. In ordinary least squares regression, it is chosen to minimize the squared distances between the points and the line.

**<a id="g-bias">bias</a>** <span class="dualm">dual meaning</span>

A systematic error that pushes an estimate off in one direction, rather than random error. In everyday use "bias" usually means prejudice; in data science it is a broader and more technical idea — sampling bias, selection bias, and measurement bias all mean the estimate is consistently off-target.

**<a id="g-bootstrap">bootstrapping</a>**

A computational method that repeatedly resamples your data (random samples drawn *with replacement*, thousands of times) to estimate how much a statistic — like a mean or a regression coefficient — would vary across new samples.

## C

**<a id="g-causal-inference">causal inference</a>**

The part of data science that asks whether changing one thing would change another. It is stronger than prediction because it tries to estimate the effect of an intervention rather than only describe or forecast a pattern.

**<a id="g-census">census</a>** <span class="dualm">dual meaning</span>

Measuring every member of a population, as opposed to a sample. In everyday use "the Census" usually means the U.S. Census Bureau or the decennial count; in statistics a census is any complete enumeration.

**<a id="g-classification">classification</a>** <span class="dualm">dual meaning</span>

In machine learning, a model that assigns each case to a category (for example, "at risk / not at risk"). In everyday use, classification means sorting things into groups; in ML it specifically means a model doing that sorting automatically.

**<a id="g-clustering">clustering</a>** <span class="dualm">dual meaning</span>

A machine-learning method that groups similar items together without being told the categories in advance. Unlike everyday "clustering" (people gathering), clustering in ML discovers the groups from the data itself.

**<a id="g-coefficient">coefficient</a>**

The number in a regression output that tells you how much the outcome changes when a predictor increases by one unit, holding all other predictors constant.

**<a id="g-cohort">cohort</a>** <span class="dualm">dual meaning</span>

A group of individuals who share a defining characteristic or time period (for example, "the cohort of 8th graders tested in 2022"). The word survives from its historical meaning of a military unit; in research it means a tracked group.

**<a id="g-comparison">comparison</a>**

An approach in which groups, times, or places are contrasted. Comparison is a way of doing analysis, not automatically a separate research aim. (This project is built on comparison: pre-COVID vs. post-COVID, national vs. Texas.)

**<a id="g-confidence-interval">confidence interval</a>** <span class="dualm">dual meaning</span>

A range computed from the data that would capture the true value in a fixed percentage of repeated samples (for example, 95%). In everyday use "confidence" means self-assurance; a confidence interval is a property of the *procedure*, not a statement that you are "95% sure" a particular interval contains the truth.

**<a id="g-confound">confound</a>**

A variable that is correlated with both the predictor and the outcome, creating a false impression that the predictor caused the outcome. (Poverty is a classic confound when comparing scores across groups.)

**<a id="g-control">control</a>** <span class="dualm">dual meaning</span>

In research, a *control group* is the comparison group that does not receive the treatment, and a *control variable* is a variable held constant in a model. In everyday use "control" means to direct or dominate — a different idea entirely.

**<a id="g-correlation">correlation</a>** <span class="dualm">dual meaning</span>

A measure of how two variables move together. In everyday use "correlation" often implies some kind of connection or cause; in statistics it is a specific measure of co-movement, and it does *not* imply causation.

**<a id="g-correlation-coefficient">correlation coefficient</a>**

A number, often written as *r*, that summarizes the direction and strength of a linear relationship between two variables. Values near 1 or −1 indicate a stronger linear pattern; values near 0 indicate a weak one.

**<a id="g-counterfactual">counterfactual</a>**

The unobserved "what would have happened instead" outcome under a different treatment, policy, or exposure. Causal inference tries to estimate this missing comparison.

**<a id="g-covariate">covariate</a>**

A background variable you measure and include in your analysis so it does not distort your main finding. Sometimes called a *control variable*.

**<a id="g-crosstab">crosstab (cross-tabulation)</a>**

A table that displays the relationship between two or more categorical variables. For example, a crosstab of race/ethnicity × English-learner status shows the average score for each combination.

## D

**<a id="g-data">data</a>** <span class="dualm">dual meaning</span>

Recorded observations or measurements. In everyday use "data" is often treated as a singular mass noun ("the data shows"); in statistics it is technically plural ("the data show"), and a single observation is a *datum*.

**<a id="g-dataframe">DataFrame</a>**

A table-like data structure used in `pandas`, where rows represent cases and columns represent variables. It is a common working format for cleaning, merging, and analyzing data in Python.

**<a id="g-descriptive">descriptive question</a>**

A question focused on what is happening in the data — the level, pattern, or distribution of something — rather than why it happened or what would happen under an intervention. (This project asks a descriptive question.)

**<a id="g-did">difference-in-differences</a>**

A design that compares the change over time in a treated group to the change over time in an untreated group. For example, when a state changes a policy, you compare the before-and-after change there to the change in states that did not change the policy.

**<a id="g-differential">differential effect</a>**

An effect that is larger for some groups than for others. If a measurement problem affects one group more than another, it is a differential effect.

**<a id="g-distribution">distribution</a>** <span class="dualm">dual meaning</span>

How the values of a variable are spread across their range (for example, a bell-shaped or skewed distribution). In everyday use "distribution" means handing things out; in statistics it means the pattern of how often each value occurs.

## E

**<a id="g-effect-size">effect size</a>** <span class="dualm">dual meaning</span>

A standardized measure of how large an effect is (for example, a drop of 0.3 standard deviations). In everyday use "effect size" might just mean "how big the effect is"; in statistics it is a specific, standardized number that lets you compare effects across studies.

**<a id="g-error">error</a>** <span class="dualm">dual meaning</span>

The uncertainty or variability in a measurement or estimate (sampling error, standard error, margin of error). In everyday use "error" means a mistake; in data science it usually means unavoidable random variation, not someone's mistake.

**<a id="g-esser">ESSER (Elementary and Secondary School Emergency Relief)</a>**

A federal funding program that distributed roughly $190 billion to U.S. schools in three waves between 2020 and 2024 to address pandemic-related needs.

## F

**<a id="g-feature">feature</a>** <span class="dualm">dual meaning</span>

In machine learning, an input variable (a column of data) fed into a model. In everyday use a "feature" is a characteristic or trait; in ML it is specifically the measurable input a model uses.

**<a id="g-fit">fit</a>** <span class="dualm">dual meaning</span>

How closely a model matches the observed data ("goodness of fit"). In everyday use "fit" means physical fitness or being the right size; in statistics it describes the model's agreement with the data.

## H

**<a id="g-hallucination">hallucination</a>** <span class="dualm">dual meaning</span>

When an AI confidently generates plausible-sounding but false information. In everyday (medical) use "hallucination" means perceiving something that is not there; in AI it is a metaphor for the same kind of confident falsehood in generated text.

## I

**<a id="g-iep">IEP (Individualized Education Program)</a>**

A legal document under U.S. federal law (IDEA) that describes the specialized instruction and services a student with a qualifying disability will receive. NAEP reports scores separately for students with IEPs.

**<a id="g-inference">inference</a>** <span class="dualm">dual meaning</span>

Two technical meanings: (1) *statistical inference* is drawing conclusions about a population from a sample; (2) *inference* in machine learning is running a trained model to produce predictions on new data. Neither means the everyday sense of "reading between the lines."

**<a id="g-instrument">instrumental variable (IV)</a>**

A variable that affects the predictor but has no direct effect on the outcome, used to estimate causal effects when random assignment is not possible.

**<a id="g-intercept">intercept</a>** <span class="dualm">dual meaning</span>

The predicted value of the outcome when all predictors equal zero — the point where the regression line crosses the y-axis. In everyday use "intercept" means to stop or catch; in statistics it is the line's starting value.

**<a id="g-interaction">interaction term</a>**

A variable created by multiplying two predictors together, included in a regression to test whether the effect of one predictor depends on the level of another. For example, *income × year* tests whether the achievement gap between income groups changed over time.

**<a id="g-internal-validity">internal validity</a>**

The degree to which a study's design supports the conclusion that the predictor caused the outcome, rather than some other factor.

**<a id="g-interrupted-time-series">interrupted time series</a>**

A research design that compares the trend in an outcome before and after a specific event or interruption (like a policy change, or COVID), looking for a change in the level or the slope at the interruption point.

## L

**<a id="g-label">label</a>** <span class="dualm">dual meaning</span>

In machine learning, the target value or category a model is trained to predict (the "answer" attached to each example). In everyday use a "label" is a sticker or tag; in ML it is the output variable.

**<a id="g-longitudinal">longitudinal</a>** <span class="dualm">dual meaning</span>

Following the same units over time, with repeated measurements. In everyday use "longitudinal" suggests geographic longitude (east–west); in research it means "over time."

## M

**<a id="g-mean">mean</a>** <span class="dualm">dual meaning</span>

The arithmetic average: the sum of all values divided by the count. In everyday use "mean" means unkind; in statistics it is a measure of central tendency (alongside median and mode).

**<a id="g-median">median</a>** <span class="dualm">dual meaning</span>

The middle value when data are sorted — the 50th percentile. In everyday use a "median" is the strip dividing opposite lanes of a road; in statistics it is the value that splits the data in half.

**<a id="g-mediation">mediation analysis</a>**

A statistical method that tests whether a third variable (the mediator) explains the relationship between a predictor and an outcome.

**<a id="g-merge">merge</a>**

A table operation that joins rows from two datasets using a shared key, such as a state name or ID number.

**<a id="g-mode">mode</a>** <span class="dualm">dual meaning</span>

The most frequently occurring value in a dataset. In everyday use "mode" means a manner or method (a "mode of transport"); in statistics it is a measure of central tendency.

**<a id="g-mode-effect">mode effect</a>**

A change in test scores caused by the format of the test rather than by what students know. (When NAEP switched from paper to digital in 2017, part of any score change could be a mode effect.)

**<a id="g-model">model</a>** <span class="dualm">dual meaning</span>

A mathematical or statistical summary of the relationships in data, used to describe or predict. In everyday use a "model" is a miniature replica or a person; in data science it is an equation or algorithm fitted to data.

## N

**<a id="g-naep">NAEP (National Assessment of Educational Progress)</a>**

Often called "The Nation's Report Card," the largest nationally representative assessment of what U.S. students know, administered since 1969 and scored on a 0–500 scale. Its data is public through the NAEP Data Service API at nationsreportcard.gov.

**<a id="g-nces">NCES (National Center for Education Statistics)</a>**

The federal entity within the U.S. Department of Education that collects and analyzes education data, including NAEP.

**<a id="g-noise">noise</a>** <span class="dualm">dual meaning</span>

Random variation in data that obscures the underlying pattern. In everyday use "noise" means sound; in data science it is the unpredictable part of the data you have to see past.

**<a id="g-normal-distribution">normal distribution</a>** <span class="dualm">dual meaning</span>

A specific bell-shaped, symmetric distribution that many statistics assume. In everyday use "normal" means ordinary or typical; in statistics it names one particular shape, not "the usual case."

## O

**<a id="g-observational">observational data</a>**

Data collected without randomly assigning people, schools, or places to different conditions. Useful for description and prediction, but causal claims are harder because other differences may be mixed in.

**<a id="g-ols">OLS regression (ordinary least squares)</a>**

The most common form of regression. It fits a straight line through the data by minimizing the sum of the squared vertical distances from each point to the line.

**<a id="g-outcome">outcome variable</a>**

The result a model is trying to describe, predict, or explain. (In this project, the NAEP mathematics and reading means are the outcomes.)

**<a id="g-outlier">outlier</a>** <span class="dualm">dual meaning</span>

A data point that falls far from the rest. In everyday use an "outlier" is an unusual person; in statistics it is an extreme value worth checking.

## P

**<a id="g-parameter">parameter</a>** <span class="dualm">dual meaning</span>

A number that describes a population (for example, the true mean score of all U.S. 8th graders). In everyday use a "parameter" is a setting or limit; in statistics it is an unknown population value that a sample statistic estimates.

**<a id="g-population">population</a>** <span class="dualm">dual meaning</span>

The entire group you want to draw conclusions about. In everyday use "population" means all the people in a place; in statistics it is any well-defined group of interest (all U.S. 8th graders, all schools, all test administrations).

**<a id="g-power">power</a>** <span class="dualm">dual meaning</span>

Statistical power is the probability that a study will detect a real effect if one exists. In everyday use "power" means strength or electricity; in statistics it is about a study's ability to find effects.

**<a id="g-prediction">prediction</a>** <span class="dualm">dual meaning</span>

A model-based forecast that uses known information to estimate an unknown outcome. In everyday use a "prediction" is a guess; in data science it is produced by a model, and its quality can be measured.

**<a id="g-predictive">predictive question</a>**

A question focused on whether known information helps forecast an outcome. Predictive questions rely on useful associations, so a predictor does not have to be a proven cause.

**<a id="g-predictor">predictor</a>**

An input variable used to help describe or forecast an outcome in a model. (For example, a student's prior-year score is a common predictor of their current score.)

**<a id="g-prompt">prompt</a>** <span class="dualm">dual meaning</span>

The text instruction given to an AI model to produce a response. In everyday use "prompt" means quick or on-time; in AI it is the input you write.

**<a id="g-proxy">proxy variable</a>**

A variable that stands in for something you cannot measure directly. (Free or reduced-price lunch eligibility is a common proxy for family income.)

## R

**<a id="g-random">random</a>** <span class="dualm">dual meaning</span>

Each unit is equally likely to be selected, with no systematic pattern. In everyday use "random" means arbitrary or unpredictable; in statistics a "random sample" is a specific, carefully-defined method, not "haphazard."

**<a id="g-range">range</a>** <span class="dualm">dual meaning</span>

The difference between the largest and smallest values (a measure of spread). In everyday use "range" can mean a stove or a scope; in statistics it is maximum minus minimum.

**<a id="g-regression">regression</a>** <span class="dualm">dual meaning</span>

A family of methods for modeling the relationship between variables. In everyday use "regression" means reverting to an earlier or worse state; in statistics it is a modeling technique. (Related: "regression to the mean," the tendency for extreme values to move toward the average on re-measurement.)

**<a id="g-reliability">reliability</a>** <span class="dualm">dual meaning</span>

Consistency of measurement: would the same instrument give a similar result again? In everyday use "reliable" means dependable; in measurement it specifically means consistent.

**<a id="g-residual">residual</a>** <span class="dualm">dual meaning</span>

The difference between an observed value and the value a model predicts. In everyday use a "residual" is a leftover; in statistics it is the prediction's leftover error for one data point.

## S

**<a id="g-sample">sample</a>** <span class="dualm">dual meaning</span>

A subset of a population, drawn so you can estimate something about the whole. In everyday use a "sample" is a small taste or example; in statistics it is a carefully drawn subset used for inference.

**<a id="g-scale">scale</a>** <span class="dualm">dual meaning</span>

The measurement scale or range of an instrument (NAEP's 0–500 scale). In everyday use "scale" means size; in measurement it is the numeric system a score is expressed on.

**<a id="g-scatterplot">scatterplot</a>**

A graph that places one variable on the x-axis and another on the y-axis so each case appears as a point. Useful for seeing direction, clustering, outliers, and whether a linear pattern might exist.

**<a id="g-sensitivity">sensitivity analysis</a>**

A check on your main finding: you rerun the analysis under different plausible assumptions to see whether the conclusion holds up. (For example, recalculating the COVID-era score decline after subtracting the estimated mode effect.)

**<a id="g-significant">significant</a>** <span class="dualm">dual meaning</span>

"Statistically significant" means a result is unlikely to be due to chance alone (usually a p-value below 0.05). In everyday use "significant" means important or meaningful; a result can be statistically significant but too small to matter, or large but not statistically significant.

**<a id="g-signal">signal</a>** <span class="dualm">dual meaning</span>

The real, meaningful pattern in the data, as opposed to the noise that surrounds it. In everyday use "signal" means a transmission or a gesture; in data science it is the underlying pattern you are trying to detect.

**<a id="g-skew">skew</a>** <span class="dualm">dual meaning</span>

Asymmetry in a distribution: the values pile up on one side with a tail on the other. In everyday use "skew" means a slant or an angle; in statistics it describes the shape of a distribution.

**<a id="g-slope">slope</a>**

In a straight-line model, the amount the outcome is expected to change when the predictor increases by one unit. A negative slope means the outcome tends to go down as the predictor goes up.

**<a id="g-standard-deviation">standard deviation</a>** <span class="dualm">dual meaning</span>

A measure of spread: roughly the typical distance of values from the mean. In everyday use "standard" suggests a required level and "deviation" suggests going off-course; in statistics it is a specific measure of variability.

**<a id="g-statistic">statistic</a>** <span class="dualm">dual meaning</span>

A number computed from a sample (for example, a sample mean), used to estimate a population parameter. In everyday use a "statistic" is any fact or figure; in statistics it specifically describes a number from a *sample*.

**<a id="g-survey">survey</a>** <span class="dualm">dual meaning</span>

A structured method of collecting data from a sample, usually via a questionnaire. In everyday use "survey" means to look around or take an overview; in research it is a formal data-collection method.

## T

**<a id="g-target-trial">target trial framework</a>**

A way of stating the ideal randomized study you wish you could run, then asking how closely an observational dataset can imitate it.

**<a id="g-token">token</a>** <span class="dualm">dual meaning</span>

A unit of text (roughly a word or part of a word) that a large language model processes. In everyday use a "token" is a coin or voucher; in AI it is the unit of text a model reads and generates.

**<a id="g-training">training</a>** <span class="dualm">dual meaning</span>

Fitting a model's parameters to data so it can make predictions (the "learning" in machine learning). In everyday use "training" means instruction or education; in machine learning it is an algorithmic process.

**<a id="g-treatment">treatment</a>** <span class="dualm">dual meaning</span>

The intervention or condition being studied (for example, a tutoring program). In everyday use "treatment" usually means medical care; in research it is the thing whose effect you are measuring.

## V

**<a id="g-validity">validity</a>** <span class="dualm">dual meaning</span>

Whether an instrument measures what it claims to measure. In everyday use "valid" means a sound or logical argument; in measurement it is about the match between an instrument and the concept it is supposed to capture.

**<a id="g-variable">variable</a>** <span class="dualm">dual meaning</span>

A measured characteristic that can take different values (each column in a dataset is a variable). In everyday use "variable" means changeable or inconsistent; in statistics it is a named, measured quantity.

**<a id="g-variance">variance</a>** <span class="dualm">dual meaning</span>

A measure of spread: the average squared distance of values from the mean. In everyday use "variance" means disagreement or difference; in statistics it is a specific numeric measure of variability.

## W

**<a id="g-weight">weight</a>** <span class="dualm">dual meaning</span>

In machine learning, a parameter that scales the influence of a feature on the model's output. In everyday use "weight" means heaviness; in ML it is a learned number inside the model.

---

*References:* Baron, R. M., & Kenny, D. A. (1986). The moderator–mediator variable distinction. *Journal of Personality and Social Psychology, 51*(6), 1173–1182. | Hernán, M. A., Dahabreh, I. J., Dickerman, B. A., & Swanson, S. A. (2025). The target trial framework for causal inference from observational data: Why and when is it helpful? *Annals of Internal Medicine, 178*(3), 402–407. | Ito, C., Al-Hassany, L., Kurth, T., & Glatz, T. (2025). Distinguishing description, prediction, and causal inference: A primer on improving congruence between research questions and methods. *Neurology, 104*(4), Article e210171. | Kamper, S. J. (2020). Types of research questions: Descriptive, predictive, or causal. *Journal of Orthopaedic & Sports Physical Therapy, 50*(8), 468–469. | Lopez Bernal, J., Cummins, S., & Gasparrini, A. (2017). Interrupted time series regression for the evaluation of public health interventions: A tutorial. *International Journal of Epidemiology, 46*(1), 348–355. | Preacher, K. J., & Hayes, A. F. (2004). SPSS and SAS procedures for estimating indirect effects. *Behavior Research Methods, Instruments, & Computers, 36*(4), 717–731. | Shmueli, G. (2010). To explain or to predict? *Statistical Science, 25*(3), 289–310.
