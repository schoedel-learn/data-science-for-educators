const path = require("path");

module.exports = {
  siteMetadata: {
    title: "After COVID, U.S. Test Scores Fell — and Reading Kept Falling",
    description: "A descriptive analysis of NAEP mathematics and reading scores for grades 4 and 8, U.S. national and Texas, before and after the COVID-19 pandemic.",
    author: "Barry Schoedel",
    siteUrl: "https://data.educatebarry.co",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve("content"),
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "NAEP Data Portfolio",
        short_name: "NAEP",
        start_url: "/",
        background_color: "#fafaf8",
        theme_color: "#2b5c8f",
        display: "standalone",
        icon: "src/images/icon.svg",
      },
    },
  ],
};
