import os

files = [
    ('src/app/blog/why-net-worth-explodes-after-1-crore/page.js', '/blog'),
    ('src/app/us/blog/why-wealth-explodes-after-100k/page.js', '/us/blog')
]

for filepath, blog_href in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace the outer wrapper
    old_wrapper = '''<div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">'''
      
    new_wrapper = '''<main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">'''
      
    content = content.replace(old_wrapper, new_wrapper)
    
    # 2. Close <main> at the end instead of <div>
    # Find the last 2 </div> tags
    # The file ends with:
    #     </div>
    #   );
    # }
    content = content.replace('    </div>\n    </div>\n  );\n}', '    </div>\n    </main>\n  );\n}')
    
    # 3. Add glass-panel inside the max-w-4xl div
    # Right after Breadcrumb, I'll open <div className="glass-panel ...">
    # Wait, the breadcrumb looks like:
    #         <Breadcrumb 
    #           items={[
    #             { label: 'Guides', href: '/blog' },
    #             { label: 'The 1 Crore Milestone', href: '#' }
    #           ]} 
    #         />
    # Let's replace the breadcrumb entirely to fix the href='#' issue and add the glass-panel open tag.
    
    if '1 Crore' in content:
        old_breadcrumb = '''<Breadcrumb 
          items={[
            { label: 'Guides', href: '/blog' },
            { label: 'The 1 Crore Milestone', href: '#' }
          ]} 
        />'''
        new_breadcrumb = f'''<Breadcrumb items={{{{[{{ label: 'Guides', href: '{blog_href}' }}, {{ label: 'The 1 Crore Milestone' }}]}}}} />
        
        <div className="glass-panel p-6 sm:p-10 md:p-12 mt-6 rounded-3xl">'''
        content = content.replace(old_breadcrumb, new_breadcrumb)
    else:
        old_breadcrumb = '''<Breadcrumb 
          items={[
            { label: 'Guides', href: '/us/blog' },
            { label: 'The $100k Milestone', href: '#' }
          ]} 
        />'''
        new_breadcrumb = f'''<Breadcrumb items={{{{[{{ label: 'Guides', href: '{blog_href}' }}, {{ label: 'The $100k Milestone' }}]}}}} />
        
        <div className="glass-panel p-6 sm:p-10 md:p-12 mt-6 rounded-3xl">'''
        content = content.replace(old_breadcrumb, new_breadcrumb)

    # Now close the glass panel right before the closing main div
    # Wait, the structure is:
    # <main>
    #   <div max-w-4xl>
    #     <Breadcrumb>
    #     <div glass-panel>
    #        <header>
    #        <article>
    #     </div>
    #   </div>
    # </main>
    
    content = content.replace('        </article>\n      </div>\n    </main>', '        </article>\n        </div>\n      </div>\n    </main>')

    # Fix the missing space between the Title and the Date
    # Also I'll make the header text centered to look beautiful
    content = content.replace('<header className="mb-12">', '<header className="mb-12 text-center">')
    content = content.replace('<div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">', '<div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">')
    
    # Increase the padding and change the background of the bottom CTA to make it pop inside the glass panel
    content = content.replace('className="bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-2xl p-8 text-center mt-12"', 'className="bg-background border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-10 text-center mt-16 shadow-sm"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
