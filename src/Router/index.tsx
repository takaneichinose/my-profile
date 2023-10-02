import React, { useContext } from 'react';

import { Routes } from '@/Enums/Routes';
import { RoutesData } from '@/Types/RoutesData';
import { RoutesContext } from '@/Providers/RoutesProvider';

import { Preload } from '@/Pages/Preload';
import { Main } from '@/Pages/Main';

/**
 * Entry point of the router
 * @returns {React.ReactElement}
 */
export function Router(): React.ReactElement {
  const { currentScreen } = useContext<RoutesData>(RoutesContext);

  switch (currentScreen) {
    case Routes.Loading:
      return <Preload />;
    case Routes.Main:
      return <Main />;
  }
}
