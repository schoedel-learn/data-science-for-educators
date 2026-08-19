import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import graphData from "../data/site-graph.json";

const GROUPS = {
  page: { label: "Topic", color: "#2b5c8f" },
  concept: { label: "Concept", color: "#d97706" },
  finding: { label: "Finding", color: "#16a34a" },
  term: { label: "Term", color: "#7c3aed" },
};

const nodeById = {};
graphData.nodes.forEach((n) => {
  nodeById[n.id] = n;
});

const neighborsByNode = {};
graphData.nodes.forEach((n) => {
  neighborsByNode[n.id] = [];
});
graphData.links.forEach((l) => {
  const s = typeof l.source === "string" ? l.source : l.source.id;
  const t = typeof l.target === "string" ? l.target : l.target.id;
  neighborsByNode[s].push({ nodeId: t, label: l.label, dir: "out" });
  neighborsByNode[t].push({ nodeId: s, label: l.label, dir: "in" });
});

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch (e) {
    return false;
  }
}

export default function GraphPage() {
  const containerRef = useRef(null);
  const [webglOk, setWebglOk] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) {
      setWebglOk(false);
      return undefined;
    }

    let disposed = false;
    let graph = null;
    let ro = null;
    let fitTimer = null;

    const deg = {};
    graphData.links.forEach((l) => {
      const s = typeof l.source === "string" ? l.source : l.source.id;
      const t = typeof l.target === "string" ? l.target : l.target.id;
      deg[s] = (deg[s] || 0) + 1;
      deg[t] = (deg[t] || 0) + 1;
    });

    Promise.all([import("3d-force-graph"), import("three-spritetext")]).then(
      ([fgMod, stMod]) => {
        if (disposed || !containerRef.current) return;
        const ForceGraph3D = fgMod.default || fgMod;
        const SpriteText = stMod.default || stMod;

        graph = ForceGraph3D()(containerRef.current)
          .graphData(graphData)
          .nodeId("id")
          .nodeLabel("name")
          .nodeVal((n) =>
            n.val != null ? n.val : Math.max(2, Math.sqrt(deg[n.id] || 1) * 1.5)
          )
          .nodeColor((n) => GROUPS[n.group].color)
          .nodeOpacity(1)
          .nodeRelSize(5)
          .nodeThreeObjectExtend(true)
          .nodeThreeObject((n) => {
            const sprite = new SpriteText(n.name);
            sprite.color = GROUPS[n.group].color;
            sprite.textHeight = 8;
            sprite.padding = 2;
            sprite.position.y = -9;
            return sprite;
          })
          .linkColor(() => "rgba(110,120,140,0.35)")
          .linkOpacity(0.5)
          .linkWidth(0.6)
          .linkLabel((l) => l.label)
          .backgroundColor("#fafaf8")
          .onNodeClick((n) => {
            setSelectedId(n && n.id ? n.id : null);
          })
          .onBackgroundClick(() => {
            setSelectedId(null);
          })
          .onNodeHover((n) => {
            if (containerRef.current) {
              containerRef.current.style.cursor = n ? "pointer" : "grab";
            }
          });

        // Configure the force layout (these return the d3 force objects,
        // not the graph, so they must be separate statements).
        graph.d3Force("link").distance(80);
        graph.d3Force("charge").strength(-160);
        graph.d3Force("center").strength(0.08);

        const size = () => {
          if (!containerRef.current || !graph) return;
          const r = containerRef.current.getBoundingClientRect();
          graph.width(r.width).height(r.height);
        };

        const maybeFit = () => {
          if (!graph || !containerRef.current) return;
          const r = containerRef.current.getBoundingClientRect();
          if (!r.width || !r.height) return;
          // Leave the library's auto-camera on wide screens; only pull back to
          // fit when the container is narrow enough to clip the graph.
          if (r.width / r.height >= 0.85) return;
          const pad = Math.max(30, Math.round(Math.min(r.width, r.height) * 0.08));
          try {
            graph.zoomToFit(300, pad);
          } catch (e) {}
        };

        const refit = () => {
          if (fitTimer) clearTimeout(fitTimer);
          fitTimer = setTimeout(() => {
            if (!disposed) maybeFit();
          }, 200);
        };

        size();
        if (typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(() => {
            size();
            refit();
          });
          ro.observe(containerRef.current);
        }

        // On narrow screens, fit once the simulation has spread the nodes.
        setTimeout(() => {
          if (!disposed) maybeFit();
        }, 1500);
      }
    );

    return () => {
      disposed = true;
      if (fitTimer) clearTimeout(fitTimer);
      if (ro) ro.disconnect();
      if (graph) {
        try {
          graph.pauseAnimation();
        } catch (e) {}
        if (typeof graph._destructor === "function") {
          try {
            graph._destructor();
          } catch (e) {}
        }
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  const selected = selectedId ? nodeById[selectedId] : null;
  const neighbors = selectedId ? neighborsByNode[selectedId] : [];

  const copyContext = () => {
    if (!selected) return;
    const lines = [
      selected.name,
      `${GROUPS[selected.group].label} — NAEP Data Portfolio`,
      "",
      selected.summary,
    ];
    if (selected.facts && selected.facts.length) {
      lines.push("", "Facts:");
      selected.facts.forEach((f) => lines.push(`- ${f}`));
    }
    if (neighbors.length) {
      lines.push("", "Related:");
      neighbors.forEach((n) => {
        const other = nodeById[n.nodeId];
        const rel =
          n.dir === "out"
            ? `→ ${n.label} → ${other.name}`
            : `← ${n.label} ← ${other.name}`;
        lines.push(`- ${rel}`);
      });
    }
    const text = lines.join("\n");
    try {
      navigator.clipboard.writeText(text).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        () => {}
      );
    } catch (e) {}
  };

  return (
    <Layout
      wide
      title="Knowledge graph"
      description="An interactive knowledge graph of this project — every node is a unit of context with its facts and relationships."
    >
      <div className="graph-hint">
        Click any node to reveal its context and how it connects — the graph is built the way an AI reads it. Drag to rotate · scroll to zoom.
      </div>
      <div className="graph-legend">
        {Object.entries(GROUPS).map(([key, g]) => (
          <span className="graph-legend-item" key={key}>
            <span className="graph-dot" style={{ background: g.color }} /> {g.label}
          </span>
        ))}
      </div>
      <div className="graph-wrap">
        {webglOk ? (
          <div ref={containerRef} className="graph-canvas" />
        ) : (
          <div className="graph-fallback">
            This 3D graph needs WebGL, which your browser doesn't have available. Try a current version of Chrome, Edge, Firefox, or Safari.
          </div>
        )}
        {selected && (
          <div className="graph-panel" role="dialog" aria-label={selected.name}>
            <button
              type="button"
              className="graph-panel-close"
              onClick={() => setSelectedId(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span
              className="graph-panel-badge"
              style={{ background: GROUPS[selected.group].color }}
            >
              {GROUPS[selected.group].label}
            </span>
            <h2 className="graph-panel-title">{selected.name}</h2>
            <p className="graph-panel-summary">{selected.summary}</p>
            {selected.facts && selected.facts.length > 0 && (
              <ul className="graph-panel-facts">
                {selected.facts.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            {neighbors.length > 0 && (
              <div className="graph-panel-rel">
                <span className="graph-panel-rel-heading">Connected to</span>
                {neighbors.map((n, i) => {
                  const other = nodeById[n.nodeId];
                  return (
                    <button
                      type="button"
                      key={i}
                      className="graph-panel-rel-item"
                      onClick={() => setSelectedId(other.id)}
                    >
                      <span className="graph-panel-rel-label">
                        {n.dir === "out" ? "→ " : "← "}
                        {n.label}
                        {n.dir === "out" ? " →" : " ←"}
                      </span>
                      <span className="graph-panel-rel-name">{other.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="graph-panel-actions">
              {selected.route && (
                <a
                  className="graph-panel-btn graph-panel-btn-primary"
                  href={selected.route}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full page ↗
                </a>
              )}
              <button type="button" className="graph-panel-btn" onClick={copyContext}>
                {copied ? "Copied ✓" : "Copy context"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <title>{"Knowledge graph — NAEP Data Portfolio"}</title>
      <meta
        name="description"
        content="An interactive knowledge graph of the NAEP data portfolio: pages, concepts, findings, and technical terms, each with its facts and relationships."
      />
    </>
  );
}
