"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

// Dynamic import with SSR disabled to prevent window/document undefined issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 rounded-xl bg-secondary/30 animate-pulse flex items-center justify-center border border-border">
      <span className="text-xs text-muted-foreground">Loading editor...</span>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  readOnly?: boolean;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something awesome...",
  className,
  minHeight = "280px",
  readOnly = false,
}: RichTextEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: readOnly
        ? false
        : [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote", "link"],
            ["clean"],
          ],
    }),
    [readOnly]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "color",
    "background",
    "align",
    "blockquote",
    "link",
  ];

  return (
    <div
      className={cn(
        "rich-text-editor-container rounded-xl overflow-hidden border border-border bg-card transition-all duration-200 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15",
        className
      )}
    >
      <style>{`
        .rich-text-editor-container .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid var(--border) !important;
          background-color: var(--secondary) !important;
          padding: 10px 12px !important;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .rich-text-editor-container .ql-container.ql-snow {
          border: none !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
          color: var(--foreground) !important;
        }
        .rich-text-editor-container .ql-editor {
          min-height: ${minHeight};
          padding: 16px;
          line-height: 1.65;
        }
        .rich-text-editor-container .ql-editor.ql-blank::before {
          color: var(--muted-foreground) !important;
          font-style: normal;
          left: 16px;
        }
        .rich-text-editor-container .ql-snow .ql-stroke {
          stroke: var(--foreground) !important;
          opacity: 0.7;
        }
        .rich-text-editor-container .ql-snow .ql-fill {
          fill: var(--foreground) !important;
          opacity: 0.7;
        }
        .rich-text-editor-container .ql-snow .ql-picker {
          color: var(--foreground) !important;
          opacity: 0.8;
        }
        .rich-text-editor-container .ql-snow .ql-picker-options {
          background-color: var(--card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .rich-text-editor-container .ql-snow button:hover .ql-stroke,
        .rich-text-editor-container .ql-snow .ql-picker:hover .ql-stroke {
          stroke: var(--primary) !important;
          opacity: 1;
        }
        .rich-text-editor-container .ql-snow button:hover .ql-fill,
        .rich-text-editor-container .ql-snow .ql-picker:hover .ql-fill {
          fill: var(--primary) !important;
          opacity: 1;
        }
        .rich-text-editor-container .ql-snow button.ql-active .ql-stroke {
          stroke: var(--primary) !important;
          opacity: 1;
        }
        .rich-text-editor-container .ql-snow button.ql-active .ql-fill {
          fill: var(--primary) !important;
          opacity: 1;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};

export default RichTextEditor;
