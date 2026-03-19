import React from "react";

interface Props {
    title: string;
}

export const Delimiter: React.FC<Props> = ({ title }) => {
    return (
        <div className="flex my-3 items-center text-gray-600 before:block before:h-[1px] before:w-full before:bg-gray-200 before:mr-2 after:block after:h-[1px] after:w-full after:bg-gray-200 after:ml-2">{title}</div>
    );
}
