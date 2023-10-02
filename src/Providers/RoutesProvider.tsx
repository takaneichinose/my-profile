import React, { Context, createContext, useState } from 'react';

import { Routes } from '@/Enums/Routes';
import { RoutesData } from '@/Types/RoutesData';

type RoutesProviderProps = {
  children: React.ReactNode;
};

/**
 * Context for loading assets
 */
export const RoutesContext: Context<RoutesData> = createContext<RoutesData>({} as RoutesData);

/**
 * Provider component for loading assets
 * @param {React.ReactNode} children Child nodes
 * @returns {RoutesData}
 */
export function RoutesProvider({ children }: RoutesProviderProps): React.ReactElement {
  const [currentScreen, setCurrentScreen] = useState<Routes>(Routes.Loading);

  return (
    <RoutesContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </RoutesContext.Provider>
  );
}
