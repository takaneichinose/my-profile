import { Assets } from 'pixi.js';
import React, { Context, createContext, useCallback, useState } from 'react';

import { ASSETS } from '@/Constants/Assets';
import { AssetData } from '@/Types/AssetData';

type AssetProviderProps = {
  children: React.ReactNode;
};

/**
 * Context for loading assets
 */
export const AssetsContext: Context<AssetData> = createContext<AssetData>({} as AssetData);

/**
 * Provider component for loading assets
 * @param {React.ReactNode} children Child nodes
 * @returns {AssetData}
 */
export function AssetsProvider({ children }: AssetProviderProps): React.ReactElement {
  const [progress, setProgress] = useState<number>(0);
  const [loadComplete, setLoadComplete] = useState<boolean>(false);

  // Main function in preloading
  const preload = useCallback(async () => {
    // Load the assets, return the data for later use
    await Assets.load(ASSETS, (progress: number) => {
      setProgress(progress);
    });
  }, []);

  return (
    <AssetsContext.Provider
      value={{
        preload,
        progress,
        loadComplete,
        setLoadComplete,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
