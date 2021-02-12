/* @licence
Copyright 2020 KeeeX SAS

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

module.exports = {
  overrides: (presetConfig, allOptions) => {
    let config = {
      fileFilter: [
        "**/*.test.ts",
        "**/*.test.js",
        "tests/**/*.ts",
        "tests/**/*.js",
        "test/**/*.ts",
        "test/**/*.js",
      ],
      expectHelper: true,
    };
    if (typeof presetConfig === "object") {
      config = {
        ...config,
        ...presetConfig,
      };
    }
    const mochaOverride = {
      files: config.fileFilter,
      env: {mocha: true},
      extendsBase: ["plugin:mocha/recommended"],
      rules: {
        "mocha/handle-done-callback": ["error", {"ignoreSkipped": true}],
        "mocha/no-mocha-arrows": "off",
        "prefer-arrow-callback": "off",
        "mocha/prefer-arrow-callback": ["warn", {"allowUnboundThis": false}],
      },
    };
    if (config.expectHelper) {
      mochaOverride.rules["no-unused-expressions"] = "off";
      if (allOptions.typescript) {
        mochaOverride.rules["@typescript-eslint/no-unused-expressions"] = "off";
        mochaOverride.rules["@typescript-eslint/no-non-null-assertion"] = "off";
      }
    }
    return [mochaOverride];
  },
};
