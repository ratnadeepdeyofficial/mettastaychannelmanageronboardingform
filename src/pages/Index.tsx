import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomCard, { Room, Variant } from "@/components/RoomCard";
import SuccessModal from "@/components/SuccessModal";
import PropertyDetailsSection, { PropertyDetails } from "@/components/PropertyDetailsSection";
import BrandingSection from "@/components/BrandingSection";
import SocialMediaSection, { SocialMediaData } from "@/components/SocialMediaSection";
import BankDetailsSection, { BankDetailsData } from "@/components/BankDetailsSection";
import mettastayLogo from "@/assets/mettastay-logo.png";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby3XFhG5u6yQWMwSNLA1Hs6BCqFJauYGvtj7g7aCK1_1zttj0SJ5ngttPoBG3WvaFYpEQ/exec";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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

const initialPropertyDetails: PropertyDetails = {
  propertyName: "",
  email: "",
  mobile: "",
  gstNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pinCode: "",
};

const initialSocialMedia: SocialMediaData = {
  linkedin: "",
  instagram: "",
  facebook: "",
  website: "",
};

const initialBankDetails: BankDetailsData = {
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  bankName: "",
  branchName: "",
};

export default function Index() {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>(initialPropertyDetails);
  const [logo, setLogo] = useState<File | null>(null);
  const [propertyImage, setPropertyImage] = useState<File | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaData>(initialSocialMedia);
  const [bankDetails, setBankDetails] = useState<BankDetailsData>(initialBankDetails);
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

    const logoBase64 = logo ? await fileToBase64(logo) : "";
    const propertyImageBase64 = propertyImage ? await fileToBase64(propertyImage) : "";

    const payload = {
      ...propertyDetails,
      socialMedia,
      bankDetails,
      logo: logoBase64,
      propertyImage: propertyImageBase64,
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
      setPropertyDetails(initialPropertyDetails);
      setLogo(null);
      setPropertyImage(null);
      setSocialMedia(initialSocialMedia);
      setBankDetails(initialBankDetails);
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
            className="mb-6"
          >
            <img
              src={mettastayLogo}
              alt="MettaStay - Optimizing Hospitality Business"
              className="h-16 md:h-20 mx-auto brightness-0 invert"
            />
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
          {/* Property Details */}
          <PropertyDetailsSection data={propertyDetails} onChange={setPropertyDetails} />

          {/* Branding */}
          <BrandingSection onLogoChange={setLogo} onPropertyImageChange={setPropertyImage} />

          {/* Social Media */}
          <SocialMediaSection data={socialMedia} onChange={setSocialMedia} />

          {/* Bank Details */}
          <BankDetailsSection data={bankDetails} onChange={setBankDetails} />

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
