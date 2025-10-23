import { createConfigForNuxt } from '@nuxt/eslint-config';
import antiTrojanSource from 'eslint-plugin-anti-trojan-source';
import noSecrets from 'eslint-plugin-no-secrets';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import security from 'eslint-plugin-security';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  createConfigForNuxt({
    features: {
      stylistic: {
        semi: true,
        quotes: 'single',
        indent: 2,
        commaDangle: 'always-multiline',
        quoteProps: 'as-needed',
        blockSpacing: true,
      },
    },
  }),
  // Исключения для утилитных файлов
  {
    files: ['.utils/**/*.cjs', '.utils/**/*.js'],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-object-injection': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
  // Конфигурация плагинов безопасности
  {
    files: ['**/*.{js,ts,vue}'],
    ignores: ['.utils/**/*'],
    plugins: {
      security,
      'anti-trojan-source': antiTrojanSource,
      'no-secrets': noSecrets,
      'no-unsanitized': noUnsanitized,
      promise: promisePlugin,
      regexp: regexpPlugin,
    },
    rules: {
      // Security rules
      ...security.configs.recommended.rules,

      // Anti-trojan-source rules
      'anti-trojan-source/no-bidi': 'error',

      // No secrets rules
      'no-secrets/no-secrets': ['error', {
        tolerance: 4.2,
        ignoreContent: ['^NUXT_', 'localhost', '127.0.0.1', 'example.com'],
        ignoreModules: true,
        ignoreIdentifiers: ['password', 'secret', 'token', 'key'],
        additionalRegexes: {
          'Basic Auth': 'Authorization:\\s*Basic\\s+[A-Za-z0-9+/=]+',
          'Bearer Token': 'Authorization:\\s*Bearer\\s+[A-Za-z0-9\\-._~+/]+=*',
        },
      }],

      // Promise rules
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',

      // No-unsanitized rules (DOM XSS protection)
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',

      // Regexp rules (ReDoS protection and optimization)
      'regexp/no-contradiction-with-assertion': 'error',
      'regexp/no-control-character': 'error',
      'regexp/no-dupe-disjunctions': 'error',
      'regexp/no-empty-alternative': 'error',
      'regexp/no-empty-capturing-group': 'error',
      'regexp/no-empty-character-class': 'error',
      'regexp/no-empty-group': 'error',
      'regexp/no-escape-backspace': 'error',
      'regexp/no-invalid-regexp': 'error',
      'regexp/no-lazy-ends': 'error',
      'regexp/no-misleading-capturing-group': 'error',
      'regexp/no-misleading-unicode-character': 'error',
      'regexp/no-missing-g-flag': 'error',
      'regexp/no-potentially-useless-backreference': 'error',
      'regexp/no-super-linear-backtracking': 'error',
      'regexp/no-super-linear-move': 'error',
      'regexp/no-useless-assertions': 'error',
      'regexp/no-useless-backreference': 'error',
      'regexp/no-useless-dollar-replacements': 'error',
      'regexp/no-useless-escape': 'error',
      'regexp/no-useless-flag': 'error',
      'regexp/no-useless-lazy': 'error',
      'regexp/no-useless-quantifier': 'error',
      'regexp/no-useless-range': 'error',
      'regexp/no-useless-two-nums-quantifier': 'error',
      'regexp/no-zero-quantifier': 'error',
      'regexp/strict': 'error',

      // Настройки для встроенных import правил Nuxt
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      //   Base
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-style': ['error', 'last'],
      'object-curly-spacing': ['error', 'always'],
      'no-irregular-whitespace': 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 2,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
        },
      ],
      'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
      'vue/no-duplicate-attributes': [
        'error',
        {
          allowCoexistClass: true,
          allowCoexistStyle: true,
        },
      ],
      'vue/no-multi-spaces': [
        'error',
        {
          ignoreProperties: false,
        },
      ],
      'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        {
          autofix: true,
          ignore: [],
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/object-curly-spacing': ['error', 'always'],
      'vue/no-v-html': 'warn',
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],

      // TypeScript
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
);
