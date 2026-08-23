import os

filepath = 'src/components/Header.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

us_to_in_add = """   if (pathname === '/us/blog/why-wealth-explodes-after-100k') newPath = '/blog/why-net-worth-explodes-after-1-crore';
   if (pathname === '/us/blog/home-loan-with-low-credit-score') newPath = '/blog/home-loan-with-low-cibil-score';"""

in_to_us_add = """   if (pathname === '/blog/why-net-worth-explodes-after-1-crore') newPath = '/us/blog/why-wealth-explodes-after-100k';
   if (pathname === '/blog/home-loan-with-low-cibil-score') newPath = '/us/blog/home-loan-with-low-credit-score';"""

content = content.replace("   if (pathname === '/us/blog/why-wealth-explodes-after-100k') newPath = '/blog/why-net-worth-explodes-after-1-crore';", us_to_in_add)
content = content.replace("   if (pathname === '/blog/why-net-worth-explodes-after-1-crore') newPath = '/us/blog/why-wealth-explodes-after-100k';", in_to_us_add)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
