/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/cursos',
            destination: '/patotec',
            permanent: true,
          },
          {
            source: '/cursos/:curso',
            destination: '/patotec/:curso',
            permanent: true,
          },
        ];
      },
}

module.exports = nextConfig
