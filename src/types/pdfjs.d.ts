declare module "pdfjs-dist/legacy/build/pdf" {
  const pdfjs: any;
  export = pdfjs;
}

declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
  const worker: { default: string };
  export = worker;
}
