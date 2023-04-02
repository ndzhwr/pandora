import { type FC } from 'react'

interface InputProps {
    withLabel?: boolean
    label?: string
    placeholder?: string
    type?: string
    key: string,
    setStateHook : React.Dispatch<React.SetStateAction<any>>
}

const TextInput   :  FC<InputProps> = (props : InputProps) => {
    return (
        <div>
            {/* {props.withLabel && <label htmlFor={props.label} className="">{props.label}</label> } <br /> */}
            <input type={props.type || 'text'} className="px-6 my-2 py-4 text-sm  rounded-full outline-none   bg-offwhite bg-opacity-40  w-full" placeholder={props.placeholder} onChange={(e) => props.setStateHook(e.target.value)}/>
        </div>
    )
}


export default TextInput