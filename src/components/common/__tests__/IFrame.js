import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider } from 'styled-components';
import { themelight } from '../../Layout/theme';

import IFrame from '../IFrame';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

afterEach(cleanup);

test('should contain an iframe element', () => {
  let { getByTitle } = render(
    <ThemeProvider theme={themelight}>
      <IFrame livedemo src={'https://codepen.io/team/'} />
    </ThemeProvider>
  );
  mockAllIsIntersecting(true);
  expect(getByTitle('https://codepen.io/team/')).toBeInTheDocument();
});
