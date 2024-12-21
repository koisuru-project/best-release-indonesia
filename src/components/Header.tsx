"use client";

import React from "react";
import { Github } from "lucide-react";
import { Button } from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full border-b border-divider">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">Best Release Indonesia</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button as={Link} href="/" variant="light" className="text-default-600">
                            Home
                        </Button>
                        <Button as={Link} href="https://db.koisuru.web.id/" className="text-default-600">
                            Database Softsub
                        </Button>
                        <Button as={Link} href="/faq" variant="light" className="text-default-600">
                            FAQ
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        as="a"
                        href="https://github.com/Aruh1/best-release-indonesia"
                        target="_blank"
                        rel="noopener noreferrer"
                        isIconOnly
                        variant="light"
                        className="text-default-500"
                    >
                        <Github size={20} />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
