export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/icon',
          '/apple-icon',
          '/favicon.ico',
          '/_next/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://stepupcalculator.com/sitemap.xml',
  };
}
