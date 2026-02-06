import { motion } from "framer-motion";
import { Landmark, CreditCard, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface BankDetailsData {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
}

interface BankDetailsSectionProps {
  data: BankDetailsData;
  onChange: (data: BankDetailsData) => void;
}

export default function BankDetailsSection({ data, onChange }: BankDetailsSectionProps) {
  const update = (field: keyof BankDetailsData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
    >
      <h2 className="font-display text-2xl text-foreground mb-6">Bank Account Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Landmark className="h-4 w-4 text-foreground" />
            </span>
            Account Holder Name
          </Label>
          <Input
            required
            placeholder="Full name as per bank records"
            value={data.accountHolderName}
            onChange={(e) => update("accountHolderName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-foreground" />
            </span>
            Account Number
          </Label>
          <Input
            required
            placeholder="e.g., 1234567890"
            value={data.accountNumber}
            onChange={(e) => update("accountNumber", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Hash className="h-4 w-4 text-foreground" />
            </span>
            IFSC Code
          </Label>
          <Input
            required
            placeholder="e.g., SBIN0001234"
            value={data.ifscCode}
            onChange={(e) => update("ifscCode", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Landmark className="h-4 w-4 text-foreground" />
            </span>
            Bank Name
          </Label>
          <Input
            required
            placeholder="e.g., State Bank of India"
            value={data.bankName}
            onChange={(e) => update("bankName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <MapPinIcon className="h-4 w-4 text-foreground" />
            </span>
            Branch Name
          </Label>
          <Input
            required
            placeholder="e.g., Andheri West Branch"
            value={data.branchName}
            onChange={(e) => update("branchName", e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </div>
    </motion.div>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
