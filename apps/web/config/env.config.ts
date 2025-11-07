export const env = {
  api: {
    next_public_api_url: process.env.NEXT_PUBLIC_API_URL,
  },
  auth: {
    cookie_secure: process.env.COOKIE_SECURE,
    cookie_samesite: process.env.COOKIE_SAMESITE,
  },
};

export const isProduction = process.env.NODE_ENV === "production";
