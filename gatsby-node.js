const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query all markdown content — questions, glossary, log
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "content" }, extension: { eq: "md" } }) {
        nodes {
          relativePath
          childMarkdownRemark {
            frontmatter {
              title
              type
              number
              classification
              description
              tags
            }
            html
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    return;
  }

  result.data.allFile.nodes.forEach((node) => {
    const { relativePath, childMarkdownRemark } = node;
    if (!childMarkdownRemark) return;

    const fm = childMarkdownRemark.frontmatter || {};
    const type = fm.type || "page";

    // Route: strip .md extension, index.md → /
    let route = relativePath.replace(/\.md$/, "");
    if (route === "index") route = "";

    // Determine template
    let template;
    if (type === "question") {
      template = path.resolve("src/templates/question.js");
    } else if (type === "glossary") {
      template = path.resolve("src/templates/glossary.js");
    } else if (route === "log") {
      template = path.resolve("src/templates/log.js");
    } else {
      template = path.resolve("src/templates/page.js");
    }

    createPage({
      path: route ? `/${route}/` : "/",
      component: template,
      context: {
        relativePath,
        title: fm.title || "",
        type: fm.type || "",
        classification: fm.classification || "",
        description: fm.description || "",
        tags: fm.tags || [],
      },
    });
  });
};
