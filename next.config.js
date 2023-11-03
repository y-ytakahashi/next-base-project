/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        // TODO Ex ポケモン 動作検証が終わったら消す
        hostname: "raw.githubusercontent.com"
      },
      {
        // TODO Ex ポケモン 動作検証が終わったら消す
        hostname: "assets.pokemon.com"
      }
    ]
  }
};

module.exports = nextConfig;
