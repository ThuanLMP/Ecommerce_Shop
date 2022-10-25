import { urlApi } from "../config/api"
import { b64DecodeUnicode } from "../utils/ultils";
import axiosClient from "./axiosClient";

const productsApi = {
    getAllCategories: () => {
        const url = `${urlApi}/v1/products/get-all-categories`;
        return axiosClient.get(
            url
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
    }
}

export default productsApi