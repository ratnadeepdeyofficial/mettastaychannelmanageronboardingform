import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Variant } from "./RoomCard";

interface VariantCardProps {
  variant: Variant;
  onUpdate: (variant: Variant) => void;
  onRemove: () => void;
}

export default function VariantCard({ variant, onUpdate, onRemove }: VariantCardProps) {
  const updateField = (field: keyof Variant, value: string) => {
    onUpdate({ ...variant, [field]: value });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="relative bg-secondary/50 rounded-xl p-4 mb-3 border-l-4 border-accent"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Variant Name</Label>
          <Input
            placeholder="e.g., CP / EP / MAP"
            value={variant.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Variant Price</Label>
          <Input
            type="number"
            placeholder="e.g., 2500"
            value={variant.price}
            onChange={(e) => updateField("price", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-sm text-muted-foreground">Variant Details</Label>
          <Textarea
            placeholder="e.g., Includes complimentary breakfast for 2 guests"
            value={variant.details}
            onChange={(e) => updateField("details", e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
