import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Axios from "axios";
import config from "../configs";
const { baseURL, baseImgUrl } = config;
const axios = Axios.create({
  baseURL,
  // withCredentials: true,
});
const ApiForImg = Axios.create({
  baseURL: baseImgUrl,
});

function getToken(config) {
  config.headers.authorization = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";
  return config;
}

axios.interceptors.request.use(
  (config) => {
    return getToken(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiForImg.interceptors.request.use(
  (config) => getToken(config),
  (error) => {
    return Promise.reject(error);
  }
);

export function searchProducts(query) {
  let url = `products/search/${query}/page=${1}`; 
  return axios.get(url);
}

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status == 401) {
//       Toastify({
//         text: error.response.data,
//         duration: 3000,
//       }).showToast();
//     }
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      alert("Your session has expired. Please login again.");
      window.location.replace("/sign-in.html");
    }
    return Promise.reject(error);
  }
);
export { ApiForImg, axios as default };

