import createProvider from './createProvider';
import { getAuthToken } from '../api/auth';
import weedstrueAPI from '../api/weedstrueAPI';

const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  isGuest: false,
  tokenAttempted: false,
  userData: null,
  userGroups: [],
  error: null,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        loading: true,
        error: null,
        ...(action.payload ? action.payload : {})
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return initialState;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const getErrorMessage = error => {
  return error.response?.data?.error ?? 'Oops something went wrong.';
};

const tokenLogin = dispatch => async () => {
  try {
    dispatch({ type: 'FETCHING', payload: { tokenAttempted: true } });

    const token = await getAuthToken();
    if (token) {
      const response = await weedstrueAPI.post('/api/account/refresh-token', {
        token: token.refreshToken
      });
      window.localStorage.setItem(
        'session',
        JSON.stringify(response.data.token)
      );

      dispatch({
        type: 'SUCCESS',
        payload: {
          userData: response.data.user,
          userGroups: response.data.groups,
          isAuthenticated: true,
          tokenAttempted: true
        }
      });
    } else {
      dispatch({
        type: 'SUCCESS',
        payload: {}
      });
    }
  } catch (e) {
    if (e.response?.status === 401) {
      window.localStorage.removeItem('session');
    }
    dispatch({
      type: 'ERROR',
      payload: null
    });
  }
};

const login =
  dispatch =>
  async ({ email, password }, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({ type: 'SUCCESS', payload: { email, password } });
      const response = await weedstrueAPI.post('/api/account/authorize', {
        email,
        password
      });
      window.localStorage.setItem(
        'session',
        JSON.stringify(response.data.token)
      );

      dispatch({
        type: 'SUCCESS',
        payload: {
          userData: response.data.user,
          userGroups: response.data.groups,
          isAuthenticated: true
        }
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const error =
        e.response.status === 401
          ? 'Invalid Login'
          : 'Oops something went wrong.';
      dispatch({ type: 'ERROR', payload: error });

      if (onErrorCallback) {
        onErrorCallback(e);
      }
    }
  };

const register =
  dispatch =>
  async (
    { firstName, lastName, email, password, confirmPassword },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post('/api/account/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      dispatch({ type: 'SUCCESS', payload: { email, password } });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const error = getErrorMessage(e);
      dispatch({ type: 'ERROR', payload: error });

      if (onErrorCallback) {
        onErrorCallback(e);
      }
    }
  };

const sendPasswordReset =
  dispatch =>
  async ({ email }, onSuccessCallback, onErrorCallback) => {
    try {
      await weedstrueAPI.post('/api/account/reset-password', {
        email
      });

      dispatch({ type: 'SUCCESS', payload: { email } });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      dispatch({ type: 'ERROR', payload: 'Oops something went wrong.' });

      if (onErrorCallback) {
        onErrorCallback(e);
      }
    }
  };

const resetPassword =
  dispatch =>
  async (
    { email, newPassword, confirmPassword, code },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post('/api/account/reset-password/confirm', {
        email,
        newPassword,
        confirmPassword,
        code
      });

      dispatch({
        type: 'SUCCESS',
        payload: { email, password: newPassword }
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const error = getErrorMessage(e);
      dispatch({ type: 'ERROR', payload: error });

      if (onErrorCallback) {
        onErrorCallback(e);
      }
    }
  };

const changePassword =
  dispatch =>
  async (
    { currentPassword, newPassword, confirmNewPassword },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await weedstrueAPI.post('/api/account/change-password', {
        currentPassword,
        newPassword,
        confirmNewPassword
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback(
          e.response?.data?.message ?? 'Oops something went wrong.'
        );
      }
    }
  };

const logout = dispatch => async () => {
  window.localStorage.removeItem('session');
  dispatch({ type: 'RESET' });
};

const clearError = dispatch => async () => {
  dispatch({
    type: 'ERROR',
    payload: null
  });
};
export const { Provider, Context } = createProvider(
  reducer,
  {
    changePassword,
    clearError,
    login,
    logout,
    register,
    resetPassword,
    sendPasswordReset,
    tokenLogin
  },
  initialState
);
