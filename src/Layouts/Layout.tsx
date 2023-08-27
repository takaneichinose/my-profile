import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Main layout of the application
 * @returns {React.ReactElement}
 */
export function Layout(): React.ReactElement {
  return (
    <div className="bg-pico-1 w-screen h-screen flex">
      <div className="layout w-[80vmin] h-[60vmin] m-auto relative">
        <Outlet />
      </div>
    </div>
  );
}
