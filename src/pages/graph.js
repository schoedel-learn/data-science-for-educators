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

        let fitTimer = null;
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
