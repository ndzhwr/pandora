import React from "react";
import { useRouter  } from "next/router";
export interface SmallUserProps {
    id: string,
    username: string,
    profile: string,
    status: string
}

const SmallUser: React.FC<SmallUserProps> = (props: SmallUserProps) => {
    const router  = useRouter();
    return (
        <div className="w-full flex justify-between">
            <div className="flex justify-start items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img src={props.profile} alt="" className="w-10 h-10 object-cover cursor-pointer     rounded-full"  onClick={() => router.push(`/${props.id}`)}/>
                <div>
                    <h4 className="text-darkblue">{props.username}</h4>
                    <p className="text-sm text-opacity-70 text-darkblue
                    ">{props.status}</p>
                </div>
            </div>
            <button className="p-2  text-darkblue hover:bg-slate-50">Follow</button>
        </div>
    )
}

export default SmallUser