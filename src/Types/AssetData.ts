import { Dispatch, SetStateAction } from 'react';

/**
 * Data of the assets to be loaded
 */
export type AssetData = {
  // Preload function
  preload: () => void;
  // Progress of all loaded assets
  progress: number;
  // Checks if loading all the assets is complete
  loadComplete: boolean;
  // Sets the value of the loading complete state
  setLoadComplete: Dispatch<SetStateAction<boolean>>;
};
