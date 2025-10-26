import { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, Edit2, Check, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadedImage, ConvertedImage } from "@/types/image";
import { formatFileSize, getImageFormat } from "@/utils/imageConverter";

interface ImageCardProps {
  image: UploadedImage | ConvertedImage;
  onRemove?: () => void;
  onDownload?: () => void;
  onRename?: (newName: string) => void;
  isConverted?: boolean;
  isDraggable?: boolean;
}

export const ImageCard = ({
  image,
  onRemove,
  onDownload,
  onRename,
  isConverted = false,
  isDraggable = false,
}: ImageCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(image.name);

  const handleRename = () => {
    if (editedName.trim() && onRename) {
      onRename(editedName);
    }
    setIsEditing(false);
  };

  const displayFormat = "format" in image ? image.format.toUpperCase() : getImageFormat((image as UploadedImage).file);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 border border-border/50"
    >
      {isDraggable && (
        <div className="absolute top-2 left-2 z-10 p-1 bg-background/80 rounded cursor-move">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={image.preview}
          alt={image.name}
          className="w-full h-full object-cover"
        />
        {onRemove && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="h-8 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
              />
              <Button size="icon" variant="ghost" onClick={handleRename} className="h-8 w-8">
                <Check className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm font-medium truncate flex-1" title={image.name}>
                {image.name}
              </p>
              {onRename && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{displayFormat}</span>
          <span>{formatFileSize(image.size)}</span>
        </div>

        {isConverted && onDownload && (
          <Button
            onClick={onDownload}
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        )}
      </div>
    </motion.div>
  );
};
