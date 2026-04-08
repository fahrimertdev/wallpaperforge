import { Metadata } from "next";
import GeneratorClient from "./GeneratorClient";

export const metadata: Metadata = {
  title: "Create — WallpaperForge",
  description: "Generate your custom wallpaper. Pick a style, choose a palette, tweak controls, and download.",
};

export default function CreatePage() {
  return <GeneratorClient />;
}
