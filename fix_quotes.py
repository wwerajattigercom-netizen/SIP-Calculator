import re

def fix_quotes(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We only want to replace quotes in JSX text nodes.
    # We can use a targeted replace for known contractions and possessives.
    # Words like: it's, employer's, children's, Let's
    
    replacements = [
        (r"it's", r"it&apos;s"),
        (r"employer's", r"employer&apos;s"),
        (r"children's", r"children&apos;s"),
        (r"Let's", r"Let&apos;s"),
        (r"child's", r"child&apos;s")
    ]
    
    # We will only apply these to lines > 84 (inside the component)
    lines = content.split('\n')
    for i in range(84, len(lines)):
        # Skip lines that are just JS logic, though we can be safe
        if 'className=' in lines[i] or '{`' in lines[i] or '<Breadcrumb' in lines[i]:
            continue
        
        for old, new in replacements:
            lines[i] = re.sub(old, new, lines[i])
            
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

fix_quotes('src/app/blog/elss-vs-ppf-vs-nps/page.js')
fix_quotes('src/app/us/blog/401k-vs-roth-ira-vs-traditional/page.js')
