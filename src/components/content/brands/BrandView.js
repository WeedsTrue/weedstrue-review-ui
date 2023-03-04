import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import BrandDetails from './BrandDetails';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CreatePost from '../posts/CreatePost';

const BrandView = () => {
  const { uuid } = useParams();
  const { state, fetchBrand } = useContext(ReviewsContext);

  useEffect(() => {
    if (uuid) {
      fetchBrand(uuid, () => {}, triggerNotification);
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          <CreatePost
            isPostItemLoading={state.brand.loading}
            postItem={state.brand.value}
            postType="brand"
          />
        }
        path="/submit"
      />
      <Route
        element={
          <BrandDetails
            brand={state.brand.value}
            isLoading={state.brand.loading}
          />
        }
        path="/"
      />
      <Route element={<Navigate replace to={`/brands/${uuid}`} />} path="*" />
    </Routes>
  );
};

export default BrandView;
