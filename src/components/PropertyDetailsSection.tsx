import { motion } from "framer-motion";
import { Building2, Mail, Phone, FileText, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PropertyDetails {
  propertyName: string;
  email: string;
  mobile: string;
  gstNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
}

interface PropertyDetailsSectionProps {
  data: PropertyDetails;
  onChange: (data: PropertyDetails) => void;
}

export default function PropertyDetailsSection({ data, onChange }: PropertyDetailsSectionProps) {
  const update = (field: keyof PropertyDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
    >
      <h2 className="font-display text-2xl text-foreground mb-6">Property Details</h2>

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
            value={data.propertyName}
            onChange={(e) => update("propertyName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Mail className="h-4 w-4 text-foreground" />
            </span>
            Contact Email
          </Label>
          <Input
            type="email"
            required
            placeholder="your@email.com"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Phone className="h-4 w-4 text-foreground" />
            </span>
            Mobile Number
          </Label>
          <Input
            type="tel"
            required
            placeholder="e.g., +91 98765 43210"
            value={data.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <FileText className="h-4 w-4 text-foreground" />
            </span>
            GST Number
          </Label>
          <Input
            placeholder="e.g., 22AAAAA0000A1Z5"
            value={data.gstNumber}
            onChange={(e) => update("gstNumber", e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-foreground" />
            </span>
            Address Line 1
          </Label>
          <Input
            required
            placeholder="Street address, building name"
            value={data.addressLine1}
            onChange={(e) => update("addressLine1", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Address Line 2</Label>
          <Input
            placeholder="Apartment, suite, landmark (optional)"
            value={data.addressLine2}
            onChange={(e) => update("addressLine2", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">City / Town</Label>
            <Input
              required
              placeholder="e.g., Mumbai"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">State</Label>
            <Input
              required
              placeholder="e.g., Maharashtra"
              value={data.state}
              onChange={(e) => update("state", e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">PIN Code</Label>
            <Input
              required
              placeholder="e.g., 400001"
              value={data.pinCode}
              onChange={(e) => update("pinCode", e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
