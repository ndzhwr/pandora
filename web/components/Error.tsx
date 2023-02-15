import React from 'react';

interface ErrorProps {
    message : string ,
}
const ErrorMessage : React.FC<ErrorProps> = (props : ErrorProps) => {
    return (
        <div className="p-6 text-red-500     border-red-100 bg-red-50">&#9432; &nbsp;&nbsp; {props.message}</div>
    )
}

export default ErrorMessage