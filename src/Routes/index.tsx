import React, { useContext } from 'react';

import { AssetsContext } from '@/Providers/AssetsProvider';
import { AssetData } from '@/Types/AssetData';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

/**
 * Entry point of the router
 * @returns {React.ReactElement}
 */
export function AppRouter(): React.ReactElement {
  const { loadComplete } = useContext<AssetData>(AssetsContext);

  return loadComplete ? <PrivateRoutes /> : <PublicRoutes />;
}
