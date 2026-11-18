import React from "react"

interface ButtonProps {
    color?: string;
    label?: string;
    onClick?: (event:any) => void;
    type?: "submit" | "button" | "reset" | undefined
}
export const Button: React.FC<ButtonProps> = ({color, label, onClick, type = "button"} : ButtonProps) => {
    return (
        <button className={`${color} text-white px-4 py-2 rounded-lg border hover:bg-gray-500`} onClick={onClick}>
            {label}
        </button>
    )
}