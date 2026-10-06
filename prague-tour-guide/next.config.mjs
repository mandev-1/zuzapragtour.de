/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Build-time switches set in Netlify → Environment variables.
  env: {
    ADSENSE_ENABLED: process.env.ADSENSE_ENABLED ?? '',
  },
};

export default nextConfig;
