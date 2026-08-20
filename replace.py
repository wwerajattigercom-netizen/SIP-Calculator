import os, glob, re
count = 0
for filepath in glob.glob('src/**/*.js', recursive=True) + glob.glob('src/**/*.jsx', recursive=True):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        orig_content = content
        
        # Remove ternary logic for accent color
        content = re.sub(r'isDark\s*\?\s*\'#1A73E8\'\s*:\s*\'#1B3A5C\'', '\'var(--color-accent)\'', content)
        
        # Replace direct hex strings globally
        content = re.sub(r'(?i)#1B3A5C', 'var(--color-accent)', content)
        content = re.sub(r'(?i)#112740', 'var(--color-accent-hover)', content)
        
        if orig_content != content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            count += 1
            print(f'Updated {filepath}')
    except Exception as e:
        print(f'Error on {filepath}: {e}')
print(f'Done. Updated {count} files.')
