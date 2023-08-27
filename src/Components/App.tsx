import React from 'react';

import { AppProvider } from '@/Providers/AppProvider';
import { AppRouter } from '@/Routes';
import { Initialization } from '@/Components/Initialization';

/**
 * Entry point of the application
 * @returns {React.ReactElement}
 */
export function App(): React.ReactElement {
  return (
    <AppProvider>
      <Initialization>
        <AppRouter />
      </Initialization>
    </AppProvider>
  );
}
