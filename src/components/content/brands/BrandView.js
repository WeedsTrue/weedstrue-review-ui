import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import BrandDetails from './BrandDetails';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CreatePost from '../posts/CreatePost';
import PostDetails from '../posts/PostDetails';

const BrandView = () => {
  const hasFetched = useRef(false);
  const { uuid } = useParams();
  const { state, fetchBrand } = useContext(ReviewsContext);

  useEffect(() => {
    if (uuid) {
      fetchBrand(uuid, () => {}, triggerNotification);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          hasFetched.current &&
          !state.brand.loading && (
            <CreatePost
              isPostItemLoading={state.brand.loading}
              postItem={state.brand.value}
              postType="brand"
            />
          )
        }
        path="/submit/:postUuid"
      />
      <Route
        element={
          hasFetched.current &&
          !state.brand.loading && (
            <CreatePost
              isPostItemLoading={state.brand.loading}
              postItem={state.brand.value}
              postType="brand"
            />
          )
        }
        path="/submit"
      />
      <Route
        element={
          <PostDetails
            isLoading={!hasFetched.current || state.brand.loading}
            postItem={state.brand.value}
          />
        }
        path="/posts/:uuid/*"
      />
      <Route
        element={
          <BrandDetails
            brand={state.brand.value}
            isLoading={!hasFetched.current || state.brand.loading}
          />
        }
        path="/"
      />
      <Route element={<Navigate replace to={`/brands/${uuid}`} />} path="*" />
    </Routes>
  );
};

export default BrandView;
