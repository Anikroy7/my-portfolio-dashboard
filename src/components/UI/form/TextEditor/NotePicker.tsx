"use client";

import React from "react";

import Tiptap from "./Tiptap";

const NotePicker = ({
  setContent,
  content,
}: {
  content: string;
  setContent: any;
}) => {
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  return (
    <Tiptap
      content={content}
      onChange={(newContent: string) => handleContentChange(newContent)}
    />
  );
};

export default NotePicker;
