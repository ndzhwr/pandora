import React from "react";
import { api } from '../utils/api'

const NewPost: React.FC = () => {

    const [postData, setPostData] = React.useState<{ image: string, content: string }>({ content: "", image: "" })
    const [file, SetFile] = React.useState<any>(null)
    const handleSendPost = () => {
        (async function () {
            const res = await api().post("/post/create", {
                image: postData.image,
                content: postData.content
            }
            );
        }());
    }
    return (
        <div className="bg-white border  p-4">
            <h2 className="mb-2">Add a new post</h2>
            <textarea name="" id="" onChange={(e) => setPostData({ ...postData, content: e.target.value.trim() })} className="w-full border-b   py-2  max-h-32 outline-none " maxLength={280} placeholder="What's on your mind"></textarea>`
            <div className="addons my-2 flex justify-between gap-2">
                <button className="flex gap-2 items-center bordr p-2   hover:bg-slate-50">
                    <img src="/icons/image.svg" alt="" className="w-6 h-6  fill-darklue opacity-80" />
                    <span className="text-darkblue text-sm ">Add image</span>
                </button>
                <button className="p-2  border bg-darkblue  text-white text-sm" onClick={handleSendPost}>Add post</button>
            </div>
        </div>
    )
}



export default NewPost;
