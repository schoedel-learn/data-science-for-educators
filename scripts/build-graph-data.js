#!/usr/bin/env node
// Builds src/data/site-graph.json for the /graph/ 3D knowledge graph.
// Run: node scripts/build-graph-data.js
const fs = require("fs");
const path = require("path");

const nodes = [
  // pages
  { id: "home", name: "Home", group: "page", route: "/" },
  { id: "research-question", name: "Research question", group: "page", route: "/research-question/" },
  { id: "dataset", name: "Dataset", group: "page", route: "/dataset/" },
  { id: "analysis", name: "Analysis", group: "page", route: "/analysis/" },
  { id: "findings", name: "Findings", group: "page", route: "/findings/" },
  { id: "comparison", name: "Comparison", group: "page", route: "/comparison/" },
  { id: "visualization", name: "Visualization", group: "page", route: "/visualization/" },
  { id: "limitations", name: "Limitations", group: "page", route: "/limitations/" },
  { id: "research", name: "Research & evidence", group: "page", route: "/research/" },
  { id: "responsible-use", name: "Responsible use", group: "page", route: "/responsible-use/" },
  { id: "recommendations", name: "Recommendations", group: "page", route: "/recommendations/" },
  { id: "ai-use", name: "AI use", group: "page", route: "/ai-use/" },
  { id: "references", name: "References", group: "page", route: "/references/" },
  { id: "glossary", name: "Glossary", group: "page", route: "/glossary/" },
  // concepts
  { id: "naep", name: "NAEP", group: "concept", route: "/dataset/" },
  { id: "covid", name: "COVID-19 pandemic", group: "concept", route: "/research-question/" },
  { id: "national", name: "U.S. national public", group: "concept", route: "/comparison/" },
  { id: "texas", name: "Texas", group: "concept", route: "/comparison/" },
  { id: "pre-covid", name: "Pre-COVID baseline (2015–2019)", group: "concept", route: "/analysis/" },
  { id: "post-covid", name: "Post-COVID period (2022–2024)", group: "concept", route: "/analysis/" },
  { id: "mean-score", name: "Mean scale score", group: "concept", route: "/dataset/" },
  { id: "math", name: "Mathematics", group: "concept", route: "/findings/" },
  { id: "reading", name: "Reading", group: "concept", route: "/findings/" },
  { id: "descriptive", name: "Descriptive question", group: "concept", route: "/research-question/" },
  // findings
  { id: "g8-math", name: "Grade 8 math ↓8.8", group: "finding", route: "/findings/" },
  { id: "g8-reading", name: "Grade 8 reading ↓5.3", group: "finding", route: "/findings/" },
  { id: "g4-math", name: "Grade 4 math ↓2.7", group: "finding", route: "/findings/" },
  { id: "g4-reading", name: "Grade 4 reading ↓5.2", group: "finding", route: "/findings/" },
  // terms
  { id: "observational", name: "Observational data", group: "term", route: "/limitations/" },
  { id: "confound", name: "Confound", group: "term", route: "/limitations/" },
  { id: "correlation", name: "Correlation ≠ causation", group: "term", route: "/responsible-use/" },
  { id: "significance", name: "Statistical significance", group: "term", route: "/responsible-use/" },
  { id: "mode-effect", name: "Mode effect", group: "term", route: "/limitations/" },
  { id: "triangulation", name: "Triangulation", group: "term", route: "/research/" },
  { id: "sample", name: "Sample", group: "term", route: "/dataset/" },
];

const links = [
  // home hub
  ["home", "research-question"], ["home", "dataset"], ["home", "analysis"], ["home", "findings"], ["home", "comparison"], ["home", "visualization"], ["home", "limitations"], ["home", "research"], ["home", "responsible-use"], ["home", "recommendations"], ["home", "ai-use"], ["home", "references"], ["home", "glossary"],
  // pages → concepts/terms
  ["research-question", "descriptive"], ["research-question", "covid"],
  ["dataset", "naep"], ["dataset", "national"], ["dataset", "texas"], ["dataset", "mean-score"], ["dataset", "sample"],
  ["analysis", "pre-covid"], ["analysis", "post-covid"], ["analysis", "mean-score"],
  ["findings", "g8-math"], ["findings", "g8-reading"], ["findings", "g4-math"], ["findings", "g4-reading"],
  ["comparison", "national"], ["comparison", "texas"], ["comparison", "descriptive"],
  ["visualization", "mean-score"], ["visualization", "g8-math"], ["visualization", "g4-reading"],
  ["limitations", "observational"], ["limitations", "confound"], ["limitations", "mode-effect"],
  ["research", "triangulation"], ["research", "covid"],
  ["responsible-use", "descriptive"], ["responsible-use", "correlation"], ["responsible-use", "significance"],
  ["recommendations", "post-covid"], ["recommendations", "g8-reading"],
  ["ai-use", "analysis"], ["ai-use", "naep"],
  ["references", "research"],
  ["glossary", "observational"], ["glossary", "confound"], ["glossary", "correlation"], ["glossary", "significance"], ["glossary", "mode-effect"], ["glossary", "triangulation"], ["glossary", "sample"], ["glossary", "mean-score"], ["glossary", "naep"], ["glossary", "descriptive"],
  // concept ↔ concept
  ["naep", "mean-score"], ["naep", "national"], ["naep", "texas"],
  ["covid", "pre-covid"], ["covid", "post-covid"], ["pre-covid", "post-covid"],
  ["national", "texas"], ["math", "reading"],
  ["descriptive", "observational"], ["observational", "confound"], ["correlation", "confound"], ["significance", "sample"],
  // findings
  ["g8-math", "math"], ["g8-math", "post-covid"], ["g8-math", "mean-score"],
  ["g8-reading", "reading"], ["g8-reading", "post-covid"],
  ["g4-math", "math"], ["g4-math", "post-covid"],
  ["g4-reading", "reading"], ["g4-reading", "post-covid"],
];

// validate
const ids = new Set(nodes.map((n) => n.id));
const problems = [];
links.forEach(([s, t]) => {
  if (!ids.has(s)) problems.push(`missing source: ${s}`);
  if (!ids.has(t)) problems.push(`missing target: ${t}`);
});
if (problems.length) {
  console.error("Graph data validation failed:\n" + problems.join("\n"));
  process.exit(1);
}

const out = path.resolve(__dirname, "../src/data/site-graph.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  JSON.stringify({ nodes, links: links.map(([source, target]) => ({ source, target })) }, null, 2)
);
console.log(`Wrote ${out} (${nodes.length} nodes, ${links.length} links)`);
