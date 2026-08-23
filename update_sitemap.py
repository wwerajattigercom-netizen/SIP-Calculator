import os

sitemap = 'src/app/sitemap.js'

in_sitemap_add = """      '/blog/where-to-park-emergency-fund',
      '/blog/home-loan-with-low-cibil-score',"""
      
us_sitemap_add = """      '/us/blog/where-to-park-emergency-fund',
      '/us/blog/home-loan-with-low-credit-score',"""

with open(sitemap, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("      '/blog/where-to-park-emergency-fund',", in_sitemap_add)
content = content.replace("      '/us/blog/where-to-park-emergency-fund',", us_sitemap_add)

with open(sitemap, 'w', encoding='utf-8') as f:
    f.write(content)

tracker = 'CONTENT_TRACKER.md'
tracker_add = """- [x] net-worth-calculator
- [x] nps-calculator
- [x] ppf-calculator
- [x] retirement-calculator
- [x] rd-calculator
- [x] sip-calculator
- [x] sip-delay-calculator
- [x] sip-for-child-education
- [x] sip-for-house-down-payment
- [x] sip-to-beat-inflation
- [x] sip-to-reach-1-crore
- [x] sip-vs-lumpsum
- [x] xirr-calculator

### Guides / Blog
- [x] sip-vs-fd-ppf-rd (Comparison)
- [x] 15-15-15-rule (Strategy)
- [x] sip-vs-ulip (Comparison)
- [x] step-up-sip (Strategy)
- [x] where-to-park-emergency-fund (Strategy)
- [x] home-loan-with-low-cibil-score (Strategy)
- [x] why-net-worth-explodes-after-1-crore (Strategy)"""

with open(tracker, 'r', encoding='utf-8') as f:
    content = f.read()
    
# Let's just find the exact spot in the tracker to insert this.
# I will use a simple regex replacement.
import re
content = re.sub(r'### Guides / Blog.*?why-net-worth-explodes-after-1-crore \(Strategy\)', tracker_add, content, flags=re.DOTALL)

with open(tracker, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
