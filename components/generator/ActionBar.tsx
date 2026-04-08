"use client";

import { useState } from "react";
import { useGenerator } from "@/lib/state/generatorContext";
import { exportWallpaper } from "@/lib/exportWallpaper";
import { randomizeParams, randomizeAll } from "@/lib/randomizeEngine";

export default function ActionBar() {
  const { state, setIsExporting, randomizeParams: applyParams, loadConfig } = useGenerator();
  const { config, isExporting } = state;
  const [copied, setCopied] = useState(false);

  async function handleDownload() {
    setIsExporting(true);
    try {
      await exportWallpaper(config);
    } finally {
      setIsExporting(false);
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleRandomize() {
    const newParams = randomizeParams(config);
    applyParams(newParams);
  }

  function handleRandomizeAll() {
    const newConfig = randomizeAll(config);
    loadConfig(newConfig);
  }

  return (
    <div className="flex items-center gap-2 px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-panel)]">
      <button
        onClick={handleRandomize}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] text-sm font-medium transition-all"
        title="Randomize parameters (R)"
      >
        <span>⟳</span>
        <span>Params</span>
      </button>
      <button
        onClick={handleRandomizeAll}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] text-sm font-medium transition-all"
        title="Randomize everything"
      >
        <span>✦</span>
        <span>Shuffle</span>
      </button>

      <div className="flex-1" />

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] text-sm font-medium transition-all"
        title="Copy share link"
      >
        <span>{copied ? "✓" : "⛓"}</span>
        <span>{copied ? "Copied!" : "Share"}</span>
      </button>

      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        title="Download wallpaper (D)"
      >
        {isExporting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
            <span>Exporting…</span>
          </>
        ) : (
          <>
            <span>↓</span>
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  );
}
