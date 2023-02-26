import createProvider from './createProvider';
import weedstrueAPI from '../api/weedstrueAPI';

const initialState = {
  brands: { value: [], loading: false, error: null },
  brand: { value: null, loading: false, error: null }
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
          value: [...state[action.stateName].value, action.payload],
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
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brand',
      payload: 'Oops something went wrong.'
    });
  }
};

export const { Provider, Context } = createProvider(
  reducer,
  {
    fetchBrands,
    fetchBrand
  },
  initialState
);
