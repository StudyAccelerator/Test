# A-Level Accelerators — Brand Kit

Two files, one for each type of design tool:

| File | Import into |
|---|---|
| `brand-tokens.json` | Figma (Tokens Studio plugin), Adobe XD, Framer, Style Dictionary |
| `brand-variables.css` | Canva (paste into CSS field), any web project |

---

## Colours

| Token | Hex | Use |
|---|---|---|
| Purple | `#2E2557` | Headings, nav, CTAs, dark backgrounds |
| Purple Light | `#3D3370` | Hover states, gradients |
| Gold | `#C9A96E` | Accents, borders, price text, highlights |
| Gold Light | `#E0B577` | Hover on gold elements |
| Cream | `#FBF8F3` | Primary page background |
| Cream Dark | `#F3EBD8` | Header on scroll, section dividers |
| Text | `#1A1535` | Body copy |
| Muted | `#777777` | Captions, labels |
| Pricing BG | `#FAF7F0` | Pricing card fill |
| Background Dark | `#2D1B69` | Deep purple (presentation slides) |

---

## Fonts

**Headings / Display:** Georgia (system serif) — use **Lora** or **Playfair Display** as Google Fonts equivalents  
**Body / UI:** System sans-serif (Arial / Helvetica / -apple-system) — use **Inter** as a Google Fonts equivalent

---

## How to import

### Canva Brand Kit
1. Open Canva → Brand Hub → Brand Kit
2. Under **Colours**, click "+" and enter each hex code above
3. Under **Fonts**, add *Lora* (heading) and *Inter* (body) via Google Fonts

### Figma (via Tokens Studio)
1. Install the **Tokens Studio** plugin
2. In the plugin, choose **Import → JSON**
3. Upload `brand-tokens.json`

### Any web / CSS project
```css
@import './brand-variables.css';

h1 { font-family: var(--font-serif); color: var(--color-purple); }
.cta { background: var(--color-gold); border-radius: var(--radius-md); }
```
