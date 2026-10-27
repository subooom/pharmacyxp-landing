"use client";

import { useState } from "react";
import {
  Trash2,
  Calculator,
  MapPin,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  calculateQuote,
  DEFAULT_CONFIG,
  QuoteConfig,
  Rack,
  RACK_COLORS,
  RACK_NAME_POOL,
} from "@/lib/quote-util";

const CM_PER_INCH = 2.54;

const INCH_WIDTH_PRESETS = [4, 6, 8, 12, 16, 22];
const CM_WIDTH_PRESETS = [10, 15, 20, 30, 40];

const INCH_HEIGHT_PRESETS = [0.5, 0.8, 1, 1.5, 2, 3, 4];
const CM_HEIGHT_PRESETS = [1.27, 2, 2.54, 3.81, 5.08, 7.62, 10.16];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

const getContrastText = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
};

const generateRack = (existing: Rack[]): Rack => {
  let selectedName = "";
  let attempts = 0;
  while (attempts < 100) {
    const candidate =
      RACK_NAME_POOL[Math.floor(Math.random() * RACK_NAME_POOL.length)];
    const candidateInitials = getInitials(candidate);
    const existingInitials = existing.map((r) => getInitials(r.name));
    if (!existingInitials.includes(candidateInitials)) {
      selectedName = candidate;
      break;
    }
    attempts++;
  }
  if (!selectedName) selectedName = `Rack ${existing.length + 1}`;
  return {
    id: Date.now().toString(),
    name: selectedName,
    rows: Math.floor(Math.random() * 12) + 1,
    columns: Math.floor(Math.random() * 12) + 1,
    width_cm: 20 + Math.floor(Math.random() * 20),
    height_cm: 5 + Math.floor(Math.random() * 10),
    color_hex: RACK_COLORS[Math.floor(Math.random() * RACK_COLORS.length)],
  };
};

export function RackQuoteCalculator() {
  const [racks, setRacks] = useState<Rack[]>([generateRack([])]);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [includeLabor, setIncludeLabor] = useState(true);
  const [includeDataEntry, setIncludeDataEntry] = useState(false);
  const [estimatedDrugs, setEstimatedDrugs] = useState<number>(500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [config, setConfig] = useState<QuoteConfig>(DEFAULT_CONFIG);
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const quote = calculateQuote(
    racks,
    distanceKm,
    includeLabor,
    includeDataEntry,
    estimatedDrugs,
    config,
  );

  const updateRack = (id: string, field: keyof Rack, value: string | number) =>
    setRacks(racks.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  const addRack = () => setRacks([...racks, generateRack(racks)]);
  const removeRack = (id: string) => setRacks(racks.filter((r) => r.id !== id));

  const switchUnit = (newUnit: "in" | "cm") => {
    if (newUnit === unit) return;
    setRacks(
      racks.map((r) => ({
        ...r,
        width_cm:
          newUnit === "in"
            ? r.width_cm / CM_PER_INCH
            : r.width_cm * CM_PER_INCH,
        height_cm:
          newUnit === "in"
            ? r.height_cm / CM_PER_INCH
            : r.height_cm * CM_PER_INCH,
      })),
    );
    setUnit(newUnit);
  };

  const displayValue = (val_cm: number) =>
    unit === "in" ? +(val_cm / CM_PER_INCH).toFixed(2) : +val_cm.toFixed(2);

  const storeValue = (val: number) => (unit === "in" ? val * CM_PER_INCH : val);

  const widthPresets = unit === "in" ? INCH_WIDTH_PRESETS : CM_WIDTH_PRESETS;
  const heightPresets = unit === "in" ? INCH_HEIGHT_PRESETS : CM_HEIGHT_PRESETS;

  return (
    <div className="w-full px-2 sm:px-4 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ==================== LEFT: RACK INPUTS ==================== */}
        <div className="w-full space-y-6">
          <Card className="border-none shadow-lg bg-white dark:bg-slate-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    Define Racks
                  </CardTitle>
                  <CardDescription>
                    Auto-filled with regional names & unique initials.
                  </CardDescription> Welcome
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-950">
                <Label className="text-sm font-semibold">
                  Measurement Unit
                </Label>
                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-lg p-1 border">
                  <button
                    type="button"
                    onClick={() => switchUnit("in")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === "in"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => switchUnit("cm")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === "cm"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {racks.map((rack) => (
                <div
                  key={rack.id}
                  className="p-4 rounded-xl border border-border/50 space-y-4"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md font-bold shadow-sm text-sm truncate"
                      style={{
                        backgroundColor: rack.color_hex,
                        color: getContrastText(rack.color_hex),
                      }}
                    >
                      <span className="truncate">{rack.name}</span>
                      <span className="text-xs opacity-70 shrink-0">
                        ({getInitials(rack.name)})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRack(rack.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Rack Name</Label>
                      <Input
                        value={rack.name}
                        onChange={(e) =>
                          updateRack(rack.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rows & Columns</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          value={rack.rows}
                          onChange={(e) =>
                            updateRack(
                              rack.id,
                              "rows",
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                        />
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          value={rack.columns}
                          onChange={(e) =>
                            updateRack(
                              rack.id,
                              "columns",
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* WIDTH */}
                    <div className="space-y-2">
                      <Label>Label Width ({unit === "in" ? "in" : "cm"})</Label>
                      <div className="flex gap-1.5 flex-wrap">
                        {widthPresets.map((preset) => {
                          const presetCm =
                            unit === "in" ? preset * CM_PER_INCH : preset;
                          const isActive =
                            Math.abs(rack.width_cm - presetCm) < 0.5;
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() =>
                                updateRack(rack.id, "width_cm", presetCm)
                              }
                              className={`px-2 py-1 rounded text-xs font-bold border transition-all ${
                                isActive
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-white dark:bg-slate-900 border-border hover:border-primary/50"
                              }`}
                            >
                              {preset}
                              {unit === "in" ? '"' : ""}
                            </button>
                          );
                        })}
                      </div>
                      <Input
                        type="number"
                        step="0.1"
                        value={displayValue(rack.width_cm)}
                        onChange={(e) =>
                          updateRack(
                            rack.id,
                            "width_cm",
                            storeValue(parseFloat(e.target.value) || 0),
                          )
                        }
                      />
                    </div>

                    {/* HEIGHT */}
                    <div className="space-y-2">
                      <Label>
                        Label Height ({unit === "in" ? "in" : "cm"})
                      </Label>
                      <div className="flex gap-1.5 flex-wrap">
                        {heightPresets.map((preset) => {
                          const presetCm =
                            unit === "in" ? preset * CM_PER_INCH : preset;
                          const isActive =
                            Math.abs(rack.height_cm - presetCm) < 0.5;
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() =>
                                updateRack(rack.id, "height_cm", presetCm)
                              }
                              className={`px-2 py-1 rounded text-xs font-bold border transition-all ${
                                isActive
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-white dark:bg-slate-900 border-border hover:border-primary/50"
                              }`}
                            >
                              {preset}
                              {unit === "in" ? '"' : ""}
                            </button>
                          );
                        })}
                      </div>
                      <Input
                        type="number"
                        step="0.1"
                        value={displayValue(rack.height_cm)}
                        onChange={(e) =>
                          updateRack(
                            rack.id,
                            "height_cm",
                            storeValue(parseFloat(e.target.value) || 0),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full border-primary/50 text-primary hover:bg-primary/10"
                onClick={addRack}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Add Next Rack
              </Button>

              <Separator />

              {/* Distance */}
              <div className="p-4 rounded-xl border bg-primary/5 dark:bg-primary/10">
                <Label className="flex items-center gap-2 text-base font-semibold mb-2">
                  <MapPin className="h-5 w-5 text-primary" /> Distance from
                  Office (Km)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={distanceKm ?? ""}
                    onChange={(e) =>
                      setDistanceKm(
                        e.target.value ? parseFloat(e.target.value) : null,
                      )
                    }
                    placeholder="e.g. 12"
                  />
                  {distanceKm !== null && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDistanceKm(null)}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {/* Self Install */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg border">
                <div className="space-y-0.5 min-w-0">
                  <Label>Client Self-Install</Label>
                  <p className="text-xs text-muted-foreground">
                    Disable labor costs
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!includeLabor}
                    onChange={(e) => setIncludeLabor(!e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Data Entry */}
              <div className="rounded-lg border border-primary/40 bg-primary/5 overflow-hidden">
                <div className="flex items-center justify-between gap-3 p-3">
                  <div className="space-y-0.5 min-w-0">
                    <Label className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate">Data Entry Service</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      We bulk-enter your stock inventory
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={includeDataEntry}
                      onChange={(e) => setIncludeDataEntry(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                {includeDataEntry && (
                  <div className="p-4 pt-0 space-y-4 border-t border-primary/20">
                    <div className="pt-4 space-y-2">
                      <Label className="text-sm">
                        Estimated Number of Drugs
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[500, 1000, 2000, 5000, 10000].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setEstimatedDrugs(tier)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                              estimatedDrugs === tier
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-white dark:bg-slate-900 border-border hover:border-primary/50"
                            }`}
                          >
                            {tier.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Input
                          type="number"
                          value={estimatedDrugs}
                          onChange={(e) =>
                            setEstimatedDrugs(parseInt(e.target.value) || 0)
                          }
                          min={0}
                          className="bg-white dark:bg-slate-950"
                        />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          drugs
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pt-1">
                        Service fee:{" "}
                        <span className="font-bold text-primary">
                          Rs. {quote.data_entry_cost}
                        </span>{" "}
                        ({config.DATA_ENTRY_MIN_FEE} base + Rs.{" "}
                        {config.DATA_ENTRY_PER_DRUG}/drug over{" "}
                        {config.DATA_ENTRY_MIN_DRUGS})
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ==================== RIGHT: FLOATING QUOTE ==================== */}
        <div className="w-full lg:sticky lg:top-4">
          <Card className="border-none shadow-lg bg-primary text-primary-foreground">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Projected Estimate
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Updates instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-2 flex-wrap">
                {racks.map((rack) => (
                  <span
                    key={rack.id}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-md font-bold text-xl shadow-sm"
                    style={{
                      backgroundColor: rack.color_hex,
                      color: getContrastText(rack.color_hex),
                    }}
                  >
                    <span>{getInitials(rack.name)}</span>
                    <span className="text-[16px] opacity-70">
                      ({rack.rows}×{rack.columns})
                    </span>
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <p className="text-xs opacity-80">Total Labels</p>
                  <p className="text-2xl font-bold">{quote.total_labels}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <p className="text-xs opacity-80">Labor Days</p>
                  <p className="text-2xl font-bold">
                    {includeLabor ? quote.labor_days : "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/90">
                    Material Rate
                  </span>
                  <span className="font-mono text-xs">
                    Rs. {quote.all_in_rate} / Sq.Ft.
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/90">
                    Total Material ({quote.total_sqft} ft²)
                  </span>
                  <span className="font-mono text-xs">
                    Rs. {quote.material_cost}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/90">
                    Transport / Petrol
                  </span>
                  <span className="font-mono text-xs">
                    Rs. {quote.transport_cost}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/90">Labor Cost</span>
                  <span className="font-mono text-xs">
                    Rs. {quote.labor_cost}
                  </span>
                </div>
                {includeDataEntry && (
                  <div className="flex justify-between items-center">
                    <span className="text-primary-foreground/90">
                      Data Entry Service
                    </span>
                    <span className="font-mono text-xs">
                      Rs. {quote.data_entry_cost}
                    </span>
                  </div>
                )}
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-2">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-sm font-semibold">Total Estimate</span>
                  <span className="font-mono text-xl sm:text-2xl font-bold">
                    Rs. {quote.final_quote}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
