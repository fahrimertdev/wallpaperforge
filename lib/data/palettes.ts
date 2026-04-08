import type { Palette } from "@/lib/types";

export const PALETTES: Palette[] = [
  {
    id: "sunset",
    name: "Sunset",
    colors: ["#FF6B6B", "#FF8E53", "#FFD93D", "#FF6B9D", "#C44569"],
    tags: ["warm", "vibrant"],
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: ["#0077B6", "#00B4D8", "#90E0EF", "#48CAE4", "#023E8A"],
    tags: ["cool", "calm"],
  },
  {
    id: "forest",
    name: "Forest",
    colors: ["#1B4332", "#2D6A4F", "#52B788", "#95D5B2", "#D8F3DC"],
    tags: ["nature", "calm"],
  },
  {
    id: "midnight",
    name: "Midnight",
    colors: ["#0A0A0F", "#1A1A2E", "#16213E", "#0F3460", "#533483"],
    tags: ["dark", "moody"],
  },
  {
    id: "pastel",
    name: "Pastel",
    colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
    tags: ["soft", "light"],
  },
  {
    id: "neon",
    name: "Neon",
    colors: ["#FF0080", "#00FFFF", "#FF6600", "#39FF14", "#BF00FF"],
    tags: ["vibrant", "electric"],
  },
  {
    id: "earth",
    name: "Earth",
    colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"],
    tags: ["warm", "natural"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#0A0A0A", "#2A2A2A", "#555555", "#888888", "#CCCCCC"],
    tags: ["minimal", "clean"],
  },
  {
    id: "nord",
    name: "Nord",
    colors: ["#2E3440", "#3B4252", "#4C566A", "#88C0D0", "#81A1C1"],
    tags: ["cool", "dev", "minimal"],
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: ["#282A36", "#6272A4", "#BD93F9", "#FF79C6", "#50FA7B"],
    tags: ["dark", "dev", "vibrant"],
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    colors: ["#1E1E2E", "#313244", "#89B4FA", "#CBA6F7", "#F38BA8"],
    tags: ["pastel", "dev", "aesthetic"],
  },
  {
    id: "aurora",
    name: "Aurora",
    colors: ["#00C9FF", "#92FE9D", "#FC466B", "#3F5EFB", "#FC466B"],
    tags: ["vibrant", "colorful"],
  },
];

export const DEFAULT_PALETTE_ID = "midnight";

export function getPaletteById(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
