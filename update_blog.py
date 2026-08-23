import os

in_blog = 'src/app/blog/page.js'
us_blog = 'src/app/us/blog/page.js'

in_article = """const ARTICLES = [
  {
    href: '/blog/home-loan-with-low-cibil-score',
    tag: 'Home Loan Planning',
    tagColor: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
    title: 'How to Get a Home Loan with a Low CIBIL Score',
    excerpt: 'Having a low CIBIL score doesn\\'t mean you can\\'t buy a home. Learn the exact strategies to secure a home loan even with a score below 750.',
    readTime: '6 min read',
    cta: 'Read Guide',
    icon: <Home className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'New',
    highlightColor: 'text-[var(--color-accent)]',
  },"""
  
us_article = """const ARTICLES = [
  {
    href: '/us/blog/home-loan-with-low-credit-score',
    tag: 'Mortgage Planning',
    tagColor: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
    title: 'How to Get a Mortgage with a Low Credit Score',
    excerpt: 'Having a low FICO score doesn\\'t mean you can\\'t buy a home. Learn the exact strategies to secure a mortgage even with a score below 650.',
    readTime: '6 min read',
    cta: 'Read Guide',
    icon: <Home className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'New',
    highlightColor: 'text-[var(--color-accent)]',
  },"""

# First read and replace IN
with open(in_blog, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("const ARTICLES = [", in_article)
with open(in_blog, 'w', encoding='utf-8') as f:
    f.write(content)

# Read and replace US
with open(us_blog, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("const ARTICLES = [", us_article)
with open(us_blog, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
