const _config = {
  server: process.env.NEXT_PUBLIC_SERVER_URL,
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  loaderUrl: process.env.NEXT_PUBLIC_LOADER_URL,
  platform: process.env.NEXT_PUBLIC_PLATFORM,
};

export const config = Object.freeze(_config);
