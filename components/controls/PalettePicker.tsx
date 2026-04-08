"use client";

import { useGenerator } from "@/lib/state/generatorContext";
import { PALETTES } from "@/lib/data/palettes";

export default function PalettePicker() {
  const { state, setPalette } = useGenerator();
  const currentId = state.config.paletteId;

  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
        Palette
      </p>
      <div className="grid grid-cols-3 gap-1.5 max-h-52 overflow-y-auto pr-0.5">
        {PALETTES.filter((p) => p.id !== "custom").map((palette) => (
          <button
            key={palette.id}
            onClick={() => setPalette(palette.id)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all h-14 ${
              currentId === palette.id
                ? "border-[var(--accent)] scale-[1.02]"
                : "border-transparent hover:border-[var(--border)]"
            }`}
            title={palette.name}
          >
            <div className="flex h-full">
              {palette.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color, flex: 1 }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-black/50 px-1 py-0.5">
              <p className="text-white text-[10px] font-medium truncate text-center">
                {palette.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
