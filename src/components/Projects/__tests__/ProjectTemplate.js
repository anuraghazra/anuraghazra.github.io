import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider } from 'styled-components';
import { themelight } from '@src/components/Layout/theme';

import IFrame from '@src/components/common/IFrame';
import ProjectTemplate from '../ProjectTemplate';
import Button, { IconButton } from '@src/components/common/Button';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import {
  ProjectLinks,
  ProjectPreview,
  Tags,
} from '@src/components/Projects/ProjectTemplate.style';

afterEach(cleanup);

test('should have title and description', () => {
  let { getByText, debug } = render(
    <ThemeProvider theme={themelight}>
      <ProjectTemplate
        key={0}
        title={'Project Title'}
        desc={'Project description'}
        links={null}
        preview={null}
      />
    </ThemeProvider>
  );

  expect(getByText(/Project Title/i)).toHaveTextContent('Project Title');
  expect(getByText(/Project description/i)).toHaveTextContent(
    'Project description'
  );
});

test('should have links and preview', () => {
  const node = {
    fields: {
      slug: '/case-studies/project',
    },
    frontmatter: {
      title: 'Project Title',
      description: 'Project description',
      demo: 'https://demo.com',
      src: 'https://github.com',
      iframe: 'https://codepen.io',
    },
  };
  let { getByText, getByTitle, debug } = render(
    <ThemeProvider theme={themelight}>
      <ProjectTemplate
        key={0}
        title={node.frontmatter.title}
        desc={node.frontmatter.description}
        links={
          <ProjectLinks>
            <Button as={'a'} to={node.fields.slug}>
              Case Study
            </Button>
            <Button target="__blank" as="a" href={node.frontmatter.demo}>
              Live Demo
            </Button>
            <IconButton
              label="github"
              icon={['fab', 'github']}
              href={node.frontmatter.src}
            />
          </ProjectLinks>
        }
        preview={
          <ProjectPreview>
            <IFrame
              livedemo={!!node.frontmatter.iframe.match('codepen')}
              src={node.frontmatter.iframe}
            />
            <Tags>
              <FontAwesomeIcon icon={['fab', 'js']} />
              <FontAwesomeIcon icon={['fab', 'html5']} />
              <FontAwesomeIcon icon={['fab', 'css3']} />
            </Tags>
          </ProjectPreview>
        }
      />
    </ThemeProvider>
  );
  mockAllIsIntersecting(true);

  // debug();

  expect(getByText(/case study/i)).toHaveAttribute(
    'to',
    '/case-studies/project'
  );
  expect(getByText(/live demo/i)).toHaveAttribute('href', 'https://demo.com');
  expect(getByTitle(/^github$/i)).toHaveAttribute('href', 'https://github.com');

  const iframe = getByTitle('https://codepen.io');
  expect(iframe).toHaveAttribute('src', 'https://codepen.io');
  expect(iframe).toBeInTheDocument();
});
