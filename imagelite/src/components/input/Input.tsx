import React from "react";

interface InputProps {
    value?: string;
    style?: string;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
}

export const Input: React.FC <InputProps> = ({value, style, ...etc}: InputProps) => {
    return (
        <input type='text' value={value} {...etc} className={`${style} border px-5 py-2 rounded-lg text-gray-900`}/>
    )
}