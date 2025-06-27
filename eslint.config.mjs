import nx from "@nx/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  tseslint.configs.recommended,
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: [
      "**/dist",
      "**/vite.config.*.timestamp*",
      "**/vitest.config.*.timestamp*",
      "**/build",
      "**/.react-router",
    ],
  },
  // TODO: fix 'Cannot redefine plugin "import".' error
  // importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "classProperty",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
      ],
    },
  },
  // {
  //   files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts", "**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"],
  //   rules: {
  //     "import/no-unresolved": "off",
  //     "import/order": [
  //       "error",
  //       {
  //         groups: [
  //           "builtin", // Node built-ins (fs, path)
  //           "external", // node_modules packages
  //           "internal", // your internal packages like @myorg/*
  //           ["parent", "sibling", "index"], // relative imports
  //         ],
  //         pathGroups: [
  //           {
  //             pattern: "@myorg/**",
  //             group: "internal",
  //             position: "after",
  //           },
  //         ],
  //         pathGroupsExcludedImportTypes: ["builtin"],
  //         "newlines-between": "always",
  //         alphabetize: { order: "asc", caseInsensitive: true },
  //       },
  //     ],
  //   },
  // },
);

export default config;
