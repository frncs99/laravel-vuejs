/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier/skip-formatting",
    ],
    rules: {
        "vue/multi-word-component-names": 0,
    },
};