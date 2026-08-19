import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RelatedSections, { routeFromPath } from "../components/RelatedSections";

export default function PageTemplate({ data }) {
  const { childMarkdownRemark } = data.file;
  const route = routeFromPath(data.file.relativePath);
  return (
    <Layout title={childMarkdownRemark.frontmatter?.title} description={childMarkdownRemark.frontmatter?.description}>
      <div dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }} />
      <RelatedSections route={route} />
    </Layout>
  );
}

export function Head({ data }) {
  const fm = data.file.childMarkdownRemark.frontmatter || {};
  const site = data.site.siteMetadata || {};
  const title = fm.title || site.title;
  const description = fm.description || site.description;
  const base = site.siteUrl.replace(/\/$/, "");
  const path =
    data.file.relativePath === "index.md"
      ? "/"
      : `/${data.file.relativePath.replace(/\.md$/, "")}/`;
  const url = `${base}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://schoedeldesign.ai/#organization",
        name: "Schoedel Design AI",
        url: "https://schoedeldesign.ai",
        logo: {
          "@type": "ImageObject",
          url: "https://schoedeldesign.ai/wp-content/uploads/2025/08/cropped-Schoedel-Design-640-x-264-px-1-192x192.png",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: "NAEP Data Portfolio",
        url: base,
        publisher: { "@id": "https://schoedeldesign.ai/#organization" },
      },
    ],
  };

  return (
    <>
      <title>{title ? `${title} — NAEP Data Portfolio` : "NAEP Data Portfolio"}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="NAEP Data Portfolio" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="author" content="Barry Schoedel" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}

export const query = graphql`
  query PageQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      relativePath
      childMarkdownRemark {
        frontmatter { title description }
        html
      }
    }
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
