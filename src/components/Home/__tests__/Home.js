import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from '@testing-library/react';

import Home from '../Home';
import { themelight } from '../../Layout/theme';

afterEach(cleanup);

test('home renders correctly', () => {
  let { getByText } = render(
    <ThemeProvider theme={themelight}>
      <Home name={name} />
    </ThemeProvider>
  );

  getByText('ANURAG HAZRA');
})

