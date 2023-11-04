/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "fakestoreapi.com",
          port: "",
          pathname: "/img/**",
        },
        {
          protocol: "https",
          hostname: "wu7lxkjnut3huqma.public.blob.vercel-storage.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  