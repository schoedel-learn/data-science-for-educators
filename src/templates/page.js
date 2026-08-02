import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function PageTemplate({ data }) {
  const { childMarkdownRemark } = data.file;
  return (
    <Layout title={childMarkdownRemark.frontmatter?.title} description={childMarkdownRemark.frontmatter?.description}>
      <div dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }} />
    </Layout>
  );
}

export const query = graphql`
  query PageQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark {
        frontmatter { title description }
        html
      }
    }
  }
`;
