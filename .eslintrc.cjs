/* eslint-env node */
module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
    ],
    "env": {
        "vue/setup-compiler-macros": true
    },
    rules: {
        indent: ["warn", 4],
        'vue/multi-word-component-names': 'off',
        'vue/no-mutating-props': 'off',
    },
}
