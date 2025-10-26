import { Button } from "@/components/ui/button";
import { Download, Package } from "lucide-react";
import { motion } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ConvertedImage } from "@/types/image";
import { toast } from "sonner";

interface DownloadSectionProps {
  convertedImages: ConvertedImage[];
}

export const DownloadSection = ({ convertedImages }: DownloadSectionProps) => {
  const handleDownloadAll = async () => {
    if (convertedImages.length === 0) return;

    try {
      const zip = new JSZip();

      convertedImages.forEach((image) => {
        zip.file(image.name, image.blob);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `converted-images-${Date.now()}.zip`);
      toast.success("All images downloaded as ZIP");
    } catch (error) {
      toast.error("Failed to create ZIP file");
      console.error(error);
    }
  };

  if (convertedImages.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">Ready to Download</h3>
          <p className="text-sm opacity-90">
            {convertedImages.length} image{convertedImages.length > 1 ? "s" : ""} converted successfully
          </p>
        </div>
        {convertedImages.length > 1 && (
          <Button
            onClick={handleDownloadAll}
            variant="secondary"
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Package className="w-5 h-5 mr-2" />
            Download All as ZIP
          </Button>
        )}
      </div>
    </motion.div>
  );
};
