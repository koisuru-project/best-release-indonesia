"use client";
import React from "react";
import { TextFormatter } from "./TextFormatter";
import { ReleaseLinks } from "./ReleaseLinks";
import { Release } from "../types";

export const ReleaseSection: React.FC<{
    title: string;
    releases?: Release[] | string;
}> = ({ title, releases }) => {
    if (!releases) {
        return (
            <div className="p-2">
                <p className="text-default-500 italic">No information available</p>
            </div>
        );
    }

    const releaseArray = typeof releases === "string" ? [{ description: releases }] : releases;

    return (
        <div className="space-y-2">
            {releaseArray.map((release, index) => (
                <div key={index} className="p-2 rounded-md bg-content2">
                    {release.name && (
                        <p className="font-semibold">
                            <TextFormatter text={release.name} />
                        </p>
                    )}
                    <p>{release.description && <TextFormatter text={release.description} />}</p>
                    {release.downloadLinks && (
                        <div className="mt-2">
                            <ReleaseLinks links={release.downloadLinks} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
