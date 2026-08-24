import os

# ============================================================
# MAPPING: IN slug -> US slug (for hreflang cross-linking)
# ============================================================
IN_TO_US = {
    'cagr-vs-xirr-vs-absolute-return': 'cagr-vs-xirr-vs-absolute-return',
    'common-sip-mistakes':             'common-dca-mistakes',
    'dynamic-sip':                     'dynamic-dca',
    'flexi-sip':                       'flexi-dca',
    'home-loan-with-low-cibil-score':  'home-loan-with-low-credit-score',
    'sip-for-nris':                    'dca-for-expats',
    'sip-vs-fd-ppf-rd':                'dca-vs-fd-ppf-rd',
    'sip-vs-stp':                      'dca-vs-stp',
    'sip-vs-ulip':                     'dca-vs-ulip',
    'step-up-sip':                     'step-up-dca',
    'swp-vs-sip':                      'swp-vs-dca',
    'trigger-sip':                     'trigger-dca',
    'types-of-sip':                    'types-of-dca',
    'where-to-park-emergency-fund':    'where-to-park-emergency-fund',
    'why-net-worth-explodes-after-1-crore': 'why-wealth-explodes-after-100k',
}

# ============================================================
# TITLE/DESC MAP for articles missing layout.js entirely
# ============================================================
IN_META = {
    'common-sip-mistakes': {
        'title': "7 Common SIP Mistakes to Avoid | StepupCalculator",
        'desc':  "Avoid these 7 common SIP mistakes that cost Indian investors crores. From stopping SIP during crashes to ignoring step-ups, learn what not to do.",
    },
    'dynamic-sip': {
        'title': "Dynamic SIP: The Smarter Way to Invest | StepupCalculator",
        'desc':  "What is a Dynamic SIP and how is it different from a regular SIP? Learn how to automatically increase your SIP during market dips to maximize returns.",
    },
    'flexi-sip': {
        'title': "Flexi SIP: Invest More When Markets Fall | StepupCalculator",
        'desc':  "Flexi SIPs let you automatically invest more during market corrections. A complete guide to how Flexi SIPs work and when to use them.",
    },
    'sip-for-nris': {
        'title': "SIP for NRIs: How to Invest in Indian Mutual Funds from Abroad | StepupCalculator",
        'desc':  "Complete guide for NRIs wanting to invest in India via SIP. Learn about NRE/NRO accounts, FATCA compliance, and the best funds for NRI investors.",
    },
    'sip-vs-stp': {
        'title': "SIP vs STP: Which is Right for You? | StepupCalculator",
        'desc':  "SIP vs STP: What is the difference between a Systematic Investment Plan and a Systematic Transfer Plan? Which should you choose to build wealth?",
    },
    'step-up-sip': {
        'title': "Step-Up SIP: The Ultimate Wealth Builder Strategy | StepupCalculator",
        'desc':  "Learn how increasing your SIP by 10% every year (Step-Up SIP) can dramatically boost your final corpus. A complete guide with worked examples.",
    },
    'swp-vs-sip': {
        'title': "SWP vs SIP: Building Wealth vs Creating Income | StepupCalculator",
        'desc':  "Understand the difference between SWP (Systematic Withdrawal Plan) and SIP (Systematic Investment Plan). Which is right for your stage of life?",
    },
    'trigger-sip': {
        'title': "Trigger SIP: Automate Your Investing at Market Lows | StepupCalculator",
        'desc':  "What is a Trigger SIP? Learn how to set automatic investment triggers based on index levels or NAV drops to buy more units during market corrections.",
    },
    'types-of-sip': {
        'title': "7 Types of SIPs in India Explained | StepupCalculator",
        'desc':  "Regular, Step-Up, Flexi, Trigger, Perpetual, Multi-SIP — a complete guide to all types of SIPs available in India with examples.",
    },
    'where-to-park-emergency-fund': {
        'title': "Where to Park Your Emergency Fund in India | StepupCalculator",
        'desc':  "Liquid fund? High-yield savings account? FD? A complete guide on the best places to park your emergency fund for safety, liquidity, and returns.",
    },
    'why-net-worth-explodes-after-1-crore': {
        'title': "Why Net Worth Explodes After 1 Crore | StepupCalculator",
        'desc':  "Discover the math and psychology behind why reaching your first 1 crore is the hardest part of investing, and how the power of compounding takes over afterward.",
    },
}

US_META = {
    'common-dca-mistakes': {
        'title': "7 Common DCA Mistakes to Avoid | StepupCalculator",
        'desc':  "Avoid these 7 common Dollar Cost Averaging mistakes. From stopping investments during crashes to ignoring step-ups, learn what not to do.",
    },
    'dca-for-expats': {
        'title': "DCA for US Expats: How to Invest in the US from Abroad | StepupCalculator",
        'desc':  "Complete guide for US expats wanting to invest back in America via DCA. Learn about brokerage accounts, FBAR compliance, and the best strategies.",
    },
    'dca-vs-stp': {
        'title': "DCA vs STP: Which is Right for You? | StepupCalculator",
        'desc':  "DCA vs STP: What is the difference between Dollar Cost Averaging and a Systematic Transfer Plan? Which should you choose to build wealth?",
    },
    'dynamic-dca': {
        'title': "Dynamic DCA: The Smarter Way to Invest | StepupCalculator",
        'desc':  "What is Dynamic Dollar Cost Averaging and how is it different from regular DCA? Learn how to automatically invest more during market dips to maximize returns.",
    },
    'flexi-dca': {
        'title': "Flexi DCA: Invest More When Markets Fall | StepupCalculator",
        'desc':  "Flexi DCA lets you automatically invest more during market corrections. A complete guide to how variable DCA works and when to use it.",
    },
    'step-up-dca': {
        'title': "Step-Up DCA: The Ultimate Wealth Builder Strategy | StepupCalculator",
        'desc':  "Learn how increasing your monthly investment by 10% every year (Step-Up DCA) can dramatically boost your final corpus. A complete guide with worked examples.",
    },
    'swp-vs-dca': {
        'title': "SWP vs DCA: Building Wealth vs Creating Income | StepupCalculator",
        'desc':  "Understand the difference between a Systematic Withdrawal Plan and Dollar Cost Averaging. Which is right for your stage of life?",
    },
    'trigger-dca': {
        'title': "Trigger DCA: Automate Your Investing at Market Lows | StepupCalculator",
        'desc':  "What is a Trigger DCA? Learn how to set automatic investment triggers based on index levels or price drops to buy more units during market corrections.",
    },
    'types-of-dca': {
        'title': "7 Types of DCA Strategies Explained | StepupCalculator",
        'desc':  "Regular, Step-Up, Flexi, Trigger, Value Averaging — a complete guide to all types of Dollar Cost Averaging strategies with examples.",
    },
    'where-to-park-emergency-fund': {
        'title': "Where to Park Your Emergency Fund in the US | StepupCalculator",
        'desc':  "HYSA? Money Market Fund? T-Bills? A complete guide on the best places to park your emergency fund for safety, liquidity, and returns.",
    },
    'why-wealth-explodes-after-100k': {
        'title': "Why Wealth Explodes After $100k (Charlie Munger's Secret) | StepupCalculator",
        'desc':  "Charlie Munger famously said the first $100k is a b*tch. Discover the math behind why wealth explodes after $100k and how compounding takes over.",
    },
}

BASE = 'https://stepupcalculator.com'

def layout_content(canonical_path, us_canonical_path, title, desc):
    in_url  = f"{BASE}{canonical_path}"
    us_url  = f"{BASE}{us_canonical_path}"
    return f"""export const metadata = {{
  title: '{title}',
  description: '{desc}',
  robots: 'index, follow',
  authors: [{{ name: 'Rajat' }}],
  alternates: {{
    canonical: '{in_url}',
    languages: {{
      'en-IN': '{in_url}',
      'en-US': '{us_url}',
      'x-default': '{in_url}',
    }},
  }},
  openGraph: {{
    title: '{title}',
    description: '{desc}',
    url: '{in_url}',
    type: 'article',
    locale: 'en_IN',
    siteName: 'StepupCalculator',
    images: [{{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }}],
  }},
}};
export default function Layout({{ children }}) {{ return children; }}
"""

def us_layout_content(us_canonical_path, in_canonical_path, title, desc):
    in_url  = f"{BASE}{in_canonical_path}"
    us_url  = f"{BASE}{us_canonical_path}"
    return f"""export const metadata = {{
  title: '{title}',
  description: '{desc}',
  robots: 'index, follow',
  authors: [{{ name: 'Rajat' }}],
  alternates: {{
    canonical: '{us_url}',
    languages: {{
      'en-IN': '{in_url}',
      'en-US': '{us_url}',
      'x-default': '{in_url}',
    }},
  }},
  openGraph: {{
    title: '{title}',
    description: '{desc}',
    url: '{us_url}',
    type: 'article',
    locale: 'en_US',
    siteName: 'StepupCalculator',
    images: [{{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }}],
  }},
}};
export default function Layout({{ children }}) {{ return children; }}
"""

# ---- Fix all IN blog articles ----
for in_slug, us_slug in IN_TO_US.items():
    folder = f"src/app/blog/{in_slug}"
    layout_path = os.path.join(folder, 'layout.js')
    in_path  = f"/blog/{in_slug}"
    us_path  = f"/us/blog/{us_slug}"
    
    # Get title/desc if we have them
    meta = IN_META.get(in_slug)
    if meta:
        title = meta['title']
        desc  = meta['desc']
    else:
        # Read existing layout.js for title/desc
        if os.path.exists(layout_path):
            existing = open(layout_path, 'r', encoding='utf-8').read()
            # We'll just overwrite with our canonical structure + keep existing title/desc if parseable
            # For simplicity, extract title line
            import re
            t = re.search(r"title:\s*['\"](.+?)['\"]", existing)
            d = re.search(r"description:\s*[\n\r\s]*['\"](.+?)['\"]", existing, re.DOTALL)
            title = t.group(1) if t else in_slug.replace('-', ' ').title()
            desc  = d.group(1) if d else ''
        else:
            title = in_slug.replace('-', ' ').title()
            desc  = ''
    
    content = layout_content(in_path, us_path, title, desc)
    os.makedirs(folder, exist_ok=True)
    with open(layout_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  [IN] Written: {layout_path}")

# ---- Fix all US blog articles ----
US_TO_IN = {v: k for k, v in IN_TO_US.items()}
for us_slug in os.listdir("src/app/us/blog"):
    us_folder = f"src/app/us/blog/{us_slug}"
    if not os.path.isdir(us_folder):
        continue
    layout_path = os.path.join(us_folder, 'layout.js')
    us_path  = f"/us/blog/{us_slug}"
    in_slug  = US_TO_IN.get(us_slug, us_slug)
    in_path  = f"/blog/{in_slug}"

    meta = US_META.get(us_slug)
    if meta:
        title = meta['title']
        desc  = meta['desc']
    else:
        if os.path.exists(layout_path):
            existing = open(layout_path, 'r', encoding='utf-8').read()
            import re
            t = re.search(r"title:\s*['\"](.+?)['\"]", existing)
            d = re.search(r"description:\s*[\n\r\s]*['\"](.+?)['\"]", existing, re.DOTALL)
            title = t.group(1) if t else us_slug.replace('-', ' ').title()
            desc  = d.group(1) if d else ''
        else:
            title = us_slug.replace('-', ' ').title()
            desc  = ''

    content = us_layout_content(us_path, in_path, title, desc)
    os.makedirs(us_folder, exist_ok=True)
    with open(layout_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  [US] Written: {layout_path}")

print("\nAll blog layout.js files updated!")
