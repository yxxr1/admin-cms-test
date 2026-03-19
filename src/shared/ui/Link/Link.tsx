import React from "react";
import {Link as RouterLink} from "react-router";
import type {LinkProps} from "react-router";

interface Props extends LinkProps {
    title: string;
}

export const Link: React.FC<Props> = ({ title, ...props }) => {
    return (
        <RouterLink className="font-bold underline text-blue-600" {...props}>{title}</RouterLink>
    );
}
