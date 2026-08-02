import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function LogTemplate({ data }) {
  return (
    <Layout title="Work Log" description="Creation and update history.">
      <div dangerouslySetInnerHTML={{ __html: data.file.childMarkdownRemark.html }} />
    </Layout>
  );
}

export const query = graphql`
  query LogQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark { html }
    }
  }
`;
