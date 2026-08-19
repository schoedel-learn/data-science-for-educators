#!/usr/bin/env node
// Builds src/data/site-graph.json — the AI-context knowledge graph for /graph/.
// Nodes are atomic context units (summary + facts); links are typed relations.
// Run: node scripts/build-graph-data.js
const fs = require("fs");
const path = require("path");

// id, name, group, route?, summary, facts[]
const nodes = [
  // ---- Topics (site sections) ----
  { id: "home", name: "Home", group: "page", route: "/", summary: "The portfolio's entry point and overview of the whole project.", facts: ["Question: were NAEP math and reading scores lower after COVID than before?", "Answer: yes — in every subject and grade."] },
  { id: "research-question", name: "Research question", group: "page", route: "/research-question/", summary: "Defines the single descriptive question the project answers.", facts: ["Descriptive, not causal.", "Pre-COVID (2015–2019) vs post-COVID (2022–2024)."] },
  { id: "dataset", name: "Dataset", group: "page", route: "/dataset/", summary: "Describes the NAEP data used for the analysis.", facts: ["NAEP = the Nation's Report Card, 0–500 scale.", "Grades 4 and 8, math and reading, national public and Texas."] },
  { id: "analysis", name: "Analysis", group: "page", route: "/analysis/", summary: "How the before/after comparison was constructed.", facts: ["Compares mean scale scores across years.", "Baseline 2015–2019 vs post 2022–2024."] },
  { id: "findings", name: "Findings", group: "page", route: "/findings/", summary: "The results, grade by grade and subject by subject.", facts: ["All four tests fell from 2019 to 2024.", "Math is recovering; reading is still falling."] },
  { id: "comparison", name: "Comparison", group: "page", route: "/comparison/", summary: "The U.S. national public average compared with Texas.", facts: ["Texas was above national in grade 8 math in 2015, below by 2024."] },
  { id: "visualization", name: "Visualization", group: "page", route: "/visualization/", summary: "The centerpiece chart and how to read it.", facts: ["2×2 panels; national solid, Texas dashed.", "Shaded band marks the pandemic gap (2019–2022)."] },
  { id: "limitations", name: "Limitations", group: "page", route: "/limitations/", summary: "What the data can and cannot support.", facts: ["Descriptive only — no causal claim.", "NAEP is sample-based; no individual or school scores."] },
  { id: "research", name: "Research & evidence", group: "page", route: "/research/", summary: "How the findings fit published work.", facts: ["Kuhfeld et al. (2022); NCES (2024); Education Recovery Scorecard.", "Triangulated across three independent sources."] },
  { id: "responsible-use", name: "Responsible use", group: "page", route: "/responsible-use/", summary: "Reading the results without overclaiming.", facts: ["Correlation is not causation.", "Statistical significance is not importance."] },
  { id: "recommendations", name: "Recommendations", group: "page", route: "/recommendations/", summary: "What educators might do next.", facts: ["Focus recovery effort on reading, especially grade 8.", "Monitor post-2024 trends."] },
  { id: "ai-use", name: "AI use", group: "page", route: "/ai-use/", summary: "How AI tools were used and verified.", facts: ["Hermes assisted the analysis; every number and source was re-verified by hand."] },
  { id: "references", name: "References", group: "page", route: "/references/", summary: "The sources and citations behind the project.", facts: ["Kuhfeld, Soland & Lewis (2022); NCES; Education Recovery Scorecard."] },
  { id: "glossary", name: "Glossary", group: "page", route: "/glossary/", summary: "A–Z definitions of the data-science terms used.", facts: ["91 plain-language technical definitions."] },

  // ---- Core concepts ----
  { id: "naep", name: "NAEP", group: "concept", route: "/dataset/", summary: "The Nation's Report Card — the assessment whose scores this project analyzes.", facts: ["Nationally representative, administered since 1969.", "Reported on a 0–500 scale."] },
  { id: "covid", name: "COVID-19 pandemic", group: "concept", route: "/research-question/", summary: "The event that separates the pre-COVID baseline from the post-COVID period.", facts: ["School disruptions 2020–2021.", "The interruption this analysis centers on."] },
  { id: "national", name: "U.S. national public", group: "concept", route: "/comparison/", summary: "The reference population — U.S. national public schools.", facts: ["Abbreviated NP in NAEP reporting."] },
  { id: "texas", name: "Texas", group: "concept", route: "/comparison/", summary: "The comparison state.", facts: ["Above national grade 8 math in 2015; below by 2024."] },
  { id: "pre-covid", name: "Pre-COVID baseline (2015–2019)", group: "concept", route: "/analysis/", summary: "The pre-pandemic reference period.", facts: ["Scores were roughly flat before COVID."] },
  { id: "post-covid", name: "Post-COVID period (2022–2024)", group: "concept", route: "/analysis/", summary: "The post-pandemic period under comparison.", facts: ["Scores fell; reading kept falling through 2024."] },
  { id: "mean-score", name: "Mean scale score (0–500)", group: "concept", route: "/dataset/", summary: "The metric — the average score on NAEP's 0–500 scale.", facts: ["The unit used for every before/after comparison."] },
  { id: "math", name: "Mathematics", group: "concept", route: "/findings/", summary: "One of the two subjects analyzed.", facts: ["Fell sharply, then stabilized or recovered."] },
  { id: "reading", name: "Reading", group: "concept", route: "/findings/", summary: "One of the two subjects analyzed.", facts: ["Fell and kept falling to decade lows."] },
  { id: "descriptive", name: "Descriptive question", group: "concept", route: "/research-question/", summary: "The question type this project uses — asks what happened, not why.", facts: ["Describes change; does not establish cause."] },

  // ---- Findings (the "yes" answer, with numbers) ----
  { id: "g8-math", name: "Grade 8 math: 281 → 272 (−8.8)", group: "finding", route: "/findings/", val: 8.0, summary: "Grade 8 math fell 8.8 points from 2019 to 2024 — the largest drop of the four tests.", facts: ["2019: 281.0 → 2024: 272.2.", "Largest decline of the four tests."] },
  { id: "g8-reading", name: "Grade 8 reading: 262 → 257 (−5.3)", group: "finding", route: "/findings/", val: 6.0, summary: "Grade 8 reading fell 5.3 points from 2019 to 2024, reaching a decade low.", facts: ["2019: 262.0 → 2024: 256.7.", "Lowest score of the 2015–2024 series."] },
  { id: "g4-math", name: "Grade 4 math: 240 → 237 (−2.7)", group: "finding", route: "/findings/", val: 5.0, summary: "Grade 4 math fell 2.7 points from 2019 to 2024 — the smallest drop, and it has partly recovered.", facts: ["2019: 240.0 → 2024: 237.3.", "Recovered 2.4 points since 2022."] },
  { id: "g4-reading", name: "Grade 4 reading: 219 → 214 (−5.2)", group: "finding", route: "/findings/", val: 6.0, summary: "Grade 4 reading fell 5.2 points from 2019 to 2024 and is still falling.", facts: ["2019: 219.4 → 2024: 214.3.", "Still declining in the most recent assessment."] },

  // ---- Technical terms ----
  { id: "observational", name: "Observational data", group: "term", route: "/limitations/", summary: "Data collected without random assignment.", facts: ["Supports description, not causation."] },
  { id: "confound", name: "Confound", group: "term", route: "/limitations/", summary: "A variable tied to both the predictor and the outcome, creating a false causal impression.", facts: ["Poverty is a classic confound in education data."] },
  { id: "correlation", name: "Correlation ≠ causation", group: "term", route: "/responsible-use/", summary: "Two variables moving together does not mean one causes the other.", facts: ["Co-movement is not causation."] },
  { id: "significance", name: "Statistical significance", group: "term", route: "/responsible-use/", summary: "A result unlikely to be due to chance (usually p < 0.05).", facts: ["Not the same as practical importance."] },
  { id: "mode-effect", name: "Mode effect", group: "term", route: "/limitations/", summary: "A score change caused by the test's format rather than what students know.", facts: ["NAEP moved from paper to digital in 2017."] },
  { id: "triangulation", name: "Triangulation", group: "term", route: "/research/", summary: "Confirming a finding by checking it against multiple independent sources.", facts: ["This project used three independent sources."] },
  { id: "sample", name: "Sample", group: "term", route: "/dataset/", summary: "A subset of a population, drawn to make claims about the whole.", facts: ["NAEP samples different students each cycle."] },
];

// links as [source, target, relation-label]
const links = [
  // home → every topic
  ["home", "research-question", "links to"], ["home", "dataset", "links to"], ["home", "analysis", "links to"], ["home", "findings", "links to"], ["home", "comparison", "links to"], ["home", "visualization", "links to"], ["home", "limitations", "links to"], ["home", "research", "links to"], ["home", "responsible-use", "links to"], ["home", "recommendations", "links to"], ["home", "ai-use", "links to"], ["home", "references", "links to"], ["home", "glossary", "links to"],
  // topics → concepts/terms
  ["research-question", "descriptive", "asks"], ["research-question", "covid", "is about"],
  ["dataset", "naep", "analyzes"], ["dataset", "national", "samples"], ["dataset", "texas", "samples"], ["dataset", "mean-score", "uses"], ["dataset", "sample", "draws"],
  ["analysis", "pre-covid", "defines"], ["analysis", "post-covid", "defines"], ["analysis", "mean-score", "compares"],
  ["findings", "g8-math", "reports"], ["findings", "g8-reading", "reports"], ["findings", "g4-math", "reports"], ["findings", "g4-reading", "reports"],
  ["comparison", "national", "compares"], ["comparison", "texas", "compares"], ["comparison", "descriptive", "is a"],
  ["visualization", "mean-score", "plots"], ["visualization", "g8-math", "plots"], ["visualization", "g4-reading", "plots"],
  ["limitations", "observational", "notes"], ["limitations", "confound", "notes"], ["limitations", "mode-effect", "notes"],
  ["research", "triangulation", "uses"], ["research", "covid", "studies"],
  ["responsible-use", "descriptive", "insists on"], ["responsible-use", "correlation", "warns about"], ["responsible-use", "significance", "cautions on"],
  ["recommendations", "post-covid", "responds to"], ["recommendations", "g8-reading", "targets"],
  ["ai-use", "analysis", "assisted"], ["ai-use", "naep", "queried"],
  ["references", "research", "supports"],
  ["glossary", "observational", "defines"], ["glossary", "confound", "defines"], ["glossary", "correlation", "defines"], ["glossary", "significance", "defines"], ["glossary", "mode-effect", "defines"], ["glossary", "triangulation", "defines"], ["glossary", "sample", "defines"], ["glossary", "mean-score", "defines"], ["glossary", "naep", "defines"], ["glossary", "descriptive", "defines"],
  // concept ↔ concept
  ["naep", "mean-score", "reports"], ["naep", "national", "samples"], ["naep", "texas", "samples"],
  ["covid", "pre-covid", "follows"], ["covid", "post-covid", "precedes"], ["pre-covid", "post-covid", "before"],
  ["national", "texas", "compared with"], ["math", "reading", "tested alongside"],
  ["descriptive", "observational", "uses"], ["observational", "confound", "exposed to"], ["correlation", "confound", "confused with"], ["significance", "sample", "depends on"],
  // findings
  ["g8-math", "math", "measures"], ["g8-math", "post-covid", "fell in"], ["g8-math", "mean-score", "change in"],
  ["g8-reading", "reading", "measures"], ["g8-reading", "post-covid", "fell in"],
  ["g4-math", "math", "measures"], ["g4-math", "post-covid", "fell in"],
  ["g4-reading", "reading", "measures"], ["g4-reading", "post-covid", "fell in"],
];

// validate
const ids = new Set(nodes.map((n) => n.id));
const problems = [];
links.forEach(([s, t, label]) => {
  if (!ids.has(s)) problems.push(`missing source: ${s}`);
  if (!ids.has(t)) problems.push(`missing target: ${t}`);
  if (!label) problems.push(`missing label on ${s} → ${t}`);
});
if (problems.length) {
  console.error("Graph data validation failed:\n" + problems.join("\n"));
  process.exit(1);
}

const out = path.resolve(__dirname, "../src/data/site-graph.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      nodes,
      links: links.map(([source, target, label]) => ({ source, target, label })),
    },
    null,
    2
  )
);
console.log(`Wrote ${out} (${nodes.length} nodes, ${links.length} labeled links)`);
