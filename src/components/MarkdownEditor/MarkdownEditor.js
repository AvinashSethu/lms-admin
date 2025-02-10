"use client";
import React from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import MarkdownPreview from "@uiw/react-markdown-preview";
import katex from "katex";
import { getCodeString } from "rehype-rewrite";
import "katex/dist/katex.css";
import { InsertPhoto, Redo } from "@mui/icons-material";

const mdKaTeX = `This is to display the 
\$$c = \\pm\\sqrt{a^2 + b^2}$$\
 in one line

\\\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\\\`


\\\`css
.w-md-editor-text-input,
.w-md-editor-text-pre > code,
.w-md-editor-text-pre {
  font-size: 2rem !important;
  line-height: 2.5rem !important;
}
\\\`a
`;

const rehypePlugins = [rehypeSanitize];

export default function MarkdownEditor() {
  const [value, setValue] = React.useState(mdKaTeX);
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

      icon:<InsertPhoto sx={{fontSize:"16px"}} />,
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
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => setValue(val)}
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
      {/* <MarkdownPreview
        source={value}
        style={{ padding: 16, margin: 20 }}
        components={{
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
        }}
      /> */}
    </div>
  );
}
