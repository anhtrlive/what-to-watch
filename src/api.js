import axios from 'axios';

const createApi = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      return error.response.status;
    }
    return Promise.reject(error);
  });

  return api;
};

export {createApi};
