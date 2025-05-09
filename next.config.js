/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cursos",
        destination: "/patotech",
        permanent: true,
      },
      {
        source: "/patotec",
        destination: "/patotech",
        permanent: true,
      },
      {
        source: "/cursos/:curso",
        destination: "/patotech/:curso",
        permanent: true,
      },
      {
        source: "/patotec/:curso",
        destination: "/patotech/:curso",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
