import React from "react";
import NewPost from "../../components/NewPost";
import NewsFeedPost from "../../components/NewsFeedPost";
import SmallUser from "../../components/User/SmallUser";
import Loader from "../../components/Loader";
import RecommendedPeople from "../../components/RecommendedPeople";
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
            <RecommendedPeople/>
        </div>
    )
}

export default Feed