"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => {
    return (
        <Input
            isClearable
            startContent={<Search className="text-default-400" size={16} />}
            placeholder="Search by title..."
            value={value}
            onClear={onClear}
            onChange={e => onChange(e.target.value)}
            className="w-full sm:max-w-[44%]"
        />
    );
};
