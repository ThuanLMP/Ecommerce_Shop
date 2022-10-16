import { urlApi } from "../config/api"
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
    }
}

export default productsApi