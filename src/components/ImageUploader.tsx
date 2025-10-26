import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { UploadedImage } from "@/types/image";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImagesUpload: (images: UploadedImage[]) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ onImagesUpload, disabled }: ImageUploaderProps) => {
  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length === 0) {
        toast.error("No valid image files found");
        return;
      }

      const uploadedImages: UploadedImage[] = imageFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        format: file.type.split("/")[1]?.toUpperCase() || "UNKNOWN",
      }));

      onImagesUpload(uploadedImages);
      toast.success(`${uploadedImages.length} image(s) uploaded successfully`);
    },
    [onImagesUpload, disabled]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <label
        htmlFor="file-upload"
        className={`group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          disabled
            ? "opacity-50 cursor-not-allowed border-border"
            : "border-border hover:border-primary hover:bg-accent/5"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
          <motion.div
            whileHover={disabled ? {} : { scale: 1.1 }}
            className="mb-4 p-4 rounded-full bg-primary/10 text-primary"
          >
            <Upload className="w-10 h-10" />
          </motion.div>
          <p className="mb-2 text-lg font-semibold text-foreground">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">
            Support for JPEG, PNG, WebP, GIF, BMP, AVIF, TIFF, SVG
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Upload multiple images at once
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </label>
    </motion.div>
  );
};
