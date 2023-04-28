import React from "react";
import { fetcher } from '../utils/api'
import Loader from "./Loader";
import { useAuth } from "../store/useAuth";
import Image from "next/image";

const NewPost: React.FC = () => {

    const [postData, setPostData] = React.useState<{ image: string, content: string }>({ content: "", image: "" })
    const [base64, setBase64] = React.useState<string | null>(null)
    const [file, setFile] = React.useState<any>(null)
    const [loading,setLoading] =  React.useState<boolean>(false)

    const  {  setNotification } = useAuth()
    const handleSendPost = () => {
        if(postData.content.trim() == "") { 
            setNotification("Couldn't add an empty post!")
            return
        }
        (async function () {
            setLoading(true);
            let res = await fetcher("posts/create", {
                body: { content : postData.content , postPicture: base64},
                method: 'POST',
                useToken: true,
                c_type : 'application/json'
            })  
            console.log(res)
            setNotification(res.success != undefined ? res.success == true ? "You added a  new post " : "Something went wrong" : "Something went wrong")              
            setLoading(false);
        }());  
 

    }

    const handleFileChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setBase64(reader.result as string)
            })
            setFile(file)
        }
    }

    return (
        <div className="bg-white border shadow-md p-4 rounded-xl shadow-slate-100">
            <h2 className="mb-2 font-bold">Add a new post</h2>
                <textarea name="" id="" onChange={(e) => setPostData({ ...postData, content: e.target.value.trim() })} className="w-full border-none  bg-slate-50 rounded-md p-4 resize-none max-h-32 outline-none " maxLength={280} placeholder="What's on your mind"></textarea>`
                <div className="addons my-2 flex justify-between gap-2">
                    {!base64 && <button className="flex gap-1 items-center  px-2 py-1">
                        {/* <div className="main flex bg-slate-900 h-fit  border-2  justify-center w-full "> */}
                        <Image src="/icons/image.svg" alt="" className="w-6 h-6  fill-darklue opacity-80 z-10" width="24px" height={"24px"} />
                        <label className="  px-4 py-2 rounded-full    text-slate text-sm cursor-pointer  font-bold   ">
                            Add Image
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                placeholder="Select from computer"
                                id="image"
                                name="image"
                            />
                        </label>
                        {/* </div> */}
                        <input type="file" name="" id="" className="hidden" placeholder="Add Image" />
                        {/* <span className="text-darkblue text-sm ">Add image</span> */}
                    </button>
                    }
                    {
                        base64 && <button className="px-2 py-3   bg-slate-100  text-red-600 text-sm" onClick={() => { setBase64(null); setFile(null) }}>Remove image</button>
                    }
                    <button className=" px-4 py-2 rounded-full  border bg-blue-600  text-white text-sm" onClick={handleSendPost}>{loading ? <Loader /> :  "Add post"}</button>
                </div>
            {base64 && (
                <Image src={base64} className="object-contain items-center rounded-md" alt="Post media"/>
            )}
        </div>
    )
}



export default NewPost;
