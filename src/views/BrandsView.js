import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandDetails from '../components/content/brands/BrandDetails';
import BrandListView from '../components/content/brands/BrandListView';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<BrandListView />} path="/" />
      <Route element={<BrandDetails />} path="/:uuid" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
