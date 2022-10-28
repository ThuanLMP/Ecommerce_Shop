import { urlApi } from "../config/api";
import { b64DecodeUnicode } from "../utils/ultils";
import axiosClient from "./axiosClient";

const productsApi = {
    getAllCategories: () => {
        const url = `${urlApi}/v1/products/get-all-categories`;
        return axiosClient.get(
            url
        )
    },
    getAllProducts: (page, size) => {
        const url = `${urlApi}/v1/products`;
        return axiosClient.get(
            url,
            {
                params: {
                    page: page,
                    size: size
                }
            }
        )
    },
    getProductsByCategory: (value) => {
        const url = `${urlApi}/v1/products`;
        return axiosClient.get(
            url,
            {
                params: {
                    category: value
                }
            }

        )
    },
    getProductById: (id) => {
        const url = `${urlApi}/v1/products/${id}`;
        return axiosClient.get(
            url
        )
    },
    postReview: (dataReview) => {
        const url = `${urlApi}/v1/products/${dataReview.productId}/reviews`;
        return axiosClient.post(
            url,
            {
                content: dataReview.content,
                rating: dataReview.rating,
                productId: dataReview.productId
            },
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    uploadImg: (formData) => {
        const url = `${urlApi}/v1/uploads`;
        return axiosClient.post(
            url,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    createProduct: (dataProduct) => {
        const url = `${urlApi}/v1/products`;
        return axiosClient.post(
            url,
            dataProduct,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    updateImg: (urlImg, id) => {
        const url = `${urlApi}/v1/media/${id}`;
        return axiosClient.patch(
            url,
            {
                url: urlImg
            },
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    deleteImg: (id) => {
        const url = `${urlApi}/v1/products/${id}`;
        return axiosClient.delete(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    deleteProduct: (id) => {
        const url = `${urlApi}/v1/products/${id}`;
        return axiosClient.delete(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    updateProduct: (dataProduct, id) => {
        const url = `${urlApi}/v1/products/${id}`;
        return axiosClient.patch(
            url,
            dataProduct,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    }
}

export default productsApi