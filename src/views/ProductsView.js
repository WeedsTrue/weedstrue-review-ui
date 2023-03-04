import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductListView from '../components/content/products/ProductListView';
import ProductView from '../components/content/products/ProductView';

const ProductsView = () => {
  return (
    <Routes>
      <Route element={<ProductListView />} path="/" />
      <Route element={<ProductView />} path="/:uuid/*" />
      <Route element={<Navigate replace to="/products" />} path="*" />
    </Routes>
  );
};

export default ProductsView;
