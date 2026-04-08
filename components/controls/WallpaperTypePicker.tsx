"use client";

import { useGenerator } from "@/lib/state/generatorContext";
import type { WallpaperTypeId } from "@/lib/types";

const TYPES: { id: WallpaperTypeId; label: string; icon: string }[] = [
  { id: "gradient", label: "Gradient", icon: "◑" },
  { id: "geometric", label: "Geometric", icon: "⬡" },
  { id: "blob", label: "Blob", icon: "⬤" },
  { id: "noise", label: "Noise", icon: "░" },
  { id: "topography", label: "Topo", icon: "≋" },
];

export default function WallpaperTypePicker() {
  const { state, setWallpaperType } = useGenerator();
  const current = state.config.type;

  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
        Wallpaper Type
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setWallpaperType(t.id)}
            className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg text-xs font-medium transition-all ${
              current === t.id
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="text-base leading-none">{t.icon}</span>
            <span className="leading-none">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
