import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomCard, { Room, Variant } from "@/components/RoomCard";
import SuccessModal from "@/components/SuccessModal";
import PropertyDetailsSection, { PropertyDetails } from "@/components/PropertyDetailsSection";
import BrandingSection from "@/components/BrandingSection";
import DocumentUploadSection, { Documents } from "@/components/DocumentUploadSection";
import SocialMediaSection, { SocialMediaData } from "@/components/SocialMediaSection";
import BankDetailsSection, { BankDetailsData } from "@/components/BankDetailsSection";
import mettastayLogo from "@/assets/mettastay-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHQdvR6K_qbHleIJyAuKI5JHf8Ve8NkCgkLiItqfl46nzuSJg4vtOf36517apbVyixTw/exec";

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
    roomNumbers: "",
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
  checkinTime: "",
  checkoutTime: "",
  facilities: "",
  amenities: "",
  privacyPolicy: "",
};

const initialDocuments: Documents = {
  udyamCertificate: null,
  gstCertificate: null,
  cancelledCheque: null,
  bankPassbookFrontPage: null,
  ownerPanCard: null,
  aadharCard: null,
  latestBankStatement: null,
  tradeLicense: null,
  leaseAgreement: null,
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
  const [documents, setDocuments] = useState<Documents>(initialDocuments);
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

    const documentBase64 = {
      udyamCertificate: documents.udyamCertificate ? await fileToBase64(documents.udyamCertificate) : "",
      gstCertificate: documents.gstCertificate ? await fileToBase64(documents.gstCertificate) : "",
      cancelledCheque: documents.cancelledCheque ? await fileToBase64(documents.cancelledCheque) : "",
      bankPassbookFrontPage: documents.bankPassbookFrontPage ? await fileToBase64(documents.bankPassbookFrontPage) : "",
      ownerPanCard: documents.ownerPanCard ? await fileToBase64(documents.ownerPanCard) : "",
      aadharCard: documents.aadharCard ? await fileToBase64(documents.aadharCard) : "",
      latestBankStatement: documents.latestBankStatement ? await fileToBase64(documents.latestBankStatement) : "",
      tradeLicense: documents.tradeLicense ? await fileToBase64(documents.tradeLicense) : "",
      leaseAgreement: documents.leaseAgreement ? await fileToBase64(documents.leaseAgreement) : "",
    };

    const now = new Date();
    const timestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const payload = {
      timestamp,
      ...propertyDetails,
      socialMedia,
      bankDetails,
      logo: logoBase64,
      propertyImage: propertyImageBase64,
      ...documentBase64,
      roomTypes: rooms.map((room) => ({
        roomId: room.roomId,
        roomType: room.roomType,
        totalRooms: room.totalRooms,
        roomNumbers: room.roomNumbers,
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
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const resultText = await response.text();

      setShowSuccess(true);
      setPropertyDetails(initialPropertyDetails);
      setLogo(null);
      setPropertyImage(null);
      setSocialMedia(initialSocialMedia);
      setBankDetails(initialBankDetails);
      setDocuments(initialDocuments);
      roomCounter = 1;
      setRooms([createNewRoom()]);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image with overlay */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 bg-background/85 backdrop-blur-sm" aria-hidden="true" />

      {/* Hero Header */}
      <div
        className="relative py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--background) / 0.75), hsl(var(--background) / 0.55)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img
              src={mettastayLogo}
              alt="MettaStay - Optimizing Hospitality Business"
              className="h-16 md:h-20 mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-foreground mb-4"
          >
            Room Inventory & Pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
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

          {/* Document Upload */}
          <DocumentUploadSection documents={documents} onChange={setDocuments} />

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
              className="w-full h-14 text-lg font-medium accent-gradient hover:opacity-90 text-accent-foreground gap-3"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
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
