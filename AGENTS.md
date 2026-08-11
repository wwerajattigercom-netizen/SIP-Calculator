<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# StepupCalculator — Project Context & Design System

> **This file is the single source of truth for AI agents working on this project.**
> Read it fully before making ANY changes. Violating these rules will break the site's visual consistency.

## 1. Project Overview

**StepupCalculator** is a professional SIP (Systematic Investment Plan) calculator website built with Next.js 16, React 19, Tailwind CSS 4, and Chart.js. It helps Indian investors plan SIP investments with advanced features like step-up SIP, inflation adjustment, lump sum, CAGR calculation, and goal-based planning.

- **Live URL**: Deployed on Vercel (auto-deploys from `main` branch on GitHub)
- **Repo**: `https://github.com/wwerajattigercom-netizen/SIP-Calculator.git`
- **Tech Stack**: Next.js 16.2.12 (Turbopack), React 19.2.4, Tailwind CSS 4, Chart.js 4.5.1, Lucide React icons
- **Package Manager**: npm

---

## 2. Design System — STRICT COLOR RULES

> ⚠️ **CRITICAL**: The user is extremely particular about color consistency. If you change a color on one page, it MUST be changed on ALL pages. Never change pie chart colors. Never change SEO titles.

### 2.1 Global Background
- **Background color**: `#f8f2ea` (warm cream) — applied globally via `globals.css`
- All card backgrounds use `bg-[#f8f2ea]` for the stat cards inside glass panels
- Glass panels use `glass-panel` CSS class (defined in `globals.css`)

### 2.2 Primary Colors
| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Navy Blue (Primary) | Dark Navy | `#1B3A5C` | Invested amounts, slider fills, buttons, dot indicators |
| Gold/Yellow | Dark Gold | `#C4993C` | Earned/Returns dot indicator, pie chart slice |
| Green (Returns) | Emerald | `#059669` | Earned/gains amount text |
| Dark Text | Charcoal | `#1F2937` | Headings, labels, total amounts |
| Subtle Text | Gray | `text-gray-500` / `#6B7280` | Descriptions, sub-labels |
| Dark Red (Loss) | Dark Red | `#991B1B` | Negative returns, warnings, loss indicators |

### 2.3 Amount Text Color Rules (NEVER VIOLATE)
| Label | Text Color | Class |
|-------|-----------|-------|
| **Total / Future Value / Goal Corpus** | Black | `text-black` or `text-[#1F2937]` |
| **Invested / Total Invested** | Navy Blue | `text-[#1B3A5C]` |
| **Earned / Returns / Gains** | Green | `text-[#059669]` |
| **Loss (negative CAGR)** | Dark Red | `text-red-800` or `text-[#991B1B]` |

### 2.4 Pie Chart Colors (NEVER CHANGE)
- **Invested slice**: Navy Blue `#1B3A5C`
- **Returns/Gains slice**: Gold `#C4993C`
- These are set in `ChartComponent.jsx` and individual calculator pages
- **DO NOT** change pie chart colors to green or any other color

### 2.5 Button Theme Rules
- **Primary buttons**: `bg-[#1B3A5C] text-white hover:bg-[#112740]`
- **Secondary/outline buttons**: `border border-[#1B3A5C]/40 text-[#1B3A5C]`
- **RULE**: Wherever there is a blue/dark background, the text MUST be white
- **RULE**: Never use teal (`#0D9488`) or bright green for primary buttons

### 2.6 Red Color
- Use `#991B1B` (dark red) — NOT `#DC2626` or `#EF4444` (too bright/unprofessional)
- Apply to: loss amounts, cost of delay badges, negative indicators, warning alerts

---

## 3. SEO — CRITICAL RULES

### 3.1 Page Titles (NEVER CHANGE)
- **Home page H1**: `SIP Calculator with Step Up, Inflation & Lump Sum`
- These titles were researched for SEO keywords. Do NOT rename or rephrase them.

### 3.2 SEO Infrastructure
- `robots.js` and `sitemap.js` exist in `src/app/`
- Each page has proper meta tags in its `metadata` export
- FAQ sections use `application/ld+json` structured data
- Blog articles have breadcrumbs via `Breadcrumb.jsx`

---

## 4. Architecture & File Structure

### 4.1 Calculator Pages
| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.js` | Main SIP Calculator (step-up, inflation, lump sum) |
| `/lumpsum-calculator` | `src/app/lumpsum-calculator/page.js` | Lump Sum Calculator |
| `/cagr-calculator` | `src/app/cagr-calculator/page.js` | CAGR Calculator |
| `/target-amount-calculator` | `src/app/target-amount-calculator/page.js` | Goal/Target Amount Calculator |

### 4.2 Blog / Investment Guides
| Route | Description |
|-------|-------------|
| `/blog` | Blog index — lists all investment guides |
| `/blog/sip-based-on-salary` | SIP by salary (50-30-20 rule) — interactive |
| `/blog/retirement-sip-calculator` | Retirement SIP planning — interactive |
| `/blog/sip-vs-lumpsum` | SIP vs Lumpsum comparison — interactive |
| `/blog/sip-to-beat-inflation` | Real vs nominal returns — interactive |
| `/blog/sip-to-reach-1-crore` | ₹1 Crore goal planning |
| `/blog/sip-for-child-education` | Child education SIP — interactive |
| `/blog/sip-for-house-down-payment` | House down payment SIP — interactive |
| `/blog/sip-during-market-crash` | SIP during crashes — interactive |
| `/blog/cagr-vs-xirr-vs-absolute-return` | Returns comparison guide |

### 4.3 Shared Components
| Component | Purpose |
|-----------|---------|
| `Header.jsx` | Site header with responsive hamburger menu for mobile |
| `CalculatorTabs.jsx` | Tab navigation: SIP / Lumpsum / Goal / CAGR |
| `InputSlider.jsx` | Styled range slider with text input |
| `ChartComponent.jsx` | Pie chart + line chart + milestones table (used by SIP & Target) |
| `ResultSection.jsx` | Results card for SIP calculator |
| `TargetResultSection.jsx` | Results card for Target/Goal calculator |
| `CAGRResultSection.jsx` | Results card for CAGR calculator |
| `TimeToGoalDisplay.jsx` | Circular arc + stats for Time-to-Goal display |
| `YearlyGrowthTable.jsx` | Year-by-year growth breakdown table |
| `Breadcrumb.jsx` | Breadcrumb navigation for blog pages |

### 4.4 Other Pages
| Route | Description |
|-------|-------------|
| `/about` | About Us page |
| `/disclaimer` | Legal disclaimer |

---

## 5. Mobile Responsiveness

- The header has a **hamburger menu** (☰) on mobile (`sm:hidden` breakpoint)
- Tapping the hamburger opens a dropdown with Home, Guides, About Us links
- Calculator tabs stack properly on mobile
- All glass panels are responsive

---

## 6. Deployment

- **Platform**: Vercel (connected to GitHub repo)
- **Auto-deploy**: Every push to `main` triggers a production build
- **Build command**: `next build` (Turbopack)
- **To deploy**: `git add . ; git commit -m "message" ; git push`

---

## 7. Common Pitfalls (Lessons Learned)

1. **Never use `text-white` on light backgrounds** — always verify contrast
2. **Never change pie chart colors** — they are ALWAYS Navy + Gold
3. **Never rename SEO-optimized page titles** — keywords were researched
4. **When changing a color, change it EVERYWHERE** — scan all pages, not just one
5. **Blue background = white text** — no exceptions for buttons and badges
6. **Avoid bright reds** — use `#991B1B` (dark red), never `#DC2626` or `#EF4444`
7. **No boring greys** — replaced with subtle navy tints like `rgba(27,58,92,0.02)`
8. **Line charts should NOT have fill** — `fill: false` to keep charts clean
9. **The `glass-panel` class** is defined in `globals.css` — don't re-invent card styling
10. **Don't add `cd` commands** — the system doesn't support them

---

## 8. Utility Scripts (in project root)

Various one-time fix scripts exist in the root (e.g., `fix_blog_themes.js`, `fix_blue_bg.js`). These were used for bulk color updates and can be safely ignored or deleted. They are NOT part of the build pipeline.
