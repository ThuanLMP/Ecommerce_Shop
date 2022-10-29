import { urlApi } from "../config/api"
import { b64DecodeUnicode } from "../utils/ultils";
import axiosClient from "./axiosClient";

const userApi = {
    getMyProfile: () => {
        const url = `${urlApi}/v1/users/my-profile`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    getAllUsers: (page, size) => {
        const url = `${urlApi}/v1/users`;
        return axiosClient.get(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                },
                params: {
                    page: page,
                    size: size
                }
            }
        )
    },
    createUser: (dataUser) => {
        const url = `${urlApi}/v1/users`;
        return axiosClient.post(
            url,
            dataUser,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    updateUser: (dataUser, id) => {
        const url = `${urlApi}/v1/users/${id}`;
        return axiosClient.patch(
            url,
            dataUser,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    updateContact: (contact) => {
        const url = `${urlApi}/v1/user/change-contact`;
        return axiosClient.patch(
            url,
            contact,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    },
    deleteUser: (id) => {
        const url = `${urlApi}/v1/users/${id}`;
        return axiosClient.delete(
            url,
            {
                headers: {
                    'Authorization': `bearer ${b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))}`
                }
            }
        )
    }

}

export default userApi