/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // India Tools
      { source: '/blog/cost-of-delay-calculator', destination: '/tools/cost-of-delay-calculator', permanent: true },
      { source: '/blog/sip-based-on-salary', destination: '/tools/sip-based-on-salary', permanent: true },
      { source: '/blog/retirement-sip-calculator', destination: '/tools/retirement-sip-calculator', permanent: true },
      { source: '/blog/sip-vs-lumpsum', destination: '/tools/sip-vs-lumpsum', permanent: true },
      { source: '/blog/sip-to-beat-inflation', destination: '/tools/sip-to-beat-inflation', permanent: true },
      { source: '/blog/sip-for-child-education', destination: '/tools/sip-for-child-education', permanent: true },
      { source: '/blog/sip-for-house-down-payment', destination: '/tools/sip-for-house-down-payment', permanent: true },
      { source: '/blog/sip-during-market-crash', destination: '/tools/sip-during-market-crash', permanent: true },
      { source: '/blog/sip-to-reach-1-crore', destination: '/tools/sip-to-reach-1-crore', permanent: true },
      // US Tools
      { source: '/us/blog/cost-of-delay-calculator', destination: '/us/tools/cost-of-delay-calculator', permanent: true },
      { source: '/us/blog/dca-based-on-salary', destination: '/us/tools/dca-based-on-salary', permanent: true },
      { source: '/us/blog/retirement-dca-calculator', destination: '/us/tools/retirement-dca-calculator', permanent: true },
      { source: '/us/blog/dca-vs-lumpsum', destination: '/us/tools/dca-vs-lumpsum', permanent: true },
      { source: '/us/blog/dca-to-beat-inflation', destination: '/us/tools/dca-to-beat-inflation', permanent: true },
      { source: '/us/blog/dca-for-child-education', destination: '/us/tools/dca-for-child-education', permanent: true },
      { source: '/us/blog/dca-for-house-down-payment', destination: '/us/tools/dca-for-house-down-payment', permanent: true },
      { source: '/us/blog/dca-during-market-crash', destination: '/us/tools/dca-during-market-crash', permanent: true },
      { source: '/us/blog/dca-to-reach-1-million', destination: '/us/tools/dca-to-reach-1-million', permanent: true },
    ];
  }
};

export default nextConfig;
