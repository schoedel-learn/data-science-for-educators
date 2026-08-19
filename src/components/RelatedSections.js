import React from "react";
import graphData from "../data/site-graph.json";

// Convert a content relative path (e.g. "findings.md") to its route
// (e.g. "/findings/"), matching gatsby-node.js.
export function routeFromPath(relativePath) {
  if (!relativePath) return "/";
  const r = relativePath.replace(/\.md$/, "");
  return r === "index" ? "/" : `/${r}/`;
}

// Wiki-style "Related sections" panel, driven by the `related` field on each
// page node in the knowledge graph. Renders nothing when the page has no
// related sections (e.g. Home, which already has its own card grid).
export default function RelatedSections({ route }) {
  const pageNode = graphData.nodes.find(
    (n) => n.group === "page" && n.route === route
  );
  const related = (pageNode?.related || [])
    .map((id) => graphData.nodes.find((n) => n.id === id))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <nav className="related-sections" aria-label="Related sections">
      <h2 className="related-heading">Related sections</h2>
      <ul className="related-list">
        {related.map((n) => (
          <li key={n.id} className="related-item">
            <a href={n.route} className="related-link">
              {n.name}
            </a>
            {n.summary && <span className="related-summary">{n.summary}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
