module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@@types": "./src/@types",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@lib": "./src/lib",
            "@assets": "./src/assets",
          },
        },
      ],
    ],
  };
};

