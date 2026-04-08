export type WallpaperTypeId =
  | "gradient"
  | "geometric"
  | "blob"
  | "noise"
  | "topography";

export type DevicePresetId =
  | "iphone"
  | "iphone-pro-max"
  | "android"
  | "ipad"
  | "desktop-hd"
  | "desktop-4k"
  | "ultrawide"
  | "custom";

export type WallpaperConfig = {
  type: WallpaperTypeId;
  paletteId: string;
  customColors?: string[];
  params: Record<string, number | string | boolean>;
  sizePresetId: DevicePresetId;
  customWidth?: number;
  customHeight?: number;
};

export type GeneratorState = {
  config: WallpaperConfig;
  previewScale: number;
  isRendering: boolean;
  isExporting: boolean;
};

export type Palette = {
  id: string;
  name: string;
  colors: string[];
  tags?: string[];
};

export type SizePreset = {
  id: DevicePresetId;
  name: string;
  width: number;
  height: number;
  category: "phone" | "tablet" | "desktop";
};

export type ControlType = "slider" | "select" | "toggle";

export type ControlDefinition = {
  key: string;
  label: string;
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  defaultValue: number | string | boolean;
};

export type WallpaperTypeDefinition = {
  id: WallpaperTypeId;
  name: string;
  description: string;
  controls: ControlDefinition[];
  getDefaultParams: () => Record<string, number | string | boolean>;
  randomizeParams: (palette: Palette) => Record<string, number | string | boolean>;
};
