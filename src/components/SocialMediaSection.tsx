import { motion } from "framer-motion";
import { Linkedin, Instagram, Facebook, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SocialMediaData {
  linkedin: string;
  instagram: string;
  facebook: string;
  website: string;
}

interface SocialMediaSectionProps {
  data: SocialMediaData;
  onChange: (data: SocialMediaData) => void;
}

export default function SocialMediaSection({ data, onChange }: SocialMediaSectionProps) {
  const update = (field: keyof SocialMediaData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
    >
      <h2 className="font-display text-2xl text-foreground mb-6">Social Media Links</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Linkedin className="h-4 w-4 text-foreground" />
            </span>
            LinkedIn
          </Label>
          <Input
            placeholder="https://linkedin.com/company/..."
            value={data.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Instagram className="h-4 w-4 text-foreground" />
            </span>
            Instagram
          </Label>
          <Input
            placeholder="https://instagram.com/..."
            value={data.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Facebook className="h-4 w-4 text-foreground" />
            </span>
            Facebook
          </Label>
          <Input
            placeholder="https://facebook.com/..."
            value={data.facebook}
            onChange={(e) => update("facebook", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Globe className="h-4 w-4 text-foreground" />
            </span>
            Website
          </Label>
          <Input
            placeholder="https://yourproperty.com"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </div>
    </motion.div>
  );
}
