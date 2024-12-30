"use client";

import React, { useRef } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  ImageIcon,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  // Handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result as string;

        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic className="w-5 h-5" />
        </button>
        {/* Image Upload Button */}
        <button
          className="text-sky-400"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          type="file"
          onChange={handleImageUpload}
        />
        <button
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
