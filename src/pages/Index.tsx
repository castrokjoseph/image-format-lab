import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageCard } from "@/components/ImageCard";
import { ConversionControls } from "@/components/ConversionControls";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadSection } from "@/components/DownloadSection";
import { ConversionHistory } from "@/components/ConversionHistory";
import { UploadedImage, ConvertedImage, ImageFormat, ConversionHistory as ConversionHistoryType } from "@/types/image";
import { convertImage, getImageFormat } from "@/utils/imageConverter";
import { toast } from "sonner";
import { saveAs } from "file-saver";

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(90);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({ current: 0, total: 0, fileName: "" });

  const handleImagesUpload = (images: UploadedImage[]) => {
    setUploadedImages((prev) => [...prev, ...images]);
    setConvertedImages([]);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleRenameConverted = (id: string, newName: string) => {
    setConvertedImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, name: newName } : img))
    );
  };

  const saveToHistory = (fileName: string, fromFormat: string, toFormat: ImageFormat) => {
    const history: ConversionHistoryType[] = JSON.parse(
      localStorage.getItem("conversionHistory") || "[]"
    );

    const newEntry: ConversionHistoryType = {
      id: Math.random().toString(36).substr(2, 9),
      fileName,
      fromFormat,
      toFormat,
      date: new Date().toISOString(),
    };

    const updatedHistory = [newEntry, ...history].slice(0, 10);
    localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
  };

  const handleConvert = async () => {
    if (uploadedImages.length === 0) return;

    setIsConverting(true);
    setConvertedImages([]);
    setConversionProgress({ current: 0, total: uploadedImages.length, fileName: "" });

    const results: ConvertedImage[] = [];

    for (let i = 0; i < uploadedImages.length; i++) {
      const image = uploadedImages[i];
      setConversionProgress({
        current: i + 1,
        total: uploadedImages.length,
        fileName: image.name,
      });

      try {
        const converted = await convertImage(image, targetFormat, quality);
        results.push(converted);
        saveToHistory(image.name, getImageFormat(image.file), targetFormat);
      } catch (error) {
        console.error(`Failed to convert ${image.name}:`, error);
        toast.error(`Failed to convert ${image.name}`);
      }
    }

    setConvertedImages(results);
    setIsConverting(false);
    toast.success(`Successfully converted ${results.length} image(s)`);
  };

  const handleDownloadSingle = (image: ConvertedImage) => {
    saveAs(image.blob, image.name);
    toast.success(`Downloaded ${image.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Fast, Secure, Client-Side Processing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Convert Images to Any Format
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload, convert, and download images in JPEG, PNG, WebP, GIF, BMP, AVIF, and TIFF formats with adjustable quality settings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUploader onImagesUpload={handleImagesUpload} disabled={isConverting} />
            <ConversionControls
              targetFormat={targetFormat}
              quality={quality}
              onFormatChange={setTargetFormat}
              onQualityChange={setQuality}
              onConvert={handleConvert}
              disabled={isConverting}
              imageCount={uploadedImages.length}
            />
            <ConversionHistory />
          </div>

          {/* Right Column - Image Grid */}
          <div className="lg:col-span-2 space-y-6">
            {isConverting && (
              <ProgressBar
                current={conversionProgress.current}
                total={conversionProgress.total}
                currentFileName={conversionProgress.fileName}
              />
            )}

            {convertedImages.length > 0 && (
              <DownloadSection convertedImages={convertedImages} />
            )}

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && convertedImages.length === 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Uploaded Images ({uploadedImages.length})
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {uploadedImages.map((image) => (
                      <ImageCard
                        key={image.id}
                        image={image}
                        onRemove={() => handleRemoveImage(image.id)}
                        isDraggable
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Converted Images */}
            {convertedImages.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Converted Images ({convertedImages.length})
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {convertedImages.map((image) => (
                      <ImageCard
                        key={image.id}
                        image={image}
                        onDownload={() => handleDownloadSingle(image)}
                        onRename={(newName) => handleRenameConverted(image.id, newName)}
                        isConverted
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Empty State */}
            {uploadedImages.length === 0 && convertedImages.length === 0 && !isConverting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex p-6 rounded-full bg-muted mb-4">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Images Yet</h3>
                <p className="text-muted-foreground">
                  Upload images to get started with conversion
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>All conversions happen in your browser. Your images never leave your device.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
