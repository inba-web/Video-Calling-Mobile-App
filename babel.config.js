module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // other plugins before the following
      "react-native-worklets/plugin", // Reanimated plugin has to be listed last.
    ],
  };
};
