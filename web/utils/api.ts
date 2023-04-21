import axios from 'axios'
import { deleteCookies, getCookie, setCookie } from './cookie'
import { Post } from '../@types';
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
    try {

        let res = await fetch(`http://localhost:5000/${url}`, {
            method: options.method || "GET",
            body: JSON.stringify(options.body),
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Content-Type": options.c_type ? options.c_type : "application/json",
                "authorization": options.useToken ? `Bearer ${getCookie("accessToken")}` : null,
                ...options.headers
            }
        })  
        response = await res.json()
        if (response.message == "Unauthorized" || (response.message != undefined && response.message.name == "TokenExpiredError")) {
            if (getCookie("refreshToken") == "") return window.location.href = "/?auth=login"
            else {
                let resp = await fetch("http://localhost:5000/auth/refreshToken", {
                    method: "PUT",
                    body: JSON.stringify({ refreshToken: getCookie("refreshToken") }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                resp = await resp.json()
                if (resp.status == 200) {
                    deleteCookies();
                    setCookie("accessToken", resp["tokens"].accessToken)
                    setCookie("refreshToken", resp["tokens"].refreshToken)
                    fetcher(url, options)
                }
            }
        } else {
            return response;
        }
    } catch (error) {
        return "Something went wrong"
    }

}



export const followUserHelper = (userId: string) => {
    try {
        (async function () {
            let res = await fetcher("profile/followUser", {
                body: { userId },
                method: "PUT",
                useToken: true,
                c_type: "application/json"
            })
        }());
    } catch (error) {
    }
}

export const logoutHandler = () => {
    try {
        (async function () {
            let res: { success: boolean, message: string } = await fetcher("auth/logout", {
                method: "PUT",
                useToken: true,
            })
            if (res.success) {
                deleteCookies();
                window.location.href = "/"
            }
        }());
    } catch (error) {
    }
}

export const getAllPostsHandler = () : Promise<{ success : boolean , data  : Post[] }>  => {
    return new Promise((resolve, reject) => {
        try {
            (async function () {
                let res: { success: boolean, data: Post[] } = await fetcher("posts/getAllPosts", {
                    method: "GET",
                    useToken: true,
                })
                console.log(res)
                resolve(res)
            }());
        } catch (error) {
            reject(error)
        }
    })
}
export const getSinglePostHandler = (postId  : string) : Promise<{ success : boolean , data  : Post }>  => {
    return new Promise((resolve, reject) => {
        try {
            let data: any;
            (async function () {
                let res: { success: boolean, data: Post } = await fetcher(`posts/getPostById?postId=${postId}`, {
                    method: "GET",
                    useToken: true,
                })
                resolve(res)
            }());
        } catch (error) {
            reject(error)
        }
    })
}

export const defaultProfile : string  = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"   ;