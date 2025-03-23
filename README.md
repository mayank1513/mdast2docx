# **MDAST (Markdown Abstract Syntax Tree) to DOCX** <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

🚀 **Effortlessly convert Markdown Abstract Syntax Trees (MDAST) to DOCX.**

[![Test](https://github.com/tiny-md/mdast2docx/actions/workflows/test.yml/badge.svg)](https://github.com/tiny-md/mdast2docx/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/tiny-md/mdast2docx/maintainability) [![Code Coverage](https://codecov.io/gh/tiny-md/mdast2docx/graph/badge.svg)](https://codecov.io/gh/tiny-md/mdast2docx) [![Version](https://img.shields.io/npm/v/mdast2docx.svg?colorB=green)](https://www.npmjs.com/package/mdast2docx) [![Downloads](https://img.shields.io/npm/d18m/mdast2docx)](https://www.npmjs.com/package/mdast2docx) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/mdast2docx)

---

## **✨ Features**

✅ **MDAST to DOCX conversion** — Supports standard Markdown elements  
✅ **Footnotes handling** — Converts Markdown footnotes to DOCX format  
✅ **Tables support** — Converts Markdown tables into DOCX tables  
✅ **Hyperlink support** — External and internal hyperlinks are now fully functional  
✅ **New Plugin Architecture** — Extend and customize DOCX output with plugins  
✅ **Customizable image handling** — Images are now supported via `@m2d/image` plugin

> **Note:** Images are no longer supported by default. To enable image support, use the image plugin from `@m2d/image` or `mdast2docx/plugins` explicitly.  
> This change helps us keep the library lean and extensible by community via plugins.

---

## **🚀 Relevance to Generative AI**

<details open>
<summary>
<i>Converts markdown content/artifacts generated by Generative AI to docx for further processing/record-keeping/sharing.</i>
</summary>

Modern **Generative AI tools** often produce structured content in **Markdown (MD)** format. However, converting this AI-generated Markdown into **professional DOCX documents** requires an additional transformation step. This is where **MDAST to DOCX** comes in.

### **How It Works**

1. **AI tools generate content in Markdown**.
2. **Unified.js & Remark Ecosystem** convert Markdown into **Markdown Abstract Syntax Tree (MDAST)**.
3. **MDAST to DOCX** processes this structure and exports a **well-formatted DOCX document**.

### **Use Cases**

- **AI-Generated Reports** – Convert AI-generated Markdown reports into polished DOCX files.
- **AI-Powered Content Export** – Transform AI-generated blogs, research papers, and structured content into a DOCX format for easy sharing and editing.
- **Client & Server Flexibility** – Works both in **browser-based AI tools** and **high-performance server environments**.

### **✅ Benefits**

- **Works on both Client & Server** – Choose to **offload processing to the client** for better scalability or **run it on the server** for batch conversions.
- **Optimized & Extensible** – Use **only the plugins you need**, keeping your AI workflows lightweight.

By integrating **MDAST to DOCX**, AI applications can **seamlessly export Markdown-based content into DOCX**, making it more accessible, editable, and shareable. 🚀

</details>

---

## **📦 Installation**

### **Install Everything at Once**

```bash
pnpm add mdast2docx
```

### **Or Install Only What You Need (Scoped Packages)**

```bash
pnpm add @m2d/core @m2d/html @m2d/image @m2d/math @m2d/table @m2d/list @m2d/mdast
```

---

## **🚀 Usage**

### **Basic Example**

```typescript
import { toDocx } from "mdast2docx";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMmd from "remark-mmd"; // Assumed MMD plugin

const markdown = `
# Sample Document  
This is a **bold** text and _italic_ text.  

> A blockquote example  

- List Item 1  
- List Item 2  

[Click Here](https://example.com)  

This is a footnote reference[^1].  

[^1]: This is the footnote content.
`;

const mdast = unified().use(remarkParse).use(remarkMmd).parse(markdown);

(async () => {
  const docxBlob = await toDocx(mdast, { title: "My Document" }, {});
  const url = URL.createObjectURL(docxBlob as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "document.docx";
  link.click();
  URL.revokeObjectURL(url);
})();
```

---

## **📜 API Reference**

### **`toDocx(astInputs, docxProps, defaultSectionProps, outputType?)`**

| Parameter                 | Type                                               | Description                                                      |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `astInputs`               | `Root` \| `{ ast: Root; props?: ISectionProps }[]` | Single or multiple MDAST trees with optional section properties. |
| `docxProps`               | `IDocxProps`                                       | General document properties (title, styles, metadata).           |
| `defaultSectionProps`     | `ISectionProps`                                    | Default properties for document sections.                        |
| `outputType` _(optional)_ | `"blob"` (default) \| `"buffer"` \| `"base64"`     | Format of the generated DOCX document.                           |

📌 **Returns:** A `Promise` resolving to a DOCX document in the chosen format.

---

## **📜 Supported Markdown Elements**

| Markdown Syntax                    | Supported in DOCX                     |
| ---------------------------------- | ------------------------------------- |
| Headings `# H1` to `###### H6`     | ✅                                    |
| Paragraphs                         | ✅                                    |
| Bold `**text**` & Italics `_text_` | ✅                                    |
| Blockquotes `> quote`              | ✅                                    |
| Lists (ordered & unordered)        | ✅ _(ordered lists via `listPlugin`)_ |
| Links `[text](url)`                | ✅                                    |
| Images `![alt](url)`               | ✅ _(via `imagePlugin`)_              |
| Code Blocks `` `code` ``           | ✅                                    |
| Footnotes `[^1]`                   | ✅                                    |
| Tables                             | ✅ _(via `tablePlugin`)_              |
| Hyperlinks (external & internal)   | ✅                                    |
| Latex Math                         | ✅ _(via `mathPlugin`)_               |
| HTML Tags                          | ✅ _(via `htmlPlugin`)_               |

---

## **🔧 Configuration**

You can customize the DOCX output using `ISectionProps` and `IDocxProps`.

### **Example: Customizing Styles**

```typescript
const docxProps = {
  title: "Styled Document",
  author: "John Doe",
};

const sectionProps = {
  page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } },
};

const docxBlob = await toDocx(mdast, docxProps, sectionProps);
```

### **Use Plugins**

Plugins allow extending functionality like adding image or table support.

```typescript
import { toDocx } from "@m2d/core";
import { imagePlugin } from "@m2d/image";
import { tablePlugin } from "@m2d/table";
import { listPlugin } from "@m2d/list";
import { mathPlugin } from "@m2d/math";

const downloadDocx = () => {
  toDocx(
    mdast,
    {},
    { plugins: [imagePlugin(), tablePlugin(), listPlugin(), mathPlugin()] },
    "blob",
  ).then(blob => {
    const url = URL.createObjectURL(blob as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-document.docx";
    link.click();
    URL.revokeObjectURL(url);
  });
};
```

📖 **More details:**

- [DOCX.js Document Properties](https://docx.js.org/#/usage/document)
- [DOCX.js Section Options](https://docx.js.org/#/usage/sections)

---

## **🧠 Relevance in Generative AI**

AI tools often generate Markdown as output (e.g., reports, documentation, summaries). This library makes it easy to convert those Markdown-based outputs into rich DOCX documents.

- Supports both **client-side** and **server-side** usage
- Enables **offloading document generation** to users' browsers or running high-performance server renderers
- Combine it with `unified` and `remark` to parse Markdown into MDAST, and then convert to DOCX seamlessly

---

## **📝 Contributing**

We welcome contributions! To get started:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature-new`)
3. **Commit your changes** (`git commit -m "Add new feature"`)
4. **Push to GitHub** (`git push origin feature-new`)
5. **Open a Pull Request** 🚀

### **Extend Functionality with Plugins**

The community can create plugins to extend the functionality of this library. For inspiration, check out the existing plugins in the [`lib/src/plugins`](https://github.com/tiny-md/mdast2docx/tree/main/lib/src/plugins) folder.

---

## **📄 License**

This project is **licensed under MPL-2.0**. See the [LICENSE](./LICENSE) file for details.

---

## **🙌 Acknowledgments**

Thanks to the **docx.js** and **unified.js** ecosystems for making this possible.

> ⭐ **Star this repository** if you find it useful!  
> ❤️ Support our work by [sponsoring](https://github.com/sponsors/mayank1513).

---

<p align="center">Made with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
