import os

sitemap = 'src/app/sitemap.js'
with open(sitemap, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace IN guides block
old_in = """  // Indian Guides
  const inGuides = [
    '/blog/cagr-vs-xirr-vs-absolute-return',
    '/blog/common-sip-mistakes',
    '/blog/dynamic-sip',
    '/blog/flexi-sip',
    '/blog/sip-for-nris',
    '/blog/sip-vs-fd-ppf-rd',
    '/blog/sip-vs-stp',
    '/blog/sip-vs-ulip',
    '/blog/step-up-sip',
    '/blog/where-to-park-emergency-fund',
    '/blog/why-net-worth-explodes-after-1-crore',
    '/blog/swp-vs-sip',
    '/blog/trigger-sip',
    '/blog/types-of-sip'
  ];"""

new_in = """  // Indian Guides
  const inGuides = [
    '/blog/cagr-vs-xirr-vs-absolute-return',
    '/blog/common-sip-mistakes',
    '/blog/dynamic-sip',
    '/blog/flexi-sip',
    '/blog/home-loan-with-low-cibil-score',
    '/blog/sip-for-nris',
    '/blog/sip-vs-fd-ppf-rd',
    '/blog/sip-vs-stp',
    '/blog/sip-vs-ulip',
    '/blog/step-up-sip',
    '/blog/where-to-park-emergency-fund',
    '/blog/why-net-worth-explodes-after-1-crore',
    '/blog/swp-vs-sip',
    '/blog/trigger-sip',
    '/blog/types-of-sip'
  ];"""

old_us = """    '/us/blog/where-to-park-emergency-fund',
    '/us/blog/why-wealth-explodes-after-100k',"""

new_us = """    '/us/blog/home-loan-with-low-credit-score',
    '/us/blog/where-to-park-emergency-fund',
    '/us/blog/why-wealth-explodes-after-100k',"""

content = content.replace(old_in, new_in)
content = content.replace(old_us, new_us)

with open(sitemap, 'w', encoding='utf-8') as f:
    f.write(content)

print("Sitemap updated!")
