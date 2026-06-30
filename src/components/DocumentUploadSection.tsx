import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export interface Documents {
  udyamCertificate: File | null;
  gstCertificate: File | null;
  cancelledCheque: File | null;
  bankPassbookFrontPage: File | null;
  ownerPanCard: File | null;
  aadharCard: File | null;
  latestBankStatement: File | null;
  tradeLicense: File | null;
  leaseAgreement: File | null;
}

interface DocumentUploadSectionProps {
  documents: Documents;
  onChange: (documents: Documents) => void;
}

const DOCUMENT_FIELDS: { key: keyof Documents; label: string }[] = [
  { key: "udyamCertificate", label: "UDYAM Certificate" },
  { key: "gstCertificate", label: "GST Certificate" },
  { key: "cancelledCheque", label: "Cancelled Cheque" },
  { key: "bankPassbookFrontPage", label: "Bank Passbook Front Page" },
  { key: "ownerPanCard", label: "Owner PAN Card" },
  { key: "aadharCard", label: "Aadhaar Card" },
  { key: "latestBankStatement", label: "Latest Bank Statement" },
  { key: "tradeLicense", label: "Trade License" },
  { key: "leaseAgreement", label: "Lease Agreement (If Leased Property)" },
];

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/jpg,image/png";

export default function DocumentUploadSection({ documents, onChange }: DocumentUploadSectionProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof Documents, string>>>({});

  const handleFile = (key: keyof Documents, file: File | null) => {
    if (file && file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, [key]: "File exceeds 10 MB limit" }));
      toast({
        title: "File too large",
        description: `${file.name} exceeds the 10 MB limit.`,
        variant: "destructive",
      });
      return;
    }
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    onChange({ ...documents, [key]: file });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.37 }}
      className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8"
    >
      <h2 className="font-display text-2xl text-foreground mb-2">Document Upload</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Accepted formats: PDF, JPG, JPEG, PNG. Max size: 10 MB per file.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOCUMENT_FIELDS.map(({ key, label }) => {
          const file = documents[key];
          const err = errors[key];
          return (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <FileText className="h-4 w-4 text-foreground" />
                </span>
                {label}
              </Label>
              <Input
                type="file"
                accept={ACCEPTED}
                onChange={(e) => handleFile(key, e.target.files?.[0] ?? null)}
                className="h-12 text-base file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 cursor-pointer"
              />
              {file && !err && (
                <p className="text-xs text-muted-foreground truncate">
                  Selected: <span className="font-medium text-foreground">{file.name}</span>
                </p>
              )}
              {err && <p className="text-xs text-destructive">{err}</p>}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
