import { urlApi } from "../config/api"
import axiosClient from "./axiosClient";

const userApi = {
    getMyProfile: () => {
        const url = `${urlApi}/v1/users/my-profile`;
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

export default userApi