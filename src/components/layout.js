import React, { useCallback, useEffect, useState } from "react";
import "../styles/global.css";

export default function Layout({ children, title, description, wide }) {
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
    <div className={wide ? "container container--wide" : "container"}>
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="NAEP Data Portfolio — home">
          <span className="wordmark-mark">DS</span>
          <span>NAEP Data Portfolio</span>
        </a>
      </header>
      <main onClick={handleMainClick}>
        {title && <h1>{title}</h1>}
        {description && <p className="subtitle">{description}</p>}
        {children}
      </main>
      <footer className="footer">
        <p className="footer-nav">
          <a href="/findings/">Findings</a> · <a href="/visualization/">Visualization</a> · <a href="/comparison/">Comparison</a> · <a href="/limitations/">Limitations</a> · <a href="/research/">Research</a> · <a href="/references/">References</a> · <a href="/glossary/">Glossary</a> · <a href="/graph/">Knowledge graph</a>
        </p>
        <p className="footer-meta">STEM-5328 · Data Science for Educators · UTEP</p>
        <p className="footer-author">Barry Schoedel</p>
        <p className="footer-credit">© 2026 <a href="https://schoedeldesign.ai" rel="noopener">Schoedel Design AI</a></p>
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
