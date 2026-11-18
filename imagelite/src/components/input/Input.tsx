import React from "react";

interface InputProps {
    value: string;
    change: (event:any) => void;
}

export const Input: React.FC <InputProps> = ({value, change}: InputProps) => {
    return (
        <input type='text' className='border px-5 py-2 rounded-lg text-gray-900' value={value} onChange={change}/>
    )
}