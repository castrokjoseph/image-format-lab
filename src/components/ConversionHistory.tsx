import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionHistory as ConversionHistoryType } from "@/types/image";
import { Card } from "@/components/ui/card";

export const ConversionHistory = () => {
  const [history, setHistory] = useState<ConversionHistoryType[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("conversionHistory");
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Conversions
        </h3>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="p-3 bg-muted/50 border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-medium truncate">{item.fileName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs whitespace-nowrap ml-2">
                    <span className="font-mono">{item.fromFormat}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-mono text-primary">{item.toFormat.toUpperCase()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
