import React, { Suspense } from 'react';

import { Loading } from '@/Layouts/Loading';
import { AssetsProvider } from '@/Providers/AssetsProvider';
import { RoutesProvider } from '@/Providers/RoutesProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * Provider of the application. All other providers goes here.
 * @param {React.ReactNode} children Child nodes
 * @returns {React.ReactElement}
 */
export function AppProvider({ children }: AppProviderProps): React.ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <AssetsProvider>
        <RoutesProvider>{children}</RoutesProvider>
      </AssetsProvider>
    </Suspense>
  );
}
