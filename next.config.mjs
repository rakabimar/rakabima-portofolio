/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Optimize images
  images: {
    unoptimized: false,
  },
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
};

export default nextConfig;
