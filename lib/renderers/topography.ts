import type { WallpaperConfig, Palette, WallpaperTypeDefinition } from "@/lib/types";

// Simple smooth function for topography contours
function smoothVal(x: number, y: number, freq: number, seed: number): number {
  const v1 = Math.sin(x * freq + seed) * Math.cos(y * freq * 0.7 + seed * 1.3);
  const v2 = Math.sin(x * freq * 1.5 + y * freq * 0.3 + seed * 2.7);
  const v3 = Math.cos(x * freq * 0.6 + y * freq * 1.1 + seed * 0.9);
  return (v1 + v2 * 0.5 + v3 * 0.3) / 1.8;
}

export function renderTopography(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
): void {
  const p = config.params;
  const colors = config.customColors?.length ? config.customColors : palette.colors;
  const lineCount = Math.round((p.lineCount as number) ?? 18);
  const thickness = (p.thickness as number) ?? 1.5;
  const frequency = (p.frequency as number) ?? 0.008;
  const amplitude = (p.amplitude as number) ?? 1.0;
  const seed = (p.seed as number) ?? 0.5;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, colors[0]);
  bgGrad.addColorStop(1, colors[Math.min(1, colors.length - 1)]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const lineColor = colors[colors.length - 1];
  const scale = width > 2000 ? 2 : 1;

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = thickness * scale;
  ctx.globalAlpha = 0.55;

  // Sample resolution — lower for preview speed, uses pixel stepping
  const step = Math.max(2, Math.floor(width / 400));

  for (let i = 0; i < lineCount; i++) {
    const threshold = -1 + (2 / lineCount) * i * amplitude;

    // Marching squares simplified: scan rows, find crossings
    for (let y = 0; y < height; y += step * 3) {
      let inLine = false;
      let lastX = 0;

      ctx.beginPath();

      for (let x = 0; x <= width; x += step) {
        const nx = x / width;
        const ny = y / height;
        const v = smoothVal(nx, ny, frequency * width, seed * 100);

        if (v > threshold) {
          if (!inLine) {
            ctx.moveTo(x, y);
            inLine = true;
            lastX = x;
          } else {
            ctx.lineTo(x, y);
            lastX = x;
          }
        } else {
          if (inLine && lastX !== x) {
            ctx.stroke();
            ctx.beginPath();
          }
          inLine = false;
        }
      }
      if (inLine) ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
}

export const topographyDefinition: WallpaperTypeDefinition = {
  id: "topography",
  name: "Topography",
  description: "Contour-line maps with wave and terrain aesthetics",
  controls: [
    {
      key: "lineCount",
      label: "Line Count",
      type: "slider",
      min: 4,
      max: 40,
      step: 1,
      defaultValue: 18,
    },
    {
      key: "thickness",
      label: "Line Thickness",
      type: "slider",
      min: 0.5,
      max: 5,
      step: 0.25,
      defaultValue: 1.5,
    },
    {
      key: "frequency",
      label: "Frequency",
      type: "slider",
      min: 0.002,
      max: 0.03,
      step: 0.001,
      defaultValue: 0.008,
    },
    {
      key: "amplitude",
      label: "Amplitude",
      type: "slider",
      min: 0.3,
      max: 2.0,
      step: 0.1,
      defaultValue: 1.0,
    },
    {
      key: "seed",
      label: "Variation",
      type: "slider",
      min: 0.0,
      max: 1.0,
      step: 0.01,
      defaultValue: 0.5,
    },
  ],
  getDefaultParams() {
    return { lineCount: 18, thickness: 1.5, frequency: 0.008, amplitude: 1.0, seed: 0.5 };
  },
  randomizeParams() {
    return {
      lineCount: 8 + Math.floor(Math.random() * 28),
      thickness: 0.5 + Math.random() * 3.5,
      frequency: 0.003 + Math.random() * 0.02,
      amplitude: 0.4 + Math.random() * 1.4,
      seed: Math.random(),
    };
  },
};
