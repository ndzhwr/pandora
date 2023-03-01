import React from "react";
import NewPost from "../../components/NewPost";
import NewsFeedPost from "../../components/NewsFeedPost";
import SmallUser from "../../components/User/SmallUser";

const Feed = () => {
    React.useEffect(() => {
       console.log("Hello world");
    }, [])
    return (
        <div className="p-6  w-full flex ">
            <div className="w-2/3 px-20">
                <h3 className="text-xl font-medium mb-3">News feed   </h3>
                <NewPost />
                <div className="newpost flex  flex-col gap-2 my-10  " id="scrollArea">
                    <NewsFeedPost content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <NewsFeedPost picture="/images/image.jpg" content="The qick brown fox jumps over the lazy dog when money was making man mad" author={{ id: "1101", username: "username", profile: "/images/image.jpg", status: "Rwanda the heart of africa" }} likes={[]} comments={[]} id="sdfsdf232fdg" />
                    <section id="myelement" className="h-4 w-1  bg-black mx-auto opacity-60 animate-spin"></section>
                </div>
            </div>
            <div className="w-1/3">
                <h3 className="text-xl font-medium">People you might know   </h3>
                <div className="flex flex-col gap-4 mt-4">
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