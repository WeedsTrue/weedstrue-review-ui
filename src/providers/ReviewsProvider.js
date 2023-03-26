import createProvider from './createProvider';
import weedstrueAPI from '../api/weedstrueAPI';

const initialState = {
  brands: { value: [], loading: false, error: null },
  brand: { value: null, loading: false, error: null },
  comments: { value: [], loading: false, error: null },
  userPosts: { value: [], loading: false, error: null },
  userPost: { value: null, loading: false, error: null },
  userPostSummary: { value: null, loading: false, error: null },
  userPostDrafts: { value: [], loading: false, error: null },
  userProfile: { value: null, loading: false, error: null },
  products: { value: [], loading: false, error: null },
  product: { value: null, loading: false, error: null }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: true,
          error: null
        }
      };
    case 'SUCCESS':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          ...action.payload,
          loading: false
        }
      };
    case 'ERROR':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: false,
          error: action.payload
        }
      };
    case 'REPLACE':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: [
            ...state[action.stateName].value.filter(action.payload.filter),
            ...(Array.isArray(action.payload.value)
              ? action.payload.value
              : [action.payload.value])
          ],
          loading: false
        }
      };
    case 'FIND-REPLACE': {
      const foundIndex = state[action.stateName].value.findIndex(
        action.payload.find
      );
      if (foundIndex !== -1) {
        state[action.stateName].value[foundIndex] = action.payload.value;
      }

      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: [...state[action.stateName].value],
          loading: false
        }
      };
    }
    case 'APPEND':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: Array.isArray(action.payload)
            ? [...state[action.stateName].value, ...action.payload]
            : [...state[action.stateName].value, action.payload],
          loading: false
        }
      };
    case 'REMOVE':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: state[action.stateName].value.filter(action.payload.filter),
          loading: false
        }
      };
    case 'RESET':
      return {
        ...state,
        [action.stateName]: initialState[action.stateName]
      };
    default:
      return state;
  }
};

const getErrorMessage = error => {
  if (error.response?.status === 409) {
    return error.response?.data?.error ?? 'Oops something went wrong.';
  }
  return 'Oops something went wrong.';
};

const fetchBrands = dispatch => async () => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'brands'
    });
    const response = await weedstrueAPI.get('/api/brands');

    dispatch({
      type: 'SUCCESS',
      stateName: 'brands',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brands',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchBrand = dispatch => async uuid => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'brand'
    });
    const response = await weedstrueAPI.get(`/api/brands/${uuid}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'brand',
      payload: { value: response.data }
    });

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPosts',
      payload: { value: response.data.userPosts.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brand',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchProducts =
  dispatch =>
  async ({ fkProductType, sortBy, orderBy }) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'products'
      });
      const response = await weedstrueAPI.get('/api/products', {
        params: { fkProductType, sortBy, orderBy }
      });

      dispatch({
        type: 'SUCCESS',
        stateName: 'products',
        payload: { value: response.data }
      });
    } catch (e) {
      dispatch({
        type: 'ERROR',
        stateName: 'products',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchProduct = dispatch => async uuid => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'product'
    });
    const response = await weedstrueAPI.get(`/api/products/${uuid}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'product',
      payload: { value: response.data }
    });

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPosts',
      payload: { value: response.data.userPosts.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'product',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchUserPostProductOptions =
  dispatch => async (searchTerm, onSuccessCallback, onErrorCallback) => {
    try {
      const response = await weedstrueAPI.get(
        '/api/userPosts/products/search',
        {
          params: {
            searchTerm
          }
        }
      );
      if (onSuccessCallback) {
        onSuccessCallback(response.data);
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback(e);
      }
    }
  };

const fetchUserPosts =
  dispatch =>
  async (
    {
      fkUserPostType,
      sortBy,
      orderBy,
      lastUserPost,
      fkBrand,
      fkProduct,
      fkUser
    },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'userPosts'
      });
      const response = await weedstrueAPI.get('/api/userPosts', {
        params: {
          fkUserPostType,
          sortBy,
          orderBy,
          lastUserPost,
          fkBrand,
          fkProduct,
          fkUser
        }
      });
      if (lastUserPost) {
        dispatch({
          type: 'APPEND',
          stateName: 'userPosts',
          payload: response.data.data
        });
      } else {
        dispatch({
          type: 'SUCCESS',
          stateName: 'userPosts',
          payload: { value: response.data.data }
        });
      }
      if (onSuccessCallback) {
        onSuccessCallback(response.data.totalCount);
      }
    } catch (e) {
      dispatch({
        type: 'ERROR',
        stateName: 'userPosts',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchUserDrafts = dispatch => async () => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'userPostDrafts'
    });
    const response = await weedstrueAPI.get('/api/userPosts/drafts');

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPostDrafts',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'userPostDrafts',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchUserPost = dispatch => async uuid => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'userPost'
    });
    const response = await weedstrueAPI.get(`/api/userPosts/${uuid}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPost',
      payload: { value: response.data }
    });

    dispatch({
      type: 'SUCCESS',
      stateName: 'comments',
      payload: { value: response.data.comments ?? [] }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'userPost',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchUserPostSummary =
  dispatch => async (uuid, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'userPostSummary'
      });
      const response = await weedstrueAPI.get(`/api/userPosts/${uuid}/summary`);

      dispatch({
        type: 'SUCCESS',
        stateName: 'userPostSummary',
        payload: { value: response.data }
      });
      if (onSuccessCallback) {
        onSuccessCallback(response.data);
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback();
      }
      dispatch({
        type: 'ERROR',
        stateName: 'userPostSummary',
        payload: 'Oops something went wrong.'
      });
    }
  };

const createUserPost =
  dispatch =>
  async (
    {
      title,
      content,
      draft,
      fkUserPostType,
      fkPostItem,
      postItemType,
      effectTypes,
      attributes,
      rating
    },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'userPostDrafts'
      });
      const response = await weedstrueAPI.post('/api/userPosts', {
        title,
        content,
        draft,
        fkUserPostType,
        fkPostItem,
        postItemType,
        effectTypes,
        attributes,
        rating
      });

      dispatch({
        type: 'APPEND',
        stateName: 'userPostDrafts',
        payload: response.data
      });
      if (onSuccessCallback) {
        onSuccessCallback(response.data);
      }
    } catch (e) {
      const message = getErrorMessage(e);
      dispatch({
        type: 'ERROR',
        stateName: 'userPostDrafts',
        payload: message
      });
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const updateUserPost =
  dispatch =>
  async (
    pkUserPost,
    {
      title,
      content,
      draft,
      fkUserPostType,
      fkPostItem,
      postItemType,
      effectTypes,
      attributes,
      rating
    },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'userPostDrafts'
      });
      const response = await weedstrueAPI.put(`/api/userPosts/${pkUserPost}`, {
        title,
        content,
        draft,
        fkUserPostType,
        fkPostItem,
        postItemType,
        effectTypes,
        attributes,
        rating
      });

      dispatch({
        type: 'REPLACE',
        stateName: 'userPostDrafts',
        payload: {
          filter: p => p.pkUserPost !== pkUserPost,
          value: response.data
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback(response.data);
      }
    } catch (e) {
      const message = getErrorMessage(e);
      dispatch({
        type: 'ERROR',
        stateName: 'userPostDrafts',
        payload: message
      });
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const deleteUserPost =
  dispatch => async (pkUserPost, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'userPosts'
      });
      await weedstrueAPI.delete(`/api/userPosts/${pkUserPost}`);

      dispatch({
        type: 'REMOVE',
        stateName: 'userPosts',
        payload: {
          filter: p => p.pkUserPost !== pkUserPost
        }
      });
      dispatch({
        type: 'REMOVE',
        stateName: 'userPostDrafts',
        payload: {
          filter: p => p.pkUserPost !== pkUserPost
        }
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      dispatch({
        type: 'ERROR',
        stateName: 'userPosts',
        payload: message
      });
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createComment =
  dispatch =>
  async (
    { content, fkUserPost, fkCommentParent },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'comments'
      });
      const response = await weedstrueAPI.post('/api/userPosts/comments', {
        content,
        fkUserPost,
        fkCommentParent
      });

      dispatch({
        type: 'APPEND',
        stateName: 'comments',
        payload: response.data
      });
      if (onSuccessCallback) {
        onSuccessCallback(response.data);
      }
    } catch (e) {
      const message = getErrorMessage(e);
      dispatch({
        type: 'ERROR',
        stateName: 'comments',
        payload: message
      });
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const deleteComment =
  dispatch => async (pkComment, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'comments'
      });
      const response = await weedstrueAPI.delete(
        `/api/userPosts/comments/${pkComment}`
      );

      dispatch({
        type: 'REPLACE',
        stateName: 'comments',
        payload: {
          filter: p => p.pkComment !== pkComment,
          value: response.data
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      dispatch({
        type: 'ERROR',
        stateName: 'comments',
        payload: message
      });
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createUserPostReaction =
  dispatch =>
  async (
    { fkUserPost, pkUserPostReaction, isPositive, removeReaction },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/userPosts/${fkUserPost}/reaction`, null, {
        params: {
          pkUserPostReaction,
          isPositive,
          removeReaction
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createCommentReaction =
  dispatch =>
  async (
    { fkComment, pkCommentReaction, isPositive, removeReaction },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(
        `/api/userPosts/comments/${fkComment}/reaction`,
        null,
        {
          params: {
            pkCommentReaction,
            isPositive,
            removeReaction
          }
        }
      );
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createProductReaction =
  dispatch =>
  async (
    { fkProduct, pkProductReaction, isPositive, removeReaction },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/products/${fkProduct}/reaction`, null, {
        params: {
          pkProductReaction,
          isPositive,
          removeReaction
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createBrandReaction =
  dispatch =>
  async (
    { fkBrand, pkBrandReaction, isPositive, removeReaction },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/brands/${fkBrand}/reaction`, null, {
        params: {
          pkBrandReaction,
          isPositive,
          removeReaction
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const fetchUserProfile = dispatch => async username => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'userProfile'
    });
    const response = await weedstrueAPI.get(`/api/users/${username}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'userProfile',
      payload: { value: response.data }
    });

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPosts',
      payload: { value: response.data.userPosts.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'userProfile',
      payload: 'Oops something went wrong.'
    });
  }
};

const createUserPostReport =
  dispatch =>
  async (
    pkUserPost,
    { extraInfo, fkContentReportType },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/userPosts/${pkUserPost}/report`, {
        extraInfo,
        fkContentReportType
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createCommentReport =
  dispatch =>
  async (
    pkComment,
    { extraInfo, fkContentReportType },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/userPosts/comments/${pkComment}/report`, {
        extraInfo,
        fkContentReportType
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createBrandReport =
  dispatch =>
  async (
    pkBrand,
    { extraInfo, fkContentReportType },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/brands/${pkBrand}/report`, {
        extraInfo,
        fkContentReportType
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createProductReport =
  dispatch =>
  async (
    pkProduct,
    { extraInfo, fkContentReportType },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/products/${pkProduct}/report`, {
        extraInfo,
        fkContentReportType
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

const createUserReport =
  dispatch =>
  async (
    pkUser,
    { extraInfo, fkContentReportType },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post(`/api/users/${pkUser}/report`, {
        extraInfo,
        fkContentReportType
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
    }
  };

export const { Provider, Context } = createProvider(
  reducer,
  {
    createBrandReaction,
    createBrandReport,
    createComment,
    createCommentReaction,
    createCommentReport,
    createProductReaction,
    createProductReport,
    createUserPost,
    createUserPostReaction,
    createUserPostReport,
    createUserReport,
    deleteComment,
    deleteUserPost,
    fetchBrand,
    fetchBrands,
    fetchProduct,
    fetchProducts,
    fetchUserDrafts,
    fetchUserPostProductOptions,
    fetchUserPosts,
    fetchUserPost,
    fetchUserPostSummary,
    fetchUserProfile,
    updateUserPost
  },
  initialState
);
