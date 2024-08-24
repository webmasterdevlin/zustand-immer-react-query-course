import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import autofix from "eslint-plugin-autofix";
import reactHooks from "eslint-plugin-react-hooks";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/.eslintrc.js",
        "**/tailwind.config.js",
        "**/tsconfig.json",
        "**/vite.config.ts",
        "**/prettier.config.js",
        "**/postcss.config.cjs",
        "**/playwright.config.ts",
        "**/.DS_Store",
        "**/node_modules",
        "build",
        ".husky",
        "package",
        "**/.env",
        "**/.env.*",
        "!**/.env.example",
        "**/pnpm-lock.yaml",
        "**/package-lock.json",
        "**/yarn.lock",
    ],
}, ...fixupConfigRules(compat.extends(
    "prettier",
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
)), {
    plugins: {
        react: fixupPluginRules(react),
        prettier,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        autofix,
        "react-hooks": fixupPluginRules(reactHooks),
        "sort-keys-fix": sortKeysFix,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            typescript: {},

            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            printWidth: 120,
            bracketSpacing: true,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: "all",
            arrowParens: "avoid",
            plugins: ["prettier-plugin-tailwindcss"],
            endOfLine: "auto",
        }],

        "sort-keys-fix/sort-keys-fix": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
    },
}, {
    files: ["**/*.ts?(x)"],

    rules: {
        "prettier/prettier": ["warn", {
            printWidth: 120,
            bracketSpacing: true,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: "all",
            arrowParens: "avoid",
            plugins: ["prettier-plugin-tailwindcss"],
            endOfLine: "auto",
        }],

        "react/react-in-jsx-scope": "off",
        camelcase: "error",
        "spaced-comment": "error",
        quotes: ["error", "single"],
        "no-console": "warn",
        "no-redeclare": "warn",
        "react/display-name": "error",
        "react/jsx-key": "warn",
        "arrow-body-style": ["error", "always"],

        "react/self-closing-comp": ["error", {
            component: true,
            html: true,
        }],

        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
        }],

        "import/order": ["error", {
            groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],

            pathGroups: [{
                pattern: "@/**/**",
                group: "parent",
                position: "before",
            }],

            alphabetize: {
                order: "asc",
            },
        }],

        "no-restricted-imports": ["error", {
            patterns: ["@/**/**"],
        }],
    },
}];