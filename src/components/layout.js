import React from "react";
import "../styles/global.css";

export default function Layout({ children, title, description }) {
  return (
    <div className="container">
      <header style={{ marginBottom: "1.5rem" }}>
        <a href="/" style={{ fontSize: ".85rem", color: "var(--muted)", textDecoration: "none" }}>
          ← Data Science for Educators
        </a>
      </header>
      <main>
        {title && <h1>{title}</h1>}
        {description && <p className="subtitle">{description}</p>}
        {children}
      </main>
      <footer className="footer">
        <p>
          <a href="/">Home</a> · <a href="/questions/">Questions</a> · <a href="/glossary/">Glossary</a> · <a href="/log/">Work Log</a>
        </p>
        <p>OKF v0.1 · <a href="https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md">Open Knowledge Format</a></p>
      </footer>
    </div>
  );
}
