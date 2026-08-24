files = [
    'src/app/blog/cagr-vs-xirr-vs-absolute-return/layout.js',
    'src/app/us/blog/cagr-vs-xirr-vs-absolute-return/layout.js',
]
for f in files:
    content = open(f, encoding='utf-8').read()
    # Fix double comma after the title value
    content = content.replace("| StepupCalculator',\n  ,", "| StepupCalculator',\n")
    content = content.replace("| StepupCalculator',,", "| StepupCalculator',")
    open(f, 'w', encoding='utf-8').write(content)
    print(f"Fixed: {f}")
print("Done")
