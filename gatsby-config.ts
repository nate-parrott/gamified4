import type { GatsbyConfig } from "gatsby"

const ga = {
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    // You can add multiple tracking ids and a pageview event will be fired for all of them.
    trackingIds: [
      "G-NNQ608MM92", // Google Analytics / GA
    ],
    // This object is used for configuration specific to this plugin
    pluginConfig: {
      respectDNT: true,
    },
  }
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-react-helmet',
    ga,
  ],
}

export default config
