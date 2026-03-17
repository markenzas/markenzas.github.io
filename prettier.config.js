/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  singleQuote: false,
  semi: true,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
};
