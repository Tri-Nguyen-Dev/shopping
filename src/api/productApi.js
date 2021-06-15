import axiosClient from "./axiosClient";

// api/productApi.js
const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getProductCategory: (id, params) => {
        const url = `/categories/${id}/products`
        return axiosClient.get(url, { params });
    },
    getProductById: (id) => {
        const url = `/products/${id}`
        return axiosClient.get(url)
    }
}

export default productApi;
