import { urlApi } from "../config/api"
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
                    'Authorization': `bearer ${localStorage.getItem('ACCESS_TOKEN_SHOP')}`
                }
            }
        )
    },
}
export default orderApi