"use client";
import React from "react";
import { Link } from "@nextui-org/react";
import { ExternalLink } from "lucide-react";

export const ReleaseLinks: React.FC<{ links: string | string[] }> = ({ links }) => {
    const linkArray = Array.isArray(links) ? links : [links];

    return (
        <div className="flex flex-col gap-2">
            {linkArray.map((link, index) => (
                <Link
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <ExternalLink size={16} />
                    Download Link {linkArray.length > 1 ? `#${index + 1}` : ""}
                </Link>
            ))}
        </div>
    );
};
