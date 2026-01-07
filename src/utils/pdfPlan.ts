import { PlanImage } from "@/types/home";

export const renderPdfToImage = async (
  url: string,
  page = 1
): Promise<PlanImage> => {
  if (typeof window === "undefined") {
    throw new Error("PDF rendering only runs on the client side");
  }

  const resolvedUrl =
    url.startsWith("http") || url.startsWith("//")
      ? url
      : `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;

  // If it's already an image, just return its dimensions via browser Image
  if (/\.(png|jpe?g|webp)$/i.test(resolvedUrl)) {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = resolvedUrl;
    });
    return {
      src: resolvedUrl,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  }

  const pdfjs = await import("pdfjs-dist/legacy/build/pdf");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

  const loadingTask = pdfjs.getDocument(resolvedUrl);
  const pdf = await loadingTask.promise;
  const pdfPage = await pdf.getPage(page);
  const viewport = pdfPage.getViewport({ scale: 1.6 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context not available");
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await pdfPage.render({ canvasContext: context, viewport }).promise;

  return {
    src: canvas.toDataURL("image/png"),
    width: viewport.width,
    height: viewport.height,
  };
};
