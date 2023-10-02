import React from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Main layout of the application
 * @returns {React.ReactElement}
 */
export function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <div className="bg-pico-1 w-screen h-screen flex">
      {/* 75vw is from calculation of 4:3 aspect ratio (100 * 3 / 4 = 75) */}
      <div className={clsx(!isMobile ? 'w-[80vmin] h-[60vmin]' : 'w-screen h-[75vw]', 'm-auto relative')}>
        {children}
      </div>
    </div>
  );
}
