import os

files = [
    'src/app/blog/why-net-worth-explodes-after-1-crore/page.js',
    'src/app/us/blog/why-wealth-explodes-after-100k/page.js'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Fix the corrupted Rupee symbol
    content = content.replace(',1', '₹')
    content = content.replace('?', '—')
    content = content.replace('—', '•') 
    
    # Let's just do a manual search and replace for the exact known corruptions
    content = content.replace(',110', '₹10')
    content = content.replace(',11', '₹1')
    content = content.replace(',12', '₹2')
    content = content.replace(',13', '₹3')
    content = content.replace(',14', '₹4')
    content = content.replace(',130', '₹30')
    content = content.replace(',112', '₹12')
    content = content.replace(',140', '₹40')
    content = content.replace(',18', '₹8')
    content = content.replace(',10', '₹0')
    content = content.replace('hustle—"freelance', 'hustle—freelance')
    content = content.replace('<span>—</span>', '<span>•</span>')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
