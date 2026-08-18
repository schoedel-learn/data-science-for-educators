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
          ← Portfolio home
        </a>
      </header>
      <main onClick={handleMainClick}>
        {title && <h1>{title}</h1>}
        {description && <p className="subtitle">{description}</p>}
        {children}
      </main>
      <footer className="footer">
        <p>
          <a href="/">Home</a> · <a href="/research-question/">Question</a> · <a href="/dataset/">Dataset</a> · <a href="/analysis/">Analysis</a> · <a href="/findings/">Findings</a> · <a href="/comparison/">Comparison</a> · <a href="/visualization/">Visualization</a> · <a href="/limitations/">Limitations</a> · <a href="/research/">Research</a> · <a href="/responsible-use/">Responsible use</a> · <a href="/recommendations/">Recommendations</a> · <a href="/ai-use/">AI use</a> · <a href="/references/">References</a> · <a href="/glossary/">Glossary</a>
        </p>
        <p>STEM-5328 · Data Science for Educators · UTEP</p>
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
