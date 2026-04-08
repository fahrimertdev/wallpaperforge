import type { SizePreset, DevicePresetId } from "@/lib/types";

export const SIZE_PRESETS: SizePreset[] = [
  { id: "iphone", name: "iPhone", width: 1170, height: 2532, category: "phone" },
  { id: "iphone-pro-max", name: "iPhone Pro Max", width: 1290, height: 2796, category: "phone" },
  { id: "android", name: "Android", width: 1080, height: 2400, category: "phone" },
  { id: "ipad", name: "iPad", width: 2048, height: 2732, category: "tablet" },
  { id: "desktop-hd", name: "Desktop HD", width: 1920, height: 1080, category: "desktop" },
  { id: "desktop-4k", name: "Desktop 4K", width: 3840, height: 2160, category: "desktop" },
  { id: "ultrawide", name: "Ultrawide", width: 3440, height: 1440, category: "desktop" },
];

export const DEFAULT_SIZE_PRESET_ID: DevicePresetId = "desktop-hd";

export function getSizePresetById(id: string): SizePreset {
  return SIZE_PRESETS.find((s) => s.id === id) ?? SIZE_PRESETS[4];
}
