# Design System — "Turntable" (ArtStation-inspired 3D Artist Portfolio)

## 1. Reference
Visual language borrows from ArtStation project pages: full-bleed dark canvas, large hero
imagery, minimal chrome, content presented as elevated cards on a near-black surface,
strong single accent color used sparingly for CTAs/active states, generous whitespace
between sections, monospace/technical tags for software & stats (poly count, texture res).

## 2. Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--c-navy` | `#0c1e29` | Base page background |
| `--c-navy-deep` | `#07161c` | Recessed panels, viewer canvas backdrop |
| `--c-navy-elevated` | `#152b3b` | Cards, nav bar, breakdown panel surface |
| `--c-navy-line` | `#213c4e` | Borders / dividers on dark surfaces |
| `--c-yellow` | `#fffe15` | Primary accent — CTAs, active tab, links, highlights |
| `--c-yellow-bright` | `#ffffa8` | Hover state of accent |
| `--c-yellow-dim` | `#aba90e` | Pressed state / subtle accent fills |
| `--c-cream` | `#ece9e3` | Primary text on dark, headings |
| `--c-cream-dim` | `#a7a49e` | Secondary text, captions, meta |
| `--c-cream-mute` | `#6f6d68` | Disabled / tertiary text |

Rule: accent yellow never exceeds ~10% of any viewport — used for CTA buttons, active nav
pill, section numerals, hover underlines, and stat highlights only. Because the accent is
near-maximum luminance, any text/icon painted *on* a yellow-filled surface (buttons, active
pills/tabs) uses `--c-navy` or `--c-navy-deep` for contrast — never `--c-cream`.

## 3. Typography

- Display / headings: **Space Grotesk** (700/600) — bold, geometric, technical feel.
- Body / UI: **Inter** (400/500) — high legibility at small sizes for stats & captions.
- Numerals for stats & poly counts: `font-variant-numeric: tabular-nums`.

Scale: 12 / 14 / 16 / 20 / 26 / 34 / 48 / 72 (px), line-height 1.15 for display, 1.6 for body.

## 4. Spacing & Radius

Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Radius: 4px (chips/buttons), 10px (cards), 18px (large panels/viewer frame).

## 5. Layout

- Max content width: 1280px, side gutter 6vw on desktop, 20px on mobile.
- Section vertical rhythm: 96–128px padding top/bottom.
- Grid: 3-column project gallery (desktop) → 2 col (tablet) → 1 col (mobile).

## 6. Components

**Tab Bar (top-right)**
Fixed, top-right corner. Collapsed = single square icon button (hamburger/grid glyph) on
`--c-navy-elevated` with 1px `--c-navy-line` border. Expanded = pill-shaped panel listing
section links (Home / About / Breakdown / Projects / Contact) stacked or inline; active
section gets a `--c-yellow` filled pill, inactive links are `--c-cream-dim`, hover → `--c-cream`.

**Project Card**
`--c-navy-elevated` surface, thumbnail image top (4:3), title (Space Grotesk 20px),
role + tools meta row (12px, `--c-cream-dim`), tag chips for software (outline, yellow text
on hover). Hover: lift 4px translateY + yellow border glow.

**3D Viewer Frame**
`--c-navy-deep` canvas surface inset in an 18px-radius `--c-navy-elevated` frame with thin
`--c-yellow` corner tick marks (decorative, evokes CAD/technical viewport). Controls row
underneath: auto-rotate toggle, reset-view, fullscreen — icon buttons, cream on hover yellow.

**Breakdown Tabs**
Horizontal pill tab strip (Base Color / Wireframe / UV Layout / High Poly / Low Poly /
Textures). Active tab: `--c-yellow` background, `--c-navy` text. Inactive: transparent,
1px `--c-navy-line` border, `--c-cream-dim` text.

**Stat Chip**
Small mono-numeral blocks (Tris, Verts, Texture Res, Engine) in a row under the viewer —
label 11px uppercase `--c-cream-mute`, value 16px `--c-cream` tabular-nums.

**Buttons**
Primary: `--c-yellow` fill, `--c-navy-deep` text, 4px radius, hover → `--c-yellow-bright`.
Secondary/ghost: transparent, 1px `--c-navy-line` border, hover border → `--c-yellow`.

## 7. Motion

- Section reveal: fade + translateY(16px)→0 on scroll into view, 400ms ease-out, staggered
  60ms per child.
- Nav pill expand: 200ms ease.
- Viewer auto-rotate: continuous slow Y rotation (~0.25 rad/s) when idle, pauses on drag.

## 8. Placeholder Policy (current build stage)
No final renders/models supplied yet. Breakdown panels (UV / High Poly / Low Poly /
Textures) use styled placeholder blocks clearly labeled "replace with render" — swap by
editing the `renders` object per project in `js/main.js`. The interactive viewer loads
real sample `.glb` files as stand-ins for the artist's own exported models; replace the
`model` URL per project with a local path (e.g. `assets/models/project1.glb`) when ready.
