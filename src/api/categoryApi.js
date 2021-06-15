import axiosClient from "./axiosClient";

// api/productApi.js
const categoryApi = {
    getAll: (params) => {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },
}

export default categoryApi;
