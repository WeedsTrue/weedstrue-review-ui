import weedstrueAPI from './weedstrueAPI';

const getAuthToken = async () => {
  return JSON.parse(window.localStorage.getItem('session'));
};

const refreshAuthToken = async () => {
  try {
    const token = await getAuthToken();
    if (token) {
      const response = await weedstrueAPI.post(
        '/api/account/refresh-token',
        {
          token: token.refreshToken
        },
        { __isRetryRequest: true }
      );
      window.localStorage.setItem(
        'session',
        JSON.stringify(response.data.token)
      );
    }
  } catch (e) {
    if (e.response?.status === 401) {
      window.localStorage.removeItem('session');
    }
  }
};

export { getAuthToken, refreshAuthToken };
