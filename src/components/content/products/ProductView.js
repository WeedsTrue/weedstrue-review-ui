import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import ProductListItem from './ProductListItem';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CreatePost from '../posts/CreatePost';

const ProductView = () => {
  const { state, fetchProduct } = useContext(ReviewsContext);
  const { uuid } = useParams();

  useEffect(() => {
    if (uuid) {
      fetchProduct(uuid, () => {}, triggerNotification);
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          <CreatePost
            PostItemComponent={
              <ProductListItem product={state.product.value} />
            }
            isPostItemLoading={state.product.loading}
            postItem={state.product.value}
            postType="product"
          />
        }
        path="/submit"
      />
      <Route
        element={
          <ProductDetails
            isLoading={state.product.loading}
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
