import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StepPageLayout from "@/layouts/StepPageLayout";
import Image from "next/image";
import { useSignUpStore } from "@/store/sing-up.store";

type LogoShape = "circle" | "rounded" | "square";

const SHAPES: { value: LogoShape; label: string }[] = [
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
  { value: "square", label: "Square" },
];

// Curated palette — all pleasant, all pair well with white or black text
const BG_PALETTE = [
  "#4f46e5", // indigo
  "#0ea5e9", // sky
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#0f172a", // slate-900
  "#64748b", // slate-500
  "#14b8a6", // teal
];

const deriveInitials = (name?: string) => {
  if (!name) return "AB";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "AB";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

const isLight = (hex: string) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Perceived luminance
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
};

const pickTextColor = (bg: string) => (isLight(bg) ? "#0f172a" : "#ffffff");

const LogoGenerator = ({
  defaultInitials,
  onGenerate,
}: {
  defaultInitials: string;
  onGenerate: (file: File, preview: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [initials, setInitials] = useState(defaultInitials);
  const [bgColor, setBgColor] = useState(BG_PALETTE[0]);
  const [textColor, setTextColor] = useState(pickTextColor(BG_PALETTE[0]));
  const [shape, setShape] = useState<LogoShape>("rounded");

  useEffect(() => {
    handleUse()
  }, [])

  // Sync when org name changes (user types name after opening generator)
  useEffect(() => {
    setInitials(defaultInitials);
  }, [defaultInitials]);

  // Auto-adjust text color whenever bg changes (unless user picked it manually)
  const [manualTextColor, setManualTextColor] = useState(false);
  useEffect(() => {
    if (!manualTextColor) setTextColor(pickTextColor(bgColor));
  }, [bgColor, manualTextColor]);

  // Render at 2x (1024×1024) for crisp output
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 1024;
    canvas.width = SIZE;
    canvas.height = SIZE;
    ctx.clearRect(0, 0, SIZE, SIZE);

    // Background shape
    ctx.fillStyle = bgColor;
    const radius =
      shape === "circle" ? SIZE / 2 : shape === "rounded" ? SIZE * 0.125 : 0;
    ctx.beginPath();
    ctx.roundRect(0, 0, SIZE, SIZE, radius);
    ctx.fill();

    // Initials — auto-shrink
    const text = (initials || "?").slice(0, 3).toUpperCase();
    const fontSize = text.length <= 1 ? 560 : text.length === 2 ? 440 : 340;
    ctx.fillStyle = textColor;
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, SIZE / 2, SIZE / 2 + fontSize * 0.04);
  }, [initials, bgColor, textColor, shape]);

  // 🎲 Randomize: pick random bg + auto-contrast text + random shape
  const randomize = () => {
    const nextBg =
      BG_PALETTE[Math.floor(Math.random() * BG_PALETTE.length)];
    setBgColor(nextBg);
    setTextColor(pickTextColor(nextBg));
    setManualTextColor(false);
    const shapes: LogoShape[] = ["rounded", "circle", "square"];
    setShape(shapes[Math.floor(Math.random() * shapes.length)]);
  };

  const handleUse = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "organization-logo.png", {
        type: "image/png",
      });
      onGenerate(file, canvas.toDataURL("image/png"));
    }, "image/png");
  }, [onGenerate]);

  const swatches = useMemo(() => BG_PALETTE, []);

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
      {/* Preview + initials + randomize */}
      <div className="flex items-center gap-4">
        <canvas
          ref={canvasRef}
          className="w-20 h-20 rounded-lg border shadow-sm shrink-0"
          aria-label="Generated logo preview"
        />
        <div className="flex-1 space-y-2">
          <Input
            value={initials}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            maxLength={3}
            placeholder="Initials (max 3)"
            aria-label="Logo initials"
          />
        </div>
        <button
          type="button"
          onClick={randomize}
          title="Randomize colors & shape"
          className="h-9 px-2 shrink-0 rounded border bg-background hover:bg-muted text-lg leading-none"
          aria-label="Randomize logo"
        >
          🎲
        </button>
      </div>

      {/* Color swatches */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Background</Label>
        <div className="flex flex-wrap items-center gap-2">
          {swatches.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setBgColor(c);
                setManualTextColor(false);
              }}
              className={`h-7 w-7 rounded-full border-2 transition ${
                bgColor === c
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Background ${c}`}
            />
          ))}
          <input
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              setManualTextColor(false);
            }}
            className="h-7 w-7 rounded-full border cursor-pointer bg-transparent p-0"
            aria-label="Custom background color"
          />
        </div>
      </div>

      {/* Text color + shape in one row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Text</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                setManualTextColor(true);
              }}
              className="h-8 w-10 rounded border cursor-pointer bg-transparent"
              aria-label="Text color"
            />
            <button
              type="button"
              onClick={() => setManualTextColor(false)}
              className="text-xs px-2 py-1 rounded border bg-background hover:bg-muted"
              title="Auto-pick contrasting text color"
            >
              Auto
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Shape</Label>
          <div className="flex gap-1">
            {SHAPES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setShape(s.value)}
                className={`flex-1 px-2 py-1.5 text-xs rounded border transition ${
                  shape === s.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleUse}
        className="w-full px-3 py-2 text-sm rounded bg-primary text-primary-foreground hover:opacity-90"
      >
        Use this logo
      </button>
    </div>
  );
};

const OrganizationDetails = () => {
  const {
    updateFormData,
    formData: {
      organization_name,
      organization_contact,
      organization_logo,
      organization_pan_number,
      organization_description,
    },
    errors,
  } = useSignUpStore();
  const [orgLogoImage, setOrgLogoImage] = useState<string | undefined>();
  const [logoMode, setLogoMode] = useState<"upload" | "generate">("upload");

  const defaultInitials = useMemo(
    () => deriveInitials(organization_name),
    [organization_name],
  );

  const applyLogo = (file: File, preview: string) => {
    setOrgLogoImage(preview);
    updateFormData({ organization_logo: file });
  };

  return (
    <StepPageLayout
      title="Organization Details"
      subtitle="Let us know about your organization so we can customize your experience using our platform."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="organization_name">Name Of Your Organization *</Label>
          <Input
            id="organization_name"
            value={organization_name}
            onChange={({ target }) =>
              updateFormData({ organization_name: target.value })
            }
            className={errors?.organization_name ? "border-destructive" : ""}
          />
          {errors?.organization_name && (
            <p
              className="text-sm text-destructive"
              id="organization_name-error-message"
            >
              {errors.organization_name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization_contact">Contact Number *</Label>
          <Input
            id="organization_contact"
            value={organization_contact}
            onChange={({ target }) =>
              updateFormData({ organization_contact: target.value })
            }
            type="tel"
            className={errors?.organization_contact ? "border-destructive" : ""}
          />
          {errors?.organization_contact && (
            <p
              className="text-sm text-destructive"
              id="organization_contact-error-message"
            >
              {errors.organization_contact}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="organization_logo">Organization Logo *</Label>
            <div className="flex gap-1 text-xs">
              <button
                type="button"
                onClick={() => setLogoMode("generate")}
                className={`px-2 py-1 rounded ${
                  logoMode === "generate"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => setLogoMode("upload")}
                className={`px-2 py-1 rounded ${
                  logoMode === "upload"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                Upload
              </button>
            </div>
          </div>

          {logoMode === "generate" ? (
            <LogoGenerator
              defaultInitials={defaultInitials}
              onGenerate={applyLogo}
            />
          ) : (
            <Input
              id="organization_logo"
              type="file"
              accept="image/*"
              className={errors?.organization_logo ? "border-destructive" : ""}
              onChange={({ target }) => {
                const file = target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = (e) => {
                  if (e.target?.result) {
                    setOrgLogoImage(e.target.result as string);
                  }
                };
                reader.readAsDataURL(file);

                updateFormData({ organization_logo: file });
              }}
            />
          )}

          {orgLogoImage && (
            <div className="flex items-start gap-4 mt-3">
              <Image
                src={orgLogoImage}
                alt="Org Logo"
                width={60}
                height={60}
                className="rounded border"
              />
              <button
                className="text-destructive bg-white border px-3 py-1 rounded hover:bg-red-50"
                onClick={() => {
                  updateFormData({ organization_logo: undefined });
                  (
                    document.getElementById(
                      "organization_logo",
                    ) as HTMLInputElement
                  )?.setAttribute("value", "");
                  setOrgLogoImage(undefined);
                }}
              >
                Remove
              </button>
            </div>
          )}
          {errors?.organization_logo && (
            <p
              className="text-sm text-destructive"
              id="organization_logo-error-message"
            >
              {errors.organization_logo}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization_pan_number">PAN Number *</Label>
          <Input
            id="organization_pan_number"
            value={organization_pan_number}
            onChange={({ target }) =>
              updateFormData({ organization_pan_number: target.value })
            }
            type="text"
            inputMode="numeric"
            className={
              errors?.organization_pan_number ? "border-destructive" : ""
            }
          />
          {errors?.organization_pan_number && (
            <p
              className="text-sm text-destructive"
              id="organization_pan_number-error-message"
            >
              {errors.organization_pan_number}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization_description">Other Details</Label>
        <Textarea
          id="organization_description"
          value={organization_description}
          onChange={({ target }) =>
            updateFormData({ organization_description: target.value })
          }
        />
      </div>
    </StepPageLayout>
  );
};

export default OrganizationDetails;