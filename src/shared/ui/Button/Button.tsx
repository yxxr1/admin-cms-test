import React from "react";
import type {ButtonHTMLAttributes} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
    return (
        <button className={`py-2 px-5 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 ${className}`} {...props}>{children}</button>
    );
}
