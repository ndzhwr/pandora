import React from 'react';
import { useAuth } from '../store/useAuth';

interface ErrorProps {
    message: string,
}
const ErrorMessage: React.FC<ErrorProps> = (props: ErrorProps) => {
    const { setNotification } = useAuth();
    return (
        <div className="p-3  rounded-xl mx-auto bg-blue-500 text-white shadow-2xl flex items-center justify-between md:w-[300px] msm:w-full" style={{
            display: (props.message && (props.message.trim() != "")) ? "flex" : "none"
        }}>
            <span className="w-fit">{props.message}</span>
            <button onClick={() => setNotification(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
export default ErrorMessage