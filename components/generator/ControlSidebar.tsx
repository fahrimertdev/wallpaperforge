"use client";

import WallpaperTypePicker from "@/components/controls/WallpaperTypePicker";
import PalettePicker from "@/components/controls/PalettePicker";
import CustomColorPicker from "@/components/controls/CustomColorPicker";
import ParameterControlGroup from "@/components/controls/ParameterControlGroup";
import DeviceSizeSelector from "@/components/controls/DeviceSizeSelector";

export default function ControlSidebar() {
  return (
    <aside className="w-full md:w-[340px] md:max-w-[340px] flex-shrink-0 flex flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] overflow-y-auto">
      <div className="flex flex-col gap-5 p-5">
        <WallpaperTypePicker />
        <div className="h-px bg-[var(--border-subtle)]" />
        <PalettePicker />
        <div className="h-px bg-[var(--border-subtle)]" />
        <CustomColorPicker />
        <div className="h-px bg-[var(--border-subtle)]" />
        <ParameterControlGroup />
        <div className="h-px bg-[var(--border-subtle)]" />
        <DeviceSizeSelector />
      </div>
    </aside>
  );
}
