import React from 'react';
import { useAuth } from '../store/useAuth';

interface ErrorProps {
    message: string,
}
const ErrorMessage: React.FC<ErrorProps> = (props: ErrorProps) => {
    const { setError } = useAuth();
    return (
        <div className="p-6  rounded-xl  bg-red-100 shadow-2xl border-red-500 border  text-black flex items-center justify-between md:w-[300px] msm:w-full" style={{
            display: (props.message && (props.message.trim() != "")) ? "flex" : "none"
        }}>
            <span className="w-fit">{props.message}</span>
            <button onClick={() => setError(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
export default ErrorMessage