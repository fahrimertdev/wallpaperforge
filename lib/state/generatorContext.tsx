"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { WallpaperConfig, GeneratorState, WallpaperTypeId, DevicePresetId } from "@/lib/types";
import { DEFAULT_PALETTE_ID } from "@/lib/data/palettes";
import { DEFAULT_SIZE_PRESET_ID } from "@/lib/data/sizePresets";
import { getTypeDefinition } from "@/lib/renderers";

type Action =
  | { type: "SET_WALLPAPER_TYPE"; payload: WallpaperTypeId }
  | { type: "SET_PALETTE"; payload: string }
  | { type: "SET_CUSTOM_COLORS"; payload: string[] }
  | { type: "SET_PARAM"; payload: { key: string; value: number | string | boolean } }
  | { type: "SET_PARAMS"; payload: Record<string, number | string | boolean> }
  | { type: "SET_SIZE_PRESET"; payload: DevicePresetId }
  | { type: "SET_CUSTOM_SIZE"; payload: { width: number; height: number } }
  | { type: "SET_IS_RENDERING"; payload: boolean }
  | { type: "SET_IS_EXPORTING"; payload: boolean }
  | { type: "LOAD_CONFIG"; payload: WallpaperConfig }
  | { type: "RANDOMIZE_PARAMS"; payload: Record<string, number | string | boolean> };

function initialConfig(): WallpaperConfig {
  const def = getTypeDefinition("gradient");
  return {
    type: "gradient",
    paletteId: DEFAULT_PALETTE_ID,
    params: def.getDefaultParams(),
    sizePresetId: DEFAULT_SIZE_PRESET_ID,
  };
}

const initialState: GeneratorState = {
  config: initialConfig(),
  previewScale: 1,
  isRendering: false,
  isExporting: false,
};

function reducer(state: GeneratorState, action: Action): GeneratorState {
  switch (action.type) {
    case "SET_WALLPAPER_TYPE": {
      const def = getTypeDefinition(action.payload);
      return {
        ...state,
        config: {
          ...state.config,
          type: action.payload,
          params: def.getDefaultParams(),
        },
      };
    }
    case "SET_PALETTE":
      return {
        ...state,
        config: { ...state.config, paletteId: action.payload, customColors: undefined },
      };
    case "SET_CUSTOM_COLORS":
      return {
        ...state,
        config: { ...state.config, paletteId: "custom", customColors: action.payload },
      };
    case "SET_PARAM":
      return {
        ...state,
        config: {
          ...state.config,
          params: { ...state.config.params, [action.payload.key]: action.payload.value },
        },
      };
    case "SET_PARAMS":
      return {
        ...state,
        config: { ...state.config, params: action.payload },
      };
    case "SET_SIZE_PRESET":
      return {
        ...state,
        config: { ...state.config, sizePresetId: action.payload, customWidth: undefined, customHeight: undefined },
      };
    case "SET_CUSTOM_SIZE":
      return {
        ...state,
        config: {
          ...state.config,
          sizePresetId: "custom",
          customWidth: action.payload.width,
          customHeight: action.payload.height,
        },
      };
    case "SET_IS_RENDERING":
      return { ...state, isRendering: action.payload };
    case "SET_IS_EXPORTING":
      return { ...state, isExporting: action.payload };
    case "LOAD_CONFIG":
      return { ...state, config: action.payload };
    case "RANDOMIZE_PARAMS":
      return {
        ...state,
        config: { ...state.config, params: action.payload },
      };
    default:
      return state;
  }
}

type GeneratorContextValue = {
  state: GeneratorState;
  setWallpaperType: (t: WallpaperTypeId) => void;
  setPalette: (id: string) => void;
  setCustomColors: (colors: string[]) => void;
  setParam: (key: string, value: number | string | boolean) => void;
  setSizePreset: (id: DevicePresetId) => void;
  setCustomSize: (width: number, height: number) => void;
  setIsRendering: (v: boolean) => void;
  setIsExporting: (v: boolean) => void;
  loadConfig: (config: WallpaperConfig) => void;
  randomizeParams: (params: Record<string, number | string | boolean>) => void;
};

const GeneratorContext = createContext<GeneratorContextValue | null>(null);

export function GeneratorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setWallpaperType = useCallback((t: WallpaperTypeId) =>
    dispatch({ type: "SET_WALLPAPER_TYPE", payload: t }), []);
  const setPalette = useCallback((id: string) =>
    dispatch({ type: "SET_PALETTE", payload: id }), []);
  const setCustomColors = useCallback((colors: string[]) =>
    dispatch({ type: "SET_CUSTOM_COLORS", payload: colors }), []);
  const setParam = useCallback((key: string, value: number | string | boolean) =>
    dispatch({ type: "SET_PARAM", payload: { key, value } }), []);
  const setSizePreset = useCallback((id: DevicePresetId) =>
    dispatch({ type: "SET_SIZE_PRESET", payload: id }), []);
  const setCustomSize = useCallback((width: number, height: number) =>
    dispatch({ type: "SET_CUSTOM_SIZE", payload: { width, height } }), []);
  const setIsRendering = useCallback((v: boolean) =>
    dispatch({ type: "SET_IS_RENDERING", payload: v }), []);
  const setIsExporting = useCallback((v: boolean) =>
    dispatch({ type: "SET_IS_EXPORTING", payload: v }), []);
  const loadConfig = useCallback((config: WallpaperConfig) =>
    dispatch({ type: "LOAD_CONFIG", payload: config }), []);
  const randomizeParams = useCallback((params: Record<string, number | string | boolean>) =>
    dispatch({ type: "RANDOMIZE_PARAMS", payload: params }), []);

  return (
    <GeneratorContext.Provider
      value={{
        state,
        setWallpaperType,
        setPalette,
        setCustomColors,
        setParam,
        setSizePreset,
        setCustomSize,
        setIsRendering,
        setIsExporting,
        loadConfig,
        randomizeParams,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
}

export function useGenerator(): GeneratorContextValue {
  const ctx = useContext(GeneratorContext);
  if (!ctx) throw new Error("useGenerator must be used within GeneratorProvider");
  return ctx;
}
