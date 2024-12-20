"use client";
import React from "react";

export const TextFormatter: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            {text.split(/\n/).map((line, index, array) => (
                <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                </React.Fragment>
            ))}
        </>
    );
};
