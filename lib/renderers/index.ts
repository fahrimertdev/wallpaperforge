import type { WallpaperConfig, WallpaperTypeId, Palette } from "@/lib/types";
import { renderGradient, gradientDefinition } from "./gradient";
import { renderGeometric, geometricDefinition } from "./geometric";
import { renderBlob, blobDefinition } from "./blob";
import { renderNoise, noiseDefinition } from "./noise";
import { renderTopography, topographyDefinition } from "./topography";

export type RenderFn = (
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
) => void;

export const RENDERERS: Record<WallpaperTypeId, RenderFn> = {
  gradient: renderGradient,
  geometric: renderGeometric,
  blob: renderBlob,
  noise: renderNoise,
  topography: renderTopography,
};

export const WALLPAPER_TYPE_DEFINITIONS = [
  gradientDefinition,
  geometricDefinition,
  blobDefinition,
  noiseDefinition,
  topographyDefinition,
];

export function getRenderer(typeId: WallpaperTypeId): RenderFn {
  return RENDERERS[typeId];
}

export function getTypeDefinition(typeId: WallpaperTypeId) {
  return WALLPAPER_TYPE_DEFINITIONS.find((d) => d.id === typeId)!;
}
