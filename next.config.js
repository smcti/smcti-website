/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/cursos',
            destination: '/patotec',
            permanent: true,
          },
        ];
      },
}

module.exports = nextConfig
