import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
  title: 'DiffLogic Visualizer',
  description: 'Interactive visualizer for differentiable logic gate networks',
};

export default function RootLayout({ children }: { children: any }) {
  // Suppress React warnings in development mode
  if (process.env.NODE_ENV === 'development') {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0].includes('Each child in a list should have a unique "key" prop')) {
        return; // Ignore the specific warning
      }
      originalError(...args); // Log all other errors
    };
  }

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}