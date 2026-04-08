import type { WallpaperConfig, WallpaperTypeId, DevicePresetId } from "@/lib/types";
import { getTypeDefinition } from "@/lib/renderers";
import { DEFAULT_PALETTE_ID } from "@/lib/data/palettes";
import { DEFAULT_SIZE_PRESET_ID } from "@/lib/data/sizePresets";

const VALID_TYPES: WallpaperTypeId[] = ["gradient", "geometric", "blob", "noise", "topography"];
const VALID_SIZES: DevicePresetId[] = [
  "iphone", "iphone-pro-max", "android", "ipad",
  "desktop-hd", "desktop-4k", "ultrawide", "custom",
];

export function serializeConfig(config: WallpaperConfig): string {
  const params = new URLSearchParams();
  params.set("type", config.type);
  params.set("palette", config.paletteId);
  params.set("size", config.sizePresetId);
  if (config.customColors?.length) {
    params.set("colors", config.customColors.join(","));
  }
  if (config.customWidth) params.set("cw", String(config.customWidth));
  if (config.customHeight) params.set("ch", String(config.customHeight));
  params.set("params", btoa(JSON.stringify(config.params)));
  return params.toString();
}

export function deserializeConfig(search: string): WallpaperConfig | null {
  try {
    const params = new URLSearchParams(search);
    const type = params.get("type") as WallpaperTypeId;
    if (!type || !VALID_TYPES.includes(type)) return null;

    const paletteId = params.get("palette") ?? DEFAULT_PALETTE_ID;
    const sizePresetId = (params.get("size") as DevicePresetId) ?? DEFAULT_SIZE_PRESET_ID;
    if (!VALID_SIZES.includes(sizePresetId)) return null;

    const colorsRaw = params.get("colors");
    const customColors = colorsRaw ? colorsRaw.split(",") : undefined;

    const customWidth = params.get("cw") ? Number(params.get("cw")) : undefined;
    const customHeight = params.get("ch") ? Number(params.get("ch")) : undefined;

    const paramsRaw = params.get("params");
    let parsedParams: Record<string, number | string | boolean>;
    if (paramsRaw) {
      try {
        parsedParams = JSON.parse(atob(paramsRaw));
      } catch {
        parsedParams = getTypeDefinition(type).getDefaultParams();
      }
    } else {
      parsedParams = getTypeDefinition(type).getDefaultParams();
    }

    return {
      type,
      paletteId,
      customColors,
      params: parsedParams,
      sizePresetId,
      customWidth,
      customHeight,
    };
  } catch {
    return null;
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function updateURL(config: WallpaperConfig, delay = 300): void {
  if (typeof window === "undefined") return;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const qs = serializeConfig(config);
    const newUrl = `${window.location.pathname}?${qs}`;
    window.history.replaceState(null, "", newUrl);
  }, delay);
}

export function readConfigFromURL(): WallpaperConfig | null {
  if (typeof window === "undefined") return null;
  return deserializeConfig(window.location.search);
}
