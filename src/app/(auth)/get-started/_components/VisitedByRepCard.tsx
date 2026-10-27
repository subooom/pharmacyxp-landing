import React, { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import { useSignUpStore } from "@/store/sing-up.store";
import { useSignupInvite } from "../_hooks/useSignupInvite";

/**
 * "Has a MedicineXP rep visited you?": the rep's code plus the pharmacy's PAN fill in
 * what the pharmacy already told the rep, so they only check it and add the rest.
 */
const VisitedByRepCard = () => {
  const presetCode = useSignUpStore((state) => state.formData.coupon_code);
  const [open, setOpen] = useState(Boolean(presetCode));
  const [code, setCode] = useState(presetCode || "");
  const [pan, setPan] = useState("");
  const { loading, error, fromCodeAndPan } = useSignupInvite();

  // Opened from a rep's QR code (?coupon=): the code is already known
  useEffect(() => {
    if (presetCode) {
      setCode((current) => current || presetCode);
      setOpen(true);
    }
  }, [presetCode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 4 || pan.replace(/\D/g, "").length < 5) return;
    fromCodeAndPan(code, pan);
  };

  return (
    <div className="w-full rounded-2xl border border-primary/20 bg-background p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ClipboardCheck className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground">
            Has a MedicineXP rep visited you?
          </h3>
          <p className="mt-1 text-sm text-foreground/70">
            We&apos;ll fill in what you told them. You just check it and add
            your logo and password.
          </p>
        </div>
      </div>

      {open ? (
        <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="visit_code">Rep&apos;s code</Label>
            <Input
              id="visit_code"
              value={code}
              onChange={({ target }) => setCode(target.value.toUpperCase())}
              placeholder="e.g. SAR-52"
              maxLength={12}
              autoCapitalize="characters"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="visit_pan">Your PAN number</Label>
            <Input
              id="visit_pan"
              value={pan}
              onChange={({ target }) => setPan(target.value)}
              placeholder="9 digits"
              inputMode="numeric"
              maxLength={15}
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive sm:col-span-2" role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || code.trim().length < 4 || pan.replace(/\D/g, "").length < 5}
            className="w-full sm:col-span-2"
          >
            {loading && <Spinner />}
            Fill my details
          </Button>
        </form>
      ) : (
        <Button
          variant="outline"
          className="mt-4 w-full sm:w-auto"
          onClick={() => setOpen(true)}
        >
          Yes, fill my details
        </Button>
      )}
    </div>
  );
};

export default VisitedByRepCard;
