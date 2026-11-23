import React from "react"

interface ButtonProps {
    color?: string;
    label?: string;
    onClick?: (event:any) => void;
    type?: "submit" | "button" | "reset" | undefined
    style?: string
}
export const Button: React.FC<ButtonProps> = ({color, label, onClick, type = "button", style = ''} : ButtonProps) => {
    return (
        <button className={`${color} text-white px-4 py-2 rounded-lg border hover:bg-gray-500 ${style}`} onClick={onClick}>
            {label}
        </button>
    )
}