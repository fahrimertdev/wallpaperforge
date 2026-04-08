import type { WallpaperConfig, Palette, WallpaperTypeDefinition } from "@/lib/types";

function smoothRandom(seed: number, freq: number): number {
  return Math.sin(seed * freq * 127.1 + 311.7) * 0.5 + 0.5;
}

function blobPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseR: number,
  points: number,
  seed: number
): void {
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const noise = 0.65 + 0.35 * smoothRandom(seed + i * 0.4, 1.0);
    const r = baseR * noise;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function renderBlob(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
): void {
  const p = config.params;
  const colors = config.customColors?.length ? config.customColors : palette.colors;
  const count = Math.round((p.count as number) ?? 5);
  const blurAmount = (p.blur as number) ?? 0.18;
  const blobSize = (p.size as number) ?? 0.45;
  const seed = (p.seed as number) ?? 42;

  // Background — darkest palette color
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, width, height);

  const baseR = Math.min(width, height) * blobSize;
  const blurPx = Math.min(width, height) * blurAmount;

  for (let i = 0; i < count; i++) {
    const bSeed = seed + i * 137.5;
    const cx = smoothRandom(bSeed, 0.7) * width;
    const cy = smoothRandom(bSeed + 50, 0.7) * height;
    const sizeVar = 0.5 + smoothRandom(bSeed + 100, 0.3) * 0.8;
    const colorIdx = i % colors.length;

    ctx.save();
    ctx.filter = `blur(${blurPx * sizeVar}px)`;
    ctx.globalAlpha = 0.55 + smoothRandom(bSeed + 200, 0.5) * 0.35;
    blobPath(ctx, cx, cy, baseR * sizeVar, 12, bSeed);
    ctx.fillStyle = colors[colorIdx];
    ctx.fill();
    ctx.restore();
  }

  ctx.globalAlpha = 1;
  ctx.filter = "none";
}

export const blobDefinition: WallpaperTypeDefinition = {
  id: "blob",
  name: "Abstract Blob",
  description: "Organic soft shapes with a dreamy, aesthetic feel",
  controls: [
    {
      key: "count",
      label: "Blob Count",
      type: "slider",
      min: 2,
      max: 10,
      step: 1,
      defaultValue: 5,
    },
    {
      key: "size",
      label: "Blob Size",
      type: "slider",
      min: 0.15,
      max: 0.8,
      step: 0.05,
      defaultValue: 0.45,
    },
    {
      key: "blur",
      label: "Blur",
      type: "slider",
      min: 0.02,
      max: 0.35,
      step: 0.01,
      defaultValue: 0.18,
    },
    {
      key: "seed",
      label: "Variation",
      type: "slider",
      min: 1,
      max: 999,
      step: 1,
      defaultValue: 42,
    },
  ],
  getDefaultParams() {
    return { count: 5, size: 0.45, blur: 0.18, seed: 42 };
  },
  randomizeParams() {
    return {
      count: 3 + Math.floor(Math.random() * 6),
      size: 0.25 + Math.random() * 0.45,
      blur: 0.08 + Math.random() * 0.25,
      seed: Math.floor(Math.random() * 999) + 1,
    };
  },
};
