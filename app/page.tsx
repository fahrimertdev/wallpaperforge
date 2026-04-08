import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WallpaperForge — Create stunning wallpapers in seconds",
  description:
    "Generate custom phone and desktop wallpapers using beautiful palettes, patterns, and visual effects. No account needed. Download instantly.",
};

const FEATURES = [
  {
    icon: "◑",
    title: "5 Visual Styles",
    desc: "Gradient, geometric, abstract blob, noise grain, and topography contours.",
  },
  {
    icon: "⬛",
    title: "12 Curated Palettes",
    desc: "Nord, Dracula, Catppuccin, Ocean, Sunset, and more — plus custom colors.",
  },
  {
    icon: "⬡",
    title: "All Device Sizes",
    desc: "iPhone, Android, iPad, Desktop HD, 4K, and Ultrawide presets.",
  },
  {
    icon: "⛓",
    title: "Shareable Links",
    desc: "Your entire wallpaper config lives in the URL. Share it with anyone.",
  },
  {
    icon: "✦",
    title: "Randomize",
    desc: "Discover great combinations without making every choice manually.",
  },
  {
    icon: "↓",
    title: "PNG Export",
    desc: "Download high-quality PNG at your device's exact resolution.",
  },
];

const SHOWCASE = [
  { type: "Gradient", palette: "Midnight", style: "Mesh" },
  { type: "Topography", palette: "Nord", style: "Contour" },
  { type: "Geometric", palette: "Dracula", style: "Hexagons" },
  { type: "Blob", palette: "Catppuccin", style: "Abstract" },
];

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
        <span className="font-bold text-[var(--text-primary)] tracking-tight">
          WallpaperForge
        </span>
        <Link
          href="/create"
          className="px-4 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors"
        >
          Open Generator
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24 max-w-3xl mx-auto">
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)] px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
          Free · No account needed
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Create stunning
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7c6ef0 0%, #ff79c6 50%, #50fa7b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            wallpapers
          </span>
          <br />
          in seconds.
        </h1>
        <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed">
          Pick a style, choose a palette, tweak a few controls — download a wallpaper
          worth using. No design skills required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/create"
            className="px-8 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-base transition-all hover:scale-[1.02]"
          >
            Start Creating →
          </Link>
          <Link
            href="/create"
            className="px-8 py-3.5 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium text-base transition-all border border-[var(--border)]"
          >
            See examples
          </Link>
        </div>
      </section>

      {/* Showcase preview cards */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SHOWCASE.map((item, i) => (
            <Link
              key={i}
              href="/create"
              className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all hover:scale-[1.02]"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: i === 0
                    ? "radial-gradient(ellipse at 30% 30%, #533483 0%, #1A1A2E 50%, #0A0A0F 100%)"
                    : i === 1
                    ? "radial-gradient(ellipse at 70% 20%, #4C566A 0%, #2E3440 60%, #1a1f2e 100%)"
                    : i === 2
                    ? "radial-gradient(ellipse at 50% 50%, #6272A4 0%, #282A36 70%)"
                    : "radial-gradient(ellipse at 40% 40%, #313244 0%, #1E1E2E 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
                  <p className="text-white text-xs font-semibold">{item.type}</p>
                  <p className="text-white/60 text-[10px]">{item.palette} · {item.style}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 pb-24 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-12 text-[var(--text-primary)]">
          Everything you need, nothing you don&apos;t.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1.5 text-[var(--text-primary)]">{f.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 flex flex-col items-center text-center">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to make your wallpaper?</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            No account. No installs. Just open the generator and start creating.
          </p>
          <Link
            href="/create"
            className="inline-block px-10 py-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-base transition-all hover:scale-[1.02]"
          >
            Create your wallpaper →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-subtle)] px-6 py-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>WallpaperForge</span>
        <span>Create stunning wallpapers in seconds.</span>
      </footer>
    </main>
  );
}
