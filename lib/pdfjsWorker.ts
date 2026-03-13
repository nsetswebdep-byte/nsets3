/**
 * PDF.js worker URL derived from the installed pdfjs-dist version
 * so the worker always matches the library (no hardcoded version).
 */
// @ts-expect-error - package.json has no types
import pdfjsPkg from "pdfjs-dist/package.json";

const version: string =
  typeof pdfjsPkg?.version === "string" ? pdfjsPkg.version : "5.3.93";

export const PDFJS_WORKER_SRC =
  `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs` as const;
