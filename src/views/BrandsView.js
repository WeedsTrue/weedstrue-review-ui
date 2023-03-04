import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandListView from '../components/content/brands/BrandListView';
import BrandView from '../components/content/brands/BrandView';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<BrandListView />} path="/" />
      <Route element={<BrandView />} path="/:uuid/*" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
