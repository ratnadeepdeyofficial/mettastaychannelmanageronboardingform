import { motion } from "framer-motion";
import { Image, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface BrandingData {
  logo: File | null;
  propertyImage: File | null;
}

interface BrandingSectionProps {
  onLogoChange: (file: File | null) => void;
  onPropertyImageChange: (file: File | null) => void;
}

export default function BrandingSection({ onLogoChange, onPropertyImageChange }: BrandingSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
    >
      <h2 className="font-display text-2xl text-foreground mb-6">Branding</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Upload className="h-4 w-4 text-foreground" />
            </span>
            Logo (Upload)
          </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onLogoChange(e.target.files?.[0] ?? null)}
            className="h-12 text-base file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Image className="h-4 w-4 text-foreground" />
            </span>
            Property Image (Upload)
          </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onPropertyImageChange(e.target.files?.[0] ?? null)}
            className="h-12 text-base file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  );
}
