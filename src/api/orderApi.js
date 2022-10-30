import { urlApi } from "../config/api"
import { b64DecodeUnicode } from "../utils/ultils";
import axiosClient from "./axiosClient";


const orderApi = {
    createOrder: (dataOrder) => {
        const url = `${urlApi}/v1/orders`;
        return axiosClient.post(
            url,
            dataOrder
            ,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    getMyOrders: () => {
        const url = `${urlApi}/v1/orders/my-orders`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    getAllOrders: (page,size) => {
        const url = `${urlApi}/v1/orders`;
        return axiosClient.get(
            url,
            {
                params: {
                    page: page,
                    size: size
                },
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    updateOrder: (dataOrder, id) => {
        const url = `${urlApi}/v1/orders/${id}`;
        return axiosClient.patch(
            url,
            dataOrder,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    getOrderById: (id)=>{
        const url = `${urlApi}/v1/orders/${id}`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    }
}
export default orderApi