# Easy Website Color Guide

This guide explains where the website colors come from and how to change them safely.

The layout is beginner-friendly:

- **Color value** - the exact value used by the website.
- **What it changes** - the parts of the website that use it.
- **Open this file** - where the color is stored.
- **Important lines** - where to find it.
- **Variable names** - reusable CSS color names.
- **Warning** - anything else the change may affect.

The source audit was completed on **October 31, 2026**.

> Line numbers are accurate for the audited source. If source code changes later, search for the color value or variable name.

## Read This First

The website mainly uses six colors.

### 1. Deep Navy

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Color value:** <code>#172C4C</code>

**Usually controls:**

- Main text
- Headings
- Dark buttons
- Envelope
- Dark overlays and shadows

### 2. Cornflower Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#739ACD;border:1px solid #888"></span>

**Color value:** <code>#739ACD</code>

**Usually controls:**

- Blue decorations
- Secondary accents
- Status text
- Some attire swatches

### 3. Periwinkle Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9AADE0;border:1px solid #888"></span>

**Color value:** <code>#9AADE0</code>

**Usually controls:**

- Borders
- Frames
- Labels
- Focus colors
- Soft accents

### 4. Pastel Sky Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9CC5E5;border:1px solid #888"></span>

**Color value:** <code>#9CC5E5</code>

**Usually controls:**

- Light decorations
- Particles
- Small highlights
- Attire swatches

### 5. Pale Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#F2F6FB;border:1px solid #888"></span>

**Color value:** <code>#F2F6FB</code>

**Usually controls:**

- Cards
- Light sections
- Invitation paper
- Hover surfaces

### 6. Warm Ivory

<span style="display:inline-block;width:1.25em;height:1.25em;background:#FAF6EE;border:1px solid #888"></span>

**Color value:** <code>#FAF6EE</code>

**Usually controls:**

- Main page background
- Paper backgrounds
- Light text
- Glows and overlays

---

# Quick Start: What Do You Want to Recolor?

## Main website background

**Open this file:** <code>app/globals.css</code>

**Find line 209:**

~~~css
--color-welcome-bg: #FAF6EE;
~~~

Change only the value after the colon.

## Main website text and headings

**Open this file:** <code>app/globals.css</code>

**Important lines:** 220-233

Look for:

~~~css
--color-welcome-text: #172C4C;
--color-welcome-heading: #172C4C;
--color-welcome-script: #172C4C;
--color-welcome-navy: #172C4C;
~~~

## Main website buttons

**Open this file:** <code>app/globals.css</code>

**Important lines:** 368-379

Look for:

~~~css
--color-primary: #172C4C;
--color-romantic: #739ACD;
~~~

## Loading screen

**Open this file:** <code>components/loader/loading-screen.css</code>

**Final active palette:** lines 3952-4021

Later rules in this range override many earlier loader colors.

## Home Hero / cover area

**Open this file:** <code>components/loader/loading-screen.css</code>

**Important lines:**

- Base Hero palette: 4037-4056
- Final readability colors: 4462-4548

## Invitation envelope

**Open this file:** <code>components/loader/envelope-invite.css</code>

**Final active palette:** lines 3884-3947

## Gift Guide

**Open this file:** <code>content/site.ts</code>

**Color settings:** lines 1229-1240

## Dashboard only

**Open this file:** <code>app/globals.css</code>

**Dashboard variables:** lines 469-529

Only change variables beginning with:

~~~css
--color-dash-
~~~

## Website and dashboard together

**Open this file:** <code>app/globals.css</code>

**Shared base colors:** lines 67-76

Changing these shared variables can affect both interfaces.

---

# Safest Way to Change a Color

## Step 1: Save the old value

Example:

~~~text
#172C4C
~~~

## Step 2: Change only the color value

Before:

~~~css
--color-welcome-heading: #172C4C;
~~~

After:

~~~css
--color-welcome-heading: #405D78;
~~~

Keep:

- The variable name
- The colon
- The semicolon

## Step 3: Test the result

Check:

- Phone layout
- Tablet layout
- Desktop layout
- Hover colors
- Keyboard focus
- Disabled buttons
- Photo overlays
- Dashboard
- QR-code scanning

## Step 4: Restore the old value if necessary

If the wrong parts changed, restore the saved value and use a more specific variable.

---

# Important Warnings

- Use <code>--color-welcome-*</code>, <code>--color-motif-*</code>, and <code>--invite-*</code> for the public website.
- Use <code>--color-dash-*</code> for dashboard-only changes.
- Avoid shared variables such as <code>--background</code>, <code>--foreground</code>, <code>--primary</code>, and <code>--card</code> unless both interfaces should change.
- The loader, Hero, and envelope have local color overrides. A global change may not replace their final colors.
- Keep QR-code foreground and background colors strongly contrasted.
- PNG, JPG, WebP, and ICO images contain their own pixels. CSS variables cannot recolor those pixels.
- <code>transparent</code> is not a separate visible hue. It makes a color fully see-through.
- <code>currentColor</code> tells an icon to use its surrounding text color.

---

# Audit Summary

## Exact source counts

**Unique literal HEX values:** 39

- Case-normalized
- Includes active and inactive definitions

**Unique source color expressions:** 248

- Includes HEX
- RGB and RGBA
- Functional colors
- <code>transparent</code>
- <code>currentColor</code>

**Total source color references:** 2,283

- Source comments excluded

**Active or reachable references:** 1,848

**Inactive or legacy references:** 435

**Active opaque colors on the main website:** 9

- Six theme colors
- White
- Black
- Gift Guide paper beige

**Active opaque dashboard colors:** 6

**Opaque colors shared by both interfaces:** 6

Alpha variants such as <code>rgb(250 246 238 / 85%)</code> and <code>color-mix(...)</code> count as separate expressions, not new opaque base colors.

## Audit scope

Audited editable source:

- <code>app/</code>
- <code>components/</code>
- <code>content/</code>
- <code>contexts/</code>
- <code>hooks/</code>
- <code>lib/</code>
- <code>styles/</code>

Excluded:

- Generated <code>.next/</code> files
- Dependencies
- Documentation examples
- Pixels inside image and icon files

The active stylesheet is imported from <code>app/layout.tsx:6</code>. The file <code>styles/globals.css</code> is legacy and not imported.

---

# A. Main Website Colors

## Main Color 1: Deep Navy

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Color value:** <code>#172C4C</code>

**Color type:**

- Text
- Headings
- Buttons
- Envelope
- Overlay
- Shadow

**Main file:** <code>app/globals.css</code>

**Important lines:**

67-69, 119, 121, 126, 128, 131, 134, 136-138, 145, 148, 150-151, 181, 220, 224, 227, 230, 233, 240, 255, 261, 273, 290, 329, 342, 346, 350, 354, 358, 368, 372, 379, 452, 455, 458, 462

**Main variables:**

- <code>--foreground</code>
- <code>--primary</code>
- <code>--color-motif-deep</code>
- <code>--color-welcome-text</code>
- <code>--color-welcome-heading</code>
- <code>--color-welcome-script</code>
- <code>--color-welcome-navy</code>
- <code>--color-primary</code>
- <code>--color-ink-deep</code>
- <code>--color-ink-accent</code>

**Where it appears:**

- Main copy and headings
- Primary buttons
- Countdown fade
- Envelope fabric and folds
- Dark photo overlays

**Usage states:**

- Default
- Hover mixtures
- Dark surfaces
- Shadows and overlays

**Warning:** This is the most widely reused dark color. Search for local copies after changing it.

---

## Main Color 2: Cornflower Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#739ACD;border:1px solid #888"></span>

**Color value:** <code>#739ACD</code>

**Color type:**

- Accent
- Border
- Decoration
- Attire swatch

**Files:**

- <code>app/globals.css</code>
- <code>content/site.ts</code>

**Important lines in app/globals.css:**

70, 74, 76, 130-131, 133, 141, 143, 149, 180, 188, 243, 256, 276, 293, 313, 375, 379, 385, 388

**Attire line:** <code>content/site.ts:168</code>

**Main variables:**

- <code>--secondary</code>
- <code>--floral-leaves</code>
- <code>--border</code>
- <code>--color-motif-accent</code>
- <code>--color-romantic</code>
- <code>--color-deco</code>

**Where it appears:**

- Floral decorations
- Secondary accents
- Status text
- Guest attire palette

---

## Main Color 3: Periwinkle Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9AADE0;border:1px solid #888"></span>

**Color value:** <code>#9AADE0</code>

**Color type:**

- Border
- Frame
- Focus
- Label
- Soft accent

**Files:**

- <code>app/globals.css</code>
- <code>content/site.ts</code>

**Important lines in app/globals.css:**

72, 75, 125, 135, 137-138, 140, 144, 147, 151, 182, 189, 202, 246, 257, 260, 265, 277, 300, 322, 335, 350, 417, 420, 440, 449

**Attire line:** <code>content/site.ts:167</code>

**Main variables:**

- <code>--accent</code>
- <code>--floral-soft</code>
- <code>--color-motif-medium</code>
- <code>--color-section-accent</code>
- <code>--color-border</code>

**Where it appears:**

- Frames
- Labels
- Guest attire
- Focus rings
- Soft shadows

---

## Main Color 4: Pastel Sky Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9CC5E5;border:1px solid #888"></span>

**Color value:** <code>#9CC5E5</code>

**Color type:**

- Light accent
- Particle
- Decoration
- Attire swatch

**Files:**

- <code>app/globals.css</code>
- <code>content/site.ts</code>

**Important lines in app/globals.css:**

73, 127, 139, 142, 152, 173, 196, 249, 262

**Attire line:** <code>content/site.ts:169</code>

**Main variables:**

- <code>--floral-yellow</code>
- <code>--color-motif-yellow</code>
- <code>--color-motif-blush</code>

**Where it appears:**

- Light motif accents
- Particles
- Guest attire palette
- Envelope liner

---

## Main Color 5: Pale Blue Paper

<span style="display:inline-block;width:1.25em;height:1.25em;background:#F2F6FB;border:1px solid #888"></span>

**Color value:** <code>#F2F6FB</code>

**Color type:**

- Card background
- Invitation paper
- Highlight
- Light section

**Main file:** <code>app/globals.css</code>

**Important lines:**

71, 174, 190, 213, 263, 286, 306, 310, 382, 413, 443, 446

**Main variables:**

- <code>--card</code>
- <code>--color-motif-soft</code>
- <code>--color-highlight</code>
- <code>--color-section-light</code>
- <code>--color-card</code>

**Where it appears:**

- Cards
- Invitation paper
- Hero surfaces
- Hover surfaces

---

## Main Color 6: Warm Ivory

<span style="display:inline-block;width:1.25em;height:1.25em;background:#FAF6EE;border:1px solid #888"></span>

**Color value:** <code>#FAF6EE</code>

**Color type:**

- Background
- Light text
- Paper
- Glow

**Main file:** <code>app/globals.css</code>

**Important lines:**

67, 120, 122, 124, 132, 146, 172, 209, 213, 224, 258, 266, 286, 296, 303, 320, 434, 462

**Main variables:**

- <code>--background</code>
- <code>--color-motif-cream</code>
- <code>--color-welcome-bg</code>

**Where it appears:**

- Page canvas
- Paper backgrounds
- Light-on-dark text
- Overlays and glows

---

## Main Color 7: Pure White

<span style="display:inline-block;width:1.25em;height:1.25em;background:#FFFFFF;border:1px solid #888"></span>

**Color values:**

- <code>#FFFFFF</code>
- <code>white</code>
- <code>rgb(255 255 255 / ...)</code>

**Files and lines:**

- <code>components/proposal-page.tsx:125</code>
- <code>components/sections/see-you-there.tsx:194</code>
- <code>components/sections/snap-share.tsx:34-35, 45, 52, 54-55, 84, 87, 226, 228, 264, 297, 334</code>

**Where it appears:**

- Photo-overlay text
- True-white cards
- QR surfaces
- High-contrast content

**Opacity variations:** Approximately 20% to 95%.

---

## Main Color 8: Gift Paper Beige

<span style="display:inline-block;width:1.25em;height:1.25em;background:#F5EDDF;border:1px solid #888"></span>

**Color value:** <code>#F5EDDF</code>

**Open this file:** <code>content/site.ts</code>

**Important lines:** 1234 and 1236

**Used for:**

- Gift Guide letter card
- Gift account-card color mixtures

**Configuration property:** <code>sections.registry.colors.card</code>

---

## Main Color 9: Black

<span style="display:inline-block;width:1.25em;height:1.25em;background:#000000;border:1px solid #888"></span>

**Color value:** <code>#000</code>

**Open this file:** <code>components/loader/loading-screen.css</code>

**Important lines:** 4483-4484

**Usage:** Home Hero mask luminance.

**Important:** This black paints a mask. It is not intended as visible black content.

---

# Main Website Variable Groups

Use this section when you know which part of the design you want to change.

## Global canvas and basic UI

**File:** <code>app/globals.css</code>  
**Lines:** 67-76

Variables include:

- <code>--background</code>
- <code>--foreground</code>
- <code>--primary</code>
- <code>--secondary</code>
- <code>--card</code>
- <code>--accent</code>
- <code>--border</code>

**Warning:** These can affect both the public website and dashboard.

## Main motif colors

**File:** <code>app/globals.css</code>  
**Lines:** 172-202

Variables begin with:

~~~css
--color-motif-
~~~

They control the public section palette, decorations, frames, and color aliases.

## Public typography colors

**File:** <code>app/globals.css</code>  
**Lines:** 209-249

Variables begin with:

~~~css
--color-welcome-
~~~

They control headings, body text, script text, and public backgrounds.

## Couple-name colors

**File:** <code>app/globals.css</code>  
**Lines:** 273-278

Variables:

- <code>--couple-name-fill</code>
- <code>--couple-name-mid</code>
- <code>--couple-name-accent</code>
- <code>--couple-name-fill-soft</code>

## Circle-pattern colors

**File:** <code>app/globals.css</code>  
**Lines:** 285-313

Variables:

- <code>--color-bg-pattern-base</code>
- <code>--color-bg-circle-*</code>

These are derived mixtures and transparency effects.

## Countdown colors

**File:** <code>app/globals.css</code>  
**Lines:** 329-335

Variables:

- <code>--color-countdown-fade</code>
- <code>--color-countdown-text</code>
- <code>--color-countdown-label</code>

## Envelope fallback colors

**File:** <code>app/globals.css</code>  
**Lines:** 342-361

Variables begin with:

~~~css
--color-envelope-
~~~

**Warning:** Final local envelope rules at <code>components/loader/envelope-invite.css:3884-3947</code> can override these.

## Public button colors

**File:** <code>app/globals.css</code>  
**Lines:** 368-388

Variables:

- <code>--color-primary</code>
- <code>--color-primary-hover</code>
- <code>--color-romantic</code>
- <code>--color-romantic-hover</code>
- <code>--color-highlight</code>
- <code>--color-highlight-deep</code>
- <code>--color-deco</code>

## Invitation semantic colors

**File:** <code>app/globals.css</code>  
**Lines:** 395-437

Variables begin with:

~~~css
--invite-
~~~

They control:

- Ink
- Titles
- Scripts
- Body text
- Paper
- Lines
- Buttons
- Overlays
- Shadows
- Glows

## QR-code colors

**File:** <code>app/globals.css</code>  
**Lines:** 111-112

Variables:

~~~css
--color-qr-fg
--color-qr-bg
~~~

JavaScript fallbacks are at <code>hooks/use-css-color.ts:29-30</code>.

Use a dark foreground and light background.

---

# Main Website Local Overrides

These colors are stored inside specific components and may override the global variables.

## Silk background

**Value:** <code>#172C4C</code>  
**File:** <code>components/invitation-page.tsx:91</code>  
**Usage:** Animated Silk background

## Opening transition

**Value:** <code>#FAF6EE</code>  
**File:** <code>components/invitation-page.tsx:204</code>  
**Usage:** Full-screen transition overlay

## Final Loading Screen palette

**File:** <code>components/loader/loading-screen.css</code>  
**Lines:** 3952-3968

Values:

- <code>#F2F6FB</code>
- <code>#FAF6EE</code>
- <code>#172C4C</code>
- <code>#739ACD</code>
- <code>#9AADE0</code>

These <code>--ls-*</code> variables are the final plain-mode loader palette.

## Loading Screen gradients and shadows

**File:** <code>components/loader/loading-screen.css</code>  
**Lines:** 3974-4021

Includes:

- Ivory RGB at 45%, 55%, 90%, and 95% opacity
- Theme <code>color-mix(...)</code> expressions
- Card, border, progress, and glow colors

## Final Home Hero palette

**File:** <code>components/loader/loading-screen.css</code>  
**Lines:** 4037-4056

Important values:

~~~css
--hh-navy: #172C4C;
--hh-sky: #F2F6FB;
--hh-leaf: #9AADE0;
background: #FAF6EE;
~~~

## Home Hero readability effects

**File:** <code>components/loader/loading-screen.css</code>  
**Lines:** 4462-4548

Includes:

- Ivory halos from 35% to 100%
- Navy fades at 35%, 78%, and 92%
- Periwinkle borders
- Pastel Sky labels

## Final envelope palette

**File:** <code>components/loader/envelope-invite.css</code>  
**Lines:** 3884-3918

Important values:

~~~css
--env-plain-paper: #172C4C;
--env-butter: #9CC5E5;
~~~

It also contains encoded Navy and Periwinkle SVG colors.

## Envelope folds

**File:** <code>components/loader/envelope-invite.css</code>  
**Lines:** 3927-3947

Uses Navy RGB at:

- 28%
- 6%
- 55%

It also uses transparent gradient stops.

## Plain bubbles

**File:** <code>components/loader/plain-bubbles.css</code>  
**Lines:** 6-14 and 56-66

Uses Ivory RGB at:

- 38%
- 0%
- 42%

## Invitation particles

**File:** <code>components/loader/invite-particles.css</code>  
**Lines:** 5-8

Uses:

- <code>#FAF6EE</code>
- Motif accent
- <code>#9CC5E5</code>
- <code>#739ACD</code>

Default particle opacity is 25%.

## Plain atmosphere

**File:** <code>components/loader/plain-atmosphere.css</code>  
**Lines:** 39, 50, 61, 72, 83, 95-97, 109-110, 121-122

Contains five <code>color-mix(...)</code> blobs and translucent frost effects.

## Gift Guide colors

**File:** <code>content/site.ts</code>  
**Lines:** 1229-1240

This object controls:

- Text
- Card background
- Border
- Selected button
- Divider
- Glow
- Section background

## Snap & Share colors

**File:** <code>components/sections/snap-share.tsx</code>

**Important lines:** 34-57, 71, 84-87, 226-228, 264, 297, 334, 418, 485, 496

Contains:

- White alpha layers
- Navy shadows
- Theme-variable gradients
- Active and copied states

## Shared section-background helper

**File:** <code>lib/section-background.ts</code>  
**Lines:** 13-16, 30, 35

Contains four radial and linear gradient layers.

---

# Main Website Interaction States

## Hover colors

**Main source:** <code>app/globals.css:371-379</code>

The Primary button uses a Navy mixture. Romantic buttons mix Cornflower and Navy.

Components also use local <code>hover:</code> utilities, brightness changes, and background changes.

## Focus colors

**Main sources:**

- <code>app/globals.css:96</code>
- <code>app/globals.css:139</code>

Light theme uses Navy. Dark theme uses Pastel Sky.

Snap & Share uses Motif Accent for focus at its local source.

## Active colors

Most <code>active:</code> utilities change size or position rather than changing the base color.

## Disabled colors

Most disabled controls keep their original color but reduce the entire element opacity, commonly to 50%.

## Dark theme

**Definitions:** <code>app/globals.css:118-153</code>

The same six theme primitives are remapped. No source-confirmed runtime <code>.dark</code> toggle was found, so actual dark-mode activation needs verification.

---

# B. Dashboard Colors

The dashboard begins at <code>app/dashboard/page.tsx:445</code> with the <code>dashboard-root</code> class.

It does not introduce a new opaque base palette. It reuses the same six theme colors.

## Beginner rule

For dashboard-only changes, edit:

**File:** <code>app/globals.css</code>  
**Lines:** 469-529

Only change variables beginning with:

~~~css
--color-dash-
~~~

## Dashboard Primary

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Variable:** <code>--color-dash-primary</code>  
**Line:** 469  
**Value:** <code>var(--color-primary)</code> which resolves to <code>#172C4C</code>

**Used for:**

- Main buttons
- Active navigation
- Active icons

## Dashboard Primary Hover

**Variable:** <code>--color-dash-primary-hover</code>  
**Lines:** 470 and 371-372

**Expression:** Navy 85% mixed with Navy.

**Used for:** Button hover state.

## Dashboard Accent

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9AADE0;border:1px solid #888"></span>

**Variable:** <code>--color-dash-accent</code>  
**Line:** 473  
**Value:** <code>var(--color-section-accent)</code> which resolves to <code>#9AADE0</code>

**Used for:**

- Badges
- Icons
- Focus accents

## Dashboard Ink

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Variable:** <code>--color-dash-ink</code>  
**Line:** 476  
**Value:** <code>var(--color-text-dark)</code> which resolves to <code>#172C4C</code>

**Used for:** Headings and strong text.

## Dashboard Strong Ink

**Variable:** <code>--color-dash-ink-strong</code>  
**Lines:** 478-479

**Expression:** Dark text 80% mixed with Navy.

**Used for:** Strong copy, modal depth, and shadows.

## Dashboard Body Text

**Variable:** <code>--color-dash-text</code>  
**Lines:** 481-482

**Expression:** Dark text 80% mixed with Ivory.

## Dashboard Muted and Faint Text

**Variables:**

- <code>--color-dash-muted</code>, line 484
- <code>--color-dash-faint</code>, lines 486-487

**Used for:** Secondary text and small labels.

## Dashboard Lines

<span style="display:inline-block;width:1.25em;height:1.25em;background:#F2F6FB;border:1px solid #888"></span>

**Variable:** <code>--color-dash-line</code>  
**Line:** 490

**Used for:** Dividers and separators.

## Dashboard Focus

**Variable:** <code>--color-dash-focus</code>  
**Lines:** 492-493

**Expression:** Periwinkle 55% mixed with Ivory.

**Used for:** Input and control focus.

## Dashboard Border

**Variable:** <code>--color-dash-border</code>  
**Lines:** 495-496

**Expression:** Pale Blue 50% mixed with Ivory.

## Dashboard Tint

**Variable:** <code>--color-dash-tint</code>  
**Lines:** 499-500

**Expression:** Pale Blue 26% mixed with Ivory.

**Used for:** Badges, statistics, and hover backgrounds.

## Dashboard Surface

**Variable:** <code>--color-dash-surface</code>  
**Lines:** 502-503

**Expression:** Pale Blue 12% mixed with Ivory.

**Used for:** Inputs and nested cards.

## Dashboard Background

**Variables:**

- <code>--color-dash-bg</code>, lines 505-506
- <code>--color-dash-bg-deep</code>, line 508

Both use the Ivory family.

## Dashboard Badges

**Variables:**

- <code>--color-dash-badge-bg</code>, lines 511-512
- <code>--color-dash-badge-text</code>, lines 514-515

Used for sidebar counts.

## Dashboard Danger Colors

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Variables:**

- <code>--color-dash-danger</code>, line 518
- <code>--color-dash-danger-text</code>, line 520
- <code>--color-dash-danger-soft</code>, lines 522-523
- <code>--color-dash-danger-softer</code>, lines 525-526
- <code>--color-dash-danger-border</code>, lines 528-529

Used for delete confirmations and destructive actions.

---

# Dashboard Component Locations

Use this section when a dashboard element does not change after editing a variable.

## Dashboard shell, login, and top bar

**File:** <code>app/dashboard/page.tsx</code>

**Color-bearing lines:**

445, 447, 449-450, 453-474, 481, 489, 502, 516, 521, 527, 530-531, 540, 549, 562, 572, 604-605

**UI roles:**

- Gradient
- Login card
- Focus state
- Hover
- Notifications

## Dashboard Overview

**File:** <code>components/dashboard-overview.tsx</code>  
**Lines:** 114, 131-170, 179, 183, 186, 192-201, 210

**UI roles:** Statistics, cards, and status colors.

## Dashboard Sidebar

**File:** <code>components/dashboard-sidebar.tsx</code>  
**Lines:** 133-140, 147, 152-187, 199, 216-235, 250-293

**UI roles:** Mobile overlay, active navigation, badges, and hover.

## Entourage and Sponsors management

**File:** <code>components/entourage-sponsors.tsx</code>  
**Lines:** 73, 80-85, 166, 175-303, 564-873, 982-1089

**UI roles:** Forms, cards, buttons, and destructive dialogs.

## Guest Messages management

**File:** <code>components/guest-messages.tsx</code>  
**Lines:** 75-118, 173-260

## Guest Requests management

**File:** <code>components/guest-requests.tsx</code>  
**Lines:** 56-150, 290-495, 514-812

## Guest List management

**File:** <code>components/improved-guest-list.tsx</code>  
**Lines:** 18-23, 278-522, 540-1046

## Proposal Dashboard

**File:** <code>components/proposal-dashboard.tsx</code>  
**Lines:** 257-623

## Table Finder QR card

**File:** <code>components/table-finder-qr-card.tsx</code>  
**Lines:** 41-43, 152, 162, 180, 196, 261, 272, 295

## State examples

- Primary-button hover: <code>app/dashboard/page.tsx:489</code>
- Input focus ring: <code>app/dashboard/page.tsx:474</code>
- Destructive dialog: <code>components/entourage-sponsors.tsx:989, 994, 1029</code>
- Request mobile overlays: <code>components/guest-requests.tsx:124-132, 749-768</code>
- Guest-list mobile overlays: <code>components/improved-guest-list.tsx:898-906, 969-974</code>

Disabled controls keep their base color at reduced opacity.

---

# C. Colors Shared by Website and Dashboard

Changing these base colors can affect both interfaces.

## Shared Warm Ivory

<span style="display:inline-block;width:1.25em;height:1.25em;background:#FAF6EE;border:1px solid #888"></span>

**Value:** <code>#FAF6EE</code>

**Main website use:** Paper, background, glow, light text.

**Dashboard use:** Canvas, surfaces, button text.

**Key definitions:** <code>app/globals.css:67, 172, 209</code>

**Hardcoded duplicates:** Loader and envelope effects; <code>hooks/use-css-color.ts:30</code>.

## Shared Deep Navy

<span style="display:inline-block;width:1.25em;height:1.25em;background:#172C4C;border:1px solid #888"></span>

**Value:** <code>#172C4C</code>

**Main website use:** Ink, envelope, buttons, shadows.

**Dashboard use:** Buttons, headings, and danger actions.

**Key definitions:** <code>app/globals.css:68-69, 181, 368, 452, 455, 458, 518, 520</code>

**Hardcoded duplicates:** Loader, envelope, Silk, and <code>hooks/use-css-color.ts:29</code>.

## Shared Cornflower Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#739ACD;border:1px solid #888"></span>

**Value:** <code>#739ACD</code>

**Main website use:** Motif, flowers, attire.

**Dashboard use:** Status and shared accent text.

**Key definitions:** <code>app/globals.css:70, 74, 76, 180, 243</code>; <code>content/site.ts:168</code>.

## Shared Periwinkle

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9AADE0;border:1px solid #888"></span>

**Value:** <code>#9AADE0</code>

**Main website use:** Frames, labels, attire.

**Dashboard use:** Accent, focus, and borders.

**Key definitions:** <code>app/globals.css:72, 75, 182, 440, 449, 473</code>; <code>content/site.ts:167</code>.

## Shared Pastel Sky

<span style="display:inline-block;width:1.25em;height:1.25em;background:#9CC5E5;border:1px solid #888"></span>

**Value:** <code>#9CC5E5</code>

**Main website use:** Particles, light accent, attire.

**Dashboard use:** Shared status accent.

**Key definitions:** <code>app/globals.css:73, 173, 196</code>; <code>content/site.ts:169</code>.

## Shared Pale Blue

<span style="display:inline-block;width:1.25em;height:1.25em;background:#F2F6FB;border:1px solid #888"></span>

**Value:** <code>#F2F6FB</code>

**Main website use:** Paper, cards, and highlights.

**Dashboard use:** Card, line, tint, and surface source.

**Key definitions:** <code>app/globals.css:71, 174, 443, 446</code>.

## Transparent

<code>transparent</code> is shared by:

- Gradients
- Masks
- Borders
- Overlays
- Shadows

It is fully see-through and is not counted as an opaque color.

## CurrentColor

<code>currentColor</code> makes an icon inherit its text color.

Confirmed locations:

- <code>components/StaggeredMenu.tsx:508, 512</code>
- <code>components/sections/footer.tsx:102, 110, 118</code>
- <code>components/sections/messages.tsx:369-370</code>

---

# D. Complete Literal HEX Ledger

This section lists all **39 unique HEX values** found in the audited source.

## Active core and main-only values

### <code>#000</code>

**Location:** <code>components/loader/loading-screen.css:4483-4484</code>  
**Status:** Active  
**Purpose:** Hero mask

### <code>#172C4C</code>

**Status:** Active core theme color

**Core locations:** Documented in the Main Website and Shared Colors sections.

**Local envelope copies:**

<code>components/loader/envelope-invite.css:2684, 2756, 2862, 2924-2930, 2947, 2966-2967, 2982, 3008, 3012, 3016, 3091, 3156-3157, 3210, 3238, 3329-3344, 3445-3464, 3741, 3798, 3847, 3873, 3884, 3918, 3929</code>

**Local loader copies:**

<code>components/loader/loading-screen.css:700-708, 1225-1233, 3790-3791, 3955, 3957, 3963, 4037-4039, 4042, 4055-4056, 4118, 4149, 4186-4187, 4333, 4337, 4346, 4359, 4430, 4451, 4462, 4504-4505, 4530-4532</code>

**Other locations:** <code>components/invitation-page.tsx:91</code>; <code>content/site.ts:170</code>.

### <code>#739ACD</code>

**Status:** Active core theme color

**Other locations:**

- <code>app/layout.tsx:182, 195</code>
- <code>components/loader/envelope-invite.css:2934, 2936, 2983, 3016, 3322, 3331-3332, 3340-3341, 3345, 3391, 3396, 3400, 3404</code>
- <code>components/loader/loading-screen.css:3459, 3573, 3956, 4323, 4328</code>
- <code>components/loader/invite-particles.css:8</code>

### <code>#9AADE0</code>

**Status:** Active core theme color

**Other locations:**

- <code>components/loader/envelope-invite.css:2927, 2929, 2932, 2938, 2948, 2960, 2980, 2988, 2992, 3009, 3020, 3088, 3092, 3207, 3211, 3322, 3329, 3334, 3338, 3380, 3409, 3539</code>
- <code>components/loader/loading-screen.css:3958, 4041, 4104, 4117, 4119, 4342, 4358, 4516</code>
- <code>content/site.ts:167</code>

### <code>#9CC5E5</code>

**Status:** Active core theme color

**Other locations:**

- <code>components/loader/envelope-invite.css:3105, 3885, 3912</code>
- <code>components/loader/invite-particles.css:7</code>
- <code>components/loader/loading-screen.css:4463</code>
- <code>components/rising-hearts.tsx:11</code>
- <code>content/site.ts:169</code>

### <code>#F2F6FB</code>

**Status:** Active core theme color

**Other locations:**

- <code>components/loader/envelope-invite.css:2923, 2934, 2936-2937, 2979</code>
- <code>components/loader/loading-screen.css:3952, 4040, 4114, 4238-4239, 4323, 4328, 4351</code>

### <code>#F5EDDF</code>

**Location:** <code>content/site.ts:1234, 1236</code>  
**Status:** Active main website  
**Purpose:** Gift Guide paper

### <code>#FAF6EE</code>

**Status:** Active core theme color

**Other locations:**

- <code>app/gallery/layout.tsx:23</code>
- <code>components/loader/envelope-invite.css:7, 458, 517, 1697, 2311, 2502, 2510, 2517, 2835, 2891, 2900, 2931, 2933, 2935, 2952, 2979, 3007, 3056-3057, 3089, 3208, 3538, 3575, 3798, 3873</code>
- <code>components/loader/loading-screen.css:107, 151, 439, 452, 1787, 1983, 2215-2216, 2259, 2518, 2653, 2660, 2669, 2684, 2930, 3171, 3476, 3478, 3480, 3671, 3676, 3834, 3863, 3953-3954, 3976, 4044, 4115, 4129, 4243, 4269-4270, 4356, 4402-4403, 4539</code>
- <code>components/invitation-page.tsx:204</code>
- <code>content/site.ts:1233</code>
- <code>hooks/use-css-color.ts:30</code>

### <code>#FFFFFF</code>

**Status:** Active main-only

**Locations:**

- <code>components/proposal-page.tsx:125</code>
- <code>components/sections/see-you-there.tsx:194</code>
- <code>components/sections/snap-share.tsx:34, 45, 52, 84, 264, 297</code>

## Hidden attire colors

These definitions exist, but their attire groups are hidden because <code>ATTIRE.show</code> currently contains only <code>"guests"</code> at <code>content/site.ts:180</code>.

### <code>#14243F</code>

**Location:** <code>content/site.ts:190</code>  
**Purpose:** Entourage palette

### <code>#1E1E1E</code>

**Location:** <code>content/site.ts:219</code>  
**Purpose:** Family palette

### <code>#1E3051</code>

**Locations:** <code>content/site.ts:189, 250</code>  
**Purpose:** Entourage and sponsor palettes

### <code>#242124</code>

**Location:** <code>content/site.ts:249</code>  
**Purpose:** Sponsor palette

### <code>#4E86B7</code>

**Location:** <code>content/site.ts:217</code>  
**Purpose:** Family palette

### <code>#C98F9A</code>

**Location:** <code>content/site.ts:248</code>  
**Purpose:** Sponsor palette

### <code>#D49AA3</code>

**Locations:** <code>content/site.ts:188, 247</code>  
**Purpose:** Entourage and sponsor palettes

### <code>#DDA49D</code>

**Location:** <code>content/site.ts:187</code>  
**Purpose:** Entourage palette

### <code>#F6D35B</code>

**Location:** <code>content/site.ts:218</code>  
**Purpose:** Family palette

## Text-only motif values

These values appear in the motif description string at <code>content/site.ts:431</code>. No active component was found that parses this string into visible UI colors.

### <code>#4F6373</code>

**Status:** Text-only motif value

### <code>#ABAEB0</code>

**Status:** Text-only motif value

### <code>#D7A041</code>

**Status:** Text-only motif value

### <code>#F2D087</code>

**Status:** Text-only motif value

## Inactive legacy dress-code colors

The active Details section uses the attire object at <code>content/site.ts:686-699</code>, not this legacy root dress-code object.

### <code>#835643</code>

**Location:** <code>content/site.ts:1591</code>

### <code>#8C8686</code>

**Location:** <code>content/site.ts:1562</code>

### <code>#969090</code>

**Location:** <code>content/site.ts:1562</code>

### <code>#A9A9A9</code>

**Location:** <code>content/site.ts:1562</code>

### <code>#B4A3D4</code>

**Location:** <code>content/site.ts:1577</code>

### <code>#C0C0C0</code>

**Location:** <code>content/site.ts:1562</code>

### <code>#C48C73</code>

**Location:** <code>content/site.ts:1591</code>

### <code>#C8A2C8</code>

**Location:** <code>content/site.ts:1577</code>

### <code>#CBAFA1</code>

**Location:** <code>content/site.ts:1591</code>

### <code>#D0A386</code>

**Locations:** <code>content/site.ts:1568, 1583</code>

### <code>#D8D3CD</code>

**Location:** <code>content/site.ts:1562</code>

### <code>#E3C5B3</code>

**Locations:** <code>content/site.ts:1568, 1583</code>

### <code>#E3CAC5</code>

**Location:** <code>content/site.ts:1591</code>

### <code>#E4DCD1</code>

**Locations:** <code>content/site.ts:1568, 1583</code>

### <code>#F2E9E2</code>

**Location:** <code>content/site.ts:1591</code>

## Inactive legacy root colors

### <code>#101D3A</code>

**Location:** <code>content/site.ts:1623</code>  
**Status:** Inactive legacy root primary

### <code>#E8D36A</code>

**Location:** <code>content/site.ts:1624</code>  
**Status:** Inactive legacy root secondary

---

# E. Functional Colors, Gradients, Shadows, and Transparency

The exact source expressions in these files are authoritative.

## Global stylesheet

**File:** <code>app/globals.css</code>

**Color-effect lines:**

88, 121, 131, 137-138, 151, 213, 224, 286, 290, 293, 296, 300, 303, 306, 310, 313, 320, 346, 350, 354, 358, 361, 372, 379, 413, 417, 420, 428, 431, 434, 462, 479, 482, 487, 493, 496, 500, 503, 506, 512, 515, 523, 526, 529, 663, 773, 795, 797, 922, 932, 936, 940, 969-971, 983-985, 999-1007, 1017, 1021, 1033, 1110, 1117, 1120, 1122, 1125, 1352, 1356, 1371-1376, 1385, 1391-1392, 1432-1434, 1444-1445, 1532, 1549-1552, 1560, 1563-1564, 1571, 1583, 1614

## Envelope stylesheet

**File:** <code>components/loader/envelope-invite.css</code>

Color-bearing rules appear throughout:

- 7-323
- 395-517
- 633-1245
- 1347-1739
- 2027-3238
- 3329-3947

**Final effective plain-mode range:** 3329-3947

## Loading-screen stylesheet

**File:** <code>components/loader/loading-screen.css</code>

Color-bearing rules appear throughout:

- 26-742
- 931-1645
- 1709-3359
- 3459-4548

**Final effective loader and Hero range:** 3952-4548

## Plain atmosphere

**File:** <code>components/loader/plain-atmosphere.css</code>  
**Lines:** 39, 50, 61, 72, 83, 95-97, 109-110, 121-122

## Plain bubbles

**File:** <code>components/loader/plain-bubbles.css</code>  
**Lines:** 56-57

## Snap & Share

**File:** <code>components/sections/snap-share.tsx</code>  
**Lines:** 35, 38, 40, 43, 45, 50, 53-57, 67, 71, 84, 87, 171, 226, 228, 245, 256-257, 334, 418, 485, 496, 593, 605

## Proposal page

**File:** <code>components/proposal-page.tsx</code>  
**Lines:** 96, 103, 107, 113-124, 198, 200, 352-354, 419-420, 571, 584, 658, 662, 989, 994

## Table Finder

**File:** <code>components/table-finder.tsx</code>  
**Lines:** 48, 51-53, 57, 61, 65, 70, 75, 79, 85, 88, 239, 287, 289, 291, 294, 296-297, 507, 573, 606, 612, 637, 640, 867, 908-909, 942

## Details

**File:** <code>components/sections/details.tsx</code>  
**Lines:** 54, 61-62, 68, 72, 77, 92, 102, 190, 192, 226, 247-248, 317, 380, 387, 435, 454-455, 468, 574, 582, 611, 620-621, 729, 731, 1090

## RSVP / Guest List

**File:** <code>components/sections/guest-list.tsx</code>  
**Lines:** 58, 60, 62-68, 79, 81, 85, 89, 99, 104, 107, 112-113, 142, 732, 738, 798, 803, 872, 983, 996, 1180, 1211, 1246, 1280, 1283, 1285, 1343, 1435, 1566, 1665, 1672

## Book of Guests

**File:** <code>components/sections/book-of-guests.tsx</code>  
**Lines:** 41-42, 46, 55, 71-86, 124, 126, 360, 379, 542, 552, 616, 626, 704

## FAQ

**File:** <code>components/sections/faq.tsx</code>  
**Lines:** 40, 46, 55-58, 62, 96, 98, 149, 251, 308, 310, 327, 329, 334

## Footer

**File:** <code>components/sections/footer.tsx</code>  
**Lines:** 49, 51, 53, 57, 67, 75, 79, 91, 94, 330, 375, 377, 421, 456, 517, 519, 596

## Gallery

**File:** <code>components/sections/gallery.tsx</code>  
**Lines:** 55, 59, 62, 68-69, 73, 77, 281, 447, 464, 507, 531, 533, 558, 627-628

## Messages

**File:** <code>components/sections/messages.tsx</code>  
**Lines:** 49, 54, 56, 58, 62, 67-68, 71, 89, 92, 94, 111, 113, 121, 123, 234, 237, 259

## Message wall

**File:** <code>components/sections/message-wall-display.tsx</code>  
**Lines:** 22-23, 42-51, 165, 198, 213, 270, 282, 472, 489-502

## Registry

**File:** <code>components/sections/registry.tsx</code>  
**Lines:** 34, 38, 66, 68, 118, 120, 201, 236, 238, 261, 284, 314, 321, 331, 354, 378, 411, 431, 444, 484

## Wedding Playlist

**File:** <code>components/sections/wedding-playlist.tsx</code>  
**Lines:** 109, 111, 117, 123, 132, 135, 160, 162, 329, 371, 406, 415, 428, 435, 442

## Wedding Timeline

**File:** <code>components/sections/wedding-timeline.tsx</code>  
**Lines:** 47, 52, 54, 56-58, 61, 63, 67, 208, 352, 360-361, 373, 455, 460, 464, 493, 553, 563

## Dashboard effects

Confirmed locations:

- <code>app/dashboard/page.tsx:474, 516</code>
- <code>components/dashboard-sidebar.tsx:174</code>
- <code>components/entourage-sponsors.tsx:303, 989, 1029, 1059, 1089</code>
- <code>components/guest-requests.tsx:131, 401, 578, 591, 602, 659, 727-728, 768, 812</code>
- <code>components/improved-guest-list.tsx:676, 692, 703, 869, 906, 950, 974, 1016</code>
- <code>components/proposal-dashboard.tsx:607, 623</code>

## Configuration and helpers

- <code>content/site.ts:1233, 1235-1237, 1239</code>
- <code>lib/coastal-palette.ts:27, 30</code>
- <code>lib/section-background.ts:13-16, 30, 35</code>

---

# F. Inactive and Conditional Color Definitions

## Hidden attire groups

**Lines:** <code>content/site.ts:187-190, 217-219, 247-250</code>

**Reason:** <code>ATTIRE.show</code> contains only <code>"guests"</code> at line 180.

## Legacy motif string

**Line:** <code>content/site.ts:431</code>

**Reason:** It is plain text. No active component was found that converts it into UI colors.

## Legacy dress-code object

**Lines:** <code>content/site.ts:1562, 1568, 1577, 1583, 1591</code>

**Reason:** Active Details uses the attire object built at lines 686-699.

## Legacy root colors

**Lines:** <code>content/site.ts:1623-1624</code>

**Reason:** No active styling consumer was found.

## Legacy stylesheet

**File:** <code>styles/globals.css:7-77</code>

**Reason:** It is not imported. Root layout uses <code>app/globals.css</code>.

## Old Love Story stylesheet

**File:** <code>components/sections/love-story.css:4-223</code>

**Reason:** The current Love Story component does not import it.

## Older unused components

Confirmed unreachable from current route imports:

- <code>components/footer.tsx</code>
- <code>components/wedding-details.tsx</code>
- <code>components/sections/rsvp.tsx</code>
- <code>components/sections/narrative.tsx</code>
- <code>components/sections/principal-sponsors.tsx</code>
- <code>components/sections/guest-information.tsx</code>
- <code>components/sections/recommended-hotel.tsx</code>
- <code>components/sections/video-message*.tsx</code>
- <code>components/sections/accommodation.tsx</code>

Their colors mainly duplicate the theme.

## Dark theme

**Lines:** <code>app/globals.css:118-153</code>

The CSS exists, but no source-confirmed runtime <code>.dark</code> toggle was found.

## Photo display mode

**Line:** <code>content/site.ts:312</code>

Current value is <code>plain</code>. Photo-only color branches are conditional.

Remote content and runtime class changes cannot be fully proven by static source inspection. These cases are labeled conditional instead of assumed.

---

# G. How to Find and Change Any Color

## 1. Search for a color value

In PowerShell:

~~~powershell
rg -n "#172C4C|rgb\(23 44 76|rgba\(23, 44, 76" app components content lib styles
~~~

Search for variables:

~~~powershell
rg -n "var\(--color-|var\(--invite-|var\(--env-|var\(--ls-|var\(--hh-" app components content lib
~~~

## 2. Follow the variable to its real value

Example:

~~~text
text-dash-ink
  -> --color-dash-ink at app/globals.css:476
  -> --color-text-dark at app/globals.css:452
  -> #172C4C
~~~

## 3. Identify the website element

Read the source around the matching line.

Then open browser Developer Tools:

1. Right-click the website element.
2. Choose **Inspect**.
3. Open **Computed** styles.
4. Look for the final color, background, border, or shadow.

This is important for the loader and envelope because later CSS rules can override earlier rules.

Examples:

- <code>components/sections/snap-share.tsx:264</code> - white text over verse photos
- <code>components/loader/loading-screen.css:4530-4533</code> - Hero countdown fade
- <code>components/guest-requests.tsx:727-728</code> - dashboard destructive action

## 4. Change a CSS variable

Public heading example:

~~~css
--color-welcome-heading: #405D78;
~~~

Dashboard accent example:

~~~css
--color-dash-accent: #A7B9E8;
~~~

## 5. Change a hardcoded value safely

Search every occurrence before editing.

Example local Hero override:

~~~css
/* components/loader/loading-screen.css:4037 */
--hh-navy: #405D78;
~~~

Also search for the equivalent RGB base.

<code>#172C4C</code> equals RGB <code>23 44 76</code>. Replacing only the HEX value can leave Navy shadows and overlays unchanged.

## 6. Change only the public website

Prefer:

- <code>--color-welcome-*</code>
- <code>--color-motif-*</code>
- <code>--invite-*</code>
- <code>--ls-*</code>
- <code>--hh-*</code>
- <code>--env-*</code>

Avoid:

- Global shared semantic variables
- <code>--color-dash-*</code>

After editing, verify:

- <code>/</code>
- <code>/inviteone</code>
- <code>/invitetwo</code>
- <code>/inviteguest</code>
- <code>/gallery</code>
- <code>/table</code>
- Proposal pages
- <code>/dashboard</code> for accidental shared changes

## 7. Change only the dashboard

Edit <code>--color-dash-*</code> at <code>app/globals.css:469-529</code>.

Dashboard components mainly use:

- <code>bg-dash-*</code>
- <code>text-dash-*</code>
- <code>border-dash-*</code>
- <code>ring-dash-*</code>

Shared utilities such as <code>bg-card</code>, <code>text-background</code>, and <code>text-floral-leaves</code> still resolve through global colors. Avoid changing those global sources for a dashboard-only update.

## 8. Understand shared impact

Example:

~~~text
#9AADE0
  -> --accent
  -> --color-motif-medium
  -> --color-section-accent
       -> invitation borders, labels, frames, and shadows
       -> --color-dash-accent
       -> --color-dash-focus
  -> hardcoded loader and envelope copies
~~~

After changing a base color, search for the old value. Remaining matches may be:

- Local overrides
- Inactive definitions
- Deliberate exceptions

---

# H. Testing Checklist

- [ ] Test approximately 375 px mobile width.
- [ ] Test approximately 768 px tablet width.
- [ ] Test approximately 1440 px desktop width.
- [ ] Check loading screen, envelope, Hero, and every invitation section.
- [ ] Check Gallery, Table Finder, and proposal routes.
- [ ] Check dashboard login.
- [ ] Check desktop sidebar and mobile drawer.
- [ ] Check cards, tables, forms, and notifications.
- [ ] Check hover state.
- [ ] Check keyboard focus.
- [ ] Check active state.
- [ ] Check disabled state.
- [ ] Check loading, success, empty, and destructive states.
- [ ] Check text contrast over photos.
- [ ] Scan every QR code after changing its colors.
- [ ] Test reduced-motion mode.
- [ ] Search for the old color value again.

---

# I. Maintenance Rules

- Re-run literal and variable searches after adding components.
- Update this guide's line numbers after source edits.
- Keep public-only colors under public aliases.
- Keep dashboard-only colors under <code>--color-dash-*</code>.
- Record new RGB, RGBA, <code>color-mix</code>, gradient, shadow, and transparency expressions.
- Replace or edit raster image files when their embedded colors must change.
- Do not assume a legacy or hidden definition affects the live website.

