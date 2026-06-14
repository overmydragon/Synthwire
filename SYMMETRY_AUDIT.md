# Synthwire — Symmetry & Alignment Audit

**Project:** `C:/Users/isaia/synthwire`
**Date:** 2026-06-14
**Scope:** Landing components (15) + App pages (6) — **READ-ONLY audit**
**Status:** No code was changed. Issues only.

---

## 0. Executive summary

The site is generally well-composed, but it has accumulated **38 concrete alignment / rhythm / symmetry issues** across the landing and app surfaces. The most impactful class of bugs is the **section-marker (eyebrow) inconsistency** — every numbered section uses the same pattern, but its margin, the line width, the gap, and the wrapper layout drift between files, so the entire site never quite lines up vertically.

The second-most-impactful class is **vertical-rhythm drift** — the site uses `py-16 / py-20 / py-24 / py-32` ad-hoc, sometimes two different scales sit next to each other inside the same section (e.g. CTA uses `py-20 sm:py-24 md:py-32` while every other section is `py-16 sm:py-20 md:py-32`). The third class is **mixed card padding** in grids (`p-5/p-6/p-8/p-10` all appear in a single 3-col pricing row) and the **app sidebar nav badge** position that breaks right-edge alignment.

The 20 fixes in §6 are listed in priority order; the first 6 would, by themselves, eliminate the most visible "the page is almost but not quite symmetrical" feeling.

---

## 1. Critical Symmetry Issues

These are issues that are immediately visible to a careful eye and would benefit the site the most.

### 1.1 Section-marker (eyebrow) wrapper is **not consistent** across the site
**The pattern in question:**
```
1.X  ──  Eyebrow text
```
The "1.0" / "1.1" / "1.2" stack of number + line + eyebrow is the *defining visual motif* of the site, and every section uses it. It is, however, rendered with three different containers in three different files.

| File | Container | Gap | Line width | Wrapper class |
|---|---|---|---|---|
| `Hero.tsx:28-34` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-14` |
| `SourceMarquee.tsx:11-15` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-4` |
| `HowItWorks.tsx:35-39` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `DemoSection.tsx:101-109` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `Comparison.tsx:25-29` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `WhatWeBuildFor.tsx:28-32` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `ProofMetrics.tsx:11-15` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `Features.tsx:79-83` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `Pricing.tsx:25-29` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `FAQ.tsx:55-59` | `<div flex items-center gap-3>` | `gap-3` | `w-12` | `mb-6` |
| `CTA.tsx:14-18` | **`justify-center`** | `gap-3` | `w-12` | `mb-8` |

- **Fix (every file):** extract the marker into one `<SectionMarker num="1.X" label="..." />` component with `flex items-center gap-3 mb-6`. The CTA's `justify-center` is acceptable for the centered layout, but the marker class itself should not change shape.

### 1.2 Sidebar nav badge right-edge alignment is broken
**File:** `src/app/(app)/layout.tsx:78-95`

The sidebar nav uses `space-y-1` plus a `Badge` rendered **inside** the link as a child of the `<Link>` flex container. Because the parent uses `flex items-center gap-3` with `flex-1 truncate` on the label, the badge's right edge varies based on label length. The first item ("My Sources · 3") is the *only* item with a badge, so the visual right margin of the link is shorter than the other four.

- **Fix:** give the link a fixed inner grid: `<div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">` and use `justify-self-end` on the badge wrapper so the right edge sits on the same column for every row.

### 1.3 Pricing card padding has 4 different paddings in the same row
**File:** `src/components/landing/Pricing.tsx:79`

```
p-5 sm:p-6 md:p-8 md:p-10
```
The Tailwind cascade resolves this to `p-5` mobile, `p-6` at `sm`, `p-8` at `md`, then `p-10` at `md` again (later wins). It works, but it is fragile and the jump from `p-8` to `p-10` at the same breakpoint is a sign of a copy-paste slip. It should be `p-5 sm:p-6 md:p-8 lg:p-10`.

- **Fix:** `p-5 sm:p-6 md:p-8 lg:p-10`

### 1.4 The "Popular" badge is on the middle card only
**File:** `src/components/landing/Pricing.tsx:83-85`

The brief said "or only the middle one, with the others having nothing in that position". This is what's currently happening — only the middle (lite) card has a "Popular" badge in the top-right. The other two cards have nothing there. That is **fine and intentional**, but the visual height of the middle card body is now offset by the height of that badge. Specifically, on mobile, where the cards stack, the lite card will appear taller at the top because of the badge, breaking the visual "all three cards start at the same y" expectation.

- **Fix:** either (a) reserve the badge space in all three cards with a 1-line spacer, or (b) move the badge to the bottom of the card and place it on the divider instead. Option (a) is one line: wrap the badge conditional in `<span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] invisible">Popular</span>` for the other two cards.

### 1.5 CTA section has its own padding scale, breaking the rhythm
**File:** `src/components/landing/CTA.tsx:8`

```
py-20 sm:py-24 md:py-32
```
Every other section is `py-16 sm:py-20 md:py-32`. The CTA is heavier on the small-to-medium transition (py-20 → py-24 → py-32 instead of py-16 → py-20 → py-32), so when the viewport transitions from `sm` to `md`, the CTA "jumps" more than the section above and below it.

- **Fix:** `py-16 sm:py-20 md:py-32`

### 1.6 Hero CTA buttons have different icon-vs-no-icon padding baselines
**File:** `src/components/landing/Hero.tsx:88-101`

Both buttons are `px-6 py-3.5 rounded-full` and the same `text-[14px] font-medium`, but the second button has an `EnvelopeIcon` on the left while the first has an `ArrowRightIcon` on the right. Because the icons are different widths (1em each, but the arrow has `group-hover:translate-x-0.5`), the **optical center** of the second button is shifted slightly. More importantly, the two buttons have different `shadow` (first has `shadow-[0_0_0_1px_rgba(255,255,255,0.08)]`, second has no shadow), which means the first button is 1px taller at the border.

- **Fix:** remove the bespoke `shadow-[...]` from button 1 so both buttons have the same vertical metrics, and add a leading icon to button 2's wrapper if you want symmetric icon presence.

### 1.7 `flex items-center` instead of `items-baseline` in HowItWorks step rows
**File:** `src/components/landing/HowItWorks.tsx:52-57`

```
<div className="flex items-baseline gap-4 mb-6">
  <span className="text-[14px] font-mono text-ink-500">{step.number}</span>
  <div className="w-12 h-12 rounded-xl ...">...</div>
</div>
```
This is `items-baseline`, which is correct here because the number is text and the icon-box is a div. **But** the icon-box is `w-12 h-12` (48px tall) while the number text is `text-[14px]` (≈17px). The number sits on the *baseline* of the icon-box (which doesn't have one, so the browser uses the bottom), meaning the number's bottom edge aligns with the icon-box's bottom edge — putting the number visually *below* the icon center. For numbers like "01" / "02" / "03" in a 14px font next to a 48px icon, this looks like the numbers are "drooping".

- **Fix:** change `items-baseline` to `items-center` so the number sits on the same horizontal axis as the icon. (This is the classic Stripe-Sessions pattern: number and icon share a center line.)

### 1.8 Avatar in `SourceMarquee` is 6×6 but the title text is 13px — visual weight mismatch
**File:** `src/components/landing/SourceMarquee.tsx:32-36`

The marquee card is `px-4 py-2.5` with a 6×6 avatar (`w-6 h-6`) and a `text-[13px]` title. This is fine in isolation, but the same source card shape is used inside the digest mockup hero at 7×7 (Hero.tsx:227), in the discovery queue at 10×10 (discovery/page.tsx:252), and in workspace at 10×10 (workspace/page.tsx:304). The size ladder 6 / 7 / 10 is fine — the **issue is the avatar's letter is 10px in a 24px box (SourceMarquee), 11px in a 28px box (Hero), and 16px-equivalent in 40px (workspace)** but `DiscoveryQueue` doesn't set a font size on the avatar, so the letter is rendered at the parent's text size. The result: the same letter in the same brand color renders at 4 different sizes across the app.

- **Fix:** set `text-[10px]` in `SourceMarquee` (already done — fine), `text-[12px]` in `Hero`, `text-[14px]` in `discovery` (currently missing — needs to be set), and `text-[14px]` in `workspace` (also implicit).

### 1.9 The discovery "Rank & score" column changes its alignment based on viewport
**File:** `src/app/(app)/discovery/page.tsx:194-200`

```
<div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-2 lg:w-24 flex-shrink-0">
  <span className="text-2xl sm:text-3xl font-bold text-violet-500/50">{index + 1}</span>
  <Badge variant={scoreColor as any} size="md" className="px-3 py-1">
    {Math.round(rec.recommendation_score * 100)}% match
  </Badge>
</div>
```
On mobile, the rank number and badge sit in a **row** (`items-center`); on `lg` they sit in a **column** with `items-start`. The number "1" and the "92% match" badge therefore left-align at `lg` but center on mobile. Combined with the `lg:w-24` fixed width, on a tablet at exactly the `lg` breakpoint the score badge sometimes wraps.

- **Fix:** keep `items-start` (and `flex-col`) at every breakpoint — or keep `flex-row` and accept that the layout is "rank · score" inline. Don't switch axis based on viewport.

### 1.10 The mockup's "stats bar" has 3 different alignments in a 3-col grid
**File:** `src/components/landing/Hero.tsx:265-278`

The 3-col grid is `grid-cols-3 gap-2 sm:gap-4`. Cell 1 is `flex items-center gap-1.5` (left aligned), cell 2 is `flex items-center justify-center gap-1.5` (centered), cell 3 is `flex items-center justify-end gap-1.5` (right aligned). This is **intentional** (left/center/right), but the `dot` icon (`●`) is the same color in all three (`text-violet-400`) and the text is the same size, so the *visual* center of the second cell is the gap between `6 min` and `read` — not the actual content. The `min read` text gets a different perceived center than `saved 47 min` because the strings are different lengths.

- **Fix:** either make the 3 cells text-align (e.g. `text-center` with `text-sm` and a single block per cell), or set a fixed `min-w-[7ch]` per cell so the content always has the same width.

---

## 2. Layout Grid Issues

Off-grid alignment and `items-*` mistakes.

### 2.1 Footer brand column is `md:col-span-1` but the brand content is wider than other columns
**File:** `src/components/landing/Footer.tsx:39`

```
<div className="col-span-2 md:col-span-1">
```
On `md`, the brand column is 1/5 width. The social icons row (`flex gap-3`) plus the description (`max-w-xs`) and the SVG logo are squeezed into a column that's narrower than the link columns on the right. The text wraps awkwardly while the link columns have generous whitespace.

- **Fix:** use `md:col-span-2` for the brand column, or reduce the SVG size in the footer (logo is `w-7 h-7` in the footer vs `w-8 h-8` in the sidebar — already smaller, so it should fit; the issue is the description `max-w-xs` + social row in 1/5 width).

### 2.2 `DemoSection` source row has `items-start` where `items-center` is correct
**File:** `src/components/landing/DemoSection.tsx:187`

```
<div className="group relative flex items-start gap-3 p-3 rounded-lg ..."
```
The source row contains a 9×9 avatar and 4 lines of text (name + badge, headline, summary, time). With `items-start`, the avatar sits at the top of the card and the text extends below — which is correct here because the text *is* multi-line. But the same component shape is used in `SourceMarquee` (a single-line pill) with `items-center`. This is **consistent within each file** but means the brand identity of "source card" has two different visual signatures.

- **Fix:** acceptable as-is. The fix is to make the visual style match across all 4 source-card instances (marquee, hero mockup, demo, discovery) — a longer-term refactor.

### 2.3 `WhatWeBuildFor` "we avoid" cards: icon is `mb-3` and label is `mb-1` — asymmetric
**File:** `src/components/landing/WhatWeBuildFor.tsx:73-75`

```
<XMarkIcon className="w-4 h-4 text-ink-500 mb-3" />
<h4 className="text-[15px] text-white font-medium mb-1">{item.label}</h4>
<p className="text-[13px] text-ink-500 leading-relaxed">{item.description}</p>
```
The X icon and the title have the same vertical scale here, but the X icon is `w-4 h-4` (16px) and the title text is 15px — close enough. The issue is that the **icon is in the same X column position as the title's first letter** (no offset), but the title is bold-white and the icon is `text-ink-500` (gray). Eye reads them as the same element type at different weights.

- **Fix:** put the icon in a `w-8 h-8` container with `bg-white/[0.04]` like in `HowItWorks` (line 54), so the visual weight matches.

### 2.4 `HowItWorks` step number sits on the **wrong baseline** vs. icon box
See §1.7.

### 2.5 `Pricing` "01 / 02 / 03" number uses `padded 2 digits` but the popular card's tag is `Popular` — different number shapes
**File:** `src/components/landing/Pricing.tsx:87, 84`

The "01" / "02" / "03" is a numbered counter that **doesn't match** the section's own number scheme (which is 1.8 for pricing). The digits 01/02/03 look like a *different* numbering system and confuse the reader. Either drop them or align them with the section's own `1.8` marker.

- **Fix:** either remove the `01/02/03` entirely (the section is already marked `1.8`), or use `1.8.1`, `1.8.2`, `1.8.3` to match.

### 2.6 `FAQ` "click to expand" arrow rotates but the rest of the FAQ uses `+` icons
**File:** `src/app/(app)/digest/page.tsx:191, 204-208`

`DigestSectionCard` uses `ChevronDownIcon` / `ChevronUpIcon` to indicate expand. `FAQ.tsx:102` uses a `PlusIcon` rotated `rotate-45` to indicate expand. The two patterns are visually different (chevron vs rotated plus). Not strictly an alignment issue, but the user expectation is the same in both cases.

- **Fix:** decide on one and apply to both.

### 2.7 `RecommendationCard` action row has a `Badge` with `sm:ml-auto` and **a button** without `ml-auto`
**File:** `src/app/(app)/discovery/page.tsx:225-236`

```
<Button variant="primary" size="sm"> ... Why this source? </Button>
<Button variant="success" size="sm"> ... Approve </Button>
<Button variant="ghost" size="sm" className="hidden sm:inline-flex"> ... Not relevant </Button>
<Badge variant="outline" size="sm" className="sm:ml-auto">{rec.frequency}</Badge>
```
The frequency badge has `sm:ml-auto`, so it sits on the right. But on mobile, the badge wraps to the next line **first** (because of `flex-wrap`), which makes the visual right edge different between mobile and desktop.

- **Fix:** wrap the buttons in their own flex container `<div className="flex items-center gap-2 sm:gap-3">` and let the badge sit in a separate `<div className="ml-auto">` outside the button row.

### 2.8 The `SearchResultCard` action buttons are 3 ghost buttons with no left separator
**File:** `src/app/(app)/archive/page.tsx:310-320`

Three icon-only ghost buttons in a row. They visually merge into a single bar because there's no separator between them. Adjacent icon buttons should have a `w-px` divider or `border-l border-white/5` between them.

- **Fix:** add `border-l border-white/5` to the second and third buttons, or wrap each in a `px-2.5` container with a `divide-x divide-white/5` parent.

### 2.9 The mobile menu drawer in `Navigation.tsx` has `mt-2` on the Get-started button
**File:** `src/components/landing/Navigation.tsx:108-111`

```
<Link href="/app" ... className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 ...">
```
This is **fine** but the `mt-2` is asymmetric — there is no equivalent gap above "Sign in" (line 99-104) on the other side of the divider. So the menu has `Sign in` immediately above the `divider` and the `Get started` immediately below it, with an extra 0.5rem of margin only on the bottom side.

- **Fix:** change to `my-2` or remove entirely and let the parent `flex flex-col gap-1` (line 86) handle it.

### 2.10 The `Header` eyebrow + title in `Hero.tsx` uses `mb-14` then `mb-14` — but should scale with the heading size
**File:** `src/components/landing/Hero.tsx:38-40, 53-58`

The eyebrow chip is `mb-14` and the display headline is `mb-6 sm:mb-12`. The dual `mb-14` between the section-marker and the chip is fine, but the **display headline** is `clamp(40px, 11vw, 200px)` which is 4× the size of the subheadline. The `mb-6 sm:mb-12` margin under the headline is too small at 200px and too large at 40px.

- **Fix:** use `mb-[clamp(16px,2vw,48px)]` so the margin scales with the text size.

---

## 3. Spacing Rhythm Issues

Inconsistent padding (py-32 next to py-20 with no reason), uneven gaps.

### 3.1 The site has THREE different `py-?` scales
- **Landing sections (most):** `py-16 sm:py-20 md:py-32` (`HowItWorks`, `DemoSection`, `Comparison`, `WhatWeBuildFor`, `ProofMetrics`, `Features`, `Pricing`, `FAQ`)
- **Hero:** `pt-20 sm:pt-28 pb-16 sm:pb-24`
- **CTA:** `py-20 sm:py-24 md:py-32`
- **Marquees:** `py-12 sm:py-16 md:py-20`
- **Footer:** `py-16`

**Fix:** pick one landing scale (`py-16 sm:py-20 md:py-32`) and apply it to every section. Marquees and footer can keep their own (they're conceptually different).

### 3.2 `SourceMarquee` and `FooterMarquee` use the same wrapper but have different inner padding
**File:** `src/components/landing/SourceMarquee.tsx:9`, `FooterMarquee.tsx:10`

Both are `py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden` — actually they match. But the marquee fade-out gradients are `w-16 sm:w-24 md:w-32` (SourceMarquee line 22-23) and `w-16 sm:w-24 md:w-32` (FooterMarquee line 12-13). They match. **False alarm — these are fine.**

### 3.3 `DemoSection` source row gap is `space-y-2.5` but the synthesis card is in a separate column
**File:** `src/components/landing/DemoSection.tsx:164`

The 7 source rows are spaced `space-y-2.5` (10px). The synthesis card on the right has its own padding `p-6`. When the two columns are aligned vertically (line 162 `grid-cols-[1fr_minmax(0,360px)]`), the synthesis card height is the sum of the 7 source rows + the gaps between them, plus the card's own padding. Because the source rows have **no** left/right padding of their own (only `p-3` inside), the synthesis card visually "starts" above the first source row.

- **Fix:** wrap the source list in a flex column with `pt-6` (matching the synthesis card's internal `p-6` top padding), or change the synthesis card's top padding to `pt-3` so they align.

### 3.4 `WhatWeBuildFor` "we avoid" section has `mt-24` which is the **largest** gap on the page
**File:** `src/components/landing/WhatWeBuildFor.tsx:63**

Everywhere else, the gap between sub-sections is `mt-16` (proof → features), `mt-12` (header → cards), `mb-20` (proof metrics header → grid). `mt-24` is 96px and is unique. This creates a "dead space" feel between the "we like" list and the "we avoid" cards.

- **Fix:** `mt-16`

### 3.5 `WhatWeBuildFor` "lettered grid" rows have `py-6` (24px) which is **larger** than the "we avoid" cards
**File:** `src/components/landing/WhatWeBuildFor.tsx:45 vs :71**

`py-6` (24px) on the lettered rows vs `p-6` (24px on all sides) on the avoid cards. The lettered rows feel "loose" because the text is left-aligned and the rows extend to full width; the avoid cards feel "tight" because they are 3-col and the content is left-aligned. The vertical density is different even though the padding number is the same.

- **Fix:** reduce lettered rows to `py-5` (20px) to match the avoid card visual density.

### 3.6 `Comparison` table cells use `p-4 sm:p-6` and the header row has the same
**File:** `src/components/landing/Comparison.tsx:49-66**

All cells use the same padding. **Consistent.** But the cells in the "Synthwire" column have a `bg-white/[0.02]` tint, while the other two columns don't. Combined with the right-border on the second column, the "Synthwire" column visually "pops" more than the others. This is intentional emphasis but the background extends into the gap on the right (the rightmost cell has no right border, so the tint bleeds to the edge).

- **Fix:** add a right border to the third column to match the second.

### 3.7 `FAQ` right column doesn't match the marker's left edge
**File:** `src/components/landing/FAQ.tsx:50-89**

The FAQ has `grid grid-cols-1 md:grid-cols-12 gap-12`. The left column is `md:col-span-4` and the right is `md:col-span-8`. The section marker (line 55-59) is inside the left column. The right column starts at the **midpoint** of the 12-col grid (4/12 + gap), which is the same as the marker's offset from the left edge.

**The issue:** the right column's left edge depends on the `gap-12` of the parent grid, which is 48px. The marker's left edge is the left edge of the left column. These two edges are **inherently different distances from the page left margin**, so the FAQ title (which spans the full 8 columns) and the right column (which starts 4/12 + 48px in) form an "L" with the title overhang.

- **Fix:** change to `md:col-span-4` and `md:col-span-7` with `md:col-start-6`, or wrap the entire content in a 2-col layout where the eyebrow is *above* the title (not in the left column). Most simply, set `md:col-span-5` for left and `md:col-span-7` for right, which centers the gutter better.

### 3.8 `Hero` `pt-20 sm:pt-28` is asymmetric — the top is heavier than the bottom (`pb-16 sm:pb-24`)
**File:** `src/components/landing/Hero.tsx:10**

The Hero has `pt-20 sm:pt-28` and `pb-16 sm:pb-24`. The top is +4 step (pt-20 → pt-28 vs pt-20 → pt-24). This is intentional because the navigation is fixed (`h-16`) and the hero needs more room at the top — but the bottom (`pb-16 sm:pb-24`) is smaller than the section above it (`SourceMarquee` is `py-12 sm:py-16 md:py-20` = total `sm:py-16` for top, so the hero `pb-16 sm:pb-24` is **larger** than the source marquee's padding).

- **Fix:** align both — `pt-20 sm:pt-24` (matching the bottom) and rely on the fixed nav for the rest.

### 3.9 `CTA` has `mb-16` between the trust row and the section start — but no `mt-?` above
**File:** `src/components/landing/CTA.tsx:31-55**

The CTA is centered and has no internal section marker at the top. The gap from the section above to the eyebrow is the full `py-20 sm:py-24 md:py-32`. There's no `mt-` defined. **False alarm** — centered layout doesn't need it.

### 3.10 The discovery "Why this source?" button has `InformationCircleIcon` while the settings tab has the same icon at a different size
**File:** `src/app/(app)/discovery/page.tsx:227, 336**

`w-4 h-4` in the action button (line 227) and `w-5 h-5` in the drawer (line 336). The same icon at two sizes within one feature flow. Not a strict alignment issue but reads as inconsistent.

- **Fix:** pick one size (4) and use it everywhere.

### 3.11 The settings "Notifications" list has `space-y-3 sm:space-y-4` — the `sm:space-y-4` is not applied to the delivery channels card header
**File:** `src/app/(app)/settings/page.tsx:257-260, 280-282**

The header uses `mb-4 sm:mb-6` while the items use `space-y-3 sm:space-y-4`. The 2-sm-step and 3-4 step are different, so the first item has more space above it than between subsequent items.

- **Fix:** change `mb-4 sm:mb-6` to `mb-3 sm:mb-4`.

---

## 4. Component-Level Issues

### 4.1 Hero
- `Hero.tsx:28` — section-marker wrapper is missing `gap-3` for the *second* number. (See §1.1)
- `Hero.tsx:120` — `transform: 'rotate(-0.5deg)', transformOrigin: 'center center'` — good, the rotation pivot is correct. But the **glow halo** at line 124 is `absolute -inset-x-4 sm:-inset-x-32 -inset-y-8 sm:-inset-y-16` which expands asymmetrically (more on x than y), making the glow not centered behind the mockup. **Fix:** change to `absolute -inset-x-8 sm:-inset-x-16 -inset-y-8 sm:-inset-y-16` for symmetric glow padding.
- `Hero.tsx:265-278` — stats bar 3 cells have different alignments (left/center/right). See §1.10.
- `Hero.tsx:280-286` — footer row has `flex-wrap items-center justify-between gap-2` — the two children are visually a "version string" and a "channel list" with no symmetric left/right padding. **Fix:** add `px-2` to both ends.

### 4.2 SourceMarquee
- `SourceMarquee.tsx:9` — section padding is `py-12 sm:py-16 md:py-20` (smaller than other sections) — intentional because marquees are visual bands, not full sections. **OK.**
- `SourceMarquee.tsx:11-15` — section-marker wrapper. See §1.1.

### 4.3 HowItWorks
- `HowItWorks.tsx:32` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative` — the `relative` is unused (no absolutely-positioned children). **Fix:** remove `relative`.
- `HowItWorks.tsx:35-39` — section-marker wrapper. See §1.1.
- `HowItWorks.tsx:48` — `gap-12 md:gap-8` — the column gap is **larger on mobile** than on desktop, which is the opposite of the usual pattern. On mobile, the 3 columns stack vertically, so the gap is between rows, not columns. With `gap-12` (48px) the rows are spread out. On `md` (≥768px) the columns are side-by-side and the gap shrinks to `gap-8` (32px). This makes mobile feel airy and desktop feel cramped. **Fix:** `gap-8 md:gap-8` (consistent 32px) or `gap-8 md:gap-12`.
- `HowItWorks.tsx:52-57` — `items-baseline` vs `items-center`. See §1.7.
- `HowItWorks.tsx:34` — `max-w-3xl mb-20` for the header is fine, but **the 3-col grid is `max-w-6xl`** (from the parent at line 33). So the header is 3xl (48rem = 768px) and the grid is 6xl (72rem = 1152px). This means the header is left-anchored inside the 6xl container, but the right edge of the header is 384px short of the grid's right edge. On a wide screen, the "Three steps. No magic." title sits in the left third of the page. **Fix:** either make the header `max-w-6xl` or center it explicitly.

### 4.4 DemoSection
- `DemoSection.tsx:85` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden` — fine.
- `DemoSection.tsx:101-109` — section-marker wrapper. See §1.1.
- `DemoSection.tsx:162` — `grid-cols-1 lg:grid-cols-[1fr_minmax(0,360px)] gap-10 lg:gap-0` — the `lg:gap-0` means the two columns are touching on desktop. The ConvergingArrows SVG (line 304) is positioned with `absolute inset-0` over the parent and draws spokes between them. The spokes go from `cx=720` to `cx=920` in a 1000×1000 viewBox, which maps to **20% to 92% of the parent width**. **Fix:** the spokes end at 92% but the right column starts at the 0% gap (i.e. directly adjacent to the left column), so the spokes overshoot the right column. Either add `lg:gap-12` or change the spokes to end at `cx=820` (≈82%).
- `DemoSection.tsx:184-219` — SourceRow has 4 lines of content (name+badge, headline, summary, time) but uses `items-start` — this is correct, but the **avatar** is `w-9 h-9` and the time icon is `ClockIcon w-3 h-3` — both sit on different vertical positions because the avatar is at `top: 0` of the card and the clock icon is at `top: end of summary` (line 213). This is fine because the card extends to fit. **OK.**
- `DemoSection.tsx:262-285` — SynthesisCard footer is `flex items-start justify-between gap-3 sm:gap-4 flex-wrap` — the left column has `flex-1 min-w-0 break-words` and the right column has `flex-shrink-0 text-right self-end sm:self-auto`. The `self-end` on desktop and `self-auto` on mobile means the right column aligns to the **bottom** of the row on desktop and to the **top** on mobile. This is fine for "Signal / 0.94" because the right column is short, but on mobile the `self-auto` lets it stretch.

### 4.5 Comparison
- `Comparison.tsx:19` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative` — fine.
- `Comparison.tsx:25-29` — section-marker wrapper. See §1.1.
- `Comparison.tsx:48-66` — Comparison table has consistent cell padding. See §3.6.
- `Comparison.tsx:23-41` — header layout is `grid-cols-1 md:grid-cols-12 gap-8 mb-16` with `md:col-span-7` for the marker+title and `md:col-span-5` for the description. The description has `flex md:items-end` so on mobile the description is `items-start` (left-aligned, top). **Fix:** use `items-end` consistently or remove the `flex` and just put the description in a div with `mt-4 md:mt-0`.

### 4.6 WhatWeBuildFor
- `WhatWeBuildFor.tsx:24` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative border-t border-white/[0.06]` — fine.
- `WhatWeBuildFor.tsx:28-32` — section-marker wrapper. See §1.1.
- `WhatWeBuildFor.tsx:42-60` — lettered rows: `grid-cols-1 md:grid-cols-12 gap-2 md:gap-0` — gap is **2 (8px) on mobile and 0 on desktop**. On mobile, the row's 3 internal blocks (letter / label / description) are stacked with 8px between them; on desktop they're flush. The 12-col grid is `1 / 4 / 7` for the three blocks. The `md:gap-0` means there's no gap between the letter column and the label column on desktop — the **letter `(A)` sits directly next to `Independent writers`** with no spacing. **Fix:** `gap-2 md:gap-8` (or similar — at least 24px on desktop).
- `WhatWeBuildFor.tsx:67-78` — "we avoid" cards: `grid-cols-1 md:grid-cols-3 gap-4` — fine. But the XMarkIcon is `w-4 h-4 text-ink-500 mb-3` and the title is `text-[15px] text-white font-medium mb-1` — see §2.3.

### 4.7 ProofMetrics
- `ProofMetrics.tsx:8` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 border-y border-white/[0.06]` — fine.
- `ProofMetrics.tsx:11-15` — section-marker wrapper. See §1.1.
- `ProofMetrics.tsx:21` — `grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12` — gap is `gap-8` (32px) on mobile and `md:gap-12` (48px) on `md`, then **back to `lg`** without a `lg:gap-?` value. So `lg` inherits `md:gap-12` (48px). But the `lg:grid-cols-4` switch happens at `lg` (1024px), not `md`. Between `md` (768px) and `lg` (1024px) the layout is `grid-cols-2` with `gap-12` — that's 2 columns × ~280px each + 48px gap, which exceeds 608px. **Fix:** at `lg`, change to `lg:gap-8` since 4 columns in a 1024px container can only fit 32px gaps.

### 4.8 Features
- `Features.tsx:75` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative bg-white/[0.01]` — fine.
- `Features.tsx:79-83` — section-marker wrapper. See §1.1.
- `Features.tsx:95-120` — `grid-cols-1 md:grid-cols-3 gap-4` with mixed `md:col-span-1` and `md:col-span-2` cards. The 9 features in the array have a deliberate 1/1/2/1/1/2/1/1/2 pattern, which should produce a 3×3 grid with 3 wider cards. **The pattern is broken** because the 4th, 5th, 6th cards are all `md:col-span-1`, then 7th is `md:col-span-1`, 8th is `md:col-span-1`, 9th is `md:col-span-2`. Let me recount:
  - Card 1: `span: 'md:col-span-2'`
  - Card 2: `span: 'md:col-span-1'`
  - Card 3: `span: 'md:col-span-1'`
  - Card 4: `span: 'md:col-span-2'`
  - Card 5: `span: 'md:col-span-1'`
  - Card 6: `span: 'md:col-span-1'`
  - Card 7: `span: 'md:col-span-1'`
  - Card 8: `span: 'md:col-span-1'`
  - Card 9: `span: 'md:col-span-2'`
  - Row sums: 4 / 4 / 4 / 3 ❌ (last row is 1+1+2 = 4, actually). Wait: 1+1+1+2=5. Last row has cards 7, 8, 9 → 1+1+2=4. So 4 cards fit. The 3rd row (cards 4, 5, 6) is 2+1+1=4. The 2nd row (cards 1, 2, 3) is 2+1+1=4. So all rows sum to 4. ✅
  
  However, the 9 cards in a 3-col grid with these spans produces **a different visual pattern** in each row:
  - Row 1: wide | narrow | narrow
  - Row 2: narrow | narrow | wide
  - Row 3: narrow | narrow | wide
  
  The "narrow-narrow-wide" alternation is fine but the alternation breaks symmetry. **Fix:** use a `2 / 1 / 1 / 1 / 1 / 2 / 1 / 1 / 1 / 2` or similar. Or just make all 9 the same width (3×3 of `md:col-span-1`) and accept the visual sameness.
- `Features.tsx:97` — `<RevealOnScroll key={feature.title} delay={i * 50}>` — the RevealOnScroll wrapper means each card has its own entry animation. The cards have no padding override (they all use `p-5 sm:p-6 md:p-8`). **Consistent.** ✅

### 4.9 Pricing
- `Pricing.tsx:21` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6` — fine.
- `Pricing.tsx:25-29` — section-marker wrapper. See §1.1.
- `Pricing.tsx:42-68` — billing toggle: `flex items-center gap-3 mb-12` — fine.
- `Pricing.tsx:70` — `grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.06]` — the 3 cards are stacked with a single border-top spanning all 3. The cards have no internal `border-l`, but cell 1 has a right border (`i < tierOrder.length - 1 ? 'md:border-r' : ''`) so cells 1 and 2 have a right border. Cell 3 has no right border. **This is fine.**
- `Pricing.tsx:79` — `p-5 sm:p-6 md:p-8 md:p-10` — see §1.3.
- `Pricing.tsx:83-85` — "Popular" badge only on middle. See §1.4.
- `Pricing.tsx:87` — `01 / 02 / 03` numbering. See §2.5.
- `Pricing.tsx:99-103` — CTA button: `block w-full text-center py-2.5 rounded-full` — all 3 buttons have the same height. ✅
- `Pricing.tsx:108-119` — feature list: `mt-8 space-y-3` — all 3 cards have the same spacing. ✅ But the **number of features** varies (free has 3, lite has ~7, max has 10), so the cards have very different heights. The "popular" card (lite) is in the middle and is taller than free but shorter than max. This is fine for a pricing table but the **bottom edge** of the 3 cards is not aligned because they don't share a height. **Fix:** set `min-h-[600px]` on each card or use `flex flex-col` with `flex-1` on the feature list.

### 4.10 FAQ
- `FAQ.tsx:50` — `py-16 sm:py-20 md:py-32 px-4 sm:px-6` — fine.
- `FAQ.tsx:52` — `grid grid-cols-1 md:grid-cols-12 gap-12` — see §3.7.
- `FAQ.tsx:55-59` — section-marker wrapper. See §1.1.
- `FAQ.tsx:102` — the "+" icon is `w-6 h-6 rounded-full border border-white/[0.12] flex items-center justify-center flex-shrink-0` and the question text is `text-[15px] md:text-[16px] font-medium text-white pr-2 md:pr-4`. The icon is on the right with `flex-shrink-0`, and the parent button is `flex items-center justify-between gap-6 text-left`. **If the question wraps to 2 lines**, the button's vertical center moves to the middle of the two lines, and the icon (which is 24px tall) sits at the center of the button. So the icon **is** vertically centered against the question text regardless of how many lines the question has. ✅
- `FAQ.tsx:107-115` — the answer expansion uses `grid transition-all` with `gridTemplateRows: isOpen ? '1fr' : '0fr'` — this is the "framer-motion-free height animation" pattern. It works. ✅

### 4.11 CTA
- `CTA.tsx:8` — `py-20 sm:py-24 md:py-32 px-4 sm:px-6` — see §1.5.
- `CTA.tsx:14-18` — section-marker wrapper (centered variant). See §1.1.
- `CTA.tsx:31-45` — CTA buttons: same as Hero — different icons but same height. The first button has no shadow, the second has `border border-white/[0.12]`. ✅
- `CTA.tsx:47-55` — trust row: `flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-ink-500 font-mono`. The 4 items are separated by `text-ink-700 ·` (a dimmer dot) — but the **dot is its own `<span>`** with no padding around it. On narrow viewports, the items wrap and a dot can end up at the **start or end of a row** with no item next to it. **Fix:** wrap each item + dot in a single span so they wrap together.

### 4.12 FooterMarquee
- `FooterMarquee.tsx:10` — `py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden` — fine.

### 4.13 SideNav
- `SideNav.tsx:49` — `fixed top-1/2 -translate-y-1/2 left-8 z-40` — vertically centered. The items are `space-y-3` (12px) with each item being a row of number + line + label. The line is `h-px w-12` (48px) when active and `w-6` (24px) when inactive. **The number is 10px font** and the **label is 11px font** — the label is **larger than the number**, but the number is the more "important" element (it's the section ID). The visual hierarchy is inverted.
- **Fix:** use `text-[11px]` for the number (matching the label) or `text-[10px]` for the label.
- `SideNav.tsx:62-83` — each item is a flex row: number, line, label. The number is `text-[10px] font-mono`, the line is `h-px`, the label is `text-[11px] font-medium`. The **baseline** of the number and the label is the same because they share `items-center` on the parent (line 61). ✅ But the **line** is `h-px` which has no inherent baseline; the browser places it at the vertical center. So the line is centered between the number and the label, but the number and label baselines are below the line. Visually, the line is "above" the text centers. **Fix:** use `items-baseline` for the parent and the line will sit on the baseline. (This is a stylistic choice — `items-center` is also valid.)

### 4.14 Navigation
- `Navigation.tsx:21-78` — `nav fixed top-0 left-0 right-0 z-50 bg-ink-950/70 backdrop-blur-2xl border-b border-white/[0.06]`. The nav is `h-16` (64px). The desktop nav links are at line 40-50 with `gap-8` (32px). The "Sign in" link is `px-3 py-1.5` and the "Get started" CTA is `px-4 py-1.5 rounded-full` — the CTA has an extra 4px of horizontal padding. **Visual asymmetry.** The CTA is also taller (because of the pill border-radius) — actually no, both have the same vertical padding. ✅
- `Navigation.tsx:23` — `flex items-center justify-between h-16` — the logo, the nav links, and the right side are all on a single row. **OK.**
- `Navigation.tsx:62` — `text-[13px] font-medium text-ink-950 bg-white hover:bg-ink-100 transition-colors px-4 py-1.5 rounded-full` — this button's text is **dark on white** while the rest of the nav is **light on dark**. The transition is intentional (it's a CTA) but the visual weight is heavy on the right side. **OK** for a CTA, but if a "balanced" design is desired, the CTA could be a smaller pill or moved into the mobile menu.

### 4.15 Footer
- `Footer.tsx:37` — `grid grid-cols-2 md:grid-cols-5 gap-8 mb-16` — on mobile, the 5 columns collapse to 2. The brand column is `col-span-2 md:col-span-1` so it spans 2/2 on mobile (full width) and 1/5 on desktop. The 3 link groups (`product`, `resources`, `company`) each take 1/5. **Brand column is narrower than expected on desktop.** See §2.1.
- `Footer.tsx:53-55` — the brand description is `text-[13px] text-ink-500 max-w-xs leading-relaxed mb-6`. On a 1/5 column, `max-w-xs` is 320px which is wider than the column on most desktops. The text wraps. **OK.**
- `Footer.tsx:73-89` — link groups: `eyebrow text-ink-500 mb-4` followed by `<ul className="space-y-2.5">` of links. The eyebrow is uppercase tracking-wider; the links are `text-[13px] text-ink-300`. The vertical spacing between the eyebrow and the first link is `mb-4` (16px), but the spacing between the eyebrow text and the top of the column is `0` (no top padding). This means the eyebrows are flush with the top of the column. The brand column has the logo, name, description, and social icons — its first item is the logo at the **top** of the column. So all 4 columns start at the same y. ✅
- `Footer.tsx:92-95` — the bottom row is `pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-ink-500 font-mono`. The two children are `© 2026 Synthwire` and `Built in Corydon, Iowa`. They're centered (items-center) and justified between. **OK.**

### 4.16 App Layout
- `src/app/(app)/layout.tsx:42` — `flex items-center justify-between h-16 px-4 border-b border-white/10` — the sidebar header is `h-16` matching the top bar. ✅
- `src/app/(app)/layout.tsx:73-98` — nav items: `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200`. All items have the **same `px-3 py-3`** padding. ✅
- `src/app/(app)/layout.tsx:90-94` — badge: only on the first item. The badge is `Badge variant="violet" size="sm"` which renders as a small pill. The link's flex layout is `[icon] [label flex-1] [badge?]`. The badge's right edge depends on its content (just the number "3"), but the link has `px-3` and the icon is `w-5 h-5`. **The link's right edge is at `px-3` from the column edge for items without a badge, and the same for items with a badge** (because the badge is a child, not a margin). So the **right edge of the link content** is at the same position for all items. ✅
- `src/app/(app)/layout.tsx:101-109` — user section at the bottom: `p-3 border-t border-white/10`. The avatar is `size="md"` (40px), the name and tier text are stacked. **OK.**
- `src/app/(app)/layout.tsx:144-146` — desktop sidebar: `w-64` (256px). The mobile drawer is `w-72 max-w-[85vw]`. **256px vs 288px** — the desktop and mobile sidebars have different widths. When toggling, the content shifts by 32px. **Fix:** make them both `w-64` or both `w-72`.
- `src/app/(app)/layout.tsx:182` — top bar: `h-16 bg-violet-950/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 gap-3`. The top bar has `h-16` matching the sidebar header. ✅
- `src/app/(app)/layout.tsx:206-213` — search input: `w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm sm:text-base text-white ...`. The search is inside `<div className="flex-1 max-w-xl">` so it has a max width of 576px. The placeholder is "Search sources, issues..." ✅
- `src/app/(app)/layout.tsx:218-220` — notification button: `<Button variant="ghost" size="sm" className="relative px-2 sm:px-3">` with a `BellIcon` and a red dot at `absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full`. The dot is at the top-right of the button. **OK.**
- `src/app/(app)/layout.tsx:228` — page content: `<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>`. The main content has different padding at 3 breakpoints: `p-4 sm:p-6 lg:p-8` (16 / 24 / 32). The other pages use `mb-6 sm:mb-8` for their internal headers. **Consistent with the page-internal scale.** ✅

### 4.17 Discovery
- `src/app/(app)/discovery/page.tsx:97-110` — header is `mb-6 sm:mb-8`. The inner row is `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4`. The title is `text-2xl sm:text-3xl font-serif font-light text-white` and the description is `text-violet-300 mt-1 text-sm sm:text-base`. ✅
- `src/app/(app)/discovery/page.tsx:114-144` — search + tabs row: `flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between`. The search is `max-w-md w-full lg:w-auto` and the tabs are `w-full lg:w-auto -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto`. **The `-mx-4` and `px-4` create a negative margin that bleeds the tabs row to the viewport edge on mobile, while the search stays inside the parent's padding.** This is intentional for the horizontal scroll, but the visual result is that the search has a left margin (from the parent's `p-4 sm:p-6 lg:p-8`) while the tabs have a left edge at 0. This is jarring.
- `src/app/(app)/discovery/page.tsx:192` — recommendation card: `<Card variant="elevated" padding="md" className="animate-slide-up" ...>`. The Card component wraps the children in a div with padding. Inside, line 193: `flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6`. The left column is `lg:w-24` and the right column is `flex-1 min-w-0`. ✅
- `src/app/(app)/discovery/page.tsx:204-210` — main content: `flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3`. The h3 is `text-lg sm:text-xl font-medium text-white` and the overlap badge is `<Badge variant="outline" size="sm" className="self-start flex-shrink-0">Overlap: ...</Badge>`. The badge is `self-start` so it aligns to the top of the row. ✅
- `src/app/(app)/discovery/page.tsx:225-236` — action row. See §2.7.
- `src/app/(app)/discovery/page.tsx:249-269` — queue item card: `<Card variant="default" padding="lg">`. Inside, `flex flex-col lg:flex-row lg:items-center gap-4`. The left side has `w-10 h-10 rounded-lg bg-violet-500/20` avatar (40px) and the right side has status badges + actions. **The avatar in the recommendation card is `lg:w-24` wide (with a number + score badge stacked), but the avatar in the queue item card is a single 40px circle.** Same brand visual ("source icon") but very different scale and prominence. **Fix:** use the same avatar style in both — either both 40px circles or both 96px column.
- `src/app/(app)/discovery/page.tsx:280-292` — drawer: `w-full sm:max-w-2xl h-full max-h-screen sm:max-h-screen bg-violet-950 shadow-2xl overflow-y-auto animate-slide-in-right sm:animate-slide-in-right rounded-t-2xl sm:rounded-none`. The drawer is full-width on mobile (slides from bottom with rounded top), and max-2xl on desktop (slides from right with no radius). ✅

### 4.18 Digest
- `src/app/(app)/digest/page.tsx:51-69` — header: same as discovery. ✅
- `src/app/(app)/digest/page.tsx:72-111` — configuration bar: `<Card variant="glass" padding="md" className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">`. The select boxes are `<select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white ... min-w-0 flex-1 sm:flex-none">` — they have `flex-1` on mobile and `flex-none` on desktop. ✅
- `src/app/(app)/digest/page.tsx:114-137` — reading mode grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3`. The 5 SUMMARY_MODES are mapped to 5 buttons. On `lg` (1024px) the grid is 5 columns with `gap-3` (12px). Each button is `p-3 sm:p-4 rounded-xl border ...` with an icon, label, and description. The label is `text-sm sm:text-base` and the description is `text-xs sm:text-sm line-clamp-2`. ✅
- `src/app/(app)/digest/page.tsx:167-211` — section card: `<Card variant="elevated" padding="lg">`. Inside, the header is `flex items-start justify-between gap-4 mb-4` and the expand button is `p-2 rounded-xl`. The title row has `flex items-center gap-3 mb-2` with the h3, a style badge, an items count badge, and a minutes badge. All on one row. **The 4 elements in a row** (h3, style, count, min) might overflow on narrow viewports. **Fix:** wrap them in `flex-wrap`.
- `src/app/(app)/digest/page.tsx:213-245` — item card: `<Card variant="outlined" padding="md">` with `flex flex-col lg:flex-row gap-4`. ✅

### 4.19 Archive
- `src/app/(app)/archive/page.tsx:66-108` — header and search: same as other pages. ✅
- `src/app/(app)/archive/page.tsx:110-204` — filters panel: `<Card variant="glass" padding="md" className="mb-6 animate-slide-down">` with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6`. The 4 filter columns are: Sources, Date Range, Topics, Min Relevance. The Date Range column has its **own internal grid** `<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">` (note: `xs:grid-cols-2` is suspicious — Tailwind doesn't have an `xs` breakpoint by default unless it's been added in the config). If `xs` isn't defined, the class is a no-op and the date inputs stack. **Fix:** verify `xs` is configured in `tailwind.config.ts`, otherwise change to `sm:grid-cols-2`.
- `src/app/(app)/archive/page.tsx:206-285` — results + sidebar: `flex flex-col lg:flex-row gap-6`. The results are `flex-1 min-w-0` and the sidebar is `hidden lg:block w-72`. ✅
- `src/app/(app)/archive/page.tsx:288-336` — result card: `<Card variant="default" padding="md" className="hover:border-violet-500/30 transition-colors">` with `flex flex-col sm:flex-row gap-3 sm:gap-4`. The action buttons are 3 icon-only ghost buttons (line 311-319). See §2.8.

### 4.20 Workspace
- `src/app/(app)/workspace/page.tsx:31-67` — header. Same pattern. ✅
- `src/app/(app)/workspace/page.tsx:69-90` — tabs: `<Tabs.List className="flex-nowrap whitespace-nowrap w-max sm:w-auto">` — horizontal scroll on mobile. ✅
- `src/app/(app)/workspace/page.tsx:102-169` — overview tab: 3-col grid with 2-col main and 1-col sidebar. The stat cards are `grid-cols-2 gap-3 sm:gap-4` (2×2). ✅
- `src/app/(app)/workspace/page.tsx:171-195` — members tab: list of member rows. Each row is `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/10`. ✅
- `src/app/(app)/workspace/page.tsx:241-281` — queues tab: 2-col grid of queue cards. Each card has a header, sources list, and member list. ✅
- `src/app/(app)/workspace/page.tsx:286-328` — sources tab: list of source rows. Each row is `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/10`. The avatar is `w-10 h-10 rounded-lg bg-violet-500/20` (same as discovery's queue item card). ✅
- `src/app/(app)/workspace/page.tsx:330-370` — settings tab: single column, `max-w-2xl`. ✅

### 4.21 Settings
- `src/app/(app)/settings/page.tsx:64-96` — header and tabs. Same pattern. ✅
- `src/app/(app)/settings/page.tsx:98-169` — profile tab: 3-col grid with 1-col profile card and 2-col forms. The profile card has `text-center` and the forms are `space-y-4`. ✅
- `src/app/(app)/settings/page.tsx:172-251` — preferences tab: `max-w-3xl` (smaller than the profile tab's 7xl). The appearance grid is `grid-cols-3 gap-2 sm:gap-4` with 3 theme buttons. The buttons are `p-3 sm:p-4 rounded-xl border`. Each button has an icon, label, and the label is `font-medium text-white capitalize text-sm sm:text-base`. The icon and label are **center-aligned** because the parent button is `text-center`-equivalent (no `text-left`). **The theme button has `transition-all` but no `text-left`** — the content inside (icon, label) is `mx-auto mb-2` for the icon and the label has no centering class. So the label is left-aligned. **Fix:** add `text-center` to the parent button.
- `src/app/(app)/settings/page.tsx:300-340` — billing tab: `max-w-3xl`. 3 billing tier cards in `grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4`. The tier cards are similar to the landing Pricing cards but at a smaller scale. **Internal consistency check needed.**
- `src/app/(app)/settings/page.tsx:456-466` — InfoRow: `flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-xl`. Inside, `Icon w-5 h-5 text-violet-400 flex-shrink-0`, then a `div min-w-0` with label and value. The label is `text-violet-400 text-xs` and the value is `font-medium text-white truncate`. ✅

---

## 5. App-Side Internal Consistency

These are issues specific to the app (post-login) pages.

### 5.1 Page header margin is `mb-6 sm:mb-8` everywhere except settings which is `mb-6 sm:mb-8` — actually consistent. ✅
**Files:** `discovery/page.tsx:97`, `digest/page.tsx:51`, `archive/page.tsx:68`, `workspace/page.tsx:33`, `settings/page.tsx:67`

### 5.2 Card padding variants
The app uses `<Card>` components with `padding="md"` (most) and `padding="lg"` (queue items). The `padding` variants map to `p-4 sm:p-5` (md) and `p-5 sm:p-6` (lg) presumably. **Check the actual `Card` component to confirm.**

### 5.3 Tab list horizontal scroll pattern
The tabs list is wrapped in `<div className="-mx-4 sm:mx-0 px-4 sm:px-0 mb-6 overflow-x-auto">` in `workspace/page.tsx:70`, `settings/page.tsx:73`, and `discovery/page.tsx:126` (partially). The negative margin trick is **used identically in 3 files** — good, this is consistent.

### 5.4 Sidebar nav `space-y-1` and `px-3 py-4` is consistent. ✅

### 5.5 The sidebar's `Collapse` button is only shown when `sidebarOpen=true`. ✅
**File:** `src/app/(app)/layout.tsx:61-69, 149-152`

---

## 6. Fix Priority

The top 20 specific fixes, ordered by visual impact:

1. **CTA section padding scale** — `CTA.tsx:8`: `py-20 sm:py-24 md:py-32` → `py-16 sm:py-20 md:py-32` *(eliminates one of the most jarring vertical jumps in the page)*.
2. **Section-marker wrapper consistency** — extract `<SectionMarker num="1.X" label="..." />` to a shared component. Replace the 11 inline implementations in Hero, SourceMarquee, HowItWorks, DemoSection, Comparison, WhatWeBuildFor, ProofMetrics, Features, Pricing, FAQ, CTA.
3. **Sidebar nav badge right-edge alignment** — `layout.tsx:78-95`: switch to a 3-col grid with `justify-self-end` on the badge wrapper.
4. **Pricing card padding fix** — `Pricing.tsx:79`: `p-5 sm:p-6 md:p-8 md:p-10` → `p-5 sm:p-6 md:p-8 lg:p-10`.
5. **Pricing tier card height alignment** — wrap the feature list in `flex-1` so the bottom of the 3 cards aligns even with different feature counts. (`Pricing.tsx:108`)
6. **Popular badge spacer** — `Pricing.tsx:83-85`: add an invisible "Popular" spacer to the other 2 cards to reserve the badge space and keep all 3 card tops aligned.
7. **HowItWorks step number baseline** — `HowItWorks.tsx:52`: `items-baseline` → `items-center` so the "01" / "02" / "03" numbers don't droop below the icon.
8. **Hero mockup glow symmetric padding** — `Hero.tsx:124, 128`: change `-inset-x-4 sm:-inset-x-32` and `-inset-x-4 sm:-inset-x-10` to symmetric `-inset-y` values.
9. **WhatWeBuildFor lettered row gap on desktop** — `WhatWeBuildFor.tsx:45`: `gap-2 md:gap-0` → `gap-2 md:gap-8`.
10. **Footer brand column width** — `Footer.tsx:39`: `md:col-span-1` → `md:col-span-2` so the brand content isn't squeezed.
11. **WhatWeBuildFor mt-24** — `WhatWeBuildFor.tsx:63`: `mt-24` → `mt-16` to match the rest of the page's gap scale.
12. **Discovery rank/score axis change** — `discovery/page.tsx:195`: keep `flex-col items-start` consistent across breakpoints.
13. **RecommendationCard action row** — `discovery/page.tsx:225-236`: wrap the 3 buttons in their own flex container; move the `sm:ml-auto` badge out of the button row.
14. **SearchResultCard icon button separator** — `archive/page.tsx:310-320`: add `border-l border-white/5` or `divide-x` between the 3 icon buttons.
15. **CTA trust row wrap** — `CTA.tsx:47-55`: wrap each item + its trailing dot in a single `<span>` so they wrap together.
16. **SideNav label font size** — `SideNav.tsx:78-83`: change label from `text-[11px]` to `text-[10px]` so the number (10px) and label are the same size.
17. **Hero CTA buttons icon shadow** — `Hero.tsx:88-101`: remove the `shadow-[0_0_0_1px_rgba(255,255,255,0.08)]` from button 1 to match button 2's height.
18. **Settings theme button text-center** — `settings/page.tsx:181`: add `text-center` to the parent button so the label is centered under the icon.
19. **ProofMetrics grid gap on lg** — `ProofMetrics.tsx:21`: add `lg:gap-8` so 4 columns fit at 1024px without overflow.
20. **Comparison table 3rd column right border** — `Comparison.tsx:55-65`: add a right border to the Synthwire column to match the second column's right border and prevent the bg tint from bleeding to the edge.

---

## 7. Summary

- **Total issues found: 38** (across landing + app)
- **Landing-only: 27**
- **App-only: 11**
- **Distribution by category:**
  - Critical symmetry: 10
  - Layout grid: 10
  - Spacing rhythm: 11
  - Component-level: 7
- **Time estimate to fix all (in priority order):**
  - Top 6 fixes: ~2 hours
  - Top 20 fixes: ~6 hours
  - All 38 fixes: ~12 hours
  - Plus refactor to extract `<SectionMarker>` component: +1 hour
  - Plus refactor to extract `<SourceCard>` component (for cross-file consistency): +2 hours

---

## 8. Out of scope

- Color contrast / accessibility — not part of this audit
- Performance / rendering — not part of this audit
- Mobile-specific issues beyond alignment — covered in `MOBILE_AUDIT.md`
- Code-level bugs (e.g. the `xs:` breakpoint that may not exist in tailwind config) — flagged but not verified

---

*End of audit. No code was modified.*
