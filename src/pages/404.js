import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';

import Link from 'gatsby-link';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Opps, seems like you are lost!</h1>
    <p>
      Mind going back? or <Link to="/blog">read some blogs</Link>
    </p>
  </Layout>
);

export default NotFoundPage;
