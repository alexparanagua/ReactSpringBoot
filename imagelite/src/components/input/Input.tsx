import React from "react";

interface InputProps {
    value?: string;
    style?: string;
    onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
    id?: string;
    type?: string
}

export const Input: React.FC <InputProps> = ({value, style, type = "text", ...etc}: InputProps) => {
    return (
        <input type={type} value={value} {...etc} className={`${style} border px-5 py-2 rounded-lg text-gray-900`}/>
    )
}