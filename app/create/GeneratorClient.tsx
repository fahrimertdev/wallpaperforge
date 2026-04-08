"use client";

import { useEffect } from "react";
import Link from "next/link";
import { GeneratorProvider, useGenerator } from "@/lib/state/generatorContext";
import { readConfigFromURL, updateURL } from "@/lib/urlState";
import { exportWallpaper } from "@/lib/exportWallpaper";
import { randomizeParams, randomizeAll } from "@/lib/randomizeEngine";
import ControlSidebar from "@/components/generator/ControlSidebar";
import PreviewPanel from "@/components/preview/PreviewPanel";
import ActionBar from "@/components/generator/ActionBar";

function GeneratorInner() {
  const { state, loadConfig, randomizeParams: applyParams, setIsExporting } = useGenerator();

  // Load config from URL on mount
  useEffect(() => {
    const cfg = readConfigFromURL();
    if (cfg) loadConfig(cfg);
  }, [loadConfig]);

  // Sync config to URL whenever it changes
  useEffect(() => {
    updateURL(state.config);
  }, [state.config]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (e.key === "r" || e.key === "R") {
        applyParams(randomizeParams(state.config));
      }
      if (e.key === "s" || e.key === "S") {
        loadConfig(randomizeAll(state.config));
      }
      if (e.key === "d" || e.key === "D") {
        setIsExporting(true);
        exportWallpaper(state.config).finally(() => setIsExporting(false));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.config, applyParams, setIsExporting, loadConfig]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="font-bold text-sm tracking-tight">WallpaperForge</span>
        </Link>
        <div className="flex-1" />
        <span className="text-[10px] text-[var(--text-muted)] hidden md:block">
          R: randomize params · S: shuffle all · D: download
        </span>
      </header>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
        <ControlSidebar />
        <div className="flex flex-col flex-1 min-h-0 min-w-0">
          <PreviewPanel />
          <ActionBar />
        </div>
      </div>
    </div>
  );
}

export default function GeneratorClient() {
  return (
    <GeneratorProvider>
      <GeneratorInner />
    </GeneratorProvider>
  );
}
