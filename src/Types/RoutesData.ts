import { Dispatch, SetStateAction } from 'react';

import { Routes } from '@/Enums/Routes';

/**
 * Data of the routes used for the provider
 */
export type RoutesData = {
  // Current shown screen
  currentScreen: Routes;
  // Sets the current shown screen
  setCurrentScreen: Dispatch<SetStateAction<Routes>>;
};
