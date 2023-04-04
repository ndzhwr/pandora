import React from "react";
import NewPost from "../../components/NewPost";
import NewsFeedPost from "../../components/NewsFeedPost";
import SmallUser from "../../components/User/SmallUser";
import Loader from "../../components/Loader";
const Feed = () => {
    return (
        <div className="py-6   w-full  grid md:grid-cols-3 sm:grid-cols-1 ">
            <div className="sm:px-4   md:col-start-1 md:col-end-3 ">
                <NewPost />
                <div className="newpost flex  flex-col  md:my-3 msm:my-1  " id="scrollArea">
                    <NewsFeedPost content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <NewsFeedPost picture="/images/image.jpg" content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <NewsFeedPost content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <Loader />
                </div>
            </div>
            <div className=" h-fit py-6  sm:mx-4 md:col-start-3 md:col-end-4 border  rounded-xl shadow-slate-100 shadow-xl  ">
                <h3 className="text-md font-bold px-6">People</h3>
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