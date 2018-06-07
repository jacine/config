module.exports = {
  siteMetadata: {
    title: 'La la la la la',
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`,

      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        expanded: true,
      },
    },
  ],
}
