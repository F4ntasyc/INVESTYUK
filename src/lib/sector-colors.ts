// Pemetaan `sectors.color` (nama token di globals.css) ke kelas Tailwind.
// Kelas ditulis lengkap (bukan dirakit dari string) agar terdeteksi Tailwind.

export type SectorColor =
  | "green"
  | "purple"
  | "blue"
  | "orange"
  | "pink"
  | "teal"
  | "indigo";

export const sectorColorClasses: Record<SectorColor, string> = {
  green: "bg-tint-green text-icon-green",
  purple: "bg-tint-purple text-icon-purple",
  blue: "bg-tint-blue text-icon-blue",
  orange: "bg-tint-orange text-icon-orange",
  pink: "bg-tint-pink text-icon-pink",
  teal: "bg-tint-teal text-icon-teal",
  indigo: "bg-tint-indigo text-icon-indigo",
};

export function toSectorColor(value: string | null | undefined): SectorColor {
  return value && value in sectorColorClasses ? (value as SectorColor) : "blue";
}
