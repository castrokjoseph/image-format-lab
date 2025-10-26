import imageCompression from "browser-image-compression";
import { ImageFormat, UploadedImage, ConvertedImage } from "@/types/image";

export const convertImage = async (
  image: UploadedImage,
  targetFormat: ImageFormat,
  quality: number
): Promise<ConvertedImage> => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = new Image();
      img.src = image.preview;

      await new Promise((res) => {
        img.onload = res;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.drawImage(img, 0, 0);

      // Convert to blob with specified format and quality
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image"));
            return;
          }

          // Apply compression if needed
          let finalBlob = blob;
          if (quality < 100 && targetFormat !== "svg") {
            const options = {
              maxSizeMB: 10,
              maxWidthOrHeight: img.width,
              useWebWorker: true,
              initialQuality: quality / 100,
            };

            try {
              const compressedFile = await imageCompression(
                new File([blob], image.name, { type: blob.type }),
                options
              );
              finalBlob = compressedFile;
            } catch (error) {
              console.warn("Compression failed, using original:", error);
            }
          }

          const preview = URL.createObjectURL(finalBlob);
          const name = image.name.replace(/\.[^/.]+$/, "") + "." + targetFormat;

          resolve({
            id: Math.random().toString(36).substr(2, 9),
            originalId: image.id,
            blob: finalBlob,
            preview,
            name,
            size: finalBlob.size,
            format: targetFormat,
          });
        },
        `image/${targetFormat}`,
        quality / 100
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const getImageFormat = (file: File): string => {
  const format = file.type.split("/")[1] || "unknown";
  return format.toUpperCase();
};
