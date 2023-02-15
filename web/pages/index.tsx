import React, { useContext, useEffect, useState } from "react";
import { type NextPage } from "next";
import TextInput from "../components/TextInput";
import { useRouter } from "next/router";
import { useAuth } from "../store/useAuth";
import ErrorMessage from "../components/Error";

const Home: NextPage = () => {
    const router = useRouter()
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [signupPassword, setSignupPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>()
    const [auth, setAuth] = useState<"signup" | "login">("signup")
    const { signUp, loading } = useAuth();
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await signUp(username, email, signupPassword, confirmPassword);
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
                }} className="bg-cover bg-no-repeat bg-offwhite  bg-opacity-30  items-center justify-between flex w-full h-screen">
                    <div className="md:w-1/2 md:px-36  mx-auto  h-full msm:w-full msm:px-4  py-6  flex justify-start items-center  bg-blend-multiply">
                        <form className="md:w-full  mx-auto bg-white md:p-10  msm:p-4 py-6">
                            <ErrorMessage message="An error occured"></ErrorMessage>
                            <h4 className="font-mono">Pandora</h4>
                            <h1 className="font-bold text-4xl w-fit text-darkblue  py-4">Sign up</h1>
                            <TextInput key="username" placeholder="Choose a username" withLabel label="Username" setStateHook={setUsername} />
                            <TextInput key="email" placeholder="Your email address" withLabel label="Email address" setStateHook={setEmail} />
                            <TextInput key="password" placeholder="Password" withLabel label="Password" type="password" setStateHook={setSignupPassword} />
                            <TextInput key="confirmPassword" placeholder="Retype the password" withLabel label="Confirm password" type="password" setStateHook={setConfirmPassword} />
                            <span>Already have an account? <button onClick={handleToggleauth} className="text-darkblue underline">login</button></span>
                            <button className="bg-darkblue   text-white py-3 w-full mt-10  hover:shadow-xl" onClick={handleSubmit}>{loading ? "Loading..." : "Sign up"}</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div style={{
                }} className="bg-cover w-full bg-no-repeat bg-offwhite  bg-opacity-30  items-center justify-between flex h-screen">
                    <div className="md:w-1/2 md:px-36  mx-auto  h-full msm:w-full msm:px-4  py-6  flex justify-start items-center  bg-blend-multiply">
                        <form className="md:w-full  mx-auto bg-white md:p-10  msm:p-4 py-6">
                            <h4 className="font-mono">Pandora</h4>
                            <h1 className="font-bold text-4xl w-fit text-darkblue  py-4">Sign in</h1>
                            <TextInput key="email" placeholder="Your email address" withLabel label="Email address" setStateHook={setEmail} />
                            <TextInput key="password" placeholder="Password" withLabel label="Password" type="password" setStateHook={setSignupPassword} />
                            <span>Don&apos;t have an account? <button onClick={handleToggleauth} className="text-darkblue underline">signup</button></span>
                            <button className="bg-darkblue text-white py-3 w-full mt-10  hover:shadow-xl" onClick={handleSubmit}>{loading ? "Loading..." : "Sign in"}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )

}

export default Home