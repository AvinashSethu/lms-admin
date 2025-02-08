"use client";
import React from "react";
// import MDEditor,{commands} from "@uiw/react-md-editor";
// import rehypeSanitize from "rehype-sanitize";
// import MarkdownPreview from "@uiw/react-markdown-preview";
// import katex from "katex";
// import { getCodeString } from "rehype-rewrite";
// import "katex/dist/katex.css";

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
\\\`
`;

// const rehypePlugins = [rehypeSanitize];

export default function MarkdownEditor() {
  const [value, setValue] = React.useState(mdKaTeX);
  const image = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert image" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
        />
      </svg>
    ),
    execute: async (state, api) => {
      // OPEN my component.

      // example
      // const [image, setImaeg] = React.useState('');
      // <ImageUploader value={image} onChange={setImage} />

      let image_url = "http://incrix.com";
      //   let image_url = await upload_image(image);

      let modifyText = `![Incrix](${image_url})\n`;
      api.replaceSelection(modifyText);
    },
  };
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => setValue(val)}
        commands={[commands.image]}
        style={{
            width: "560px",
            minHeight: "400px"
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
