import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Bed, Bath, Users, Maximize2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VariantCard from "./VariantCard";

export interface Variant {
  id: string;
  name: string;
  price: string;
  details: string;
}

export interface Room {
  id: string;
  roomId: string;
  roomType: string;
  totalRooms: string;
  roomSize: string;
  beds: string;
  bathrooms: string;
  maxAdults: string;
  maxChildren: string;
  basicRate: string;
  variants: Variant[];
}

interface RoomCardProps {
  room: Room;
  onUpdate: (room: Room) => void;
  onRemove: () => void;
}

export default function RoomCard({ room, onUpdate, onRemove }: RoomCardProps) {
  const updateField = (field: keyof Room, value: string) => {
    onUpdate({ ...room, [field]: value });
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: crypto.randomUUID(),
      name: "",
      price: "",
      details: "",
    };
    onUpdate({ ...room, variants: [...room.variants, newVariant] });
  };

  const updateVariant = (index: number, variant: Variant) => {
    const newVariants = [...room.variants];
    newVariants[index] = variant;
    onUpdate({ ...room, variants: newVariants });
  };

  const removeVariant = (index: number) => {
    onUpdate({ ...room, variants: room.variants.filter((_, i) => i !== index) });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">
        <CardHeader className="hero-gradient pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium tracking-wide uppercase">
                Room ID: {room.roomId}
              </p>
              <h3 className="text-primary-foreground font-display text-2xl mt-1">
                {room.roomType || "New Room Type"}
              </h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Room Type Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Room Type Name</Label>
            <Input
              placeholder="e.g., Deluxe Suite, Standard Room"
              value={room.roomType}
              onChange={(e) => updateField("roomType", e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-xs">#</span>
                </span>
                Number of Rooms
              </Label>
              <Input
                placeholder="e.g., 1, 2, 3, 4..."
                value={room.totalRooms}
                onChange={(e) => updateField("totalRooms", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Maximize2 className="h-3 w-3" />
                </span>
                Room Size (Sq Ft)
              </Label>
              <Input
                placeholder="e.g., 450"
                value={room.roomSize}
                onChange={(e) => updateField("roomSize", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Bed className="h-3 w-3" />
                </span>
                Beds
              </Label>
              <Input
                placeholder="e.g., 1 King Bed"
                value={room.beds}
                onChange={(e) => updateField("beds", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Bath className="h-3 w-3" />
                </span>
                Bathrooms
              </Label>
              <Input
                placeholder="e.g., 1 Attached"
                value={room.bathrooms}
                onChange={(e) => updateField("bathrooms", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Users className="h-3 w-3" />
                </span>
                Max Adults
              </Label>
              <Input
                placeholder="e.g., 2"
                value={room.maxAdults}
                onChange={(e) => updateField("maxAdults", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Users className="h-3 w-3" />
                </span>
                Max Children
              </Label>
              <Input
                placeholder="e.g., 1"
                value={room.maxChildren}
                onChange={(e) => updateField("maxChildren", e.target.value)}
              />
            </div>
          </div>

          {/* Basic Rate - Full Width */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full accent-gradient flex items-center justify-center">
                <DollarSign className="h-3 w-3 text-accent-foreground" />
              </span>
              Basic Room Rate
            </Label>
            <Input
              placeholder="e.g., 2500"
              value={room.basicRate}
              onChange={(e) => updateField("basicRate", e.target.value)}
              className="h-12 text-lg font-medium"
            />
          </div>

          {/* Variants Section */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg text-foreground">Pricing Variants</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addVariant}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {room.variants.map((variant, index) => (
                <VariantCard
                  key={variant.id}
                  variant={variant}
                  onUpdate={(v) => updateVariant(index, v)}
                  onRemove={() => removeVariant(index)}
                />
              ))}
            </AnimatePresence>

            {room.variants.length === 0 && (
              <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-lg">
                <p>No variants added yet</p>
                <p className="text-sm mt-1">Add variants like CP, EP, MAP for different pricing options</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
