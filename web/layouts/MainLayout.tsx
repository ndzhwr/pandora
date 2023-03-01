/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from '../assets/data/data.json'
import SmallUser from "../components/User/SmallUser";
import AddComment from "../components/post/AddComment";
import Loader from "../components/Loader";
interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
    const router = useRouter();
    const [postId, setPostId] = useState<string | null>(null)
    const [postData, setPostData] = useState<{} | null>(null)
    useEffect(() => {
        setPostId(router.query['postId'] as string)
    }, [router])


    const handleClosePortal = () => {
        // router.push({
        //     pathname : router.pathname ,
        // })
        history.back()
    }

    return (
        <>
            <div className={`flex h-full min-h-screen min-w-screen relative`}>
                <div className={`py-6 px-10  max-h-screen sticky top-0 ${router.pathname == "/" && "hidden"} border-r `}>
                    <div className="p-6 border-right  flex flex-col justify-between h-full">
                        <div>
                            <h4 className="text-2xl ">Pandora</h4>
                            {
                                data.sections.map((section, index) => (
                                    <button className="flex items-center gap-4 pl-4 pr-20 py-3   my-4 hover:bg-slate-50 duration-100" key={index} onClick={() => router.push(`/${section.name != "profile" ? section.name : localStorage.getItem("userId")}`)}>
                                        <img className="opacity-90" src={section.icon} alt="" /><span className="capitalize">{section.name}</span>
                                    </button>
                                ))

                            }
                        </div>
                        <button className="bg-slate-50  py-4 ">Logout</button>
                    </div>
                </div>

                {props.children}
            </div>
            {postId && <div className="fixed  w-screen h-screen  bg-[#fff] backdrop-blur-md z-30 top-0 bg-opacity-90 bottom-0 flex px-32">
                {postData && (
                    <>
                        {true && (<img src={'/images/image.jpg'} alt={"Lorem ipsum"} className='object-cover  ' />)}
                        <div className="  p-3 border w-full ">
                            <SmallUser id="sg45" username="ndzhwr" profile="/images/image.jpg" status="Rwanda the heart of africa" />
                            <hr className="my-3 opacity-0" />
                            <p className="text-xl">Lorem ipsum</p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <hr className="my-3 opacity-0" />
                            <div className="flex gap-6 justify-start my-2">
                                <button className="flex justify-start items-center"><img src="/icons/like.svg" alt="" className="w-6 h-4 " /><span>Like {0}</span></button>
                                <button className="flex justify-start items-center"><img src="/icons/comment.svg" alt="" className="w-6 h-4" /><span>Comment {10}</span></button>
                            </div>
                            <hr className="my-3 opacity-0" />
                            <AddComment author={{ username: "ndhzwr", picture: "/images/image.jpg", id: "1123" }} postid="sgs5" />
                        </div>
                    </>
                )}
                {!postData &&
                    <div className="w-full h-fulll flex items-center justify-between">
                        <Loader/>
                    </div>

                }
                <button className="absolute  left-0 top-0 bg-slate-100 bg-opacity-80 w-8 h-8 rounded-full text-slate-700" onClick={handleClosePortal}>X</button>
            </div>}
        </>
    )

}

export default MainLayout