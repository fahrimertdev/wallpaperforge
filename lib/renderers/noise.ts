import type { WallpaperConfig, Palette, WallpaperTypeDefinition } from "@/lib/types";

// Simple pseudo-random noise using a seeded approach
function pseudoRandom(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.3) * 43758.5453;
  return n - Math.floor(n);
}

function generateNoisePattern(
  width: number,
  height: number,
  scale: number,
  seed: number,
  ctx: CanvasRenderingContext2D
): void {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const s = Math.max(1, scale);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = Math.floor(x / s);
      const ny = Math.floor(y / s);
      const v = pseudoRandom(nx, ny, seed);
      const idx = (y * width + x) * 4;
      const brightness = Math.floor(v * 255);
      data[idx] = brightness;
      data[idx + 1] = brightness;
      data[idx + 2] = brightness;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

export function renderNoise(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
): void {
  const p = config.params;
  const colors = config.customColors?.length ? config.customColors : palette.colors;
  const intensity = (p.intensity as number) ?? 0.12;
  const scale = (p.scale as number) ?? 2;
  const seed = (p.seed as number) ?? 1;
  const base = (p.base as string) ?? "gradient";

  // Draw base
  if (base === "flat") {
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, width, height);
  } else {
    // gradient base
    const grad = ctx.createLinearGradient(0, 0, width, height);
    const stopColors = colors.slice(0, 3);
    stopColors.forEach((c, i) => {
      grad.addColorStop(i / (stopColors.length - 1), c);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // Offscreen canvas for noise
  const offCanvas = document.createElement("canvas");
  offCanvas.width = width;
  offCanvas.height = height;
  const offCtx = offCanvas.getContext("2d")!;
  generateNoisePattern(width, height, scale, seed, offCtx);

  ctx.save();
  ctx.globalAlpha = intensity;
  ctx.globalCompositeOperation = "overlay";
  ctx.drawImage(offCanvas, 0, 0);
  ctx.restore();

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

export const noiseDefinition: WallpaperTypeDefinition = {
  id: "noise",
  name: "Noise / Grain",
  description: "Film grain and texture overlaid on clean color bases",
  controls: [
    {
      key: "base",
      label: "Base",
      type: "select",
      options: [
        { value: "gradient", label: "Gradient" },
        { value: "flat", label: "Flat Color" },
      ],
      defaultValue: "gradient",
    },
    {
      key: "intensity",
      label: "Grain Intensity",
      type: "slider",
      min: 0.02,
      max: 0.6,
      step: 0.02,
      defaultValue: 0.12,
    },
    {
      key: "scale",
      label: "Grain Scale",
      type: "slider",
      min: 1,
      max: 8,
      step: 0.5,
      defaultValue: 2,
    },
    {
      key: "seed",
      label: "Variation",
      type: "slider",
      min: 1,
      max: 999,
      step: 1,
      defaultValue: 1,
    },
  ],
  getDefaultParams() {
    return { base: "gradient", intensity: 0.12, scale: 2, seed: 1 };
  },
  randomizeParams() {
    return {
      base: Math.random() > 0.5 ? "gradient" : "flat",
      intensity: 0.05 + Math.random() * 0.3,
      scale: 1 + Math.random() * 6,
      seed: Math.floor(Math.random() * 999) + 1,
    };
  },
};
