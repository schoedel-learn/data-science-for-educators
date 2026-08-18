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

export function Head() {
  return <title>{"Glossary \u2014 NAEP Data Portfolio"}</title>;
}

export const query = graphql`
  query GlossaryQuery($relativePath: String!) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark { html }
    }
  }
`;
