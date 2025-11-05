import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Se o repositório for username.github.io, deixe basePath vazio
  // Se for username.github.io/blog, descomente a linha abaixo
  basePath: '/blog',
};

export default nextConfig;
