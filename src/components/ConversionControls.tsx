import { ImageFormat } from "@/types/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ConversionControlsProps {
  targetFormat: ImageFormat;
  quality: number;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
  onConvert: () => void;
  disabled?: boolean;
  imageCount: number;
}

const formats: { value: ImageFormat; label: string }[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "gif", label: "GIF" },
  { value: "bmp", label: "BMP" },
  { value: "avif", label: "AVIF" },
  { value: "tiff", label: "TIFF" },
];

export const ConversionControls = ({
  targetFormat,
  quality,
  onFormatChange,
  onQualityChange,
  onConvert,
  disabled,
  imageCount,
}: ConversionControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Conversion Settings
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="format">Target Format</Label>
          <Select value={targetFormat} onValueChange={(value) => onFormatChange(value as ImageFormat)}>
            <SelectTrigger id="format" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {formats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="quality">Quality</Label>
            <span className="text-sm font-mono text-muted-foreground">{quality}%</span>
          </div>
          <Slider
            id="quality"
            min={1}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={(values) => onQualityChange(values[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Higher quality = larger file size
          </p>
        </div>

        <Button
          onClick={onConvert}
          disabled={disabled || imageCount === 0}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 text-base font-semibold"
        >
          Convert {imageCount > 0 && `(${imageCount} image${imageCount > 1 ? "s" : ""})`}
        </Button>
      </div>
    </motion.div>
  );
};
