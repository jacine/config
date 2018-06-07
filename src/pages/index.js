import React from 'react'
import Link from 'gatsby-link'
import ConfigItem from '../components/Config/Item';

const IndexPage = ({data}) => (
  <div>
    <h1>Hi people</h1>
    <ul>
      {data.allFile.edges.map(({node}, index) => {
        return <ConfigItem key={index} item={node} />
      })}
    </ul>

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage

export const query = graphql`
  query drupalConfig {
    allDataJson {
      edges {
        node {
          id
        }
      }
    }
    allFile {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`
