"use client";
import React, { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import katex from "katex";
import { getCodeString } from "rehype-rewrite";
import "katex/dist/katex.css";
import { InsertPhoto, Redo } from "@mui/icons-material";

const rehypePlugins = [rehypeSanitize];

export default function MarkdownEditor({ value,onChange}) {
  // const [value, setValue] = React.useState("");
  const customCommands = [
    commands.bold,
    commands.italic,
    {
      name: "underline",
      keyCommand: "underline",
      buttonProps: { "aria-label": "Underline" },
      icon: <u>U</u>,
      execute: (state, api) => {
        api.replaceSelection(`<u>${state.selectedText}</u>`);
      },
    },
    commands.strikethrough,
    commands.code,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.table,
    commands.help,
    {
      name: "image",
      keyCommand: "image",
      buttonProps: { "aria-label": "Insert image" },

      icon: <InsertPhoto sx={{ fontSize: "16px" }} />,
      execute: async (state, api) => {
        // OPEN my component.
        // example
        // const [image, setImaeg] = React.useState('');
        // <ImageUploader value={image} onChange={setImage} />
        let image_url = "http://incrix.com";
        let modifyText = `![Incrix](${image_url})\n`;
        api.replaceSelection(modifyText);
      },
    },
  ];

  return (
    <div
      className="container"
      style={{ position: "relative", width: "560px", height: "400px" }}
      data-color-mode="light"
    >
      {/* {!pla && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "12px",
            color: "var(--text3)",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          Type preview...
        </div>
      )} */}
      <MDEditor
        value={value}
        onChange={onChange}
        commands={customCommands}
        style={{
          width: "560px",
          minHeight: "400px",
        }}
        previewOptions={{
          components: {
            code: ({ children = [], className, ...props }) => {
              if (
                typeof children === "string" &&
                /^\$\$(.*)\$\$/.test(children)
              ) {
                const html = katex.renderToString(
                  children.replace(/^\$\$(.*)\$\$/, "$1"),
                  {
                    throwOnError: false,
                  }
                );
                return (
                  <code
                    dangerouslySetInnerHTML={{ __html: html }}
                    style={{ background: "transparent" }}
                  />
                );
              }
              const code =
                props.node && props.node.children
                  ? getCodeString(props.node.children)
                  : children;
              if (
                typeof code === "string" &&
                typeof className === "string" &&
                /^language-katex/.test(className.toLocaleLowerCase())
              ) {
                const html = katex.renderToString(code, {
                  throwOnError: false,
                });
                return (
                  <code
                    style={{ fontSize: "150%" }}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              }
              return <code className={String(className)}>{children}</code>;
            },
          },
        }}
      />

  
    </div>
  );
}
