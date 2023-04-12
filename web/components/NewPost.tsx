import React from "react";
import { fetcher } from '../utils/api'


const NewPost: React.FC = () => {

    const [postData, setPostData] = React.useState<{ image: string, content: string }>({ content: "", image: "" })
    const [base64, setBase64] = React.useState<string | null>(null)
    const [file, setFile] = React.useState<any>(null)

    const handleSendPost = () => {
        (async function () {
            let res = await fetcher("posts/create", {
                body: { content : postData.content , postPicture: base64},
                method: 'POST',
                useToken: true,
                c_type : 'application/json'
            })                                 
            console.log(res);   
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
        <div className="bg-white border  p-4 rounded-xl shadow-slate-100 shadow-xl">
            <h2 className="mb-2 font-bold">Add a new post</h2>
                <textarea name="" id="" onChange={(e) => setPostData({ ...postData, content: e.target.value.trim() })} className="w-full border-none  bg-slate-50 rounded-md p-4  max-h-32 outline-none " maxLength={280} placeholder="What's on your mind"></textarea>`
                <div className="addons my-2 flex justify-between gap-2">
                    {!base64 && <button className="flex gap-1 items-center  px-2 py-1">
                        {/* <div className="main flex bg-slate-900 h-fit  border-2  justify-center w-full "> */}
                        <img src="/icons/image.svg" alt="" className="w-6 h-6  fill-darklue opacity-80 z-10" />
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
                    <button className=" px-4 py-2 rounded-full  border bg-blue-600  text-white text-sm" onClick={handleSendPost}>Add post</button>
                </div>
            {base64 && (
                <img src={base64} className="object-contain items-center rounded-md" />
            )}
        </div>
    )
}



export default NewPost;
