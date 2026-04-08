"use client";

import { useGenerator } from "@/lib/state/generatorContext";
import { SIZE_PRESETS } from "@/lib/data/sizePresets";
import type { DevicePresetId } from "@/lib/types";

const CATEGORY_LABELS = {
  phone: "Phone",
  tablet: "Tablet",
  desktop: "Desktop",
} as const;

const CATEGORIES = ["phone", "tablet", "desktop"] as const;

export default function DeviceSizeSelector() {
  const { state, setSizePreset } = useGenerator();
  const currentId = state.config.sizePresetId;

  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
        Device Size
      </p>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => {
          const presets = SIZE_PRESETS.filter((p) => p.category === cat);
          return (
            <div key={cat}>
              <p className="text-[10px] text-[var(--text-muted)] mb-1">
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="flex flex-wrap gap-1">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSizePreset(preset.id as DevicePresetId)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      currentId === preset.id
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
