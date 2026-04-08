"use client";

import { useEffect, useRef, useCallback } from "react";
import type { WallpaperConfig } from "@/lib/types";
import { getRenderer } from "@/lib/renderers";
import { getPaletteById } from "@/lib/data/palettes";

type Props = {
  config: WallpaperConfig;
  width: number;
  height: number;
  className?: string;
  onRenderStart?: () => void;
  onRenderEnd?: () => void;
};

export default function CanvasPreview({
  config,
  width,
  height,
  className,
  onRenderStart,
  onRenderEnd,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    onRenderStart?.();

    const palette = config.customColors?.length
      ? { id: "custom", name: "Custom", colors: config.customColors }
      : getPaletteById(config.paletteId);

    const renderFn = getRenderer(config.type);
    renderFn(ctx, config, width, height, palette);

    onRenderEnd?.();
  }, [config, width, height, onRenderStart, onRenderEnd]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ display: "block" }}
    />
  );
}
