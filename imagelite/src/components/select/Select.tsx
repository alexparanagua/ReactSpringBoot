import React from "react";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    options : SelectOption[];
    change: (event:any) => void;
}

export const Select: React.FC <SelectProps> = ({value, options, change}: SelectProps) => {
    return (
        <select className='border px-4 py-2 rounded-lg text-gray-900' value={value} onChange={change}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}