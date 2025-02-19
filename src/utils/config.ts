const _config = {
  server: process.env.NEXT_PUBLIC_SERVER_URL,
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  loaderUrl: process.env.NEXT_PUBLIC_LOADER_URL,
  platform: process.env.NEXT_PUBLIC_PLATFORM,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  cloud_api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  mongo_url: process.env.NEXT_PUBLIC_MONGODB_URI,
};

export const config = Object.freeze(_config);
