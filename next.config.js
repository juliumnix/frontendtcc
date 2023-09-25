/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/getNames",
        destination: "https://pub.dev/api/package-name-completion-data",
      },
      {
        source: "/flutter/:path*",
        destination: "https://pub.dartlang.org/api/packages/:path*",
      },
    ];
  },
};
