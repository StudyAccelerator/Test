import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Static export: trailing slashes make /blog/<slug>/ resolve to folder/index.html
  // without server-side rewrites.
  trailingSlash: true,
}

export default nextConfig
