import React from "react";
import { useRouter  } from "next/router";
import { followUserHelper } from "../../utils/api";
export interface SmallUserProps {
    id: string,
    username: string,
    profile: string,
    status: string
    with_follow? : boolean
}

const SmallUser: React.FC<SmallUserProps> = (props: SmallUserProps) => {
        const router  = useRouter();

        const status = props.status.length > 14 ? props.status.slice(0,20) + "..." : props.status
    return (
        <div className="w-full flex  gap-2 justify-between">
            <div className="flex justify-start items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img src={props.profile} alt="" className="w-10 h-10  object-cover  cursor-pointer     rounded-full"  onClick={() => router.push(`/${props.id}`)}/>
                <div>
                    <h4 className="text-darkblue">{props.username}</h4>
                    <p className="text-[12px] text-opacity-70 text-darkblue truncate
                    " title={props.status} >{status}</p>
                </div>
            </div>
          { true && <button className="py-2 px-4  text-white rounded-full bg-black" onClick={() => followUserHelper(props.id)}>Follow</button> }  
        </div>
    )
}

export default SmallUser