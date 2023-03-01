import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import AddComment from "./post/AddComment";
import SmallUser, { SmallUserProps } from "./User/SmallUser";

interface NewsFeedPostProps {
    id: string,
    content: string,
    picture?: string,
    likes: any[],
    comments: any[],
    author: SmallUserProps
}


const NewsFeedPost: React.FC<NewsFeedPostProps> = (props: NewsFeedPostProps) => {
    const router = useRouter()

    const setPostId = () => {
        if (!router.query['postId']) {
            router.push({
                pathname: router.pathname,
                query: {
                    postId: props.id
                }
            })
        }
    }
    return (
        <>
            <div className="w-full  border  p-3 " >
                <SmallUser {...props.author} />
                <hr className="my-3 opacity-0" />
                <p className="text-xl cursor-pointer" onClick={setPostId}  >{props.content}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {props.picture && (<img src={props.picture} alt={props.content} className='object-cover w-full' />)}
                <hr className="my-3 opacity-0" />
                <div className="flex gap-6 justify-start my-2">
                    <button className="flex justify-start items-center"><img src="/icons/like.svg" alt="" className="w-6 h-4 " /><span>Like {props.likes.length}</span></button>
                    <button className="flex justify-start items-center"><img src="/icons/comment.svg" alt="" className="w-6 h-4" /><span>Comment {props.comments.length}</span></button>
                </div>
                <hr className="my-3 opacity-0" />
                <AddComment author={{ username: "ndhzwr", picture: "/images/image.jpg", id: "1123" }} postid="sgs5" />
            </div>
        </>
    )

}


export default NewsFeedPost