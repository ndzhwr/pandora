import axios from 'axios'
import { getCookie } from './cookie'
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


interface FetcherOptions {
    body?: {}
    method?: "GET" | "POST" | "DELETE" | "PUT"
    useToken: boolean
    headers?: {}
}


export const fetcher = async (url: string, options: FetcherOptions) => {
    let response: any;
    console.log(options);
        let res = await fetch(`http://localhost:5000/${url}`, {
        method: options.method || "GET",
        body: JSON.stringify(options.body),
        headers: {
            "Content-Type" : "application/json",
            "authorization": options.useToken ? `Bearer ${getCookie("accessToken")}` : null,
            ...options.headers
        }
    })
    response = await res.json()
    return response

}
