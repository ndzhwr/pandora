import React, { useContext } from "react";
import Icon from '../public/icon.svg'
import { type NextPage } from "next";
import TextInput from "../components/TextInput";
import Image from "next/image";
import { useAuth } from "../store/useAuth";
import { AuthProvider } from "../store/useAuth";



const Home: NextPage = () => {
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")
    const { signUp } = useAuth();
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await signUp(username, email, password, confirmPassword);
    }
    return (

        <div style={{
            background: ""
        }} className="bg-cover bg-no-repeat bg-offwhite h-screen bg-opacity-30 flex items-center justify-between">
            <div className="p-10 rounded-xl pl-24 md:block sm:hidden">
                <div className="flex flex-col items-center w-fit">

                    <div className="w-20 h-20 bg-primary rounded-full" />
                    <div className="w-40 -mt-10 bg-opacity-30 backdrop-blur-md h-20 bg-white " />
                </div>
                <h1 className="font-bold text-6xl w-fit text-darkblue ">Create <br />An account    </h1>
                <p className="text-placeholder mt-4 text-normal">Welcome in the rocket, <br /> We're really amazed you've maanaged to reach here, <br />Let's get you signed up</p>
                <button className="text-primary flex items-center mt-4 cursor-pointer">I already have an account &nbsp;&gt;&gt; </button>
            </div>
            <div className="w-1/2  bg-white h-full px-28 py-6 w-">

                <form className="">
                    <div className="p-6 bg-offwhite w-fit rounded-full mx-auto flex align-center items-between">
                        <Image src={Icon.src} width={Icon.width} height={Icon.height} className="shadow-sm" />
                    </div>
                    <h4 className="text-xl font-bold ">Create account</h4>
                    <TextInput key="username" placeholder="Choose a username" withLabel label="Username" setStateHook={setUsername} />
                    <TextInput key="email" placeholder="Your email address" withLabel label="Email address" setStateHook={setEmail} />
                    <TextInput key="password" placeholder="Password" withLabel label="Password" type="password" setStateHook={setPassword} />
                    <TextInput key="confirmPassword" placeholder="Retype the password" withLabel label="Confirm password" type="password" setStateHook={setConfirmPassword} />
                    <button className="bg-primary text-white py-4 w-full mt-10 font-bold rounded-md hover:shadow-xl" onClick={handleSubmit}>Sign up</button>
                </form>
            </div>
        </div>
    )

}

export default Home