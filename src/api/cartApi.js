import { urlApi } from "../config/api"
import axiosClient from "./axiosClient";


const cartApi = {
    getMyCart: () => {
        const url = `${urlApi}/v1/cart/my-carts`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },
    getCartById: (id) => {
        const url = `${urlApi}/v1/cart/${id}`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },


}

export default cartApi