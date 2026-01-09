declare module "pdfjs-dist/legacy/build/pdf" {
  const pdfjs: typeof import("pdfjs-dist");
  export = pdfjs;
}

declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
  const workerSrc: string;
  export default workerSrc;
}
