// tailwind config is required for editor support
import sharedConfig from "@vapotertn/tailwind-config/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./**/*.{js,ts,jsx,tsx}", "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}"],
  presets: [sharedConfig],
};

export default config;
