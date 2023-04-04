import React from "react";
import SmallUser from "./User/SmallUser";


const RecommendedPeople = () => {
    return (
        <div className=" h-fit py-6  w-full   border  rounded-xl shadow-slate-100 shadow-xl  ">
            <h3 className="text-md font-bold px-6">People</h3>
            <div className="flex flex-col gap-4 mt-4 px-6">
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
