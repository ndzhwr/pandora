import React from "react";
import SmallUser from "./User/SmallUser";


const RecommendedPeople = () => {
    return (
        <div className=" h-fit p-3  w-full   border  rounded-xl shadow-slate-100">
            <h3 className="text-md font-bold px-2">People</h3>
            <div className="flex flex-col gap-4 mt-4 ">
                <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
                <SmallUser id="" username="Nessime" profile="/images/image.jpg" status="Rwanda the heart of Africa" />
            </div>
        </div>
    )
}

export  default RecommendedPeople
