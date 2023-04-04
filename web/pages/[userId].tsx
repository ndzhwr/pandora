import React, { useState } from "react";
import { useRouter } from "next/router";
import NewsFeedPost from "../components/NewsFeedPost";
import SmallUser from "../components/User/SmallUser";
import Loader from "../components/Loader";
import RecommendedPeople from "../components/RecommendedPeople";
const Feed = () => {
    const [activeSection, setActiveSection] = useState<"activity" | "following" | "followers">("activity")
    const router = useRouter();

    const author = { id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" };
    return (
        <div className="py-6   w-full  grid md:grid-cols-3 sm:grid-cols-1 ">
            <div className=" md:col-start-1 md:col-end-3 border-r">
                <div
                    className="h-48 w-full bg-slate-100 object-cover"
                    style={{
                        backgroundImage: `url()`
                    }}></div>
                <div className="-mt-16 px-6">
                    <img src="/images/image.jpg" alt="" className="w-32 h-32 rounded-full  object-cover border-4 border-white" />
                    <div className="flex items-center justify-between">
                        <div className="w-fit">
                            <p className="font-bold text-2xl">{"@" + router.query['userId']} </p>
                            <p className="text-slate-600">Rwanda the heart of Africa</p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <button className="py-4 px-6  border-2 border-black rounded-full text-black ">Edit</button>
                        <button className="py-4 px-6  bg-blue-500 rounded-full text-white ">Follow</button>
                        </div>
                    </div>
                    <p className="py-2">Just a someone</p>
                    <p className="text-sm">Followed  by <span className="font-bold">@mozart</span></p>

                    <div className="posts mt-10">
                        <div className=" flex items-center px-2 rounded-sm justify-between sticky top-0 pt-6  bg-white shadow-slate-100 shadow-sm">
                            <button className={`my-2 w-fit px-4 border-b-2 border-white pb-4 ${activeSection == "activity" ? "text-blue-500  border-blue-500" : ""}`} onClick={() => setActiveSection("activity")}>Activity</button>
                            <button className={`my-2 w-fit  px-4 border-b-2 border-white pb-4 ${activeSection == "followers" ? "text-blue-500  border-blue-500" : ""}`} onClick={() => setActiveSection("followers")}>Followers</button>
                            <button className={`my-2 w-fit  px-4 border-b-2 border-white pb-4 ${activeSection == "following" ? "text-blue-500  border-blue-500" : ""}`} onClick={() => setActiveSection("following")}>Following</button>
                        </div>
                        {activeSection == "activity" && <div>
                            <NewsFeedPost content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                            <NewsFeedPost picture="/images/image.jpg" content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                            <Loader />
                        </div>}
                        {activeSection == "followers" && <div className="mt-10 flex flex-col gap-4">
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <Loader />
                        </div>}
                        {activeSection == "following" && <div className="mt-10 flex flex-col gap-4">
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <SmallUser {...author} with_follow={true} />
                            <Loader />
                        </div>}

                    </div>
                </div>
            </div>
            <div className="col-start-3 col-end-4 mt-4 mx-2">

                {/* <RecommendedPeople /> */}
            </div>

        </div>
    )
}

export default Feed