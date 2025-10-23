// @ts-nocheck
const CACHE_CONTROL = 31536000;
const CONFIG = {
  defaultLocale: 'ru-RU',
  siteName: 'Site name',
  defaultImageSharing: {
    src: '/sharing.jpg',
    width: 1024,
    height: 512,
  },
};

export default defineNuxtConfig({
  // Модули
  modules: [
    // Модуль EsLint
    '@nuxt/eslint',

    // Модуль SEO утилит
    'nuxt-seo-utils',

    // Модуль robots.txt
    '@nuxtjs/robots',

    // Модуль sitemap.xml
    '@nuxtjs/sitemap',

    // Модуль определения устройств, ОС и браузеров
    '@nuxtjs/device',

    // Модуль безопасности
    // 'nuxt-security',

    // Модуль картинок
    '@nuxt/image',

    // State manager Pinia
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',

    // Модуль валидации
    '@vee-validate/nuxt',

    // Модуль яндекс карт
    'vue-yandex-maps/nuxt',

    // Модуль Яндекс.Метрики
    ...(process.env.NUXT_YANDEX_METRIKA_COUNTER_ID
      ? [
        'nuxt-yandex-metrika',
      ]
      : []),

    // Модуль Google Tag Manager
    ...(process.env.NUXT_GOOGLE_TAG_MANAGER_COUNTER_ID
      ? [
        'nuxt-gtag',
      ]
      : []),
  ],

  yandexMaps: {
    apikey: '82465031-f316-42e2-b751-e224296cebe9',
  },

  css: [
    '@/assets/styles/base/global.scss',
    '@/assets/styles/base/fonts.scss',
    '@/assets/styles/base/transitions.scss',
  ],

  site: {
    defaultLocale: CONFIG.defaultLocale,
    name: CONFIG.siteName,
  },

  // Конфигурация рантайма
  runtimeConfig: {
    public: {
      publicSiteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      publicApiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  // Конфигурация PostCSS
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        propList: ['*', '!border-left', '!border-right', '!border-top', '!border-bottom', '!border', '!outline'],
      },
    },
  },

  // Конфигурация модуля определения устройств, ОС и браузеров
  device: {
    refreshOnResize: true,
  },

  // Конфигурация модуля SEO утилит
  // https://nuxtseo.com/docs/seo-utils/getting-started/installation
  seo: {
    // Атоматический редирект на каноничный url
    redirectToCanonicalSiteUrl: true,

    // Стандартные мета данные
    meta: {
      ogImage: CONFIG.defaultImageSharing.src,
      ogImageWidth: CONFIG.defaultImageSharing.width,
      ogImageHeight: CONFIG.defaultImageSharing.height,
      twitterImage: CONFIG.defaultImageSharing.src,
    },
  },

  // Конфигурация модуля Яндекс.Метрики
  // https://www.npmjs.com/package/nuxt-yandex-metrika
  ...(process.env.NUXT_YANDEX_METRIKA_COUNTER_ID && {
    yandexMetrika: {
      id: `${process.env.NUXT_YANDEX_METRIKA_COUNTER_ID}`,
      options: {
        ecommerce: false,
        clickmap: true,
        webvisor: true,
        defer: true,
      },
    },
  }),

  // Конфигурация модуля Google Tag Manager
  // https://www.npmjs.com/package/nuxt-gtag
  ...(process.env.NUXT_YANDEX_METRIKA_COUNTER_ID && {
    gtag: {
      id: process.env.NUXT_GOOGLE_TAG_MANAGER_COUNTER_ID,
    },
  }),

  // Панель отладки Nuxt
  devtools: {
    enabled: import.meta.dev,
  },

  // Общие настройки приложения
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s',
      meta: [
        ...(process.env.NUXT_YANDEX_WEBMASTER_VERIFICATION_CODE
          ? [
            {
              name: 'yandex-verification',
              content: process.env.NUXT_YANDEX_WEBMASTER_VERIFICATION_CODE,
            },
          ]
          : []),

        ...(process.env.NUXT_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE
          ? [
            {
              name: 'google-site-verification',
              content: process.env.NUXT_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE,
            },
          ]
          : []),
      ],
    },
  },

  // Поддержка тестовых фичей
  future: {
    // Поддержка 4 версии Nuxt
    compatibilityVersion: 4,
  },

  // Фичи
  features: {
    // Формирование критического CSS в head приложения
    inlineStyles: false,
  },

  // Дата совместимости
  compatibilityDate: '2025-05-15',

  // Конфигурация nitro
  nitro: {
    routeRules: {
      '/icons/**': {
        headers: {
          'cache-control': `public, must-revalidate, max-age=${CACHE_CONTROL}, s-maxage=${CACHE_CONTROL}`,
        },
      },
      '/images/**': {
        headers: {
          'cache-control': `public, must-revalidate, max-age=${CACHE_CONTROL}, s-maxage=${CACHE_CONTROL}`,
        },
      },
      '/_ipx/**': {
        headers: {
          'cache-control': `public, must-revalidate, max-age=${CACHE_CONTROL}, s-maxage=${CACHE_CONTROL}`,
        },
      },
      '/_nuxt/**': {
        headers: {
          'cache-control': `public, must-revalidate, max-age=${CACHE_CONTROL}, s-maxage=${CACHE_CONTROL}`,
        },
      },
    },
  },

  // Телеметрия
  telemetry: false,

  // Настройки модуля robots.txt
  // https://nuxtseo.com/docs/robots/getting-started/installation
  robots: {
    sitemap: '/sitemap.xml',
    disallow: [
      '/*.json$',
      '/*.xml$',
      '/*.js$',
      '/*.css$',
      '/*.map$',
    ],
    debug: import.meta.dev,
    credits: import.meta.dev,
  },

  // Настройки модуля sitemap.xml
  // https://nuxtseo.com/docs/sitemap/getting-started/installation
  sitemap: {
    autoLastmod: true,
    discoverImages: false,
    discoverVideos: false,
    xslTips: import.meta.dev,
  },
});
