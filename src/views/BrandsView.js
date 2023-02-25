import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<></>} path="/" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
