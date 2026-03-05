import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Strip node: prefix so fallbacks can handle them (TinaCMS client uses node:crypto etc.)
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource: { request: string }) => {
            resource.request = resource.request.replace(/^node:/, "");
          },
        ),
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        os: false,
        path: false,
        stream: false,
        buffer: false,
        util: false,
        url: false,
        http: false,
        https: false,
        net: false,
        tls: false,
        zlib: false,
        child_process: false,
        dns: false,
        dgram: false,
        readline: false,
        vm: false,
      };
    }
    return config;
  },
};

export default nextConfig;
