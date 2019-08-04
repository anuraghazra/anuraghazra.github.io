import React from "react";

import { Link, graphql, useStaticQuery } from "gatsby"

export const useTags = () => {
  const tags = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return tags;
}

const Tags = () => {
  const tags = useTags();

  return (
    <div>
      <ul>
        {tags.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/blog/tags/${tag.fieldValue}/`}>
              {tag.fieldValue} ({tag.totalCount})
              </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tags