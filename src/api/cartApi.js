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
    createCart: (dataCart) => {
        const url = `${urlApi}/v1/cart`;
        return axiosClient.post(
            url,
            {
                cart: dataCart.cart,
                itemArr: dataCart.itemArr
            },
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },
    updateItem: (quantity, total, id) => {
        const url = `${urlApi}/v1/cart/manage-item/${id}`;
        return axiosClient.patch(
            url,
            {
                quantity: quantity,
                total: total
            }
            ,
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },
    addItem: (dataItem) => {
        const url = `${urlApi}/v1/cart/create-item`;
        return axiosClient.post(
            url,
            {
                cartId: dataItem.cartId,
                productId: dataItem.productId,
                quantity: dataItem.quantity,
                price: dataItem.price,
                total: dataItem.total
            }
            ,
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },
    deleteItem: (id) => {
        const url = `${urlApi}/v1/cart/manage-item/${id}`;
        return axiosClient.delete(
            url,
            {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    }


}

export default cartApi