const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Data Science for Educators",
    description: "Five research questions, their methods, and the data behind them — explained from the ground up. An Open Knowledge Format (OKF v0.1) knowledge bundle.",
    author: "STEM-5328, UTEP",
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
        name: "Data Science for Educators",
        short_name: "DS4Edu",
        start_url: "/",
        background_color: "#fafaf8",
        theme_color: "#2b5c8f",
        display: "standalone",
        icon: "src/images/icon.svg",
      },
    },
  ],
};
