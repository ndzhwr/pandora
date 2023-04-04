import React from "react";



const Notfound = () => {
    return (
        <div className="flex items-center w-full h-screen" >
            <div className="w-fit p-4   mx-auto">

                <h1 className="font-bold text-xl">🥱 Feature not available</h1>
                <p className="text-slate-600">Sorry, this feature is still under development, be trying others</p>
                <button className="text-blue-500 py-2" onClick={() => history.back()}>Go back</button>
            </div>
        </div>
    )
}


export default Notfound