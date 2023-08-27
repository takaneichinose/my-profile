import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/Layouts/Layout';
import { NotFound } from '@/Layouts/NotFound';
import { Preload } from '@/Pages/Preload';

/**
 * Routes before preloading all the assets
 * @returns {React.ReactElement}
 */
export function PublicRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="preload" element={<Preload />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
