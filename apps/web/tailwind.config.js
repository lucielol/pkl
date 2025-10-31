// import sharedConfig from "../../packages/tailwind-config/tailwind.config.js";
import sharedConfig from "@repo/tailwind-config/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};
