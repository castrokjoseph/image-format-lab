export type ImageFormat = "jpeg" | "png" | "webp" | "gif" | "bmp" | "avif" | "tiff" | "svg";

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  format: string;
}

export interface ConvertedImage {
  id: string;
  originalId: string;
  blob: Blob;
  preview: string;
  name: string;
  size: number;
  format: ImageFormat;
}

export interface ConversionHistory {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: ImageFormat;
  date: string;
}
