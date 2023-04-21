export const setCookie = (key: string, value: string) => { document.cookie = `${key}=${value};` }


export const getCookie = (key: string) => {
    const cooky =
        document.cookie.split(';')
            .find(cooky => cooky.trim().startsWith(key))

    if (cooky)
        return cooky.split("=")[1]
    else return ""
}


export const deleteCookie = (key: string) => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if(name ==  key)    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

export const deleteCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}