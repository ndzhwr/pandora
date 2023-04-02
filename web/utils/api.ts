import axios from 'axios'
import { deleteCookies, getCookie, setCookie } from './cookie'
import { log } from 'console';
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
    headers?: {},
    c_type?: string
}



export const fetcher = async (url: string, options: FetcherOptions) => {
    let response: any;
    console.log(options);
    try {

        let res = await fetch(`http://localhost:5000/${url}`, {
            method: options.method || "GET",
            body: JSON.stringify(options.body),
            headers: {
                "Content-Type": options.c_type ? options.c_type : "application/json",
                "authorization": options.useToken ? `Bearer ${getCookie("accessToken")}` : null,
                ...options.headers
            }
        })
        response = await res.json()
        console.log(response);

        if (response.message != undefined && response.message.name == "TokenExpiredError") {
            deleteCookies();
            let resp = await fetch("http://localhost:5000/auth/refreshToken", {
                method: "PUT",
                body: JSON.stringify({ refreshToken: getCookie("refreshToken") }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            resp = await resp.json()
            console.log("Response", resp);
            if (resp.status == 200) {
                setCookie("accessToken", resp["tokens"].accessToken)
                setCookie("refreshToken", resp["tokens"].refreshToken)
                fetcher(url, options)
            }
        } else {
            return response
        }
    } catch (error) {
        console.log(error);
        return "Something went wrong"
    }

}
