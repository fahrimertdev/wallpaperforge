"use client";

import { useMemo } from "react";
import { useGenerator } from "@/lib/state/generatorContext";
import { getSizePresetById } from "@/lib/data/sizePresets";
import CanvasPreview from "./CanvasPreview";

const PREVIEW_MAX_W = 600;
const PREVIEW_MAX_H = 560;

export default function PreviewPanel() {
  const { state, setIsRendering } = useGenerator();
  const { config } = state;

  const preset = getSizePresetById(config.sizePresetId);
  const outputW = config.sizePresetId === "custom" && config.customWidth ? config.customWidth : preset.width;
  const outputH = config.sizePresetId === "custom" && config.customHeight ? config.customHeight : preset.height;

  const { previewW, previewH } = useMemo(() => {
    const scaleW = PREVIEW_MAX_W / outputW;
    const scaleH = PREVIEW_MAX_H / outputH;
    const scale = Math.min(scaleW, scaleH, 1);
    return {
      previewW: Math.round(outputW * scale),
      previewH: Math.round(outputH * scale),
    };
  }, [outputW, outputH]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-0 bg-[var(--bg)]">
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl"
        style={{ width: previewW, height: previewH }}
      >
        <CanvasPreview
          config={config}
          width={previewW}
          height={previewH}
          onRenderStart={() => setIsRendering(true)}
          onRenderEnd={() => setIsRendering(false)}
        />
        {state.isRendering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <p className="mt-3 text-[var(--text-muted)] text-xs font-mono">
        {outputW} × {outputH}px — {preset.name}
      </p>
    </div>
  );
}
