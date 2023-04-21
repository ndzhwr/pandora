import React from "react";



const Notfound = () => {
    return (
        <div className="flex items-center w-full h-screen" >
            <div className="w-fit    mx-auto">

                <h1 className="font-bold text-4xl"> Not found</h1>
                <p className="text-slate-600">Sorry, the page was not found</p>
                <button className="text-blue-500" onClick={() => history.back()}>&lt; Back to home</button>
            </div>
        </div>
    )
}


export default Notfound