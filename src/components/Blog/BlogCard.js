import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TagBreadcrumb } from './Tags';
import slugify from '@components/slugify';

const PostWrapper = styled.article`
  overflow: auto;
  margin-bottom: 70px;
  /* margin-top: 100px; */
  padding: 30px 30px;
  border-top: 5px solid
    ${p => (p.theme.dark ? p.theme.accentColor : p.theme.primaryColor)};
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowSmall};
  background-color: ${p => p.theme.secondaryColor};

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  span {
    font-size: 13px;
    color: gray;
  }
`;

export const BlogDateAndReadTime = ({ date, readtime }) => (
  <span style={{ fontSize: 13, color: 'gray' }}>
    <span aria-label={`publish date ${date}`}>
      <FontAwesomeIcon color="gray" icon="calendar-alt" />
      &nbsp;&nbsp;{date}
    </span>
    &nbsp;&nbsp;&nbsp;
    <span aria-label={`${readtime} minutes read`}>
      <FontAwesomeIcon color="gray" icon="clock" />
      &nbsp;&nbsp;{readtime}min read
    </span>
  </span>
);

const BlogCard = ({ date, readtime, title, excerpt, slug, tags }) => {
  return (
    <Link to={slug} aria-label={`${title} - read time ${readtime} minutes`}>
      <PostWrapper>
        <BlogDateAndReadTime date={date} readtime={readtime} />

        <h2>{title}</h2>
        <p>{excerpt}</p>

        <div style={{ marginTop: 20 }}>
          {tags.map(tag => (
            <TagBreadcrumb
              key={tag}
              aria-label={`${tag} tag`}
              to={`/blog/tags/${slugify(tag)}/`}
            >
              {tag}
            </TagBreadcrumb>
          ))}
        </div>
      </PostWrapper>
    </Link>
  );
};

BlogDateAndReadTime.propTypes = {
  date: PropTypes.string.isRequired,
  readtime: PropTypes.number.isRequired,
};

BlogCard.propTypes = {
  date: PropTypes.string.isRequired,
  readtime: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
export default BlogCard;
