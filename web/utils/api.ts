import axios from 'axios'
import { getCookie }  from './cookie' 
export const api = () => {
    const token = getCookie("accessToken");
    return axios.create({
        baseURL: 'http://localhost:5000',
        // baseURL: "https://pandora-monorepo-api.onrender.com"
        headers: {
            'Authorization': `Bearer ${token}`
        }

    })
}
