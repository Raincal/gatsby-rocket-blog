import Link from 'gatsby-link'
import React from 'react'
import styles from 'styles/posts.module.css'
import Title from '../components/Posts/Title'

const ArchivesLinks = ({ posts }) => (
  <ul style={{ lineHeight: 1.8 }}>
    {posts.map(({ node: { fields, frontmatter } }) => {
      const { slug } = fields
      const { date, title } = frontmatter
      return (
        <li>
          <Link to={slug}>{title}</Link>{' '}
          <span
            style={{
              fontSize: 14,
              color: '#999',
              fontStyle: 'italic',
            }}
          >
            {date}
          </span>
        </li>
      )
    })}
  </ul>
)

const Archives = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <div className={styles.article}>
    <Title>归档</Title>
    {group.reverse().map(({ fieldValue, totalCount, edges }) => (
      <React.Fragment>
        <h3>
          {fieldValue}
          {` (${totalCount})`}
        </h3>
        <ArchivesLinks posts={edges} />
      </React.Fragment>
    ))}
  </div>
)

export default Archives

export const pageQuery = graphql`
  query ArchivesQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2000
      filter: { id: { regex: "/posts/" } }
    ) {
      group(field: fields___date) {
        fieldValue
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              path
              title
            }
          }
        }
      }
    }
  }
`
