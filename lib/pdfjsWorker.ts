/**
 * PDF.js worker URL derived from the installed pdfjs-dist version
 * so the worker always matches the library (no hardcoded version).
 */
type PdfJsPackageJson = {
  version?: string;
};

// Cast to a typed object instead of using @ts-expect-error
import rawPdfjsPkg from "pdfjs-dist/package.json";

const pdfjsPkg = rawPdfjsPkg as PdfJsPackageJson;

const version: string =
  typeof pdfjsPkg.version === "string" ? pdfjsPkg.version : "5.3.93";

export const PDFJS_WORKER_SRC =
  `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs` as const;
