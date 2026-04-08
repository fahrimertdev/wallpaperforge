import type { WallpaperConfig, WallpaperTypeId } from "@/lib/types";
import { PALETTES, getPaletteById } from "@/lib/data/palettes";
import { getTypeDefinition } from "@/lib/renderers";

const WALLPAPER_TYPES: WallpaperTypeId[] = [
  "gradient", "geometric", "blob", "noise", "topography",
];

export function randomizeAll(config: WallpaperConfig): WallpaperConfig {
  const newType = WALLPAPER_TYPES[Math.floor(Math.random() * WALLPAPER_TYPES.length)];
  const newPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
  const def = getTypeDefinition(newType);
  const newParams = def.randomizeParams(newPalette);
  return {
    ...config,
    type: newType,
    paletteId: newPalette.id,
    customColors: undefined,
    params: newParams,
  };
}

export function randomizeParams(config: WallpaperConfig): Record<string, number | string | boolean> {
  const palette = getPaletteById(config.paletteId);
  const def = getTypeDefinition(config.type);
  return def.randomizeParams(palette);
}
