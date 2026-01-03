import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hostinger Deployment Settings */
  output: 'export', // स्टेटिक वेबसाइट के लिए
  images: {
    unoptimized: true, // स्टेटिक एक्सपोर्ट के लिए ज़रूरी
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nodejs.nrislawfirm.com',
        pathname: '/**', 
      },
    ],
  },
  
 
};

export default nextConfig;