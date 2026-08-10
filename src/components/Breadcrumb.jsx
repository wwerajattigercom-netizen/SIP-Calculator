import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb — renders both visible crumbs and BreadcrumbList JSON-LD schema.
 * @param {Array<{label: string, href?: string}>} items  Last item has no href (current page)
 */
export default function Breadcrumb({ items }) {
  const all = [{ label: 'Home', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://stepupcalculator.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-500 mb-4 flex-wrap">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#1B3A5C] transition-colors flex items-center gap-1"
              >
                {i === 0 && <Home className="w-3 h-3" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
