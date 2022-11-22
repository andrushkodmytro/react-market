import axios from 'axios';
import qs from 'qs';
import store from 'store2';
// import history from '../historyHelper';
// import { FORBIDDEN_PATH, ERROR_PATH, NOT_FOUND_PATH, FORGOT_PASSWORD } from 'utils/constants';
// import reduxStore from '../store';
// import { signOutRequestSuccess } from 'actions/authorization';
// import { toast } from 'react-toastify';
// import Auth from 'utils/auth'

const REACT_APP_API_URL = 'http://localhost:8081/api';
class Service {
  service;

  constructor() {
    let service = axios.create({ baseURL: REACT_APP_API_URL, transformResponse: (data) => JSON.parse(data) });
    service.defaults.headers.common.Accept = 'application/json';
    service.interceptors.request.use(this.handleRequestSuccess, this.handleRequestError);

    service.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError);
    this.service = service;
  }

  handleRequestSuccess(config) {
    // const auth = Auth.getUserSession()

    // if (auth && auth.headers) {
    //   Object.assign(config.headers, auth.headers);
    // }

    const auth = store.get('auth');

    if (auth?.token) {
      Object.assign(config.headers, { Authorization: `Bearer ${auth.token}` });
    }

    return config;
  }

  handleRequestError(error) {
    return Promise.reject(error);
  }

  handleResponseSuccess(response) {
    const auth = store.get('auth');

    if (
      auth &&
      response.headers['access-token'] &&
      response.headers['client'] &&
      response.headers.expiry &&
      response.headers['uid']
    ) {
      const newHeaders = { ...auth, ...{ headers: { ...response.headers } } };
      store.set('auth', newHeaders);
    }
    return response;
  }

  handleResponseError = (error) => {
    return Promise.reject(error);
  };

  errorHandler(error) {
    // switch (error?.response?.status) {
    //   case 401: {
    //     store.remove('auth');
    //     history.push('/search');
    //     reduxStore.dispatch(signOutRequestSuccess());
    //     break;
    //   }
    //   case 403: {
    //     history.push(FORBIDDEN_PATH);
    //     break;
    //   }
    //   case 404: {
    //     window.location.pathname !== FORGOT_PASSWORD && history.push(NOT_FOUND_PATH);
    //     break;
    //   }
    //   case 422: {
    //     console.error('422 error', error.response);
    //     break;
    //   }
    //   case 500: {
    //     history.push(ERROR_PATH);
    //     break;
    //   }
    //   default: {
    //     toast.error('Network error, please refresh page.');
    //   }
    // }
  }

  get(path, params) {
    return this.service
      .get(path, {
        params,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'brackets' });
        },
        responseType: 'json',
        transformResponse: [
          (data) => {
            return JSON.parse(data);
          },
        ],
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.errorHandler(error);
        throw error;
      });
  }

  // patch(path: any, payload: any = {}, onUploadProgress?: (x: any) => any) {
  //   return this.service
  //     .request({
  //       method: 'PATCH',
  //       url: path,
  //       responseType: 'json',
  //       data: payload,
  //       onUploadProgress,
  //     })
  //     .then((response: any) => {
  //       return response;
  //     })
  //     .catch((error: any) => {
  //       this.errorHandler(error);
  //       throw error;
  //     });
  // }

  // put(path: string, payload: any) {
  //   return this.service
  //     .request({
  //       method: 'PUT',
  //       url: path,
  //       responseType: 'json',
  //       data: payload,
  //     })
  //     .then((response: any) => {
  //       return response;
  //     })
  //     .catch((error: any) => {
  //       this.errorHandler(error);
  //       throw error;
  //     });
  // }

  post(path, payload, onUploadProgress, signIn) {
    return this.service
      .request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload,
        onUploadProgress,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (signIn && error?.response?.status === 401) {
          throw error;
        }

        this.errorHandler(error);

        throw error;
      });
  }

  // delete(path: any, payload?: any) {
  //   return this.service
  //     .request({
  //       method: 'DELETE',
  //       url: path,
  //       responseType: 'json',
  //       data: payload,
  //     })
  //     .then((response: any) => {
  //       return response;
  //     })
  //     .catch((error: any) => {
  //       this.errorHandler(error);
  //       throw error;
  //     });
  // }
}

export default new Service();
