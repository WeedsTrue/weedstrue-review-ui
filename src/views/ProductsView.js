import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProductsView = () => {
  return (
    <Routes>
      <Route element={<></>} path="/" />
      <Route element={<Navigate replace to="/products" />} path="*" />
    </Routes>
  );
};

export default ProductsView;
