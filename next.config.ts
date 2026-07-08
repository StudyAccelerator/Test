import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Static hosting (Hostinger) serves folder/index.html — trailing slashes make
  // /blog/<slug>/ resolve correctly without server-side rewrites.
  trailingSlash: true,
}

export default nextConfig
