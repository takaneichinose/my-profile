import React from 'react';

import { AppProvider } from '@/Providers/AppProvider';
import { Router } from '@/Router';
import { Layout } from '@/Layouts/Layout';

/**
 * Entry point of the application
 * @returns {React.ReactElement}
 */
export function App(): React.ReactElement {
  return (
    <AppProvider>
      <Layout>
        <Router />
      </Layout>
    </AppProvider>
  );
}
