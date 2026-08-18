import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import graphData from "../data/site-graph.json";

const GROUPS = {
  page: { label: "Site pages", color: "#2b5c8f" },
  concept: { label: "Core concepts", color: "#d97706" },
  finding: { label: "Key findings", color: "#16a34a" },
  term: { label: "Technical terms", color: "#7c3aed" },
};

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

  useEffect(() => {
    if (!supportsWebGL()) {
      setWebglOk(false);
      return undefined;
    }

    let disposed = false;
    let graph = null;
    let ro = null;

    const deg = {};
    graphData.links.forEach((l) => {
      deg[l.source] = (deg[l.source] || 0) + 1;
      deg[l.target] = (deg[l.target] || 0) + 1;
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
          .backgroundColor("#fafaf8")
          .onNodeClick((n) => {
            if (n.route) navigate(n.route);
          })
          .onNodeHover((n) => {
            if (containerRef.current) {
              containerRef.current.style.cursor = n ? "pointer" : "grab";
            }
          });

        // Configure the force layout (these return the d3 force objects,
        // not the graph, so they must be separate statements).
        graph.d3Force("link").distance(120);
        graph.d3Force("charge").strength(-300);
        graph.d3Force("center").strength(0.05);

        const size = () => {
          if (!containerRef.current || !graph) return;
          const r = containerRef.current.getBoundingClientRect();
          graph.width(r.width).height(r.height);
        };
        size();
        if (typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(size);
          ro.observe(containerRef.current);
        }

        // Fit the camera to the spread-out nodes once the simulation settles.
        setTimeout(() => {
          if (!disposed && graph) {
            try {
              graph.zoomToFit(500, 80);
            } catch (e) {}
          }
        }, 3000);
      }
    );

    return () => {
      disposed = true;
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

  return (
    <Layout
      wide
      title="Knowledge graph"
      description="An interactive 3D map of this project — its pages, concepts, findings, and terms."
    >
      <div className="graph-hint">
        Drag to rotate · scroll to zoom · drag a node to rearrange · click any node to open its page
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
        content="An interactive 3D map of the NAEP data portfolio: pages, concepts, findings, and technical terms."
      />
    </>
  );
}
