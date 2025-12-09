import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hostinger Deployment Settings */
  output: 'export',
  images: {
    unoptimized: true,
  },
  
  /* React Compiler hata diya hai taaki build error na aaye */
};

export default nextConfig;