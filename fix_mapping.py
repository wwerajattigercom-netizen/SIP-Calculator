import os

filepath = 'src/components/Header.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

us_to_in_add = """   if (pathname === '/us/tools/auto-loan-calculator') newPath = '/tools/car-loan-calculator';
   if (pathname === '/us/blog/why-wealth-explodes-after-100k') newPath = '/blog/why-net-worth-explodes-after-1-crore';"""

in_to_us_add = """   if (pathname === '/tools/car-loan-calculator') newPath = '/us/tools/auto-loan-calculator';
   if (pathname === '/blog/why-net-worth-explodes-after-1-crore') newPath = '/us/blog/why-wealth-explodes-after-100k';"""

content = content.replace("   if (pathname === '/us/tools/auto-loan-calculator') newPath = '/tools/car-loan-calculator';", us_to_in_add)
content = content.replace("   if (pathname === '/tools/car-loan-calculator') newPath = '/us/tools/auto-loan-calculator';", in_to_us_add)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
