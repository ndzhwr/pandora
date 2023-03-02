import React, { useState } from "react";
import { useRouter } from "next/router";
import NewsFeedPost from "../components/NewsFeedPost";
import SmallUser from "../components/User/SmallUser";
const Feed = () => {
    const[activeSideSection,setActiveSideSection] = useState<"following" | "followers">("followers")
    const router = useRouter();
    return (
        <div className="   w-full flex ">
            <div className="w-2/3 border-r">
                <div
                    className="h-48 w-full bg-slate-200 object-cover"
                    style={{
                        backgroundImage: `url()`
                    }}></div>
                <div className="-mt-16 px-20">

                    <img src="/images/image.jpg" alt="" className="w-32 h-32 rounded-full  object-cover border-4 border-white" />
                    <div className="flex items-center justify-between">
                        <div className="w-fit">
                            <p className="font-bold text-2xl">{"@" + router.query['userId']} </p>
                            <p className="text-slate-600">Rwanda the heart of Africa</p>
                        </div>
                        <button className="py-2 px-6  bg-slate-900 text-white">Follow user</button>
                    </div>
                    <p className="py-2">Bio: 👩‍💻 Ts. developer - ⚡TechXplorer -  🧾 Talks about tech -  💬 Loves chit chatting with the devcommunity #techtwitter -  ⛺ github.com/ndzhwr - @RwCodingAcademy</p>
                    <p className="text-sm">Followed  by <span className="font-bold">@mozart</span></p>

                    <div className="posts mt-10">
                        <h1 className="text-xl my-2">Activity</h1>
                        <hr />
                        <NewsFeedPost content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <NewsFeedPost picture="/images/image.jpg" content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    </div>
                </div>
            </div>
            <div className="w-1/3 mt-10 mx-4">
            <div className="w-full  ">
                <button className={`w-1/2 py-2 ${ activeSideSection == "followers" && "border-b-2 border-blue-600 text-blue-600"}`} onClick={() => setActiveSideSection("followers")}>Followers</button>
                <button className={`w-1/2 py-2 ${ activeSideSection == "following" && "border-b-2 border-blue-600 text-blue-600"}`} onClick={() => setActiveSideSection("following")}> Following</button>

            </div>
                <div className="flex flex-col gap-4 mt-4 px-6">
                    <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                    <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                    <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                    <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                    <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                </div>
            </div>
        </div>
    )
}

export default Feed