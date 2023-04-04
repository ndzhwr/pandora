import React, { useState } from "react";
import NewPost from "../../components/NewPost";
import NewsFeedPost from "../../components/NewsFeedPost";
import SmallUser from "../../components/User/SmallUser";
import Loader from "../../components/Loader";
import RecommendedPeople from "../../components/RecommendedPeople";
import { defaultProfile, getAllPostsHandler } from "../../utils/api";
import { Post } from "../../@types";
const Feed = () => {
    const[posts,setPosts] = useState<Post[]>(null)
    React.useEffect(() => { 
        (async function() {
            const alltheposts = await getAllPostsHandler() ;
            setPosts((alltheposts.success && alltheposts.success ==  true) ? alltheposts.data : null)
        }())
    } ,[])
    return (
        <div className="py-6   w-full  grid md:grid-cols-3 sm:grid-cols-1 ">
            <div className="sm:px-4   md:col-start-1 md:col-end-3 ">
                <NewPost />
                <div className="newpost flex  flex-col  md:my-3 msm:my-1  " id="scrollArea">
                    {
                        posts != null && posts.map((post) => (
                            <NewsFeedPost content={post.content} picture={post.picture} author={{ id: post.author.id, username: post.author.username, profile: post.author.profile ? post.author.profile.profilePicture :  defaultProfile ,  status: post.author.profile ? post.author.profile.status : "Hey there! I'm using Pandora" }} likes={post.likes} comments={post.comments} id={post.id } />
                        ))
                    }
                    <Loader />
                </div>
            </div>
            <RecommendedPeople/>
        </div>
    )
}

export default Feed