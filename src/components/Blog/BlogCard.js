import React from 'react';
import styled from 'styled-components';
import Link from "gatsby-link"

const PostWrapper = styled.article`
  margin-bottom: 50px;
  margin-top: 50px;
  padding: 30px 20px;
  border-top: 5px solid ${p => p.theme.primaryColor};
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowSmall}; 

  span {
    font-size: 13px;
    color: gray;
  }
`

const BlogCard = ({date, readtime, title, excerpt, slug}) => {
  return (
    <Link to={slug}>
      <PostWrapper>
        <span>{date} | {readtime}min read</span>
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </PostWrapper>
    </Link>
  )
}

export default BlogCard;
