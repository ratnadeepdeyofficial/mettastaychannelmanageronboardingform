import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Mail, Plus, Send, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoomCard, { Room, Variant } from "@/components/RoomCard";
import SuccessModal from "@/components/SuccessModal";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJE9z-D6GAcVcAeqXrMMU1ltYIcm1HJucuwCUZ2ljLujWmGryY6W2X8OirVohOiQ8e/exec";

let roomCounter = 1;

function generateRoomId() {
  return "RM-" + String(roomCounter++).padStart(3, "0");
}

function createNewRoom(): Room {
  return {
    id: crypto.randomUUID(),
    roomId: generateRoomId(),
    roomType: "",
    totalRooms: "",
    roomSize: "",
    beds: "",
    bathrooms: "",
    maxAdults: "",
    maxChildren: "",
    basicRate: "",
    variants: [
      {
        id: crypto.randomUUID(),
        name: "",
        price: "",
        details: "",
      },
    ],
  };
}

export default function Index() {
  const [propertyName, setPropertyName] = useState("");
  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState<Room[]>([createNewRoom()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addRoom = () => {
    setRooms([...rooms, createNewRoom()]);
  };

  const updateRoom = (index: number, room: Room) => {
    const newRooms = [...rooms];
    newRooms[index] = room;
    setRooms(newRooms);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      propertyName,
      email,
      roomTypes: rooms.map((room) => ({
        roomId: room.roomId,
        roomType: room.roomType,
        totalRooms: room.totalRooms,
        roomSize: room.roomSize,
        beds: room.beds,
        bathrooms: room.bathrooms,
        maxAdults: room.maxAdults,
        maxChildren: room.maxChildren,
        basicRate: room.basicRate,
        variants: room.variants.map((v) => ({
          name: v.name,
          price: v.price,
          details: v.details,
        })),
      })),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setShowSuccess(true);
      setPropertyName("");
      setEmail("");
      roomCounter = 1;
      setRooms([createNewRoom()]);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6"
          >
            <Hotel className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Property Onboarding
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-primary-foreground mb-4"
          >
            Room Inventory & Pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg max-w-xl mx-auto"
          >
            Set up your property's room types, configurations, and pricing variants with ease.
          </motion.p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 pb-16">
        <form onSubmit={handleSubmit}>
          {/* Property Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">
              Property Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-foreground" />
                  </span>
                  Property Name
                </Label>
                <Input
                  required
                  placeholder="Enter your property name"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="h-4 w-4 text-foreground" />
                  </span>
                  Email Address
                </Label>
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* Room Cards */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-foreground">Room Types</h2>
              <Button
                type="button"
                onClick={addRoom}
                className="gap-2 accent-gradient text-accent-foreground hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add Room Type
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {rooms.map((room, index) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onUpdate={(r) => updateRoom(index, r)}
                  onRemove={() => removeRoom(index)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-medium hero-gradient hover:opacity-90 text-primary-foreground gap-3"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Inventory
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
