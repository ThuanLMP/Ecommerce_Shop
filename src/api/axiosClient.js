import axios from 'axios';
import { urlApi } from '../config/api';


const axiosClient = axios.create({
    baseURL: urlApi,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosClient;