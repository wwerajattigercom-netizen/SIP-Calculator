import os, re

# Manually correct the titles that have em-dash or apostrophe issues
FIXES = {
    'src/app/blog/cagr-vs-xirr-vs-absolute-return/layout.js': {
        'bad':  "title: 'CAGR vs XIRR vs Absolute Return",
        'good': "title: 'CAGR vs XIRR vs Absolute Return - The Ultimate Guide | StepupCalculator",
    },
    'src/app/us/blog/cagr-vs-xirr-vs-absolute-return/layout.js': {
        'bad':  "title: 'CAGR vs XIRR vs Absolute Return",
        'good': "title: 'CAGR vs XIRR vs Absolute Return - The Ultimate Guide | StepupCalculator",
    },
    'src/app/us/blog/why-wealth-explodes-after-100k/layout.js': {
        'bad':  None,  # Regenerate cleanly
        'good': None,
    },
}

# For the CAGR files: fix the truncated title line
for path, fix in FIXES.items():
    if fix['bad'] is None:
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find the broken title line pattern and replace entirely
    content = re.sub(
        r"title: '[^']*",
        fix['good'],
        content,
        count=1
    )
    # The line after has a ', we need to close it cleanly
    # The regex leaves the rest of the broken string, so let's rebuild:
    # Pattern: title: '...<broken rest of line>'  ->  title: 'GOOD_VALUE',
    content = re.sub(
        r"(title: 'CAGR vs XIRR vs Absolute Return - The Ultimate Guide \| StepupCalculator).*?'",
        r"\1',",
        content,
        flags=re.DOTALL,
        count=1
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed: {path}")

# Regenerate the why-wealth-explodes US layout cleanly
us_100k = 'src/app/us/blog/why-wealth-explodes-after-100k/layout.js'
content = """export const metadata = {
  title: "Why Wealth Explodes After $100k (Charlie Munger's Secret) | StepupCalculator",
  description: "Charlie Munger famously said the first $100k is a b*tch. Discover the math behind why wealth explodes after $100k and how compounding takes over.",
  robots: 'index, follow',
  authors: [{ name: 'Rajat' }],
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/why-wealth-explodes-after-100k',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/why-net-worth-explodes-after-1-crore',
      'en-US': 'https://stepupcalculator.com/us/blog/why-wealth-explodes-after-100k',
      'x-default': 'https://stepupcalculator.com/blog/why-net-worth-explodes-after-1-crore',
    },
  },
  openGraph: {
    title: "Why Wealth Explodes After $100k | StepupCalculator",
    description: "The math behind why wealth explodes after $100k and how compounding takes over.",
    url: 'https://stepupcalculator.com/us/blog/why-wealth-explodes-after-100k',
    type: 'article',
    locale: 'en_US',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};
export default function Layout({ children }) { return children; }
"""
with open(us_100k, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Regenerated: {us_100k}")

# Also fix the sip-vs-ulip layout (had NO_CANONICAL flag)
sip_ulip = 'src/app/blog/sip-vs-ulip/layout.js'
content = """export const metadata = {
  title: 'SIP vs ULIP: Which is the Better Investment? | StepupCalculator',
  description: 'SIP vs ULIP comparison guide for Indian investors. Understand the real difference in returns, costs, and flexibility between Mutual Fund SIPs and ULIPs.',
  robots: 'index, follow',
  authors: [{ name: 'Rajat' }],
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/sip-vs-ulip',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/sip-vs-ulip',
      'en-US': 'https://stepupcalculator.com/us/blog/dca-vs-ulip',
      'x-default': 'https://stepupcalculator.com/blog/sip-vs-ulip',
    },
  },
  openGraph: {
    title: 'SIP vs ULIP: Which is Better? | StepupCalculator',
    description: 'The definitive SIP vs ULIP comparison for India — costs, returns, flexibility explained simply.',
    url: 'https://stepupcalculator.com/blog/sip-vs-ulip',
    type: 'article',
    locale: 'en_IN',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};
export default function Layout({ children }) { return children; }
"""
with open(sip_ulip, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Fixed: {sip_ulip}")

# Fix dca-vs-ulip layout (had NO_CANONICAL flag)
dca_ulip = 'src/app/us/blog/dca-vs-ulip/layout.js'
content = """export const metadata = {
  title: 'DCA vs Variable Annuities: Which is the Better Investment? | StepupCalculator',
  description: 'DCA vs Variable Annuity comparison for US investors. Understand the real difference in returns, costs, and flexibility.',
  robots: 'index, follow',
  authors: [{ name: 'Rajat' }],
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/dca-vs-ulip',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/sip-vs-ulip',
      'en-US': 'https://stepupcalculator.com/us/blog/dca-vs-ulip',
      'x-default': 'https://stepupcalculator.com/blog/sip-vs-ulip',
    },
  },
  openGraph: {
    title: 'DCA vs Variable Annuities | StepupCalculator',
    description: 'Costs, returns, flexibility — DCA vs Variable Annuities explained simply for US investors.',
    url: 'https://stepupcalculator.com/us/blog/dca-vs-ulip',
    type: 'article',
    locale: 'en_US',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};
export default function Layout({ children }) { return children; }
"""
with open(dca_ulip, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Fixed: {dca_ulip}")

print("\nAll encoding fixes applied!")
