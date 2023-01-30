import { type FC } from 'react'

interface InputProps {
    withLabel?: boolean
    label?: string
    placeholder?: string
    type?: string
    value?: string
}

const TextInput   :  FC<InputProps> = (props : InputProps) => {
    return (
        <div>
            {props.withLabel && <label htmlFor={props.label} className="text-sm">{props.label}</label> } <br />
            <input type={props.type || 'text'} className="px-4 my-2 py-4  border-placeholder bg-offwhite bg-opacity-40 rounded-md w-full focus:outline focus:outline-placeholder" placeholder={props.placeholder} value={props.value} />
        </div>
    )
}


export default TextInput