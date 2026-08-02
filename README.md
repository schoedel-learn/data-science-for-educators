# Data Science for Educators

Live site: https://data.educatebarry.co
GitHub repo: https://github.com/schoedel-learn/data-science-for-educators

## What this project is

Data Science for Educators is a public-facing course project for STEM-5328 (Data Science for Education Professionals). Its purpose is to help educators learn how education data questions are framed, what kinds of claims different methods can support, how public data can be explored responsibly, and how code, charts, tables, and plain-language interpretation fit together.

This repo contains the Gatsby source for the public website. The site is built from markdown content and presents a beginner-friendly knowledge bundle around five education research questions derived from NAEP 2022–2024 data and related public sources.

The project is not organized around a single assignment. Instead, it is organized around a broader teaching goal:

- help educators read data questions more critically,
- distinguish descriptive, predictive, and causal aims,
- understand comparison as a cross-cutting analytic approach,
- see how exploratory analysis works before stronger claims are made, and
- connect public education data to reproducible analysis workflows.

## Course context

The project is grounded in the STEM-5328 course materials maintained in the Obsidian vault, especially:

- `STEM-5328 Course Index.md`
- `Five Research Questions Report.md`
- `Five Questions — Methods Guide.md`
- `Three Aims and the Role of Comparison.md`
- `Question Classification Rationale.md`
- `NAEP 2022-2024 Fact Sheet.md`

Those notes define the course-level argument that this site operationalizes:

1. the main aims of quantitative analysis are descriptive, predictive, and causal;
2. comparison is not a fourth top-level aim, but an analytic move that can support any of the three; and
3. public educational data should be presented with clear limits on what the analysis can and cannot claim.

## Core intellectual model

This project uses a three-aim framework throughout the site:

- **Descriptive**: What is happening?
- **Predictive**: What factors help forecast or describe outcome patterns?
- **Causal**: What would change the outcome if an intervention changed?

A major design principle of the site is that labels should describe the **aim of the question**, not just the visible technique used to answer it. For example, a comparison across states may still be predictive rather than causal if it relies on observational association alone.

The public methods pages that explain this are:

- `/classification/`
- `/three-aims-and-comparison/`

## What the site currently contains

The website currently includes:

- a homepage that introduces the project and the five research questions;
- five question pages that explain what each question is really asking, what data would be needed, and what kind of claim it can support;
- a classification page that explains the three-aim framework in practical terms;
- a longer methods page on the three aims and the role of comparison;
- a glossary for core methods and data-science terms;
- a work log tracking major public-site updates;
- a worked example for Question 4 (charter share and NAEP scores);
- a follow-up controlled-analysis plan for Question 4; and
- a line-by-line Python walkthrough of the main Question 4 scatterplot script.

## The five question areas

The site currently organizes the course around five education questions:

1. Math vs. reading recovery divergence
2. Hispanic decline and English-learner mediation
3. Digital assessment mode effects
4. Charter penetration and NAEP scores
5. IEP gap and state achievement

These are drawn from the broader course fact-sheet/question set, but curated into a five-question public structure for teaching and navigation.

## Data sources

The main recurring data source is the NAEP Data Service API at `nationsreportcard.gov`, supplemented when needed by public NCES and other external education data sources.

Current examples on the site also use:

- NCES Digest of Education Statistics Table 216.90
- public state-level education context variables
- course-authored analysis notes and markdown artifacts generated from reproducible scripts

## Audience

This project is written primarily for:

- educators who are new to data science,
- students in STEM-5328,
- readers who want plain-language methods explanations,
- practitioners who want to see how public data, charts, and code connect.

The tone of the site is intentionally educational rather than purely technical. Pages aim to explain not just what was done, but why a method or interpretation makes sense.

## Project structure

Important parts of this repo:

- `content/` — markdown content for the site
  - `index.md` — homepage
  - `classification.md` — short methods explainer
  - `three-aims-and-comparison.md` — fuller methods explainer
  - `glossary.md` — plain-language terminology
  - `log.md` — public site work log
  - `questions/` — question pages and worked-example pages
- `src/components/` — shared React layout components
- `src/templates/` — Gatsby templates for pages, glossary, questions, and log
- `src/styles/` — global CSS
- `static/` — static assets copied directly into the built site
- `deploy.sh` — local deployment script for the live site

## Worked examples and code

Question 4 is currently the most developed worked example. It includes:

- a public exploratory analysis page,
- downloadable chart and CSV artifacts,
- a controlled-analysis next-step page, and
- a line-by-line Python walkthrough explaining the main scatterplot script.

That worked example is important, but it should be understood as one part of the broader project rather than the definition of the whole repo.

## Technology stack

This project uses:

- Gatsby
- React
- markdown content files under `content/`
- static assets under `static/`
- a lightweight custom layout and template system

The repo is intentionally simple: content is authored in markdown, Gatsby turns that content into a static site, and the site is deployed to Barry’s local NUC hosting environment.

## Local development

Install dependencies:

```bash
npm install
```

Run Gatsby locally (typical development command):

```bash
npx gatsby develop
```

Build the site:

```bash
npx gatsby build
```

## Deployment

This site is not deployed through GitHub Actions. Deployment is done from the workstation using the local script:

```bash
./deploy.sh
```

Or, if `public/` has already been built:

```bash
./deploy.sh --skip-build
```

The live site is served from `lx-primary` through a Caddy container backed by a Docker named volume. The deployment script stages the built site to the NUC and then copies it into the real live volume path.

Why this matters: copying files to the tempting host path under `/data/sites/...` does not update the live site. The live Caddy container serves from the Docker volume path documented in `deploy.sh` and the infrastructure notes.

## Content and maintenance principles

This project follows a few core rules:

- keep public wording focused on educational value rather than course-admin language;
- distinguish exploratory results from stronger claims;
- keep worked examples reproducible and interpretable;
- explain methods in plain language where possible;
- link code, data, and interpretation together rather than presenting them in isolation.

## Relationship to the Obsidian vault

The Obsidian vault is the broader working knowledge base for the course and surrounding research process. This repo is the public website layer derived from that material.

In practice, the flow is often:

1. develop or refine course ideas in Obsidian;
2. adapt suitable material into public-facing markdown here;
3. build and deploy the static site;
4. verify the live public pages.

## Current status

The project is actively evolving as a teaching-and-methods site, not just as a final-results archive. New pages may include:

- additional worked examples,
- more code walkthroughs,
- stronger follow-up analyses,
- improved methods explainers,
- expanded public-data teaching materials.
