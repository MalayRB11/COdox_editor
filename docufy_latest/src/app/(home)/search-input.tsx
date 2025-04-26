"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

import { useSearchParam } from "@/hooks/use-search-params";

export const SearchInput = () => {
    const [search, setSearch ] = useSearchParam();
    const [value, setValue] = useState(search);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    };

    return (
        <div className="flex-1 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative max-w-[720px] w-full focus-within:ring-2 focus-within:ring-blue-200 focus-within:ring-offset-2 focus-within:ring-offset-transparent transition-all duration-200 rounded-full"
            >
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Search"
                    className="md:text-base text-black placeholder:text-neutral-800 px-14 w-full border-none bg-[#f0f4f8] rounded-full h-[48px] focus-visible:outline-none focus:bg-white" 
                    
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full text-black"
                >
                    <SearchIcon />
                </Button>
                {value && (
                <Button
                onClick={handleClear }
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <XIcon />
                </Button>
                )}
            </form>
        </div>
    )
}