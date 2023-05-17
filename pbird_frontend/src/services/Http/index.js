// node modules
import axios from 'axios';

// local files
import { HttpConfig } from './config';
import { getTokenFromStore, removeTokenFromLocal } from '../../functions/jwt';
import { store } from '../../store/reducers/reducers';
import { ErrorSnack } from '../../store/keys/Snack';

//Create an instance from axios
let Http = axios.create({ baseURL: HttpConfig.baseURL });

//intercept request and inject token
Http.interceptors.request.use(
  (config) => {
    const token = getTokenFromStore();
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//handle error globally
Http.interceptors.response.use(null, (error) => {
  const clientError = error.response?.status >= 400 && error.response?.status < 500;
  const serverError = error.response?.status >= 500 && error.response?.status < 600;
  const authTokenError = error.response?.status >= 401 || error.response?.status >= 403;

  const { dispatch } = store;
  if (authTokenError) {
    removeTokenFromLocal();
    dispatch({
      type: ErrorSnack(),
      value: 'Please login'
    });
  } else {
    // hanlde error
    const message = clientError || serverError ? error.response.data : error;
    dispatch({
      type: ErrorSnack(),
      value: message
    });
  }

  return Promise.reject(error);
});

export default Http;
