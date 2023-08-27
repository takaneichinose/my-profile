import React, { useContext, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { AssetsContext } from '@/Providers/AssetsProvider';
import { AssetData } from '@/Types/AssetData';

type InitializationProps = {
  children: React.ReactNode;
};

/**
 * Initialize the default shown page
 * @returns {React.ReactElement}
 */
export function Initialization({ children }: InitializationProps): React.ReactElement {
  const { loadComplete } = useContext<AssetData>(AssetsContext);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!loadComplete) {
      // On initialization, redirect to preload page
      navigate('/preload');
    }
  }, [loadComplete, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
}
