module.exports = {
  plugins: ["promise"],
  extendsBase: ["plugin:promise/recommended"],
  rules: {
    "promise/always-return": ["off"],
    "promise/no-callback-in-promise": ["off"],
  },
};
