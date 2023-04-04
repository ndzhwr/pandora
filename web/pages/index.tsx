import React, { useContext, useEffect, useState } from "react";
import { type NextPage } from "next";
import TextInput from "../components/TextInput";
import { useRouter } from "next/router";
import { useAuth } from "../store/useAuth";
import ErrorMessage from "../components/Error";
import { fetcher } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookie";
import Loader from "../components/Loader";

const Home: NextPage = () => {
    const router = useRouter()
    // signup data
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [signupPassword, setSignupPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>()

    // login data
    const [login_email, setLogin_email] = React.useState<string>("")
    const [login_password, setLogin_password] = React.useState<string>("")

    // ui states
    const [auth, setAuth] = useState<"signup" | "login">("signup")
    const [error, setError] = useState<string | null>(null)
    const [isloading, setIsLoading] = useState<boolean>(false)


    // Handlers

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        const data = await fetcher('auth/signup', {
            method: "POST",
            body: {
                username, email, password: signupPassword, confirmPassword
            },
            useToken: false
        })
        console.log(data);

        if (data.status == 200) {
            setCookie("accessToken", data.tokens.accessToken)
            setCookie("refreshToken", data.tokens.refreshToken)
            localStorage.setItem("user", JSON.stringify(data.user))
            console.log(getCookie("refreshToken"))
            router.push('/feed')
        } else {
            setError(data.message)
        }
        setIsLoading(false)
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const data = await fetcher('auth/login', {
            method: "POST",
            body: {
                email: login_email, password: login_password
            },
            useToken: false
        })
        console.log(data);
        if (data.status == 200) {
            setCookie("accessToken", data.tokens.accessToken)
            setCookie("refreshToken", data.tokens.refreshToken)
            localStorage.setItem("user", JSON.stringify(data.user))
            console.log(getCookie("refreshToken"))
            router.push('/feed')
        } else {
            setError(data.message)
        }
        setIsLoading(false)

    }
    useEffect(() => {
        router.push({
            pathname: router.pathname,
            query: {
                auth
            }
        })
    }, [auth])

    const handleToggleauth = (e: any) => {
        e.preventDefault();
        auth == "signup" ? setAuth("login") : setAuth("signup")
    }
    return (
        <>
            {auth == "signup" ? (
                <div style={{
                }} className="bg-cover  bg-no-repeat bg-offwhite  bg-opacity-30  items-center justify-between flex w-full h-screen">
                    <div className="lg:w-1/2 md:px-36  mx-auto  h-full msm:w-full msm:px-4  py-6  flex justify-start items-center  bg-blend-multiply">
                        <form className="md:w-full rounded-xl mx-auto bg-white md:p-10  msm:p-4 py-6">
                            {error && <ErrorMessage message={error}></ErrorMessage>}
                            <h1 className="font-bold text-4xl w-fit text-darkblue  py-4">Sign up</h1>
                            <TextInput key="username" placeholder="Choose a username" withLabel label="Username" setStateHook={setUsername} />
                            <TextInput key="email" placeholder="Your email address" withLabel label="Email address" setStateHook={setEmail} />
                            <TextInput key="password" placeholder="Password" withLabel label="Password" type="password" setStateHook={setSignupPassword} />
                            <TextInput key="confirmPassword" placeholder="Retype the password" withLabel label="Confirm password" type="password" setStateHook={setConfirmPassword} />
                            <span>Already have an account? <button onClick={handleToggleauth} className="text-blue-600 hover:underline  ">login</button></span>
                            <button className="bg-darkblue  rounded-full  text-white py-3 w-full mt-10  hover:shadow-xl" onClick={handleSubmit}>{isloading ? <Loader /> : "Sign up"}</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div style={{
                }} className="bg-cover w-full bg-no-repeat bg-offwhite  bg-opacity-30  items-center justify-between flex h-screen">
                    <div className="md:w-1/2  max-w-[600px]  mx-auto  h-full msm:w-full msm:px-4  py-6  flex justify-start items-center  bg-blend-multiply">
                        <form className="md:w-full rounded-xl  mx-auto bg-white md:p-10  msm:p-4 py-6">
                            {error && <ErrorMessage message={error}></ErrorMessage>}
                            <h1 className="font-bold text-4xl w-fit text-darkblue  py-4">Sign in</h1>
                            <TextInput key="email" placeholder="Your email address" withLabel label="Email address" setStateHook={setLogin_email} />
                            <TextInput key="password" placeholder="Password" withLabel label="Password" type="password" setStateHook={setLogin_password} />
                            <span>Don&apos;t have an account? <button onClick={handleToggleauth} className="text-blue-600 hover:underline">signup</button></span>
                            <button className="bg-darkblue rounded-full text-white py-3 w-full mt-10  hover:shadow-xl" onClick={handleLogin}>{isloading ? "Loading..." : "Sign in"}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )

}

export default Home
