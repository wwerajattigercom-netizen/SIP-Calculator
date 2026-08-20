# StepupCalculator Design System

> **This is the Visual & Component Bible for StepupCalculator.**
> All UI changes must conform strictly to these patterns. Do not invent new components if one already exists here.

## 1. Global Theme
- **Background color**: `#f8f2ea` (warm cream) — applied globally via `globals.css`
- **Glass Panels**: All major content blocks must use the `glass-panel` class (defined in `globals.css`).
  - Example: `<div className="glass-panel p-6 md:p-8 rounded-3xl">`
- **Wrappers**: Standard bottom-page content (FAQ, Education) should be wrapped in `<div className="max-w-6xl w-full mx-auto">`. *Never use `max-w-4xl` for these wrappers.*

## 2. Color Palette & Typography

### Primary Colors
| Purpose | Color Name | Hex | Usage |
|---------|------------|-----|-------|
| Primary | Dark Navy | `var(--color-accent)` | Invested amounts, slider fills, buttons, dot indicators, pie chart invested slice |
| Returns | Emerald | `#059669` | Earned/gains amount text. *Never use teal (`#0D9488`)* |
| Gains (Chart) | Dark Gold | `#C4993C` | Pie chart returns slice, line chart secondary lines |
| Text | Charcoal | `#1F2937` | Headings, labels, total amounts |
| Subtle | Gray | `#6B7280` | Use Tailwind `text-gray-500 dark:text-gray-400` for descriptions |
| Loss | Dark Red | `#991B1B` | Negative returns, warnings. *Never use `#DC2626`* |

### Amount Text Rules
When rendering calculated numbers, the text color must correspond to the semantic meaning:
- **Total Corpus / Future Value**: `text-foreground` or `text-[#1F2937]` (Black/Charcoal)
- **Invested Amount**: `text-[var(--color-accent)]` or `text-[var(--color-accent)]` (Navy Blue)
- **Earned Returns / Wealth Gained**: `text-[var(--color-returns)]` or `text-[#059669]` (Green)
- **Loss / Cost of Delay**: `text-[var(--color-loss)]` or `text-[#991B1B]` (Dark Red)

### Buttons
- **Primary**: `bg-[var(--color-accent)] text-white hover:bg-[#112740]`
- **Secondary**: `border border-[var(--color-accent)]/40 text-[var(--color-accent)]`
- **Rule**: Whenever there is a blue background, text MUST be white.

---

## 3. Standardized Components

### 3.1 "How to Use This Calculator" Section
All calculators (US & IN) must use this exact grid layout for their "How to Use" section. Do NOT use `ol.list-decimal` for this.

```jsx
import { Info } from 'lucide-react';

{/* ── HOW TO USE ── */}
<section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
  <div className="flex items-center gap-3 mb-8">
    <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
      <Info className="w-5 h-5 text-[var(--color-accent)]" />
    </div>
    <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Step 1 */}
    <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
        1
      </div>
      <div>
        <p className="text-foreground font-semibold mb-1 text-sm">Adjust the inputs</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Use the sliders or text boxes to enter your specific financial numbers.</p>
      </div>
    </div>
    
    {/* Step 2 */}
    <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
        2
      </div>
      <div>
        <p className="text-foreground font-semibold mb-1 text-sm">Review the charts</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</p>
      </div>
    </div>

    {/* Step 3 */}
    <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
        3
      </div>
      <div>
        <p className="text-foreground font-semibold mb-1 text-sm">Analyze the results</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</p>
      </div>
    </div>

  </div>
</section>
```

### 3.2 Dynamic "Empty Space" Fillers
If a calculator has empty visual space, fill it with dynamic educational blocks rather than static text.
- **Example 1 (Roth IRA)**: "100% Tax-Free Advantage" block (using `#059669` Emerald Green) that calculates and displays the exact 15% capital gains tax saved.
- **Example 2 (Retirement)**: "High Cost of Waiting" block (using `#991B1B` Dark Red) that calculates the lost compound interest of delaying investment by 5 years.

### 3.3 FAQ Sections
FAQ sections must use `<details>` or custom accordion buttons (like `ChevronDown` from Lucide), and must ALWAYS be paired with `application/ld+json` structured schema data injected via `dangerouslySetInnerHTML`.
