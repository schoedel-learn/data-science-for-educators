import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function QuestionTemplate({ data }) {
  const node = data.file.childMarkdownRemark;
  const { frontmatter, html } = node;
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <span className="classification">{frontmatter.classification}</span>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <nav style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
        <a href="/questions/">← All questions</a>{" | "}<a href="/">← Home</a>
      </nav>
    </Layout>
  );
}

export const query = graphql`
  query QuestionQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark {
        frontmatter { title classification description }
        html
      }
    }
  }
`;
