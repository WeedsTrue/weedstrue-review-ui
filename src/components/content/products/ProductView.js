import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CreatePost from '../posts/CreatePost';
import PostDetails from '../posts/PostDetails';

const ProductView = () => {
  const hasFetched = useRef(false);
  const { state, fetchProduct } = useContext(ReviewsContext);
  const { uuid } = useParams();

  useEffect(() => {
    if (uuid) {
      fetchProduct(uuid, () => {}, triggerNotification);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          hasFetched.current &&
          !state.product.loading && (
            <CreatePost
              isPostItemLoading={state.product.loading}
              postItem={state.product.value}
              postType="product"
            />
          )
        }
        path="/submit/:postUuid"
      />
      <Route
        element={
          hasFetched.current &&
          !state.product.loading && (
            <CreatePost
              isPostItemLoading={state.product.loading}
              postItem={state.product.value}
              postType="product"
            />
          )
        }
        path="/submit"
      />
      <Route
        element={
          <PostDetails
            isLoading={!hasFetched.current || state.product.loading}
            postItem={state.product.value}
          />
        }
        path="/posts/:uuid/*"
      />

      <Route
        element={
          <ProductDetails
            isLoading={!hasFetched.current || state.product.loading}
            product={state.product.value}
          />
        }
        path="/"
      />
      <Route element={<Navigate replace to={`/products/${uuid}`} />} path="*" />
    </Routes>
  );
};

export default ProductView;
