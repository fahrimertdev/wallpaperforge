"use client";

import { useGenerator } from "@/lib/state/generatorContext";
import { getTypeDefinition } from "@/lib/renderers";
import type { ControlDefinition } from "@/lib/types";

function SliderControl({
  control,
  value,
  onChange,
}: {
  control: ControlDefinition;
  value: number;
  onChange: (v: number) => void;
}) {
  const min = control.min ?? 0;
  const max = control.max ?? 1;
  const step = control.step ?? 0.01;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-[var(--text-secondary)]">{control.label}</span>
        <span className="text-xs text-[var(--text-muted)] font-mono">
          {typeof value === "number" ? (Number.isInteger(step) ? value : value.toFixed(2)) : value}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-visible">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

function SelectControl({
  control,
  value,
  onChange,
}: {
  control: ControlDefinition;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--text-secondary)] block mb-1">{control.label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent)] cursor-pointer"
      >
        {control.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ParameterControlGroup() {
  const { state, setParam } = useGenerator();
  const { config } = state;
  const def = getTypeDefinition(config.type);

  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
        Parameters
      </p>
      <div className="flex flex-col gap-3.5">
        {def.controls.map((control) => {
          const raw = config.params[control.key] ?? control.defaultValue;

          if (control.type === "slider") {
            return (
              <SliderControl
                key={control.key}
                control={control}
                value={raw as number}
                onChange={(v) => setParam(control.key, v)}
              />
            );
          }
          if (control.type === "select") {
            return (
              <SelectControl
                key={control.key}
                control={control}
                value={raw as string}
                onChange={(v) => setParam(control.key, v)}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
