export interface Rack {
  id: string;
  name: string;
  rows: number;
  columns: number;
  width_cm: number;
  height_cm: number;
  color_hex: string;
}

export interface QuoteConfig {
  PRINT_COST_PER_SQFT: number;
  CUTTING_MULTIPLIER: number;
  LABOR_DAILY: number;
  LABOR_TRANSPORT_DAILY: number;
  LABOR_FOOD_DAILY: number;
  SHIFT_HOURS: number;
  LABEL_MARGIN_CM: number;
  BASE_MIN: number;
  GLUE_BASE_MIN: number;
  GLUE_EXTRA_MIN_PER_INCH: number;
  MILAGE_KM_PER_LITRE: number;
  PETROL_PRICE_PER_LITRE: number;
  DEFAULT_TRANSPORT_COST: number;
  MARGIN_PERCENTAGE: number;
  DATA_ENTRY_BASE_FEE: number;
  // Data Entry Config
  DATA_ENTRY_MIN_DRUGS: number; // Minimum drugs charged (e.g., 500)
  DATA_ENTRY_MIN_FEE: number; // Base fee for the minimum
  DATA_ENTRY_PER_DRUG: number; // Cost per drug ABOVE the minimum
}

export const DEFAULT_CONFIG: QuoteConfig = {
  PRINT_COST_PER_SQFT: 30,
  CUTTING_MULTIPLIER: 2, // 2x means Print + Cut
  LABOR_DAILY: 1000,
  LABOR_TRANSPORT_DAILY: 200,
  LABOR_FOOD_DAILY: 150,
  SHIFT_HOURS: 7,
  LABEL_MARGIN_CM: 0.5,
  BASE_MIN: 4,
  GLUE_BASE_MIN: 2,
  GLUE_EXTRA_MIN_PER_INCH: 0.1,
  MILAGE_KM_PER_LITRE: 25,
  PETROL_PRICE_PER_LITRE: 200,
  DEFAULT_TRANSPORT_COST: 1000,
  MARGIN_PERCENTAGE: 20,

  // Data Entry Config
  DATA_ENTRY_BASE_FEE: 2000,
  DATA_ENTRY_MIN_DRUGS: 500, // First 500 drugs
  DATA_ENTRY_MIN_FEE: 2000, // Rs. 2000 for the first 500 drugs
  DATA_ENTRY_PER_DRUG: 1.5, // Rs. 1.5 per drug after 500
};

export function calculateQuote(
  racks: Rack[],
  distance_km: number | null, // null = empty, 0 = redacted, >0 = calculated
  includeLabor: boolean,
  includeDataEntry: boolean,
  estimatedDrugs: number,
  config: QuoteConfig,
) {
  // 1. Total Labels
  const total_labels = racks.reduce((sum, r) => sum + r.rows * r.columns, 0);

  // 2. Material SqFt (Base only)
  let total_sqft = 0;
  racks.forEach((r) => {
    const w_in = (r.width_cm + config.LABEL_MARGIN_CM) / 2.54;
    const h_in = (r.height_cm + config.LABEL_MARGIN_CM) / 2.54;
    const count = r.rows * r.columns;
    total_sqft += (w_in * h_in * count) / 144.0;
  });

  // 3. ALL-IN RATE
  const base_rate = config.PRINT_COST_PER_SQFT * config.CUTTING_MULTIPLIER;
  const all_in_rate = base_rate * (1 + config.MARGIN_PERCENTAGE / 100);

  // 4. Material Cost
  const material_cost = total_sqft * all_in_rate;

  // 5. Dynamic Labor Time
  let total_minutes = 0;
  racks.forEach((r) => {
    const w_in = r.width_cm / 2.54;
    const extra_inches = Math.max(0, w_in - 16);
    const time_per_label =
      config.BASE_MIN +
      config.GLUE_BASE_MIN +
      extra_inches * config.GLUE_EXTRA_MIN_PER_INCH;
    total_minutes += r.rows * r.columns * time_per_label;
  });

  // 6. Labor Days
  const shift_minutes = config.SHIFT_HOURS * 60;
  const labor_days = Math.ceil(total_minutes / shift_minutes);
  const labor_cost =
    labor_days *
    (config.LABOR_DAILY +
      config.LABOR_TRANSPORT_DAILY +
      config.LABOR_FOOD_DAILY);

  // 7. Transport Cost (3 States: Empty, 0, Calculated)
  let transport_cost: number | null = 0; // Allow null to represent "Redacted"
  let transport_display: string;

  // 8. NEW: Data Entry Cost (Tiered)
  let data_entry_cost = 0;
  if (includeDataEntry) {
    const billableDrugs = Math.max(
      0,
      estimatedDrugs - config.DATA_ENTRY_MIN_DRUGS,
    );
    data_entry_cost =
      config.DATA_ENTRY_MIN_FEE + billableDrugs * config.DATA_ENTRY_PER_DRUG;
  }
  if (distance_km === null || distance_km === undefined) {
    // State 1: Empty (Default Minimum)
    transport_cost = config.DEFAULT_TRANSPORT_COST;
    transport_display = `Rs. ${transport_cost.toFixed(2)}`;
  } else if (distance_km === 0) {
    // State 2: Zero (Redacted)
    transport_cost = 0; // Don't add to final quote
    transport_display = "Redacted"; // Will display as a line item, but hidden
  } else {
    // State 3: Calculated (Round trip * days)
    const total_km = distance_km * 2 * Math.max(1, labor_days);
    transport_cost =
      (total_km / config.MILAGE_KM_PER_LITRE) * config.PETROL_PRICE_PER_LITRE;
    transport_display = `Rs. ${transport_cost.toFixed(2)}`;
  }

  // 8. Final Total
  let final_quote = material_cost + data_entry_cost + transport_cost; // Null coalescing for Redacted
  if (includeLabor) {
    final_quote += labor_cost;
  }

  return {
    total_labels,
    total_sqft: total_sqft.toFixed(2),
    all_in_rate: all_in_rate.toFixed(2),
    material_cost: material_cost.toFixed(2),
    labor_days,
    labor_cost: includeLabor ? labor_cost.toFixed(2) : "0.00",
    transport_cost:
      transport_cost === null ? "0.00" : transport_cost.toFixed(2),
    data_entry_cost: data_entry_cost.toFixed(2),
    transport_display,
    final_quote: final_quote.toFixed(2),
  };
}

export const RACK_NAME_POOL = [
  // A
  "Arun Valley",
  "Amber Clinic",
  "Aushadhi Mirror",
  "Apex Remedy",
  "Atlas Dose",
  // B
  "Barah Temple",
  "Birat Path",
  "Bandage Kit",
  "Bright Salve",
  "Bounty Cure",
  // C
  "Chatara Gate",
  "Cure Wells",
  "Clean Harbor",
  "Cough Syrup",
  "Calcium Bloom",
  // D
  "Dharan Lift",
  "Damak Route",
  "Diagnosis Point",
  "Doctor Kit",
  "Dew Tonic",
  // E
  "Everest Pillar",
  "Emergency Ward",
  "Enzyme Wells",
  "Eye Remedy",
  "Ember Balm",
  // F
  "Fever Ward",
  "First Aid",
  "Frost Vial",
  "Fluoride Spring",
  "Fresh Gauze",
  // G
  "Gastro Ward",
  "Glucose Drop",
  "Golden Salve",
  "Green Meadow",
  "Gentle Dose",
  // H
  "Himalayan Breeze",
  "Health Harbor",
  "Healing Wells",
  "Herbal Garden",
  "Honey Balm",
  // I
  "Ilam Aroma",
  "Itahari Oasis",
  "Immunity Vault",
  "Insulin Vial",
  "Immuno Boost",
  // J
  "Jhapa Meadow",
  "Joint Relief",
  "Jade Wells",
  "Juniper Bloom",
  "Jute Vault",
  // K
  "Kanchenjunga Glow",
  "Kidney Vault",
  "Koshi Relief",
  "Keen Remedy",
  "Kelp Wells",
  // L
  "Lahan Meadow",
  "Lumbini Bloom",
  "Liver Wells",
  "Lab Vault",
  "Lavender Spring",
  // M
  "Mechi Remedy",
  "Morang Wells",
  "Medico Vault",
  "Mind Relief",
  "Milk Bloom",
  // N
  "Night Ward",
  "Neuro Wells",
  "Noble Remedy",
  "Nutmeg Vault",
  "Nettle Bloom",
  // O
  "Ortho Ward",
  "Olive Wells",
  "Onyx Salve",
  "Oak Urn",
  "Opal Vault",
  // P
  "Patan Ward",
  "Pulse Remedy",
  "Patient Wells",
  "Pain Relief",
  "Pedia Bloom",
  // Q
  "Quick Relief",
  "Quartz Vault",
  "Quinoa Wells",
  "Quiet Dose",
  "Quill Meadow",
  // R
  "Rajbiraj Way",
  "Rapid Ward",
  "Remedy Vault",
  "Recovery Wells",
  "Rosemary Bloom",
  // S
  "Sagarmatha Peak",
  "Sunsari Wells",
  "Siraha Vault",
  "Swastya Bloom",
  "Safe Ward",
  "Sutra Remedy",
  "Sugar Vault",
  "Skin Wells",
  "Saffron Bloom",
  // T
  "Tamor Wells",
  "Throat Remedy",
  "Turmeric Vault",
  "Tulsi Bloom",
  "Tender Ward",
  // U
  "Udayapur Hills",
  "Urgent Ward",
  "Umber Vault",
  "Upland Dose",
  "Unity Wells",
  // V
  "Vital Ward",
  "Vitamin Wells",
  "Vaccine Ward",
  "Velvet Bloom",
  "Verdant Wells",
  // W
  "Wellness Ward",
  "Wound Wells",
  "Willow Bloom",
  "Warm Vault",
  "Winter Remedy",
  // X
  "Xray Ward",
  "Xenon Wells",
  "Xeric Dose",
  "Xylo Remedy",
  "Xtra Bloom",
  // Y
  "Youth Ward",
  "Yarrow Wells",
  "Yuzu Bloom",
  "Yonder Vault",
  "Yoga Remedy",
  // Z
  "Zinc Ward",
  "Zephyr Wells",
  "Zenith Bloom",
  "Zesty Remedy",
  "Zonal Vault",
];

export const RACK_COLORS = [
  // Reds
  "#E63946",
  "#D62828",
  "#C1121F",
  "#B23A48",
  "#9B2226",
  // Pinks / Magentas
  "#E6398C",
  "#D81B60",
  "#C2185B",
  "#AD1457",
  "#B5179E",
  // Oranges
  "#F4511E",
  "#E85D04",
  "#F77F00",
  "#DC6B2F",
  "#BF5700",
  // Ambers / Yellows
  "#F4A300",
  "#F9A825",
  "#FFB300",
  "#E6A800",
  "#D4A017",
  // Yellow-Greens / Limes
  "#A4C639",
  "#8BC34A",
  "#7CB342",
  "#689F38",
  "#558B2F",
  // Greens
  "#2E7D32",
  "#1B8A3A",
  "#00897B",
  "#00796B",
  "#2A9D8F",
  // Teals / Cyans
  "#00B4D8",
  "#0096C7",
  "#0091AD",
  "#0891B2",
  "#00A5CF",
  // Blues
  "#1E6FD9",
  "#1D4ED8",
  "#0D47A1",
  "#1565C0",
  "#2563EB",
  // Indigos / Purples
  "#3F51B5",
  "#3949AB",
  "#5E35B1",
  "#6A1B9A",
  "#7B1FA2",
  // Violets / Deep Purples
  "#8E24AA",
  "#9C27B0",
  "#AB47BC",
  "#7E57C2",
  "#512DA8",
  // Browns / Earth
  "#8D6E63",
  "#6D4C41",
  "#5D4037",
  "#795548",
  "#A1887F",
  // Deep / Neutral
  "#37474F",
  "#455A64",
  "#546E7A",
  "#263238",
  "#3E4C59",
];
