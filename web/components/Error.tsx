import React from 'react';

interface ErrorProps {
    message : string ,
}
const ErrorMessage : React.FC<ErrorProps> = (props : ErrorProps) => {
    return (
        <div className="p-6  rounded-xl   bg-red-600 text-white">{props.message}</div>
    )
}

export default ErrorMessage