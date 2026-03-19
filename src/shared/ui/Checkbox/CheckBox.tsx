import React from "react";
import type {InputHTMLAttributes} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export const CheckBox: React.FC<Props> = ({ label, ...props }) => {
    return (
        <div className="mb-5">
            <input type="checkbox" {...props} />
            <label htmlFor={props.name} className="text-gray-600 ml-2">{label}</label>
        </div>
    );
}
