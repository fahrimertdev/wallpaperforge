import type { WallpaperConfig } from "@/lib/types";
import { getRenderer } from "@/lib/renderers";
import { getPaletteById } from "@/lib/data/palettes";
import { getSizePresetById } from "@/lib/data/sizePresets";

const WATERMARK_TEXT = "WallpaperForge";

function drawWatermark(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const fontSize = Math.max(12, Math.min(width, height) * 0.018);
  ctx.save();
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  const padding = fontSize * 0.8;
  ctx.fillText(WATERMARK_TEXT, width - padding, height - padding);
  ctx.restore();
}

export async function exportWallpaper(config: WallpaperConfig): Promise<void> {
  const palette = config.customColors?.length
    ? { id: "custom", name: "Custom", colors: config.customColors }
    : getPaletteById(config.paletteId);

  const preset = getSizePresetById(config.sizePresetId);
  const width = config.sizePresetId === "custom" && config.customWidth ? config.customWidth : preset.width;
  const height = config.sizePresetId === "custom" && config.customHeight ? config.customHeight : preset.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  const render = getRenderer(config.type);
  render(ctx, config, width, height, palette);
  drawWatermark(ctx, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Export failed"));
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wallpaperforge-${config.type}-${width}x${height}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      resolve();
    }, "image/png");
  });
}
