import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/Layouts/Layout';
import { Main } from '@/Pages/Main';

/**
 * Routes after preloading all the assets
 * @returns {React.ReactElement}
 */
export function PrivateRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />}></Route>
      </Route>
    </Routes>
  );
}
