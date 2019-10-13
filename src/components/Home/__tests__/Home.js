import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from '@testing-library/react';
import { themelight } from '../../Layout/theme';

import Home from '../Home';

afterEach(cleanup);

test('home renders correctly', () => {
  let { asFragment } = render(
    <ThemeProvider theme={themelight}>
      <Home name={name} />
    </ThemeProvider>
  )
  const firstRender = asFragment()
  expect(firstRender).toMatchSnapshot();
})