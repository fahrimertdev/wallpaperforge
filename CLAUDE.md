# CLAUDE.md — WallpaperForge

## Product Name

**WallpaperForge**  
**Tagline:** Create stunning wallpapers in seconds.

---

## Product Overview

WallpaperForge is a lightweight web app that lets users generate custom phone and desktop wallpapers using templates, color palettes, patterns, and visual effects.

The product is positioned like:
- Canva for wallpapers
- a fast customization tool
- a minimal visual playground
- a shareable wallpaper generator

Users should be able to:
1. choose a wallpaper type
2. choose a palette
3. adjust a few visual parameters
4. preview instantly
5. download a polished wallpaper
6. optionally share the configuration via URL

This is not a professional design suite.  
This is not a heavy editor.  
This is a **fast, aesthetic wallpaper creation product**.

---

## Core Problem

People want wallpapers that feel:
- unique
- aesthetic
- personalized
- clean
- high quality

But today their options are usually one of these:
- generic wallpaper websites
- Pinterest searching with low precision
- expensive premium wallpaper apps
- overly complex design tools like Photoshop

Most people do not want to design from scratch.  
They want a fast way to generate something that already looks good.

---

## Product Promise

WallpaperForge should let a user create a personalized wallpaper in under a minute.

The product must feel:
- beautiful
- fast
- playful
- calming
- creative
- low-friction

Core promise:

**Pick a style → choose a palette → tweak a few controls → download a wallpaper worth using.**

---

## Product Positioning

Do not position this as:
- a graphic design suite
- an AI art platform
- a stock wallpaper marketplace
- a professional illustration tool

Position it as:
- a wallpaper generator
- a personalization tool
- a fast aesthetic creator
- a setup culture utility
- a minimal design playground

Good positioning phrases:
- Create stunning wallpapers in seconds
- Make wallpapers that actually fit your taste
- Generate clean custom wallpapers without Photoshop
- Fast wallpapers for phones, desktops, and setups
- Build your next wallpaper, not just browse one

---

## Target Users

### 1. Setup enthusiasts
Users from communities that care about personal device aesthetics.

### 2. Minimalist design lovers
Users who want clean, tasteful visual styles.

### 3. Mobile customization users
People who constantly change phone wallpapers.

### 4. Desktop personalization users
People who care about workspace and desktop appearance.

### 5. Casual visual creators
Users who want good-looking output without learning design software.

---

## Product Vision

WallpaperForge should become the easiest way to generate premium-looking wallpapers for common devices.

A user should be able to:
1. choose a visual style
2. apply a curated palette
3. tweak a few parameters
4. preview on a device frame
5. randomize new variations
6. export high-quality wallpapers
7. share the generated configuration with a link

Long term, the product can evolve into:
- gallery and explore pages
- saved wallpapers
- theme packs
- creator collaborations
- premium export bundles
- shared templates
- setup community integrations

But the MVP should stay focused on generation and export.

---

## Core Product Principles

- no login required in MVP
- no database required in MVP
- client-side generation first
- instant preview matters more than complex editing
- every wallpaper type should look good by default
- UI should stay out of the way of the artwork
- randomization should be fun and high quality
- export should be reliable
- parameter sharing should be built in

---

## MVP Scope

The first version should intentionally stay small and sharp.

### MVP Goal
Let a user create and export custom wallpapers from a few beautiful visual systems without needing an account.

### MVP Features
- wallpaper type selection
- palette selection
- custom color support
- parameter controls
- device size selection
- live preview
- PNG export
- randomize button
- shareable config URL
- minimal watermark for free output

### Explicitly not required in MVP
- auth
- backend persistence
- gallery or community pages
- AI image generation
- payments
- premium plans
- text-based wallpapers
- live/animated wallpapers
- social profiles
- mobile app

---

## Wallpaper Types for MVP

The uploaded product idea already defines a strong set of wallpaper types and that should be preserved in the first version.

Recommended MVP types:
1. Gradient
2. Geometric Pattern
3. Abstract / Blob
4. Noise / Grain
5. Topography / Wave

Each type should be good enough to stand on its own rather than feeling like a half-finished demo.

---

## User Stories

### Quick creation story
As a user, I want to generate a wallpaper quickly so I can change my setup without browsing endlessly.

### Personalization story
As a user, I want to tweak colors and patterns so the wallpaper feels like mine.

### Device-fit story
As a user, I want the wallpaper sized correctly for my phone or desktop so I can use it immediately.

### Share story
As a user, I want to share a wallpaper configuration link so someone else can open and reuse it.

### Random exploration story
As a user, I want a randomize button so I can discover great combinations without making every choice manually.

---

## Primary User Flow

### Flow 1 — Generate a wallpaper
1. User opens the product
2. User selects a wallpaper type
3. User selects a palette
4. User tweaks a few controls
5. User chooses a device size
6. User sees the preview update live
7. User downloads the wallpaper

### Flow 2 — Share a wallpaper config
1. User creates a wallpaper they like
2. User clicks share or copy link
3. The configuration is encoded in the URL
4. Another user opens the same generated wallpaper state

### Flow 3 — Random discovery
1. User clicks randomize
2. Product generates a new valid configuration
3. User keeps randomizing until they find something they like
4. User tweaks the final result if needed

---

## Product Experience Goals

WallpaperForge should feel:
- calm
- premium
- immediate
- visual-first
- minimal but expressive

The product should avoid the feeling of:
- a form-heavy generator
- a technical graphics tool
- a cluttered design app

Users should feel:
**“This is simple, but the results look way better than I expected.”**

---

## UI Structure

The uploaded concept suggests a strong two-surface structure and that direction is correct.

### Main pages
- `/` → landing page + showcase
- `/create` → main generator
- `/explore` → future v2, not required for MVP

### Recommended MVP priority
Focus mostly on:
- landing page clarity
- generator quality
- export reliability

The generator is the real product.

---

## Generator Layout

### Desktop
- left panel for controls
- right panel for live preview
- bottom or sticky action bar for download and share

### Tablet
- similar split layout with tighter spacing

### Mobile
- controls first
- preview below
- tabs or step-like sections
- actions always reachable

The preview should always feel central.

---

## Wallpaper Type System

Wallpaper types should be treated as modular renderers.

Each wallpaper type should define:
- its id
- label
- preview thumbnail
- supported controls
- default parameter values
- rendering logic
- randomization rules

Example architecture:

```ts
type WallpaperTypeId =
  | "gradient"
  | "geometric"
  | "blob"
  | "noise"
  | "topography";

type WallpaperTypeDefinition = {
  id: WallpaperTypeId;
  name: string;
  description: string;
  controls: ControlDefinition[];
  getDefaultParams: () => Record<string, unknown>;
  randomizeParams: (palette: Palette) => Record<string, unknown>;
};
```

This makes the product extendable without turning into messy conditional logic.

---

## Palette System

The uploaded concept includes curated palettes plus custom colors, which is the right direction for MVP.

### Suggested built-in palettes
- Sunset
- Ocean
- Forest
- Midnight
- Pastel
- Neon
- Earth
- Monochrome
- Nord
- Dracula
- Catppuccin
- Custom

### Palette structure
Each palette should have:
- id
- name
- color array
- vibe label or optional tags

Example:

```ts
type Palette = {
  id: string;
  name: string;
  colors: string[];
  tags?: string[];
};
```

Curated palettes matter because the product should help users get good results quickly.

---

## Wallpaper Types — Detailed Intent

### 1. Gradient Wallpapers
This should be the simplest and most polished starting type.

Support:
- linear gradient
- radial gradient
- mesh-like gradient approximation
- angle control
- color stop adjustments where reasonable

This type is important because it is broadly appealing and visually reliable.

### 2. Geometric Pattern Wallpapers
Support:
- triangles
- hexagons
- squares
- circles

Controls:
- pattern size
- opacity
- rotation
- foreground/background relationship

This type adds structure and visual identity.

### 3. Abstract / Blob Wallpapers
Support:
- organic shape generation
- blob count
- blur amount
- size control
- randomized placement

This type should feel soft, modern, and aesthetic.

### 4. Noise / Grain Wallpapers
Support:
- flat or gradient base
- grain overlay
- intensity
- opacity
- scale

This type matters because it fits minimalist setups and can look premium with little complexity.

### 5. Topography / Wave Wallpapers
Support:
- line count
- thickness
- spacing
- wave amplitude
- wave frequency

This type is especially strong for tech, dev, and desktop aesthetics.

---

## Device Size System

The uploaded idea correctly highlights device presets as a core feature.

### Recommended MVP presets
- iPhone
- iPhone Pro Max
- Android
- iPad
- Desktop HD
- Desktop 4K
- Ultrawide

### Optional
- custom dimensions if simple enough

Suggested structure:

```ts
type SizePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  category: "phone" | "tablet" | "desktop";
};
```

Users should immediately understand what size they are exporting.

---

## Preview System

Preview is not just a nice extra.  
Preview is one of the product’s core trust mechanisms.

Requirements:
- instant updates when controls change
- scale preview appropriately
- frame inside phone or monitor mockup when useful
- keep preview smooth even if export resolution is high
- show loading state for expensive re-renders if needed

The preview should feel close to the final exported image.

---

## Rendering Strategy

The uploaded concept strongly points toward Canvas API as the main rendering system, which is the best fit for this product.

Recommended MVP strategy:
- use HTML Canvas for wallpaper rendering
- render preview at display-friendly resolution
- render export at full target resolution
- separate preview rendering from export rendering when needed

Canvas is a strong choice because it supports:
- gradients
- noise generation
- procedural shapes
- fast export
- deterministic output

Some future types may use SVG or mixed strategies, but MVP should aim for one consistent rendering path where possible.

---

## Export System

Export quality is critical.

### MVP export requirements
- PNG download
- correct device resolution
- predictable output
- fast enough UX for normal sizes

### Export behavior
- preview can render at lower resolution
- download should render at selected output resolution
- 4K or ultrawide export can show a loading indicator
- export must preserve palette and parameter state exactly

Suggested approach:
- render offscreen canvas for export
- use `canvas.toBlob()` for download where possible

The user should trust that the exported wallpaper is the real product.

---

## URL Config Sharing

This is one of the smartest parts of the uploaded idea and should absolutely be included in MVP.

Configuration should be serializable into URL parameters.

Example concept:
- wallpaper type
- palette
- parameter values
- selected size
- custom colors when relevant

Benefits:
- shareable links
- state persistence on refresh
- free viral distribution
- reusable template flows

Example shape:

```ts
type WallpaperConfig = {
  type: WallpaperTypeId;
  paletteId?: string;
  customColors?: string[];
  params: Record<string, unknown>;
  sizePresetId: string;
};
```

The app should:
1. read config from URL on load
2. validate it
3. normalize bad values
4. update URL when state changes with debounce

---

## Randomize System

Randomization should be fun, not chaotic.

Rules:
- output should always remain visually valid
- random values should respect each wallpaper type’s taste constraints
- color combinations should stay coherent
- randomization should produce “good defaults,” not garbage

Recommended model:
- each wallpaper type owns its own randomization logic
- each type uses palette-aware constraints
- randomize button can regenerate only parameters, or parameters plus palette

This feature should encourage exploration and repeat engagement.

---

## Suggested Local Data Model

Since MVP is fully client-side, state can stay local.

```ts
type WallpaperTypeId =
  | "gradient"
  | "geometric"
  | "blob"
  | "noise"
  | "topography";

type DevicePresetId =
  | "iphone"
  | "iphone-pro-max"
  | "android"
  | "ipad"
  | "desktop-hd"
  | "desktop-4k"
  | "ultrawide"
  | "custom";

type WallpaperConfig = {
  type: WallpaperTypeId;
  paletteId: string;
  customColors?: string[];
  params: Record<string, number | string | boolean>;
  sizePresetId: DevicePresetId;
  customWidth?: number;
  customHeight?: number;
};

type GeneratorState = {
  config: WallpaperConfig;
  previewScale: number;
  isRendering: boolean;
  isExporting: boolean;
};
```

---

## Suggested Component Model

### Page-level
- `LandingHero`
- `ShowcaseGallery`
- `WallpaperGeneratorPage`

### Generator layout
- `ControlSidebar`
- `PreviewPanel`
- `ActionBar`

### Control components
- `WallpaperTypePicker`
- `PalettePicker`
- `CustomColorPicker`
- `ParameterControlGroup`
- `DeviceSizeSelector`
- `RandomizeButton`
- `ShareLinkButton`
- `DownloadButton`

### Preview components
- `DeviceMockupPreview`
- `CanvasPreview`
- `WallpaperMetaBadge`

### Utility modules
- `paletteRegistry`
- `sizePresets`
- `wallpaperTypeRegistry`
- `urlState`
- `randomizeEngine`
- `exportWallpaper`

---

## Suggested Folder Mindset

A clean project shape matters.

Suggested logical structure:
- app routes
- shared UI components
- wallpaper renderer modules
- palette data
- preset data
- generator state logic
- export logic
- URL serialization logic

The rendering code should stay isolated from the UI code.

---

## Visual Design Requirements

The uploaded idea clearly wants the UI to stay minimal so the wallpaper remains the hero, and that is the correct product instinct.

Requirements:
- dark neutral UI chrome
- wallpaper preview visually centered
- controls clear but not noisy
- strong spacing
- elegant typography
- subtle motion only where it improves feel
- professional-looking previews

The app itself should feel like a frame around the artwork.

---

## Non-Goals

Keep the boundaries strict in MVP.

Do not build:
- login or signup
- saved user collections
- community gallery
- AI generation
- live wallpapers
- text quote wallpapers
- payments
- native mobile app
- social feed
- advanced collaboration

The product wins through:
- aesthetic output
- fast iteration
- frictionless export
- shareable links

---

## Monetization Direction

The uploaded idea suggests a free-first launch with a small watermark and later premium upsells, which is a strong path.

### Free
- core wallpaper types
- core palettes
- all main size presets
- watermark in a subtle corner

### Premium later
- watermark removal
- premium palettes
- saved favorites
- batch export
- exclusive packs
- creator bundles

MVP does not need billing infrastructure.

---

## Quality Bar for MVP

WallpaperForge MVP is successful if:
- landing page is clear
- at least 5 wallpaper types work well
- at least 10 palettes are included
- custom color selection works
- live preview feels responsive
- multiple device presets export correctly
- randomize produces good results
- URL sharing works reliably
- mobile layout is usable
- exported wallpapers are good enough that users would actually use them

The emotional test is:

**Would someone set this as their wallpaper, not just generate it once and leave?**

If not, the product is not ready.

---

## Recommended Development Sequence

The uploaded implementation order is already strong and should be followed closely.

Recommended sequence:
1. project setup
2. rendering foundation
3. gradient type
4. palette system
5. geometric type
6. blob type
7. noise type
8. topography type
9. size presets + export
10. preview inside mockups
11. URL config encoding
12. randomize
13. landing page
14. responsive polish
15. visual polish
16. deploy

This order is good because it establishes one good renderer first and then expands outward.

---

## Risks

### 1. Good idea, weak output
If the generated wallpapers feel generic, users will not keep them.

### 2. Rendering complexity
Procedural graphics can get messy if architecture is weak.

### 3. Export mismatch
If preview and download differ too much, trust drops.

### 4. Too many controls
If users face too many options, the product starts to feel like a design tool instead of a quick generator.

### 5. Bad randomization
If randomize produces ugly combinations, exploration loses value.

### 6. Poor mobile flow
A large share of traffic may come from mobile curiosity.

---

## Risk Reduction Plan

- polish one wallpaper type deeply before adding all five
- keep control surfaces minimal
- use strong curated palettes
- validate every random output path
- isolate rendering code cleanly
- test preview/export consistency early
- use sensible defaults everywhere
- favor fewer excellent presets over many mediocre ones

---

## Success Metrics

### Core metrics
- wallpaper generation completion rate
- download rate
- randomize usage rate
- share-link copy rate
- average session time

### Quality signals
- repeat generator usage
- device preset distribution
- palette usage distribution
- export failure rate
- share-open rate from URLs

### Future growth signals
- return visits
- premium intent
- community demand for gallery/explore
- demand for saved collections or theme packs

---

## Future Expansion Ideas

Only after MVP works well:
- explore gallery
- user accounts
- save favorites
- community templates
- creator packs
- premium palette bundles
- text wallpapers
- animated/live wallpapers
- seasonal collections
- aesthetic packs by niche
- setup showcase integrations

These are future layers, not launch blockers.

---

## Final Product Strategy

WallpaperForge should begin as:

**A fast, beautiful wallpaper generator for phones and desktops**

Its purpose is not to turn users into designers.  
Its purpose is to give them a faster way to create wallpapers they genuinely want to use.

The first version should optimize for:
- visual quality
- speed
- tasteful defaults
- low friction
- export reliability
- shareable configs

If the product consistently produces wallpapers that feel premium, it has real potential.

---

## Builder Instructions

When building this product, follow these principles:

- prioritize wallpaper quality over feature count
- keep the MVP fully client-side if possible
- use Canvas as the core rendering system
- isolate renderer logic from UI logic
- make every wallpaper type look good by default
- keep randomization tasteful
- make the preview feel premium
- ensure exports are reliable and crisp
- keep the interface minimal
- treat shareable URL state as a first-class feature

---

## Final Summary

WallpaperForge is built around a simple product truth:

People do not want more wallpapers to browse.  
They want a fast way to make one that feels like theirs.

Build the fastest path from:
**style choice → visual customization → beautiful wallpaper → instant download**

That is the product.