import type {NextConfig} from "next";
const repo="hindu-mythology-knowledge-base";
const isPages=process.env.GITHUB_PAGES==="true";
const nextConfig:NextConfig={
 output:"export",
 trailingSlash:true,
 images:{unoptimized:true},
 ...(isPages?{basePath:`/${repo}`,assetPrefix:`/${repo}/`}:{})
};
export default nextConfig;
