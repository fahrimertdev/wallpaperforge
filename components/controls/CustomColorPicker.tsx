"use client";

import { useState } from "react";
import { useGenerator } from "@/lib/state/generatorContext";
import { getPaletteById } from "@/lib/data/palettes";

export default function CustomColorPicker() {
  const { state, setCustomColors } = useGenerator();
  const { config } = state;

  const baseColors = config.customColors?.length
    ? config.customColors
    : getPaletteById(config.paletteId).colors;

  const [colors, setColors] = useState<string[]>(baseColors.slice(0, 5));

  function handleColorChange(idx: number, value: string) {
    const next = [...colors];
    next[idx] = value;
    setColors(next);
    setCustomColors(next);
  }

  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
        Custom Colors
      </p>
      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <label key={i} className="relative cursor-pointer" title={`Color ${i + 1}`}>
            <div
              className="w-9 h-9 rounded-lg border-2 border-[var(--border)] overflow-hidden hover:border-[var(--accent)] transition-colors"
              style={{ backgroundColor: c }}
            />
            <input
              type="color"
              value={c}
              onChange={(e) => handleColorChange(i, e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
