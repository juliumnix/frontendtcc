/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/getNames",
        destination: "https://pub.dev/api/package-name-completion-data", // Use a URL do seu servidor proxy aqui
      },
      {
        source: "/cats",
        destination: "https://meowfacts.herokuapp.com",
      },
      {
        source: "/flutter/:path*",
        destination: "https://pub.dartlang.org/api/packages/:path*",
      },
    ];
  },
};
