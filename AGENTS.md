<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# StepupCalculator — AI Master Rulebook (Command Center)

> **⚠️ CRITICAL: This is the Master Rulebook for all AI Agents working on StepupCalculator.**
> Read this fully before writing or editing ANY code. Ignorance of these rules will break the site.

## 1. Project Overview

**StepupCalculator** is a professional SIP (Systematic Investment Plan) calculator website built with Next.js 16, React 19, Tailwind CSS 4, and Chart.js. 

- **Live URL**: Deployed on Vercel (auto-deploys from `main` branch on GitHub)
- **Repo**: `https://github.com/wwerajattigercom-netizen/SIP-Calculator.git`
- **Tech Stack**: Next.js 16.2.12 (Turbopack), React 19.2.4, Tailwind CSS 4, Chart.js 4.5.1, Lucide React icons
- **Package Manager**: npm

---

## 2. 📖 The 3-File Knowledge Base (MANDATORY READING)

To prevent AI amnesia, hallucinations, or regression of previous UI fixes, you MUST check the following two documents when instructed to do so:

### 🎨 `DESIGN_SYSTEM.md` (Read before styling/building UI)
Located in the project root. It contains the exact Tailwind hex codes (`#1B3A5C` Navy, `#059669` Emerald, etc.), the rules for pie chart colors (never change them!), and the exact HTML/React structures for standardized components (like the "How to Use" grid layout). **If you are asked to fix UI or build a new calculator, you MUST read this file first.**

### 📚 `CONTENT_TRACKER.md` (Read before researching/writing content)
Located in the project root. It lists every single calculator and blog guide that already exists. **If you are asked to research new topics, write a new blog post, or suggest a new tool, you MUST read this file first to prevent duplicate content.**

---

## 3. Cross-Region Parity (US & India)

> ⚠️ **CRITICAL**: The site has two parallel tool structures: `/tools/*` (India) and `/us/tools/*` (US). 

1. **When asked to implement a change "in the US region or Indian region", the user ALWAYS means both.** Ensure feature parity across both sets of tools.
2. **Localization Rules**:
   - Currency: ₹ (India) vs $ (US)
   - Benchmarks: NIFTY 50 (India) vs S&P 500 (US)
   - Retirement accounts: PPF/EPF/NPS (India) vs 401(k)/Roth IRA (US)
3. **SEO Structure Parity**: Both regions MUST have identically structured JSON-LD schemas, FAQs, "How to Use" sections, and educational content. 
4. **Theme Parity**: Both regions must use identical HTML structures and CSS classes for their SEO blocks. Never leave one region with a generic `bg-white` theme while the other uses the beautiful `glass-panel` layout.

---

## 4. SEO Infrastructure

1. **Page Titles**: Never rename or rephrase existing SEO-optimized H1 titles or `<title>` tags without permission. They were heavily researched.
2. **Schemas**: FAQ sections MUST use `application/ld+json` structured data.
3. **Breadcrumbs**: Blog articles must use breadcrumbs via `Breadcrumb.jsx`.

4. **Canonical Domain (non-www)**: The official verified GSC property and canonical domain is `https://stepupcalculator.com` (no www). ALWAYS use this exact domain in `metadataBase`, `OG urls`, `sitemap.js`, `robots.js`, and JSON-LD structured data. NEVER use `www.stepupcalculator.com` as it causes duplicate content indexation errors.

5. **Metadata & Canonicals for Client Components (CRITICAL)**: If you create a page using `"use client";`, it CANNOT export `metadata`. Therefore, you MUST ALWAYS create a sibling `layout.js` file in that folder to export the `metadata` object (Title, Description, and `alternates: { canonical: '...' }`). If you do not do this, the client component will inherit the root metadata, causing duplicate title and canonical indexing errors in Google Search Console. Furthermore, always ensure `hreflang` paths point to their final destination, avoiding redirects.


---

## 5. Deployment & Tools

- **Platform**: Vercel (connected to GitHub repo)
- **Deployment Rule**: ⚠️ **NEVER commit directly to `main` unless explicitly instructed.** Always commit and push to the `staging` branch. Vercel will automatically create a preview deployment for `staging`.
- **Build command**: `next build` (Turbopack)
- **To deploy**: `git checkout -b staging || git checkout staging ; git add . ; git commit -m "message" ; git push origin staging`
- **Shell Commands**: The OS is Windows (PowerShell). Do not use `sed`. Do not use `cat << EOF`. Use the `write_to_file` tool API for writing multi-line scripts. Do not use `cd` commands.

---

## 6. Development Rules (Dark Mode, Regions, Navigation)

1. **Dark/Light Mode is MANDATORY:** Every single feature, component, guide, or calculator you build MUST natively support both Light Mode and Dark Mode. You must use Tailwind `dark:` variants for all backgrounds, borders, and text colors. You do not need to be told this by the user; it is a permanent requirement.
2. **US & IN Parity is MANDATORY:** When you build a new tool or guide, you MUST build it for BOTH the Indian region (`/tools` or `/blog`) and the US region (`/us/tools` or `/us/blog`). You must localize currency (₹ vs $) and terminology (e.g., PPF vs 401k) automatically.
3. **No Orphan Pages (Update Header):** Whenever you create a new calculator or tool, you MUST add it to the navigation dropdown in `src/components/Header.jsx` (for both IN and US regions). Do not just create the file and leave it inaccessible.
4. **End-to-End Execution (The SEO & Integration Rule):** When asked to build a new feature or page, you MUST handle ALL integration steps yourself. You must: (A) Create the pages for both US and IN. (B) Update the navigation dropdown in `Header.jsx`. (C) Update the region toggle mapping inside `Header.jsx` so users can switch regions without hitting a 404. (D) Add internal backlinks to other calculators. (E) Update `CONTENT_TRACKER.md`. (F) Update `src/app/sitemap.js`. Do not wait for the user to ask for these steps; they are mandatory for every new page.
5. **CRITICAL: JSX Template Literal Escaping Bug:** When writing dynamic Tailwind classes using template literals (e.g., `className={\`glass-panel \${condition ? 'active' : ''}\`}`), **do not escape the backticks** when writing via API tools. Escaping them as `{\\\`...\`}` causes fatal `Parsing ecmascript source code failed` errors during the Next.js production build. Write raw backticks.
