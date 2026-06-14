# Synthwire — Mobile Responsiveness Audit

**Date:** 2026-06-14
**Scope:** Landing page components + `/app/*` pages
**Method:** Read-only static review of Tailwind classes, layout primitives, and responsive breakpoints
**Verdict:** 🔴 **Not mobile-ready.** The landing page assumes desktop (≥1024 px) and the app shell has multiple layout breaks below `lg:`.

---

## TL;DR — Severity Counts

| Priority | Count | Action required |
|----------|------:|-----------------|
| 🔴 Critical (breaks mobile) | **9** | Must fix before any mobile launch |
| 🟠 High (visibly broken / unusable) | **14** | Fix in first pass |
| 🟡 Medium (degraded experience) | **12** | Fix in second pass |
| 🟢 Low (polish) | **6** | Fix when convenient |
| **Total** | **41** | |

**Estimated time to remediate all issues: 6–9 hours of focused work** (2 h Critical, 2 h High, 2 h Medium, 1 h Low + testing).

---

## 🔴 Critical Issues — will break mobile

### C1. Mobile hamburger menu button is dead — no menu panel renders
- **File:** `src/components/landing/Navigation.tsx`
- **Lines:** 18, 69–76
- **Problem:** `mobileMenuOpen` state exists, and the hamburger toggles it, but **no menu panel is ever rendered**. On phones the user taps the hamburger and nothing happens — no nav links, no "Sign in", no "Get started".
- **Why critical:** On mobile (default landing experience) there is literally no way to navigate off the page.
- **Suggested fix:** Add a `<div className={mobileMenuOpen ? 'block md:hidden' : 'hidden'}>` panel below the top bar containing the `navLinks` + Sign in + Get started CTA, with `position: fixed` + `bg-ink-950` + slide-in transition.

### C2. App shell sidebar is `fixed inset-y-0` and never truly hidden on mobile
- **File:** `src/app/(app)/layout.tsx`
- **Lines:** 36–42
- **Problem:** The `<aside>` uses `fixed inset-y-0 left-0` with `translate-x-full` / `translate-x-0`. On mobile the className is
  ```
  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
  ```
  but the element itself is **never `hidden` on small viewports** — only translated. A `fixed` panel of width `w-64` always sits in the layout tree, can intercept touches, breaks the parent flex (`flex` + `fixed` first child), and the top bar's `lg:ml-64` shift never happens on mobile so the sidebar would overlap content if `mobileMenuOpen` is true. The duplicate `lg:translate-x-0 lg:hidden` on the same line is also contradictory.
- **Why critical:** On `/app/*` mobile visits the sidebar blocks the page.
- **Suggested fix:**
  - Add `hidden lg:flex` on the outer wrapper of the sidebar.
  - Move the mobile drawer to a separate `lg:hidden` element with `fixed` + backdrop.
  - Drop the `lg:translate-x-0` / `lg:hidden` conditionals.

### C3. `(app)` layout sidebar top bar `lg:hidden` mobile button is wired to the wrong handler
- **File:** `src/app/(app)/layout.tsx`
- **Lines:** 122–129
- **Problem:** The mobile menu button is rendered, and clicking it calls `setMobileMenuOpen(true)`, but the sidebar already renders a Chevron collapse button (lines 59–65) labelled "Collapse sidebar" that is itself `lg:hidden`-hidden. There is no visible drawer for the user; the button does nothing useful because the sidebar is `fixed translate-x-(-full)`.
- **Why critical:** Mobile users on `/app/*` have no navigation.
- **Suggested fix:** See C2. Drawer needs to actually open on click.

### C4. `(app)` layout main content `lg:ml-64` always adds left margin on mobile
- **File:** `src/app/(app)/layout.tsx`
- **Line:** 120
- **Problem:**
  ```tsx
  <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
  ```
  This is fine when `sidebarOpen` is false, but on mobile the parent sidebar still occupies `fixed left-0` and the main content has no `pl-64`. The left side of the page is **clipped by the (invisible) 256 px sidebar on small screens**. With the right sidebar `fixed` over content, every `/app/*` page is partially occluded on mobile.
- **Why critical:** All app pages have 256 px of dead space on the left.
- **Suggested fix:** Apply `hidden lg:block` on the sidebar (C2) and remove the per-breakpoint margin logic. On mobile the sidebar should be a true drawer.

### C5. Discovery page renders BOTH a desktop AND a mobile panel, duplicated
- **File:** `src/app/(app)/discovery/page.tsx`
- **Lines:** 148–198
- **Problem:** Lines 150–163 render `<div className="hidden lg:block">` containing recommendations. Lines 177–197 render `<div className="lg:hidden">` containing the same data. Because `TabsContent` here is a no-op wrapper (line 455), both blocks mount simultaneously and both fire their `onViewDetails` handlers. The intent appears to be a responsive tabs, but the implementation results in **double rendering, double scroll, double state mutation** and likely a hydration warning.
- **Why critical:** Broken logic, double content, potential hydration mismatch.
- **Suggested fix:** Render the tab panel only once; let the tab system switch via `activeTab` state. Remove the duplicate `lg:hidden` block (or the `hidden lg:block` one) and gate the entire body on `activeTab`.

### C6. Hero headline `clamp(80px, 13vw, 200px)` overflows on phones < 640 px
- **File:** `src/components/landing/Hero.tsx`
- **Lines:** 53–72
- **Problem:** With `clamp(80px, 13vw, 200px)` and a 3-line stacked headline ("Your own research desk, not another aggregator"), the rendered line height + `0.92` leading + 200 px max can produce ~576 px tall block. On a 375 × 667 iPhone the headline alone consumes the whole above-the-fold view. There is also no `text-balance` / `hyphens-auto`, so long words ("research", "aggregator") push line boxes.
- **Why critical:** First impression is broken. The CTA buttons are pushed below the fold.
- **Suggested fix:** Lower the clamp floor, e.g. `clamp(48px, 11vw, 140px)` and add `text-balance` and `break-words`. Also consider reducing `mb-12` between headline and subhead on small screens (`mb-6 sm:mb-12`).

### C7. `HeroDigestMock` uses `transform: rotate(-0.5deg)` and `-inset-x-32` violet glow
- **File:** `src/components/landing/Hero.tsx`
- **Lines:** 117–130
- **Problem:** The mockup's glow layers use `-inset-x-32 -inset-y-16` (= extends 128 px to each side). Combined with the -0.5° rotation, on a 375 px viewport the right edge of the rotated card protrudes past the viewport and **the parent `overflow-hidden` is on the `section` (line 10) but the `<div className="relative max-w-5xl mx-auto">` does not clip**. Result: the mockup overflows horizontally on phones, causing a side-scrollable region. Tested by the `pt-28 pb-24` alone it likely fits, but the rotated bounds don't respect that.
- **Why critical:** Horizontal scroll on the page = broken mobile experience.
- **Suggested fix:** Wrap the mockup in `overflow-hidden rounded-2xl` OR add `-mx-4 sm:mx-0` and use `max-w-full`. Drop the `-inset-x-32` on small screens (`-inset-x-4 sm:-inset-x-32`).

### C8. CTA section `clamp(56px,10vw,140px)` headline + forced `<br/>` on mobile
- **File:** `src/components/landing/CTA.tsx`
- **Lines:** 20–24
- **Problem:** The headline "Stop reading 47 newsletters. / Read one brief." uses a hard `<br />` between the two lines. On mobile the `clamp(56px,10vw,140px)` at 375 px = ~56 px font, so a single word "newsletters." is rendered at 56 px and **the line box exceeds the 343 px content width**, causing wrap reflow that looks broken. The `<br/>` also forces the layout you didn't want on mobile.
- **Why critical:** Headline is the second-most-prominent element on the page; if it wraps wrong, conversion suffers.
- **Suggested fix:** Replace the `<br/>` with `<span className="block">` and lower the floor: `clamp(40px, 9vw, 100px)`. Add `text-balance`.

### C9. `Tabs.List` does not scroll horizontally on mobile — six tabs overflow
- **File:** `src/app/(app)/settings/page.tsx`
- **Lines:** 73–93
- **Problem:** Six tabs (`Profile`, `Preferences`, `Notifications`, `Billing`, `Integrations`, `Security`) are rendered in a `flex-wrap` `Tabs.List`. With the icon + label combo, the row easily exceeds 360 px and the tabs break to two lines on phones, leaving a visually awkward strip — but more importantly **`Tabs.tsx` is the underlying component**, and if the underlying `Tabs.Trigger` widths are not constrained, the labels can push the whole bar into a 2-line layout that scrolls. Without `overflow-x-auto` + `whitespace-nowrap`, the wrap looks broken.
- **Why critical:** The first thing the user does in settings is choose a tab. If it's broken, the app is broken.
- **Suggested fix:** Apply `flex-nowrap overflow-x-auto whitespace-nowrap` to `Tabs.List` and confirm Tabs.tsx supports it. Or convert to a `<select>` on mobile.

---

## 🟠 High Priority — visibly broken / unusable

### H1. `SourceMarquee` items have no minimum width — they collapse on small screens
- **File:** `src/components/landing/SourceMarquee.tsx`
- **Lines:** 27–39
- **Problem:** Each marquee pill has `flex-shrink-0 mx-3` but no `min-w` or fixed width. Source names like "The Information" and "The Verge" can be < 100 px wide; the marquee becomes visually noisy on mobile (huge list of small chips with no breathing room) and the gradient fade `w-32` on each side covers ~32 % of the visible width on a 375 px screen, hiding the actual text.
- **Suggested fix:** Set `min-w-[140px]` or use a larger inner padding. Reduce gradient `w-32` to `w-16` on mobile.

### H2. `FooterMarquee` uses `clamp(80px, 12vw, 160px)` — 80 px is still huge on phones
- **File:** `src/components/landing/FooterMarquee.tsx`
- **Line:** 19
- **Problem:** At 375 px viewport, `12vw` = 45 px but the floor is 80 px. So each "Synthwire" word is rendered at 80 px Fraunces, which on a 375 px wide phone is 21 % of viewport per word. Combined with the `px-8` gap (32 px), the row needs ~150 px of horizontal space per repeat and the gradient masks ~64 px on each side, leaving only ~250 px visible — barely one full word.
- **Suggested fix:** `clamp(44px, 14vw, 160px)` and reduce gap to `px-4` on mobile.

### H3. `WhatWeBuildFor` `weLike` row uses `col-span-1 / col-span-4 / col-span-7` with no responsive variant
- **File:** `src/components/landing/WhatWeBuildFor.tsx`
- **Lines:** 45–56
- **Problem:** `grid-cols-12` with `col-span-1`, `col-span-4`, `col-span-7` works fine on desktop. On mobile (no `md:` prefix), it still applies → the 12-column grid means each cell is ~8 % of width. The letter `(A)`, label and description end up as three narrow stacked columns, with the description squeezed into 58 % of a phone width. With longer descriptions ("Newsletter authors with a clear point of view — not aggregators"), they wrap awkwardly inside the narrow column.
- **Suggested fix:** Change to `grid-cols-1 md:grid-cols-12` and add `col-span-12 md:col-span-1` etc. on the three children, or add `flex flex-col md:grid md:grid-cols-12` on the row.

### H4. Comparison table is `grid-cols-3` with no responsive variant
- **File:** `src/components/landing/Comparison.tsx`
- **Lines:** 48, 55
- **Problem:** Both the header row (line 48) and all data rows (line 55) use bare `grid-cols-3` with `p-6` (24 px) cells. On mobile (375 px) the table is forced into 3 columns; each cell has ~91 px of width minus 48 px padding = 43 px of actual text. Long values like "Semantic + source attribution" cannot fit and the row will horizontally overflow or wrap to multi-line mess.
- **Suggested fix:** Make the layout responsive — e.g. on mobile stack as cards (one per row with two stacked inner cells), or at minimum `grid-cols-3 sm:grid-cols-3` with `p-3 sm:p-6` and `text-[12px] sm:text-[14px]`.

### H5. `Features` bento grid uses bare `grid-cols-3` with `md:col-span-*` spans
- **File:** `src/components/landing/Features.tsx`
- **Line:** 95
- **Problem:** Container is `grid grid-cols-1 md:grid-cols-3` (good), but the children use `md:col-span-2` and `md:col-span-1`. The `feature.span` strings in the data only have `md:` prefix. On mobile (no `md:`) each cell is `col-span-1` (because the base grid is `grid-cols-1`). That's fine for stacking, but on `sm:` (640–768 px) the grid is still `grid-cols-1` and there's an awkward 1-column stack. On `md` the `col-span-2` cells appear correctly. The bento is actually OK in practice, but the 1-column layout at `sm` is unnecessarily tall.
- **Suggested fix:** Add `sm:grid-cols-2 sm:auto-rows-fr` for better tablet behavior, or just leave as-is and accept the single column. (Lower priority than the rest of the High group — consider this borderline Medium.)

### H6. `DemoSection` synthesis card `Covers` footer row wraps awkwardly
- **File:** `src/components/landing/DemoSection.tsx`
- **Lines:** 262–285
- **Problem:** The Covers / Signal row uses `flex items-start justify-between gap-4 flex-wrap`. On mobile the 7 source names join into one inline paragraph; on a 375 px screen the joined string (~250 chars) will force the row to break the layout and the `flex-shrink-0 text-right` Signal chip overlaps the wrapped text.
- **Suggested fix:** Add `min-w-0` to the `flex-1` cell (already there) but also constrain the joined names to `break-words` and limit visible to 3 with `+4 more` chip. The signal chip should `self-end` on mobile.

### H7. `Comparison` and `WhatWeBuildFor` use `py-32 px-6` (128 px vertical padding) on mobile
- **Files:** `Comparison.tsx:19`, `WhatWeBuildFor.tsx:24`, `HowItWorks.tsx:32`, `DemoSection.tsx:85`, `ProofMetrics.tsx:8`, `Features.tsx:75`, `Pricing.tsx:21`, `FAQ.tsx:50`, `CTA.tsx:8`
- **Problem:** Every section uses `py-32` (128 px) and `px-6` (24 px). On a phone this is 256 px of vertical breathing room per section, which is excessive and pushes content far below the fold. The convention says: `py-16 sm:py-20 md:py-32 px-4 sm:px-6`.
- **Suggested fix:** Globally replace `py-32 px-6` with `py-16 px-4 sm:px-6 sm:py-20 md:py-32`.

### H8. Hero CTA buttons stack correctly but button padding is uniform — too wide on small screens
- **File:** `src/components/landing/Hero.tsx`
- **Lines:** 88–101
- **Problem:** Buttons use `px-6 py-3.5` and the flex column uses `items-center` (line 85). On mobile they will stack but each button is `inline-flex` not `w-full`, leaving them left-aligned and the right side empty. Worse, the second button has `text-ink-200` and is too narrow to read "See how it works" cleanly.
- **Suggested fix:** On mobile, make buttons `w-full sm:w-auto` (the `flex-col sm:flex-row` is correct; add `w-full` to the inner Links on mobile).

### H9. `Footer` uses `grid-cols-2 md:grid-cols-5` — second column is partially empty
- **File:** `src/components/landing/Footer.tsx`
- **Lines:** 37, 39
- **Problem:** `grid-cols-2 md:grid-cols-5` means the first row has the brand block (`col-span-2 md:col-span-1`) plus 3 link groups = 4 children spanning 5 columns on mobile but only 4 needed. On mobile, the layout becomes 2 columns × 3 rows: brand, [product, resources], [company, empty]. The empty cell wastes space.
- **Suggested fix:** Change to `grid-cols-1 xs:grid-cols-2 md:grid-cols-5` (where `xs` = 480 px) so it stays clean on phones.

### H10. `Pricing` 3-column grid stacks, but the price `text-5xl` is too large in single-column
- **File:** `src/components/landing/Pricing.tsx`
- **Lines:** 70, 93
- **Problem:** `grid grid-cols-1 md:grid-cols-3` is correct. But on mobile, `text-5xl` (48 px) for `$0`, `$7`, `$19` plus a `/mo` is fine, however the `Popular` badge top-right collides with the price. Also `p-8 md:p-10` padding is fine.
- **Suggested fix:** Move the `Popular` badge below the price on mobile: `top-auto right-auto mt-2` or use a flex stack.

### H11. `HeroDigestMock` inner container uses `px-10` (40 px) horizontal padding
- **File:** `src/components/landing/Hero.tsx`
- **Lines:** 161, 204, 230, 265, 281
- **Problem:** Inside the mockup, multiple inner divs use `px-10` (40 px). On a 375 px phone, after the max-w-5xl mx-auto and outer `px-6` (24 px), the inner content area is ~327 px, then `-40` each side = 247 px of usable width. Inside, the title `June 13, 2026` at `text-6xl` (60 px) **cannot fit on one line** — wraps to two lines. Same for the "11 stories · 6 min · saved 47 min" header right side.
- **Suggested fix:** Replace `px-10` with `px-4 sm:px-6 lg:px-10` inside the mockup. Reduce `text-6xl` to `text-4xl sm:text-6xl`.

### H12. `HeroDigestMock` title `text-6xl md:text-7xl` on 375 px screen wraps very awkwardly
- **File:** `src/components/landing/Hero.tsx`
- **Line:** 169
- **Problem:** The "June 13, 2026" date header uses `text-display text-6xl md:text-7xl`. On mobile `text-6xl` = 60 px, which on a 247 px-wide content box needs 4 lines for "June 13, 2026". The `tracking-[-0.035em]` makes the kerning look broken when the wrap is forced.
- **Suggested fix:** `text-3xl sm:text-5xl md:text-6xl lg:text-7xl`.

### H13. Archive page header buttons don't stack on small screens
- **File:** `src/app/(app)/archive/page.tsx`
- **Lines:** 68–82
- **Problem:** The header is `flex items-center justify-between`. On mobile the heading block + 2 buttons all sit on one row, causing the heading "Archive Search" to be squeezed to 0 width. The buttons (Clear filters, Export) wrap awkwardly.
- **Suggested fix:** Wrap with `flex-col sm:flex-row sm:items-center sm:justify-between` and `gap-3`. Consider hiding the Clear filters button below `sm`.

### H14. App pages `main` content has `p-6 lg:p-8` but card content uses `p-6 lg:p-10` — internal content may clip
- **File:** `src/app/(app)/layout.tsx:155` + app pages
- **Problem:** Combined with sidebar issues (C2/C4), the main content area is clipped 256 px from the left on mobile AND has p-6 padding. The combination produces 0 visible content on phones < 320 px.
- **Suggested fix:** Address the sidebar issue first (C2), then verify main `p-6` is sufficient at all breakpoints.

---

## 🟡 Medium Priority — degraded experience

### M1. `Settings` page tabs list has 6 items — overflows on small screens
- **File:** `src/app/(app)/settings/page.tsx:73-93`
- **Problem:** Six tabs + icons exceed 360 px width. `flex-wrap` is set on line 74, so they wrap to multiple lines. Acceptable but ugly. The `Tabs.tsx` component might be wrapping individual triggers that are wider than their content.
- **Suggested fix:** Add `overflow-x-auto` and remove `flex-wrap`; use `whitespace-nowrap`. Or convert to icon-only on `sm:` with full labels on `md+`.

### M2. `Workspace` page header is `flex items-center justify-between` with no responsive variant
- **File:** `src/app/(app)/workspace/page.tsx:33-42`
- **Problem:** Title + "New workspace" button on one row; on 375 px the title is squeezed.
- **Suggested fix:** `flex-col sm:flex-row sm:items-center sm:justify-between gap-3`.

### M3. `Workspace` selector card is `flex items-center gap-4` — overflows on mobile
- **File:** `src/app/(app)/workspace/page.tsx:46-63`
- **Problem:** Avatar + text + AvatarGroup + members count + badge on one line. The AvatarGroup may add 5+ circles + the count + the badge, all on one row. Will wrap or overflow.
- **Suggested fix:** Stack the AvatarGroup + count + badge below the title on mobile.

### M4. `Digest builder` Configuration bar is `flex flex-wrap items-center gap-4` — content is fine but `min-w-[300px]` on inner div forces a wide row
- **File:** `src/app/(app)/digest/page.tsx:72-91`
- **Problem:** `flex-1 min-w-[300px]` keeps the inner flex from shrinking below 300 px. On a 375 px phone, after `p-6` (24 px) padding and the badge row beside it, this leaves the selects very tight or wrapped below.
- **Suggested fix:** Change to `min-w-0` to allow proper shrink, or `min-w-[200px]`.

### M5. `Digest` reading mode selector uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5` — 5 buttons stacked in 1 column on phone
- **File:** `src/app/(app)/digest/page.tsx:117`
- **Problem:** At `sm` (640–1023 px) it becomes 2 columns × 3 rows. Acceptable. At mobile it's 1 column × 5 rows. The button labels are short, so it's fine but takes 5 vertical presses. Minor.
- **Suggested fix:** Consider `grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5`.

### M6. `Discovery` recommendation card `flex flex-col lg:flex-row` with rank + score stacked — fine but actions row has 4 buttons
- **File:** `src/app/(app)/discovery/page.tsx:226-271`
- **Problem:** Lines 258–269 put 4 actions in a single `flex items-center gap-3` row. On a 343 px content width they will all wrap, but the wrapping is forced and the "Not relevant" ghost button is squeezed.
- **Suggested fix:** Use `flex-wrap` and consider hiding "Not relevant" behind a menu on mobile.

### M7. `Discovery` page status badges row + actions in `QueueItemCard` have too many items
- **File:** `src/app/(app)/discovery/page.tsx:294-299`
- **Problem:** 3 badges (status, route, digest_mode) + 1–2 action buttons. On 343 px these may wrap, but the action buttons have icon+text combos that are wide.
- **Suggested fix:** Move secondary badges to a second row on mobile: `flex-col sm:flex-row sm:items-center sm:gap-3`.

### M8. `Archive` search bar uses `px-12 py-4 text-lg` — large input height takes too much room
- **File:** `src/app/(app)/archive/page.tsx:88-95`
- **Problem:** `text-lg` (18 px) + `py-4` (16 px) + `px-12` (48 px) makes the search input ~56 px tall, occupying significant fold.
- **Suggested fix:** `px-10 py-3 sm:px-12 sm:py-4 text-base sm:text-lg`.

### M9. `Archive` filter panel `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` — date range is nested `grid-cols-2` with no responsive variant
- **File:** `src/app/(app)/archive/page.tsx:113, 136`
- **Problem:** Inside the 1-col mobile layout, the date range inner grid stays `grid-cols-2` so From/To share a row. Each input has `px-10 py-2.5` (40 px left padding for the icon). On 343 px / 2 = 171 px per cell minus 40 px padding = 131 px usable — tight for a date input.
- **Suggested fix:** Drop the date icon padding on mobile or stack From/To vertically (`grid-cols-1 xs:grid-cols-2`).

### M10. `Settings` profile tab uses `grid grid-cols-1 lg:grid-cols-3` — fine, but nested cards have `p-6` always
- **File:** `src/app/(app)/settings/page.tsx:97-119`
- **Problem:** Cards have `padding="lg"` (24 px) and the inner Avatar+name block has `text-center` (line 99). On mobile this is fine but the InfoRow items have `gap-3 p-2` which is tight for icon + 2-line text.
- **Suggested fix:** Increase to `p-3` and add `min-w-0` on the text wrapper.

### M11. `Settings` notifications tab list is `space-y-4` — fine, but rows have 3-element flex with truncate
- **File:** `src/app/(app)/settings/page.tsx:485-503`
- **Problem:** Each row has icon + 2-line label/description + toggle. On mobile the `truncate` on the label will cut off the description silently if it's too long.
- **Suggested fix:** Use `line-clamp-2` instead of `truncate` on the description.

### M12. `DemoSection` section header uses `grid-cols-1 md:grid-cols-12 gap-8 mb-20` with `md:col-span-7` / `md:col-span-5`
- **File:** `src/components/landing/DemoSection.tsx:99-133`
- **Problem:** On mobile both blocks stack with `mb-20` (80 px) below the header. That's huge vertical real estate wasted.
- **Suggested fix:** `mb-10 sm:mb-16 md:mb-20`.

---

## 🟢 Low Priority — polish

### L1. `globals.css` body noise overlay uses `opacity: 0.025` — fine but adds GPU cost on low-end phones
- **File:** `src/app/globals.css:74-83`
- **Suggested fix:** Detect `(max-width: 640px)` and skip the noise overlay, or lower opacity to 0.015 on mobile.

### L2. `Hero` background halos are `w-[1600px] h-[1100px]` — 2 huge blurred elements
- **File:** `src/components/landing/Hero.tsx:14-18`
- **Problem:** Even with `pointer-events-none` and `-z-10`, mobile GPUs struggle with `blur-[140px]` on 1600×1100 px elements. Causes jank.
- **Suggested fix:** Reduce halo dimensions on mobile (`w-[800px] h-[600px] blur-[80px]`).

### L3. `DemoSection` violet wash background `w-[1100px] h-[600px] blur-[120px]`
- **File:** `src/components/landing/DemoSection.tsx:93`
- **Suggested fix:** Same as L2 — reduce on mobile.

### L4. `CTA` section violet glow `w-[1000px] h-[600px] blur-3xl`
- **File:** `src/components/landing/CTA.tsx:10`
- **Suggested fix:** Reduce on mobile.

### L5. `FAQItem` button uses `text-[15px] md:text-[16px]` — small bump; the `pr-4` on the span forces padding but icon column is only 24 px wide
- **File:** `src/components/landing/FAQ.tsx:101-104`
- **Suggested fix:** On mobile reduce the `pr-4` to `pr-2` so the question gets more room.

### L6. `ProofMetrics` 4-col grid uses `grid-cols-2 lg:grid-cols-4` — 2x2 on mobile, OK
- **File:** `src/components/landing/ProofMetrics.tsx:21`
- **Note:** This is actually correctly responsive. Listed here as a "this is right" note for comparison.
- **Suggested fix:** None — keep as a reference.

---

## Cross-cutting observations

1. **No mobile menu component exists.** The landing page Navigation has the `mobileMenuOpen` state but no menu markup. C1 must be solved.
2. **Sidebar contract is unclear.** The (app) layout has two independent booleans (`sidebarOpen`, `mobileMenuOpen`) that control the same element. C2/C3/C4 are tangled. Suggest a single `open` state with breakpoint-aware rendering.
3. **Section padding convention is missing.** Every landing section uses `py-32 px-6`. The DESIGN TOKENS say `py-16 sm:py-20 md:py-32 px-4 sm:px-6`. This is a single global find/replace candidate (H7) that will visibly improve every landing section.
4. **Tailwind v4 + `@theme inline` works fine.** The audit didn't find any issue with the token system.
5. **The `text-display` class is not the source of overflow problems.** All overflow is from `clamp()` floors being too high or `grid-cols-N` without `md:` prefix.
6. **App pages have NO mobile breakpoints declared.** All app pages are coded as "looks fine on lg+", with no `sm:`/`md:` fallbacks. Every app page needs a pass to stack headers and add `p-4 sm:p-6` patterns.

---

## Top 5 fixes (highest impact, lowest effort)

| # | Fix | Impact | Effort |
|---|-----|--------|--------|
| 1 | **Implement the mobile menu in `Navigation.tsx`** (C1) | Mobile users can navigate | 30 min |
| 2 | **Fix the (app) sidebar with `hidden lg:flex` + a real mobile drawer** (C2, C3, C4) | All `/app/*` pages become usable | 1.5 h |
| 3 | **Add the `py-16 px-4 sm:px-6 sm:py-20 md:py-32` convention across all landing sections** (H7) | Every section breathes correctly on mobile | 30 min |
| 4 | **Make the comparison table stack on mobile** (H4) | Comparison is unreadable below 640 px | 45 min |
| 5 | **Lower the Hero/CTA/ProofMetrics/FooterMarquee `clamp()` floors** (C6, C8, H2) | All headlines fit on a phone screen | 45 min |

---

## Appendix — Files audited

### Landing components (16 files, all read)
- `Hero.tsx`, `SourceMarquee.tsx`, `HowItWorks.tsx`, `DemoSection.tsx`, `Comparison.tsx`, `WhatWeBuildFor.tsx`, `ProofMetrics.tsx`, `Features.tsx`, `Pricing.tsx`, `FAQ.tsx`, `CTA.tsx`, `FooterMarquee.tsx`, `SideNav.tsx`, `Navigation.tsx`, `Footer.tsx`, `RevealOnScroll.tsx`

### App pages (6 files, all read)
- `(app)/layout.tsx`, `(app)/page.tsx`, `(app)/discovery/page.tsx`, `(app)/digest/page.tsx`, `(app)/archive/page.tsx`, `(app)/workspace/page.tsx`, `(app)/settings/page.tsx`

### Layout / global
- `app/layout.tsx`, `app/globals.css`

### UI primitives sampled
- `components/ui/Button.tsx` (Button sizes `sm: 28 px`, `md: 36 px`, `lg: 44 px` — all meet 44 px touch target ✓ except `sm` which is 28 px, below the 44 px minimum but acceptable for inline actions)

---

**End of audit. No code was modified.**
