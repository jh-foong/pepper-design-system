---
name: logarithmic-color-palette
description: "Generate a logarithmically distributed color swatch family based on human color perception physiology. Less contrasted colors (relative to the background) are more distinguishable than more contrasted ones — on a white background, the difference between 2% and 6% black is clear, but 94%, 98%, and 100% black look the same. Everything is computed in OKLCH: grades are distributed along a power curve in OKLCH lightness, guaranteeing a minimum perceptual step of ΔE 3.5 with monotonically growing steps, for every hue including yellows and greens. Supports multiple base colors in a single run. Approach designed by Alexey Kletsel."
---

# Logarithmic Color Palette Generator

Generate graded color swatch families with light and dark mode scales, rendered as 88×88 rectangles on the canvas, with optional Figma variable storage.

The scale is a power curve in **OKLCH lightness**. Its exponent γ is the smaller of the user's preferred curvature (1.3) and the steepest curvature that still keeps every step above the perceptual floor — so the scale has small steps at the low-contrast end (where human vision is most sensitive), gradually larger steps toward the high-contrast end, no perceptual jumps, and no indistinguishable neighbours anywhere.

Supports multiple base colors in a single run — each produces its own swatch family.

## Why everything is computed in OKLCH

**Do not distribute grades along HSL lightness, and do not use an HSL step threshold as a quality rule.** This is the most important thing in this skill, and it is counter-intuitive because HSL is what Figma's color panel shows.

HSL lightness is `(max + min) / 2` of the sRGB channels. It has no perceptual basis, and for saturated hues it does not track perceived lightness at all. A ladder that is perfectly even in HSL lightness is badly uneven to the eye. Measured in OKLab ΔE between neighbouring grades, a 12-grade ladder built on evenly-progressing HSL lightness gives:

| base color | ΔE between neighbours, planned in HSL | planned in OKLCH |
|---|---|---|
| `#888888` | 3.1 … 10.3 | 3.3 … 8.6 |
| `#6B5CE7` | 8.3, 8.7, 11.4, 9.9, 6.7 … — **not monotonic** | 4.5, 5.8, 6.8, 7.6, 8.5 … |
| `#FFE000` | 2.4, 3.7, 4.0, 3.5, 3.5, **2.0**, then 16.9 | 5.6 … 8.9 |

For yellow, HSL planning produces seven visually identical grades in a row followed by a cliff. OKLCH planning keeps every hue inside a ×1.6 spread.

The consequence to internalize: **uneven HSL numbers in Figma's panel are correct output, not a defect.** A saturated yellow will show HSL lightness steps of 10, 18, 19, 0, 7 … and still look like a perfectly smooth ramp, because HSL is blind in that region. Judge the scale with the ΔE report this skill produces (Step 4e), or with your eye — never with the HSL readout.

HSL is used for exactly one thing: **defining where the scale ends** (Step 4b), because "how close to white" is a calibration Alexey already has intuitions for in HSL terms.

## Workflow

### Step 1: Get the base color(s)

Multiple base colors can be gathered at once:

- **Multiple hex values**: If the user provides several hex codes (e.g. "80C5F6, FF6B35, 6B5CE7"), treat each as a separate base color.
- **Multiple selected layers**: If the user selected multiple nodes, inspect each node's fills using the Figma Plugin API via this project's `use_figma` tool.
  - For each node with exactly one solid fill, use it automatically.
  - For each node with more than one solid fill, ask the user which fill to use (list them with their hex values).
  - Skip nodes with no solid fills and inform the user.
- **Single layer**: If the user selected one node, inspect its fills.
  - If it has exactly one solid fill, use it.
  - If it has more than one solid fill, ask the user which one to use.
  - If it has no solid fills, ask for a color number.
- **No selection, no color provided**: Ask the user for one or more hex color values.

Each base color will produce a separate swatch family. Convert each to OKLCH and keep its **chroma (C)** and **hue (h)** — lightness is regenerated across the scale.

### Step 2: Ask for number of grades

Ask once (applies to all color families): "How many grades for the swatch?" Suggest common options: 8, 10, 12, 16.

**Maximum is 19.** Above that, the OKLCH lightness span available to the least-extended hues (teals and yellows — about 0.648) cannot hold the required steps of 0.035 each, and `oklchLadder` throws. If the user asks for more, say so and offer 19. There is no minimum, but below 6 the scale stops being a ramp and becomes a set of unrelated tones.

### Step 3: Ask for primary color mode

Ask once: "Which is the primary color mode?" Options: **Light**, **Dark**.

This determines which scale is the first (top) row and which variable mode is the collection default.

**Do not ask about color space.** Everything is OKLCH; the user inspects the result in whatever mode they prefer in Figma.

### Step 4: Generate the scales

#### 4a. Endpoints

Grade 1 is always the **least contrasting** grade against its own background:

- **Light scale**: grade 1 is nearly white → grade N is nearly black
- **Dark scale**: grade 1 is nearly black → grade N is nearly white

The two ends use **different rulers**, and this is deliberate.

**Near white — anchor by ΔE from white.** HSL lightness is useless here. At HSL 97% every hue is squeezed into the same 0.06-wide channel gap, but the perceived distance from white inside that gap varies almost threefold by hue:

| base color | ΔE from white at a flat HSL 97% |
|---|---|
| `#6B5CE7` | 4.4 |
| `#FF6B35` | 3.0 |
| `#80C5F6` | 2.8 |
| `#00BFA5` | 2.1 |
| `#FFE000` | **1.9** |

Below roughly ΔE 3 the grade is indistinguishable from a white background, so yellows, teals and greens lose their first grade entirely while purple keeps its own. Anchoring by ΔE fixes this without a single hue special-case: the hues that were already fine barely move, and the crushed ones get pulled out.

**Near black — anchor by HSL lightness.** ΔE is the wrong ruler at this end: OKLab is compressed near L=0, so a ΔE 5 target resolves to `#000000` or `#000002` for every hue. HSL percentages behave well there and the existing calibration is good — at HSL 8% and 12% every hue already sits ΔE 16–33 from black, with plenty of separation.

So, per base color:

```javascript
// light scale: grade 1 sits ΔE 5 from white, grade N at HSL 12%
const lightStart = findOklchLForDeltaEFromWhite(5, C, h);
const lightEnd   = findOklchLForHslL(12, C, h);

// dark scale: grade 1 at HSL 8%, grade N sits ΔE 8 from white
const darkStart  = findOklchLForHslL(8, C, h);
const darkEnd    = findOklchLForDeltaEFromWhite(8, C, h);
```

`DE_FROM_WHITE_LIGHT_START = 5` keeps grade 1 a genuine near-white tint that is still visible on a white background. `DE_FROM_WHITE_DARK_END = 8` is the maximum-contrast end of the dark scale — it must read as near-white without colliding with the pure-white Front swatch, and 8 is where purple already sat under the old calibration.

These are the only two places HSL still enters the calculation.

#### 4b. Step distribution

Two constants govern the curve:

- **γ_preferred = 1.3** — the curvature Alexey wants when there is room for it.
- **ΔL_min = 0.035** — the minimum OKLCH lightness step. Since `ΔE = √(ΔL² + Δa² + Δb²) ≥ |ΔL|`, holding ΔL above 0.035 *guarantees* every perceptual step is at least ΔE 3.5. This replaces the old "minimum 4% HSL" rule, which was measuring the wrong thing.

γ is whichever of the two binds:

```
γ = min( ln(ΔL_min / R) / ln(1 / (N − 1)) ,  1.3 )        where R = |L_end − L_start|
```

The solved term is the steepest γ whose *first* step still equals ΔL_min. For small N it comes out well above 1.3, meaning there is plenty of headroom and the preferred curvature wins. For large N it drops below 1.3 and takes over, flattening the curve just enough to keep the first step legal. Pinning the first step to exactly the minimum at every N — which an unclamped solved γ would do — makes small scales violent: at N=8 it yields steps of 4, 8, 10, 13, 15, 17, 18 instead of a well-behaved 7, 10, 11, 13, 14, 15, 15.

```javascript
const GAMMA_PREFERRED = 1.3;
const DL_MIN = 0.035;

function oklchLadder(Lstart, Lend, N) {
  const K = N - 1;
  const R = Math.abs(Lend - Lstart);
  const sign = Lend > Lstart ? 1 : -1;
  if (DL_MIN * K > R) {
    throw new Error(`${N} grades need ${(DL_MIN * K).toFixed(3)} of OKLCH lightness but only ${R.toFixed(3)} is available for this hue — reduce the grade count`);
  }
  const gamma = Math.min(Math.log(DL_MIN / R) / Math.log(1 / K), GAMMA_PREFERRED);
  const out = [];
  for (let i = 0; i < N; i++) out.push(Lstart + sign * R * Math.pow(i / K, gamma));
  return { values: out, gamma };
}
```

**No rounding anywhere.** OKLCH lightness is a continuous 0–1 quantity; rounding it to two decimals or snapping it to whole HSL percentages is what used to produce twin grades. Keep full precision all the way to the 8-bit sRGB conversion, which is the only quantization step that belongs in the pipeline.

#### 4c. Realizing each grade

```javascript
const rgb = oklchToSrgbClamped(L_i, C, h);
```

Chroma stays at the base color's value wherever sRGB allows it, and is reduced only where the color would fall outside the gamut — near both ends of the scale. This produces a natural chroma arch: near-neutral at the extremes, fullest in the middle.

#### 4d. What γ and ΔE look like in practice

Verified across nine base colors (`#888888`, `#80C5F6`, `#FF6B35`, `#6B5CE7`, `#2E7D32`, `#FFE000`, `#C2185B`, `#0D47A1`, `#00BFA5`):

| N | γ (range across hues) | ΔE between neighbours |
|---|---|---|
| 6 | 1.30 | 8.8 … 23.0 |
| 8 | 1.30 | 5.7 … 16.8 |
| 10 | 1.30 | 4.1 … 14.8 |
| 12 | 1.23 – 1.30 | 3.5 … 13.7 |
| 16 | 1.09 – 1.15 | 3.5 … 11.4 |
| 19 | 1.02 – 1.08 | 3.5 … 9.4 |

Note that γ only starts binding at N = 12; below that the preferred 1.3 is used unchanged. At N = 19 γ is essentially 1 — the scale has become linear, because that many grades leave no room for curvature. That, as much as the hard limit, is why 19 is the cap.

#### 4e. Verification (do not skip)

Compute the OKLab ΔE between every pair of neighbours and report it to the user alongside the swatches.

```javascript
function oklabDeltaE(c1, c2) {
  const a = linearRgbToOklab(srgbToLinear(c1.r), srgbToLinear(c1.g), srgbToLinear(c1.b));
  const b = linearRgbToOklab(srgbToLinear(c2.r), srgbToLinear(c2.g), srgbToLinear(c2.b));
  return Math.hypot(a.L - b.L, a.a - b.a, a.b - b.b) * 100;
}

function report(scale, label) {
  const dE = scale.slice(1).map((c, i) => +oklabDeltaE(scale[i], c).toFixed(1));
  const hsl = scale.map(c => Math.round(rgbToHsl(c.r, c.g, c.b).l));   // reference only
  return {
    label,
    dE,
    tooClose: dE.map((d, i) => d < 3.5 ? `${i + 1}→${i + 2}: ΔE ${d}` : null).filter(Boolean),
    wobble: dE.map((d, i) => {
      if (i === dE.length - 1) return null;
      const ratio = Math.max(d, dE[i + 1]) / Math.min(d, dE[i + 1]);
      return ratio > 1.5 ? `${i + 1}→${i + 2} (ΔE ${d}) vs ${i + 2}→${i + 3} (ΔE ${dE[i + 1]})` : null;
    }).filter(Boolean),
    hsl
  };
}
```

- **`tooClose` must be empty.** If it is not, the ladder is wrong — stop and report instead of drawing swatches.
- **`wobble` may be non-empty at whichever end of the scale is closest to white**, and this is a chroma effect, not a lightness error: near white a saturated hue must shed almost all of its chroma to stay in gamut, so those steps carry a large Δa/Δb on top of a normal ΔL. It shows up as the *first* one or two steps of the light scale and the *last* one or two of the dark scale.

  The ΔE-anchored endpoints of 4a already absorb most of this — the worst case, `#FFE000` on the dark scale at N=12, dropped from ΔE 17.3 to 13.7 when the endpoint moved off HSL 94%. What remains is inherent to the hue. Do not try to correct it by moving grades, which would break the ΔL floor. Report it, and if the user still finds it objectionable, the remedy is to raise `DE_FROM_WHITE_DARK_END` from 8 to 10. Offer that, do not apply it unasked.
- **Report `hsl` as reference only.** Say explicitly that these numbers will look uneven for saturated hues and that this is expected — see "Why everything is computed in OKLCH" above. Never use them to adjust the scale.

### Step 5: Ask about Back and Front colors

Ask once: "Add Back and Front colors to the scale?"

- **Back** (zero contrast): white `#FFFFFF` for light mode, black `#000000` for dark mode
- **Front** (max contrast): black `#000000` for light mode, white `#FFFFFF` for dark mode

If yes, Back is prepended and Front is appended to each row. Back and Front are absolute anchors outside the graded ladder — the ΔL_min rule does not apply to them.

### Step 6: Create the swatches on canvas

Use this project's `use_figma` tool (Figma Plugin API via JS) to create the swatch structure on canvas.

#### Structure

Each color family is a **parent frame** (auto-layout, vertical direction, gap 0) containing:

1. **Row frame "Light"** (auto-layout, horizontal, gap 0) — contains 88×88 rectangles for the light scale
2. **Row frame "Dark"** (auto-layout, horizontal, gap 0) — contains 88×88 rectangles for the dark scale
3. **Row frame "Grades"** — a row of text labels showing the grade identifiers: B, 1, 2, 3, … N, F (each label 88px wide, centered, font size 10)

The order of rows 1 and 2 depends on the primary mode: if Light is primary, Light row is first; if Dark is primary, Dark row is first.

Each swatch rectangle is **88×88 px**.

Do **not** add percentage labels on top of the swatch rectangles — the grade labels in row 3 serve as the only labeling.

If Back/Front are included, they bookend each row: Back on the far left, then grades 1→N, then Front on the far right. The Grades row also includes "B" and "F" labels at the corresponding positions.

If there are multiple color families, stack them vertically on the canvas with some spacing between them (e.g. 40px gap). Position the group centered in the current viewport.

#### Mode assignment

After creating variables (Steps 9–10), assign the **Light** variable mode to the "Light" row frame, and the **Dark** variable mode to the "Dark" row frame. This way all bound rectangles in each row automatically resolve to the correct mode value.

### Step 7: Ask for the swatch family names

Ask the user for a name for **each** color family. If there are multiple, list the base hex colors and ask for a name for each one (e.g. "Name for #80C5F6?", "Name for #FF6B35?"). Suggest common names like Primary, Secondary, Accent, Neutral, Brand, etc.

Rename each parent frame to the chosen name.

### Step 8: Ask about saving to variables

Ask: "Save these swatch families as Figma variables?" Options: **Yes**, **No**.

If yes:
1. Ask: "Which variable collection?" — list existing collections and offer **"Create new collection"** as an option.
2. If creating a new collection, ask for the collection name and create it.
3. Ensure the collection has exactly two modes named **Light** and **Dark**. If the collection already exists, check for these modes and add any that are missing. If the collection is new, rename the default mode to match the primary color mode chosen in Step 3, then add the other mode. The first/default mode in the collection should always correspond to the user's chosen primary color mode.

### Step 9: Create variables

Variable naming pattern: `<color-name>/<suffix>`

Suffixes:
- `B` — Back color (if included)
- `1` through `N` — each numbered grade
- `F` — Front color (if included)

Example with name "Primary", 12 grades, Back and Front included:
`Primary/B`, `Primary/1`, `Primary/2`, … `Primary/12`, `Primary/F`

Each variable is **COLOR** type. Set values per mode:
- **Light mode value** ← color from the light scale
- **Dark mode value** ← color from the dark scale

Create variables for each color family.

### Step 10: Bind variables to canvas rectangles and assign modes

After creating the variables:

1. **Bind fills**: For each rectangle in both the Light and Dark rows, bind its solid fill to the corresponding variable:
```
const fills = JSON.parse(JSON.stringify(rect.fills));
fills[0].boundVariables = { color: { type: 'VARIABLE_ALIAS', id: variable.id } };
rect.fills = fills;
```
Both rows reference the **same** variable for the same grade position.

2. **Assign modes to row frames**: Set the explicit variable mode on each row frame so Figma resolves the correct value:
   - "Light" row frame → set to Light mode of the collection
   - "Dark" row frame → set to Dark mode of the collection
   Use: `rowFrame.setExplicitVariableModeForCollection(collection, modeId)`

This way the canvas swatches display the correct mode colors and stay in sync if variable values are later updated.

## Required conversion functions

Include all of these in the `use_figma` code you write.

```javascript
// sRGB <-> linear
function srgbToLinear(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function linearToSrgb(c) { return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055; }

// linear RGB <-> OKLab
function linearRgbToOklab(r, g, b) {
  const l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b;
  const m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b;
  const s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b;
  const cbrt = v => Math.sign(v) * Math.cbrt(Math.abs(v));
  const l_ = cbrt(l), m_ = cbrt(m), s_ = cbrt(s);
  return {
    L: 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_,
    a: 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_,
    b: 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
  };
}

function oklabToLinearRgb(L, a, b) {
  const l_ = L + 0.3963377774*a + 0.2158037573*b;
  const m_ = L - 0.1055613458*a - 0.0638541728*b;
  const s_ = L - 0.0894841775*a - 1.2914855480*b;
  const l = l_*l_*l_, m = m_*m_*m_, s = s_*s_*s_;
  return {
    r: 4.0767416621*l - 3.3077115913*m + 0.2309699292*s,
    g: -1.2684380046*l + 2.6097574011*m - 0.3413193965*s,
    b: -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
  };
}

// sRGB -> OKLCH
function srgbToOklch(r, g, b) {
  const lab = linearRgbToOklab(srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));
  const C = Math.sqrt(lab.a*lab.a + lab.b*lab.b);
  let h = Math.atan2(lab.b, lab.a) * 180 / Math.PI;
  if (h < 0) h += 360;
  return { L: lab.L, C, h };
}

// OKLCH -> sRGB. Chroma is binary-searched to the largest in-gamut value,
// never stepped down by a fixed factor: a geometric decay loop overshoots and,
// worse, falls through to chroma 0 when it runs out of iterations — which is
// what makes the lightest grades of saturated hues collapse to grey.
function oklchToSrgbClamped(L, C, h) {
  const hRad = h * Math.PI / 180;
  const cos = Math.cos(hRad), sin = Math.sin(hRad);
  const eps = 1e-4;
  const fits = c => {
    const p = oklabToLinearRgb(L, c * cos, c * sin);
    return p.r >= -eps && p.r <= 1 + eps && p.g >= -eps && p.g <= 1 + eps && p.b >= -eps && p.b <= 1 + eps;
  };
  let c = C;
  if (!fits(c)) {
    let lo = 0, hi = C;
    for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
    c = lo;
  }
  const p = oklabToLinearRgb(L, c * cos, c * sin);
  const ch = v => Math.max(0, Math.min(1, linearToSrgb(Math.max(0, Math.min(1, v)))));
  return { r: ch(p.r), g: ch(p.g), b: ch(p.b) };
}

// RGB -> HSL. Used ONLY to locate the scale endpoints (Step 4a) and to print
// the reference readout (Step 4e). Never used to space or correct grades.
function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Binary search: find the OKLCH L that produces a target HSL lightness
// for a given chroma + hue. HSL L is monotonic in OKLCH L, so this always converges.
function findOklchLForHslL(targetHslL, chroma, hue) {
  let lo = 0, hi = 1;
  for (let iter = 0; iter < 60; iter++) {
    const mid = (lo + hi) / 2;
    const rgb = oklchToSrgbClamped(mid, chroma, hue);
    if (rgbToHsl(rgb.r, rgb.g, rgb.b).l < targetHslL) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// Perceptual distance from pure white, in OKLab, x100 — the same units as the
// ΔE used everywhere else in this skill.
function deltaEFromWhite(rgb) {
  const p = linearRgbToOklab(srgbToLinear(rgb.r), srgbToLinear(rgb.g), srgbToLinear(rgb.b));
  return Math.hypot(p.L - 1, p.a, p.b) * 100;
}

// Binary search: find the OKLCH L sitting a given perceptual distance from white.
// ΔE from white decreases monotonically as L rises, hence the flipped comparison.
function findOklchLForDeltaEFromWhite(targetDeltaE, chroma, hue) {
  let lo = 0, hi = 1;
  for (let iter = 0; iter < 60; iter++) {
    const mid = (lo + hi) / 2;
    if (deltaEFromWhite(oklchToSrgbClamped(mid, chroma, hue)) > targetDeltaE) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
```

## Important notes

- **Everything is computed in OKLCH.** Do not offer the user a color space choice, do not distribute grades along HSL lightness, and do not apply any HSL-based step threshold. See "Why everything is computed in OKLCH" above — the evidence is in that table.
- **Uneven HSL numbers are correct output.** A saturated yellow can show HSL lightness steps of 10, 18, 19, 0, 7 and still be a perfectly smooth ramp. Say this to the user when reporting, so the Figma panel does not send anyone chasing a phantom.
- Endpoints use two different rulers on purpose: **ΔE from white** at the near-white end (light grade 1 at ΔE 5, dark grade N at ΔE 8) because HSL crushes hues together there by up to 3×, and **HSL lightness** at the near-black end (light grade N at 12%, dark grade 1 at 8%) because OKLab ΔE collapses to `#000000` near black. Both are resolved to OKLCH L per hue by binary search. Grade 1 is always the least contrasting grade against its own background.
- **Minimum step is ΔL 0.035 in OKLCH lightness**, which guarantees ΔE ≥ 3.5 because ΔE ≥ |ΔL|. This is the only step rule. There is no correction pass — the ladder is legal by construction.
- γ = `min(ln(0.035 / R) / ln(1 / (N − 1)), 1.3)`. Do not hard-code either term alone: the fixed 1.3 alone breaks at large N, the solved term alone makes small scales violent.
- **No rounding of lightness values.** Full float precision through to the sRGB conversion.
- Maximum grade count is **19**, limited by the shortest OKLCH lightness span among hues (teals and yellows, ≈ 0.648). `oklchLadder` throws rather than producing an illegal ladder.
- OKLCH gamut clamping: binary-search chroma down, never shift hue or lightness, never fall back to chroma 0.
- Always run the Step 4e verification and report the ΔE array. `tooClose` must be empty. `wobble` at the near-white end of saturated hues is expected, should be explained rather than corrected, and is cured only by moving that endpoint away from white if the user wants it gone.
- Always generate both light AND dark scales regardless of which is primary — primary only affects row order and default variable mode.
- Each rectangle is exactly 88×88 px with zero spacing.
- When multiple base colors are provided, all shared settings (grades, mode, Back/Front) are asked once and apply to all families.
- Each question in the workflow must be asked **exactly once** — wait for the user's answer before proceeding to the next question.
- Each color family is named independently.
- Parent frame and row frames use auto-layout (vertical for parent, horizontal for rows, all gaps 0).
- No percentage labels on swatches — grade identifiers appear in a dedicated third row.
