import type { WallpaperConfig, Palette, WallpaperTypeDefinition } from "@/lib/types";

export function renderGradient(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
): void {
  const p = config.params;
  const colors = config.customColors?.length ? config.customColors : palette.colors;
  const style = (p.style as string) ?? "linear";
  const angle = ((p.angle as number) ?? 135) * (Math.PI / 180);
  const stops = Math.min(Math.max((p.stops as number) ?? 2, 2), 5);

  const usedColors = colors.slice(0, stops);

  if (style === "radial") {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const r = Math.sqrt(width * width + height * height) * 0.6;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    usedColors.forEach((c, i) => {
      grad.addColorStop(i / (usedColors.length - 1), c);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (style === "mesh") {
    // Layered radial gradients to approximate a mesh gradient
    ctx.fillStyle = usedColors[0];
    ctx.fillRect(0, 0, width, height);
    const points = [
      { x: 0.2, y: 0.2 },
      { x: 0.8, y: 0.2 },
      { x: 0.2, y: 0.8 },
      { x: 0.8, y: 0.8 },
    ];
    points.forEach((pt, i) => {
      const color = usedColors[(i + 1) % usedColors.length];
      const r = Math.sqrt(width * width + height * height) * 0.55;
      const grad = ctx.createRadialGradient(
        pt.x * width, pt.y * height, 0,
        pt.x * width, pt.y * height, r
      );
      grad.addColorStop(0, color + "CC");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });
  } else {
    // linear
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const len = Math.abs(cos * width) + Math.abs(sin * height);
    const cx = width / 2;
    const cy = height / 2;
    const x0 = cx - (cos * len) / 2;
    const y0 = cy - (sin * len) / 2;
    const x1 = cx + (cos * len) / 2;
    const y1 = cy + (sin * len) / 2;
    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    usedColors.forEach((c, i) => {
      grad.addColorStop(i / (usedColors.length - 1), c);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }
}

export const gradientDefinition: WallpaperTypeDefinition = {
  id: "gradient",
  name: "Gradient",
  description: "Smooth color transitions in linear, radial, or mesh styles",
  controls: [
    {
      key: "style",
      label: "Style",
      type: "select",
      options: [
        { value: "linear", label: "Linear" },
        { value: "radial", label: "Radial" },
        { value: "mesh", label: "Mesh" },
      ],
      defaultValue: "linear",
    },
    {
      key: "angle",
      label: "Angle",
      type: "slider",
      min: 0,
      max: 360,
      step: 1,
      defaultValue: 135,
    },
    {
      key: "stops",
      label: "Color Stops",
      type: "slider",
      min: 2,
      max: 5,
      step: 1,
      defaultValue: 3,
    },
  ],
  getDefaultParams() {
    return { style: "linear", angle: 135, stops: 3 };
  },
  randomizeParams(palette) {
    const styles = ["linear", "radial", "mesh"];
    return {
      style: styles[Math.floor(Math.random() * styles.length)],
      angle: Math.floor(Math.random() * 360),
      stops: 2 + Math.floor(Math.random() * (Math.min(palette.colors.length, 5) - 1)),
    };
  },
};
