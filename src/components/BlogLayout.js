import React from "react";
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Link from 'gatsby-link';
import { Row, Col } from 'react-grid-system';

import Tags from 'src/components/Blog/Tags';
import useRandomBlogPost from 'src/hooks/useRandomBlogPost';

const BlogLayoutWrapper = styled.section`
  ${p => p.theme.spacing.sectionBottom};

  & article:first-of-type {
    margin-top: 15px;
  }
`
const BlogLayout = ({ children, sharerSection }) => {
  const { randomSlug, randomTitle } = useRandomBlogPost();

  return (
    <BlogLayoutWrapper>
      <Row>
        <Col sm={12} md={8}>
          {children}
        </Col>
        <Col sm={12} md={4}>
          <aside style={{ position: 'sticky', top: 100 }}>
            <section>
              <h4>Random post</h4>
              <Link to={randomSlug}>{randomTitle}</Link>
              <br /><br />
            </section>
            <section>
              <h4>Tags</h4>
              <Tags />
              <br />
            </section>
            {sharerSection && sharerSection}
          </aside>
        </Col>
      </Row>
    </BlogLayoutWrapper>
  )
}


BlogLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sharerSection: PropTypes.node
}

export default BlogLayout
