import React, { useCallback, useEffect, useState } from "react";
import "../styles/global.css";

export default function Layout({ children, title, description }) {
  const [expandedImage, setExpandedImage] = useState(null);

  const closeExpandedImage = useCallback(() => {
    setExpandedImage(null);
  }, []);

  useEffect(() => {
    if (!expandedImage) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeExpandedImage();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expandedImage, closeExpandedImage]);

  const handleMainClick = useCallback((event) => {
    const target = event.target;
    if (!(target instanceof window.HTMLImageElement)) return;
    if (window.innerWidth < 768) return;

    setExpandedImage({
      src: target.currentSrc || target.src,
      alt: target.alt || "Expanded image",
    });
  }, []);

  return (
    <div className="container">
      <header style={{ marginBottom: "1.5rem" }}>
        <a href="/" style={{ fontSize: ".85rem", color: "var(--muted)", textDecoration: "none" }}>
          ← Data Science for Educators
        </a>
      </header>
      <main onClick={handleMainClick}>
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
      {expandedImage && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={expandedImage.alt} onClick={closeExpandedImage}>
          <button type="button" className="image-lightbox-close" onClick={closeExpandedImage} aria-label="Close expanded image">
            ×
          </button>
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="image-lightbox-img"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
