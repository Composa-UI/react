export default {
  stories: [
    "../src/react/stories/**/*.mdx",
    "../src/react/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-mcp"],
};
