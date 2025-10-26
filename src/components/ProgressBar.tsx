import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  currentFileName?: string;
}

export const ProgressBar = ({ current, total, currentFileName }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <div>
          <h3 className="font-semibold">Converting Images</h3>
          <p className="text-sm text-muted-foreground">
            Processing {current} of {total}
          </p>
        </div>
      </div>

      <Progress value={percentage} className="h-2 mb-2" />

      {currentFileName && (
        <p className="text-xs text-muted-foreground mt-2 truncate">
          Current: {currentFileName}
        </p>
      )}
    </motion.div>
  );
};
