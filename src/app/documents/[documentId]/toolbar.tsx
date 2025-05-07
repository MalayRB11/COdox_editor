"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ColorResult, SketchPicker } from "react-color";
import { type Level } from "@tiptap/extension-heading";
import { 
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ChevronDownIcon,
    HighlighterIcon,
    ImageIcon,
    ItalicIcon, 
    Link2Icon, 
    ListCollapseIcon, 
    ListIcon, 
    ListOrderedIcon, 
    ListTodoIcon, 
    LucideIcon, 
    MessageSquarePlusIcon, 
    MinusIcon, 
    PlusIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon, 
    UnderlineIcon, 
    Undo2Icon, 
    UploadIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LineHeightButton = () => {
    const { editor } = useEditorStore();

    const lineHeights = [
        { label: "Default", value: "normal" },
        { label: "Single", value: "1" },
        { label: "1.15", value: "1.15" },
        { label: "1.5", value: "1.5" },
        { label: "Double", value: "2" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "active:scale-95"
                    )}
                    title="Line Height" // Tooltip using title attribute
                >
                    <ListCollapseIcon className="size-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-xl rounded-xl">
                {lineHeights.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-3 py-2 rounded-md text-sm transition-all",
                            "hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-red-200 hover:text-indigo-900",
                            editor?.getAttributes("paragraph").lineHeight === value &&
                                "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
                        )}
                        title={label} // Added title attribute for tooltip
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
        : "16";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    };

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    };

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString());
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {/* Decrement Button with Tooltip */}
            <button
                onClick={decrement}
                className="h-9 w-9 flex items-center justify-center rounded-full shadow-md bg-[#d6eaf8] text-blue-950 transition-all hover:scale-110 hover:bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 hover:text-white active:scale-95"
                title="Decrease Font Size" // Added title attribute for tooltip
            >
                <MinusIcon className="size-5" />
            </button>

            {/* Font Size Input with Tooltip */}
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-9 w-14 text-sm text-center border border-neutral-300 rounded-full bg-white shadow-inner focus:outline-none transition-all"
                    title="Edit Font Size" // Added title attribute for tooltip
                />
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize);
                    }}
                    className="h-9 w-14 text-sm text-center border border-neutral-300 rounded-full bg-[#d6eaf8] shadow-md cursor-pointer hover:scale-105 transition-all"
                    title="Edit Font Size" // Added title attribute for tooltip
                >
                    {currentFontSize}
                </button>
            )}

            {/* Increment Button with Tooltip */}
            <button
                onClick={increment}
                className="h-9 w-9 flex items-center justify-center rounded-full shadow-md bg-[#d6eaf8] text-blue-950 transition-all hover:scale-110 hover:bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 hover:text-white active:scale-95"
                title="Increase Font Size" // Added title attribute for tooltip
            >
                <PlusIcon className="size-5" />
            </button>
        </div>
    );
};

const ListButton = () => {
    const { editor } = useEditorStore();

    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "active:scale-95"
                    )}
                    title="List Options" // Keep title attribute for the main icon button
                >
                    <ListIcon className="size-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg rounded-xl">
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn(
                            "flex items-center gap-x-2 px-3 py-2 rounded-md text-sm transition-all",
                            "hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-red-200 hover:text-indigo-900",
                            isActive() && "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
                        )}
                    >
                        <Icon className="size-4" />
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const AlignButton = () => {
    const { editor } = useEditorStore();

    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon,
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon,
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon,
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon,
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 hover:text-white",
                        "active:scale-95"
                    )}
                    title="Align Text" // Keep title attribute for the main icon button
                >
                    <AlignLeftIcon className="size-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg rounded-xl">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-3 py-2 rounded-md text-sm transition-all",
                            "hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-red-200 hover:text-indigo-900",
                            editor?.isActive({ textAlign: value }) &&
                                "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
                        )}
                    >
                        <Icon className="size-4" />
                        <span>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(editor?.getAttributes("link").href || "");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        };
        input.click();
    };

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        title="Insert Image"
                        className={cn(
                            "h-9 w-9 flex items-center justify-center rounded-full transition-all",
                            "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                            "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                            "active:scale-95"
                        )}
                    >
                        <ImageIcon className="size-5" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-xl rounded-xl p-1">
                    <DropdownMenuItem
                        onClick={onUpload}
                        className="flex items-center gap-x-2 px-3 py-2 rounded-md transition-all hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-red-200 hover:text-indigo-900"
                    >
                        <UploadIcon className="size-4" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center gap-x-2 px-3 py-2 rounded-md transition-all hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-red-200 hover:text-indigo-900"
                    >
                        <SearchIcon className="size-4" />
                        Paste image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-xl border border-purple-200 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-purple-700">Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="https://example.com/image.png"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                        className="mt-2"
                    />
                    <DialogFooter>
                        <Button
                            onClick={handleImageUrlSubmit}
                            className="bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90"
                        >
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    };

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open) {
                    setValue(editor?.getAttributes("link").href || "");
                }
            }}
        >
            <DropdownMenuTrigger asChild>
                <button
                    title="Add Link"
                    className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "active:scale-95"
                    )}
                >
                    <Link2Icon className="size-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white shadow-xl rounded-xl p-3 flex flex-col gap-2 min-w-[260px]">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="rounded-full border border-purple-300 focus:border-purple-500 focus:ring-0 transition-all"
                />
                <Button
                    onClick={() => onChange(value)}
                    className="w-full bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 text-white rounded-full hover:opacity-90 transition-all"
                >
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    title="Text Color"
                    className={cn(
                        "h-9 w-9 flex flex-col items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "active:scale-95"
                    )}
                >
                    <span className="text-[13px] font-semibold">A</span>
                    <div
                        className="h-1 w-4 rounded-full mt-0.5"
                        style={{ backgroundColor: value }}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 bg-white shadow-xl rounded-xl">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                    className="!justify-center"
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("highlight").color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    title="Highlight Color"
                    className={cn(
                        "h-9 w-9 flex flex-col items-center justify-center rounded-full transition-all",
                        "bg-[#d6eaf8] text-blue-950 shadow-md hover:shadow-lg",
                        "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "active:scale-95"
                    )}
                >
                    <HighlighterIcon className="size-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 bg-white shadow-xl rounded-xl">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                    className="!justify-center"
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }

        return "Normal text";
    };

    const currentHeading = getCurrentHeading();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    title="Heading Level"
                    className={cn(
                        "h-9 w-[140px] flex items-center justify-between rounded-full px-3 text-sm font-medium transition-all",
                        "bg-[#d6eaf8] shadow-md hover:shadow-lg hover:scale-105",
                        "hover:bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 hover:text-white",
                        "text-blue-950"
                    )}
                >
                    <span className="truncate">{currentHeading}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg rounded-xl">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                        key={value}
                        style={{ fontSize }}
                        className={cn(
                            "flex items-center gap-x-2 px-3 py-2 rounded-md transition-all",
                            "hover:bg-gradient-to-tr from-red-200 via-pink-200 to-purple-200 hover:text-indigo-900",
                            (value === 0 && !editor?.isActive("heading")) ||
                                editor?.isActive("heading", { level: value }) &&
                                "bg-gradient-to-tr from-purple-500 to-pink-500 text-white"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
    ];

    const currentFont = editor?.getAttributes("textStyle").fontFamily || "Arial";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    title="Font Family"
                    className={cn(
                        "h-9 w-[140px] flex items-center justify-between rounded-full px-3 text-sm font-medium transition-all",
                        "bg-[#d6eaf8] shadow-md hover:shadow-lg hover:scale-105",
                        "hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 hover:text-white",
                        "text-blue-950"
                    )}
                    style={{ fontFamily: currentFont }}
                >
                    <span className="truncate">{currentFont}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg rounded-xl">
                {fonts.map(({ label, value }) => (
                    <button
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-3 py-2 rounded-md transition-all text-sm",
                            "hover:bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 hover:text-indigo-900",
                            editor?.getAttributes("textStyle").fontFamily === value &&
                                "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
                        )}
                        style={{ fontFamily: value }}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    className?: string;
    label: string;
};



const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    className,
    label,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "h-9 w-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out transform",
                "bg-[#d6eaf8] shadow-md hover:shadow-lg",
                "hover:scale-110 hover:bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400",
                "hover:text-white",
                "active:scale-95 active:animate-bounce",
                isActive ? "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white" : "text-blue-950",
                className
            )}
            title={label} // Using title attribute for the tooltip text
        >
            <Icon className="size-5" />
        </button>
    );
};




export const Toolbar = () => {

    const { editor }= useEditorStore();
    
    console.log("Toolbar editor: ", { editor })

    const sections: { 
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
        
    }[][] =[
        /* Undo, Redo, Print, SpellChecker */
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("Spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                }
            },
                
        ],
        /*Bold, Itallic */
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => editor?.chain().focus().addPendingComment().run(),
                isActive: editor?.isActive("liveblocksCommentMark")
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                
            }
        ]
    ];
        return(
        <div className = "bg-[rgba(243,246,249,0.3)] px-2.5 py-0.5 rounded-[24px] min-h-[45px]  flex items-center justify-center gap-x-1 overflow-x-auto text-blue-950 w-fit mx-auto mb-2 ">
            {sections[0].map((item)=>(
                <ToolbarButton key = {item.label} {...item}  />
            ))}
            <Separator orientation="vertical" className="h-9 bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-9 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-9 bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation="vertical" className="h-9 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-9 bg-neutral-300" />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <LineHeightButton />
            <ListButton />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
}
