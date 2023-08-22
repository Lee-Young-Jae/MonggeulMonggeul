/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "k.kakaocdn.net"],
  },
};

module.exports = nextConfig;
