import React from "react";
import type {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: Extract<HTMLInputTypeAttribute, "text" | "password">
    error?: string;
    iconUrl?: string;
}

export const Input: React.FC<Props> = ({ label, error, iconUrl, ...props }) => {
    return (
        <div className="mb-5">
            {label && <div className="mb-1">{label}</div>}
            <div className="relative">
                {iconUrl ? <img className="absolute h-4 w-4 top-3 left-3" src={iconUrl} alt={props.name} /> : null}
                <input className={`h-10 w-full leading-10 border-1 rounded-md py-1 px-3 outline-none border-gray-200 focus:border-gray-400${error ? " border-red-500" : ''}${iconUrl ? " pl-9" : ''}`} {...props} />
                {error && <span className="text-red-500 text-xs absolute left-0 top-[40px]">{error}</span>}
            </div>
        </div>
    );
}
