import { urlApi } from "../config/api"
import axiosClient from "./axiosClient";

const authApi = {
    login: (dataUser) => {
        const url = `${urlApi}/v1/auth/login`;
        return axiosClient.post(
            url,
            {
                email: dataUser.email,
                password: dataUser.password,
                deviceId: `deviceId-${dataUser.email}`
            }
        )
    },
    register: (dataUser) => {
        const url = `${urlApi}/v1/auth/register`;
        return axiosClient.post(
            url,
            {
                username: dataUser.username,
                email: dataUser.email,
                password: dataUser.password
            }
        )
    },
    forgotPassword: (email) => {
        const url = `${urlApi}/v1/auth/forgot-password`;
        return axiosClient.post(
            url,
            {
                email: email
            }
        )
    },
    logout: (dataLogout) => {
        const url = `${urlApi}/v1/auth/logout`;
        return axiosClient.post(
            url,
            {
                refreshToken: dataLogout.refreshToken,
                deviceId: dataLogout.deviceId
            }
        )
    }

}

export default authApi