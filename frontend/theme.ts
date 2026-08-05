'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* cap all component radii so nothing renders as a pill */
  defaultRadius: 'md',
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '12px',
  },
});
