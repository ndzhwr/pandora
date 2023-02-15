/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import  data  from '../assets/data/data.json'
interface MainLayoutProps {
    children: React.ReactNode
}


const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
    const router = useRouter();

    return (
        <div className={`flex w-screen  h-full min-h-screen`}>
            <div className={`p-6      ${router.pathname == "/" && "hidden"} border-r `}>
                <div className="pl-6 pr-10 border-right">
                    <h4 className="font-mono ">Pandora</h4>
                    {
                        data.sections.map((section, index) => (
                            <button className="flex items-center gap-4 pl-4 pr-8 py-3 rounded-full  border  my-4" key={index}>
                                <img  className="opacity-90" src={section.icon} alt="" /><span className="capitalize">{section.name}</span>
                            </button>
                        ))
                    }
                </div>
            </div>

            {props.children}
        </div>
    )

}

export default MainLayout