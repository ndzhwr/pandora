import { useAuth } from "../store/useAuth";

export const setCookie = (key: string, value: string) => document.cookie = `${key}=${value};`


export const getCookie = (key: string) => {
    const cooky =
        document.cookie.split(';')
            .find(cooky => cooky.startsWith(key))

    if (cooky)
        return cooky.split("=")[1]
    else return ""
}
