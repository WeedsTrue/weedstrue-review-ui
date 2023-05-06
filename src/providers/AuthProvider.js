import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import createProvider from './createProvider';
import weedstrueAPI from '../api/weedstrueAPI';
import { AWS_COGNITO_SETTINGS } from '../config/constants';

Auth.configure(AWS_COGNITO_SETTINGS);
Storage.configure(AWS_COGNITO_SETTINGS);

const initialState = {
  username: '',
  showAuthModal: false,
  isAuthenticated: false,
  isAdmin: false,
  tokenAttempted: false,
  userData: null,
  userGroups: [],
  userKarma: 0,
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
        error: null,
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
    await Auth.currentAuthenticatedUser();
    const response = await weedstrueAPI.post('/api/auth/login', null);
    window.localStorage.setItem('ageVerifiedAt', new Date().toISOString());

    dispatch({
      type: 'SUCCESS',
      payload: {
        isAdmin: response.data.isAdmin,
        userData: response.data.user,
        userGroups: [],
        userKarma: response.data.karmaPoints,
        isAuthenticated: true,
        tokenAttempted: true
      }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      payload: null
    });
  }
};

const login =
  dispatch =>
  async ({ username, password }, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'SUCCESS',
        payload: {
          username
        }
      });
      await Auth.signIn(username.trim(), password.trim());
      const response = await weedstrueAPI.post('/api/auth/login', null);
      dispatch({
        type: 'SUCCESS',
        payload: {
          isAdmin: response.data.isAdmin,
          userData: response.data.user,
          userGroups: [],
          userKarma: response.data.karmaPoints,
          isAuthenticated: true,
          tokenAttempted: true
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        case 'Incorrect username or password.':
          errorMessage = 'Incorrect username or password.';
          break;
        case 'User is not confirmed.':
          errorMessage = 'User is not confirmed.';
          break;
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const signUp =
  dispatch =>
  async ({ username, email, password }, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'SUCCESS',
        payload: {
          username
        }
      });
      await Auth.signUp({
        username,
        password,
        preferred_username: username,
        attributes: {
          email
        },
        autoSignIn: {
          enabled: true
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      if (
        error.message.startsWith(
          "1 validation error detected: Value at 'username' failed to satisfy constraint:"
        )
      ) {
        errorMessage = 'Invalid username';
      } else {
        switch (error.message) {
          case 'User already exists':
            errorMessage = 'That username is already taken';
            break;
          case 'Password did not conform with policy: Password not long enough':
            errorMessage = 'Password not long enough';
            break;
          default:
            errorMessage = 'Oops something went wrong';
            break;
        }
      }

      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const sendPasswordReset =
  dispatch =>
  async ({ username }, onSuccessCallback, onErrorCallback) => {
    dispatch({
      type: 'SUCCESS',
      payload: {
        username
      }
    });
    try {
      await Auth.forgotPassword(username);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const resetPassword =
  dispatch =>
  async (
    { username, code, newPassword },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        case 'Invalid code provided, please request a code again.':
          errorMessage = 'Invalid code.';
          break;
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const sendConfirmationCode =
  dispatch =>
  async ({ username }, onSuccessCallback, onErrorCallback) => {
    dispatch({
      type: 'SUCCESS',
      payload: {
        username
      }
    });
    try {
      await Auth.resendSignUp(username);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const confirmAccount =
  dispatch =>
  async ({ username, code }, onSuccessCallback, onErrorCallback) => {
    try {
      await Auth.confirmSignUp(username, code);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const logout = dispatch => async () => {
  try {
    await Auth.signOut();
    dispatch({ type: 'RESET' });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

const toggleAuthModal = dispatch => async isOpen => {
  try {
    dispatch({
      type: 'SUCCESS',
      payload: {
        showAuthModal: isOpen
      }
    });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

const clearError = dispatch => async () => {
  dispatch({
    type: 'ERROR',
    payload: null
  });
};

const confirmAgeRequirements = dispatch => async () => {
  window.localStorage.setItem('ageVerifiedAt', new Date().toISOString());

  dispatch({
    type: 'SUCCESS',
    payload: {}
  });
};

const updateUserProfile =
  dispatch =>
  async (
    { avatar, bio, userSocialLinks },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      const response = await weedstrueAPI.put('/api/auth/profile', {
        avatar,
        bio,
        userSocialLinks
      });
      dispatch({
        type: 'SUCCESS',
        payload: {
          userData: response.data
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

const updateUserPrivacy =
  dispatch =>
  async ({ followersDisabled }, onSuccessCallback, onErrorCallback) => {
    try {
      const response = await weedstrueAPI.put('/api/auth/privacy', {
        followersDisabled
      });
      dispatch({
        type: 'SUCCESS',
        payload: {
          userData: response.data
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

export const { Provider, Context } = createProvider(
  reducer,
  {
    clearError,
    confirmAccount,
    confirmAgeRequirements,
    login,
    logout,
    resetPassword,
    sendConfirmationCode,
    sendPasswordReset,
    signUp,
    toggleAuthModal,
    tokenLogin,
    updateUserProfile,
    updateUserPrivacy
  },
  initialState
);
