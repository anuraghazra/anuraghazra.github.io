import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';

const UnstyledUl = styled.ul`
  list-style: initial;
  margin-left: 15px;
  line-height: 30px;
  font-weight: 600;
`;

const Goodies = () => {
  const [links, setLinks] = useState();

  useEffect(() => {
    fetch('https://api.github.com/gists/17793ea33123f0ce4c0200cc734d7889')
      .then(res => res.json())
      .then(data => {
        setLinks(JSON.parse(data.files['goodies.json'].content));
      });
  }, []);

  return (
    <Layout>
      <SEO title="Anurag Hazra - All Links" />

      <h1>Goodies</h1>
      <p>
        Collection of all of the project, experiment, source-code links at one
        place.
      </p>
      <hr />

      {!links && <p>Loading please wait....</p>}
      {links &&
        Object.entries(links).map(obj => {
          return (
            <>
              <h2>{obj[0]}</h2>
              <UnstyledUl>
                {obj[1].map(link => {
                  return (
                    <li>
                      <a target="__blank" href={link[0]}>
                        {link[1]}
                      </a>
                    </li>
                  );
                })}
              </UnstyledUl>
            </>
          );
        })}
    </Layout>
  );
};

export default Goodies;
