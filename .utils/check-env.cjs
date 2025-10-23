const fs = require('fs');
const path = require('path');

// Конфигурация переменных окружения
const ENV_CONFIG = {
  critical: [
    'NUXT_SITE_ENV',
    'NUXT_PUBLIC_SITE_URL',
  ],
  optional: [
    'NUXT_PUBLIC_API_URL',
    'NUXT_YANDEX_METRIKA_COUNTER_ID',
    'NUXT_YANDEX_WEBMASTER_VERIFICATION_CODE',
    'NUXT_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    'NUXT_GOOGLE_TAG_MANAGER_COUNTER_ID',
  ],
};

// Путь к .env файлу
const ENV_FILE_PATH = path.join(process.cwd(), '.env');

/**
 * Проверяет существование .env файла
 */
function checkEnvFileExists() {
  try {
    fs.accessSync(ENV_FILE_PATH);
    console.log('✅ Найден файл окружения:', ENV_FILE_PATH);
    return true;
  }
  catch (error) {
    console.error('❌ Ошибка: Файл .env не найден в корне проекта');
    console.error('   Убедитесь, что файл .env существует');
    return false;
  }
}

/**
 * Парсит .env файл и возвращает объект с переменными
 */
function parseEnvFile() {
  try {
    const envContent = fs.readFileSync(ENV_FILE_PATH, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach((line) => {
      // Пропускаем комментарии и пустые строки
      if (line.trim() && !line.trim().startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim()) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    return envVars;
  }
  catch (error) {
    console.error('❌ Ошибка чтения .env файла:', error.message);
    return null;
  }
}

/**
 * Проверяет валидность URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  }
  catch (_) {
    return false;
  }
}

/**
 * Валидирует значение переменной окружения
 */
function validateEnvVar(key, value) {
  if (!value || value.trim() === '') {
    return { valid: false, message: 'не заполнена' };
  }

  // Специальная валидация для NUXT_SITE_ENV
  if (key === 'NUXT_SITE_ENV') {
    if (!['staging', 'production'].includes(value)) {
      return {
        valid: false,
        message: `недопустимое значение "${value}". Ожидается: staging или production`,
      };
    }
  }

  // Специальная валидация для URL переменных
  if (key.includes('URL') && value) {
    if (!isValidUrl(value)) {
      return {
        valid: false,
        message: `недопустимый URL формат: "${value}"`,
      };
    }
  }

  return { valid: true, message: value };
}

/**
 * Проверяет критичные переменные окружения
 */
function checkCriticalVars(envVars) {
  console.log('\n🔍 Проверка критичных переменных:');
  let hasErrors = false;

  ENV_CONFIG.critical.forEach((varName) => {
    const validation = validateEnvVar(varName, envVars[varName]);

    if (validation.valid) {
      console.log(`   ✅ ${varName}: ${validation.message}`);
    }
    else {
      console.error(`   ❌ ${varName}: ${validation.message}`);
      hasErrors = true;
    }
  });

  return !hasErrors;
}

/**
 * Проверяет опциональные переменные окружения
 */
function checkOptionalVars(envVars) {
  console.log('\n⚠️  Проверка опциональных переменных:');
  let hasWarnings = false;

  ENV_CONFIG.optional.forEach((varName) => {
    const validation = validateEnvVar(varName, envVars[varName]);

    if (validation.valid) {
      console.log(`   ✅ ${varName}: ${validation.message}`);
    }
    else {
      console.log(`   ⚠️  ${varName}: ${validation.message}`);
      hasWarnings = true;
    }
  });

  if (hasWarnings) {
    console.log('\n💡 Рекомендация: Заполните опциональные переменные для полной функциональности');
  }
}

/**
 * Основная функция проверки переменных окружения
 */
function checkEnvironmentVariables() {
  console.log('🚀 Проверка переменных окружения после сборки...\n');

  try {
    // Проверяем существование .env файла
    if (!checkEnvFileExists()) {
      process.exit(1);
    }

    // Парсим .env файл
    const envVars = parseEnvFile();
    if (!envVars) {
      process.exit(1);
    }

    // Проверяем критичные переменные
    const criticalVarsValid = checkCriticalVars(envVars);

    // Проверяем опциональные переменные
    checkOptionalVars(envVars);

    // Выводим результат
    if (criticalVarsValid) {
      console.log('\n✨ Проверка переменных окружения завершена успешно!');
      console.log('🚀 Приложение готово к развертыванию');

      // Проверка на staging окружение (в конце)
      if (envVars['NUXT_SITE_ENV'] === 'staging') {
        console.log('\n🟡 ═══════════════════════════════════════════════════════════');
        console.log('🟡 ВНИМАНИЕ: STAGING ОКРУЖЕНИЕ!');
        console.log('🟡 Приложение будет работать в тестовом режиме');
        console.log('🟡 ═══════════════════════════════════════════════════════════');
      }

      process.exit(0);
    }
    else {
      console.error('\n💥 Обнаружены критичные ошибки в переменных окружения!');
      console.error('🛑 Исправьте ошибки перед развертыванием приложения');

      // Проверка на staging окружение (в конце, даже при ошибках)
      if (envVars['NUXT_SITE_ENV'] === 'staging') {
        console.log('\n🟡 ═══════════════════════════════════════════════════════════');
        console.log('🟡 ВНИМАНИЕ: STAGING ОКРУЖЕНИЕ!');
        console.log('🟡 Приложение будет работать в тестовом режиме');
        console.log('🟡 ═══════════════════════════════════════════════════════════');
      }

      process.exit(1);
    }
  }
  catch (error) {
    console.error('\n💥 Произошла неожиданная ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  checkEnvironmentVariables();
}

module.exports = { checkEnvironmentVariables };
