import React, { useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import { clsx } from 'clsx';

import { Routes } from '@/Enums/Routes';
import { AssetsContext } from '@/Providers/AssetsProvider';
import { RoutesContext } from '@/Providers/RoutesProvider';
import { AssetData } from '@/Types/AssetData';
import { RoutesData } from '@/Types/RoutesData';

import './Preload.scss';

/**
 * Component for the preload page
 * @returns {React.ReactElement}
 */
export function Preload(): React.ReactElement {
  const { preload, progress, setLoadComplete } = useContext<AssetData>(AssetsContext);
  const { setCurrentScreen } = useContext<RoutesData>(RoutesContext);

  // Transition event of the screen
  const handleTransitionEnd = (event: React.TransitionEvent) => {
    if (event.propertyName === 'opacity') {
      setLoadComplete(true);
      setCurrentScreen(Routes.Main);
    }
  };

  // Start preloading all assets
  useEffect(() => {
    preload();
  }, [preload]);

  return (
    <div
      className={clsx(
        'progress',
        'w-full',
        'h-full',
        'flex',
        'absolute',
        'top-0',
        'left-0',
        'transition-all',
        'ease-out',
        'delay-300',
        'duration-500',
        'z-10',
        progress >= 1 && 'opacity-0',
      )}
      style={{ '--width': `${progress * 100}%` } as React.CSSProperties}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={clsx(
          !isMobile && 'text-[3vmin]',
          'text-pico-1',
          'text-center',
          'bg-pico-8',
          'w-1/2',
          'py-2',
          'm-auto',
          'relative',
          'before:bg-pico-12',
          'before:h-full',
          'before:absolute',
          'before:top-0',
          'before:left-0',
          'before:transition-all',
        )}
      >
        <span className="relative select-none">Loading</span>
      </div>
    </div>
  );
}
