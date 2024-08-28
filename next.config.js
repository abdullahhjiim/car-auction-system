/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
          {
            protocol: "https",
            hostname: "devapi.gulfcarauction.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "api.gulfauctions.online",
            port: "",
          },
          {
            protocol: "https",
            hostname: "api.gulfcarauction.com",
            port: "",
          },
          {
            protocol: "http",
            hostname: "api.gulfcarauction.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "cs.copart.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "www.carlogos.org",
            port: "",
          },
          {
            protocol: "https",
            hostname: "gulf-car-auction.s3.me-south-1.amazonaws.com",
            port: "",
          },
        ],
    
      },
      productionBrowserSourceMaps: false,

}

module.exports = nextConfig
