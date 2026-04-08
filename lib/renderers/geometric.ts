import type { WallpaperConfig, Palette, WallpaperTypeDefinition } from "@/lib/types";

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function trianglePath(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, inverted: boolean): void {
  ctx.beginPath();
  if (!inverted) {
    ctx.moveTo(cx, cy - size * 0.6);
    ctx.lineTo(cx + size * 0.5, cy + size * 0.4);
    ctx.lineTo(cx - size * 0.5, cy + size * 0.4);
  } else {
    ctx.moveTo(cx, cy + size * 0.6);
    ctx.lineTo(cx + size * 0.5, cy - size * 0.4);
    ctx.lineTo(cx - size * 0.5, cy - size * 0.4);
  }
  ctx.closePath();
}

export function renderGeometric(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig,
  width: number,
  height: number,
  palette: Palette
): void {
  const p = config.params;
  const colors = config.customColors?.length ? config.customColors : palette.colors;
  const shape = (p.shape as string) ?? "hexagon";
  const size = (p.size as number) ?? 60;
  const opacity = (p.opacity as number) ?? 0.85;
  const rotation = ((p.rotation as number) ?? 0) * (Math.PI / 180);

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotation);
  ctx.translate(-width / 2, -height / 2);

  const cols = Math.ceil(width / size) + 4;
  const rows = Math.ceil(height / size) + 4;

  if (shape === "hexagon") {
    const hexW = size * Math.sqrt(3);
    const hexH = size * 2;
    const colW = hexW;
    const rowH = hexH * 0.75;
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const cx = col * colW + (row % 2 === 0 ? 0 : colW / 2);
        const cy = row * rowH;
        const colorIdx = ((row * 3 + col * 7) % colors.length + colors.length) % colors.length;
        ctx.globalAlpha = opacity;
        hexPath(ctx, cx, cy, size * 0.95);
        ctx.fillStyle = colors[colorIdx];
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = colors[(colorIdx + 1) % colors.length];
        ctx.lineWidth = width > 1000 ? 1.5 : 1;
        ctx.stroke();
      }
    }
  } else if (shape === "triangle") {
    const triSize = size * 1.4;
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const cx = col * triSize * 0.5;
        const cy = row * triSize * 0.5;
        const inv = (row + col) % 2 === 0;
        const colorIdx = ((row * 5 + col * 3) % colors.length + colors.length) % colors.length;
        ctx.globalAlpha = opacity;
        trianglePath(ctx, cx, cy, triSize, inv);
        ctx.fillStyle = colors[colorIdx];
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = colors[(colorIdx + 2) % colors.length];
        ctx.lineWidth = width > 1000 ? 1 : 0.5;
        ctx.stroke();
      }
    }
  } else if (shape === "circle") {
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const cx = col * size * 1.2;
        const cy = row * size * 1.2 + (col % 2 === 0 ? 0 : size * 0.6);
        const colorIdx = ((row * 4 + col * 6) % colors.length + colors.length) % colors.length;
        ctx.globalAlpha = opacity * 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIdx];
        ctx.fill();
      }
    }
  } else {
    // square / default
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const colorIdx = ((row + col) % colors.length + colors.length) % colors.length;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = colors[colorIdx];
        ctx.fillRect(col * size, row * size, size - 1, size - 1);
      }
    }
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

export const geometricDefinition: WallpaperTypeDefinition = {
  id: "geometric",
  name: "Geometric",
  description: "Tiled patterns with hexagons, triangles, squares, or circles",
  controls: [
    {
      key: "shape",
      label: "Shape",
      type: "select",
      options: [
        { value: "hexagon", label: "Hexagon" },
        { value: "triangle", label: "Triangle" },
        { value: "square", label: "Square" },
        { value: "circle", label: "Circle" },
      ],
      defaultValue: "hexagon",
    },
    {
      key: "size",
      label: "Cell Size",
      type: "slider",
      min: 20,
      max: 200,
      step: 4,
      defaultValue: 60,
    },
    {
      key: "opacity",
      label: "Opacity",
      type: "slider",
      min: 0.2,
      max: 1,
      step: 0.05,
      defaultValue: 0.85,
    },
    {
      key: "rotation",
      label: "Rotation",
      type: "slider",
      min: 0,
      max: 90,
      step: 1,
      defaultValue: 0,
    },
  ],
  getDefaultParams() {
    return { shape: "hexagon", size: 60, opacity: 0.85, rotation: 0 };
  },
  randomizeParams() {
    const shapes = ["hexagon", "triangle", "square", "circle"];
    return {
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 24 + Math.floor(Math.random() * 120),
      opacity: 0.5 + Math.random() * 0.5,
      rotation: Math.floor(Math.random() * 45),
    };
  },
};
