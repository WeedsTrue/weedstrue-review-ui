import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductDetails from '../components/content/products/ProductDetails';
import ProductListView from '../components/content/products/ProductListView';

const ProductsView = () => {
  return (
    <Routes>
      <Route element={<ProductListView />} path="/" />
      <Route element={<ProductDetails />} path="/:uuid" />
      <Route element={<Navigate replace to="/products" />} path="*" />
    </Routes>
  );
};

export default ProductsView;
