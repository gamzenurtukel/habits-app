import "dotenv/config";

export default ({ config }) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    ...config,
    extra: {
      baseUrl: isDevelopment
        ? process.env.DEV_BASE_URL
        : process.env.PROD_BASE_URL,
    },
  };
};
