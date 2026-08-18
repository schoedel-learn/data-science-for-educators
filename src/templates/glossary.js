import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function GlossaryTemplate({ data }) {
  return (
    <Layout title="Glossary" description="Every technical term defined in plain language.">
      <div dangerouslySetInnerHTML={{ __html: data.file.childMarkdownRemark.html }} />
    </Layout>
  );
}

export function Head({ data }) {
  const site = data.site.siteMetadata || {};
  const base = site.siteUrl.replace(/\/$/, "");
  const description =
    data.file.childMarkdownRemark.frontmatter?.description ||
    "Plain-language definitions of the data-science terms used in this project.";
  const url = `${base}/glossary/`;

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
      <title>{"Glossary — NAEP Data Portfolio"}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content="Glossary — NAEP Data Portfolio" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="NAEP Data Portfolio" />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}

export const query = graphql`
  query GlossaryQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark {
        frontmatter { description }
        html
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
