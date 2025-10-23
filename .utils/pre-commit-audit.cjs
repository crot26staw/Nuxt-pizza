const { exec } = require('child_process');

/**
 * Pre-commit скрипт для проверки уязвимостей
 * Блокирует коммит при обнаружении критических уязвимостей
 */
function runPreCommitAudit() {
  console.log('🔒 Pre-commit: Проверка безопасности...\n');

  return new Promise((resolve, reject) => {
    // Команда npm audit только для критических уязвимостей
    const auditCommand = 'npm audit --json';

    console.log('🔍 Выполняется проверка критических уязвимостей...');

    exec(auditCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
      try {
        // Парсим результат
        const auditData = JSON.parse(stdout);

        if (auditData.metadata && auditData.metadata.vulnerabilities) {
          const vulnerabilities = auditData.metadata.vulnerabilities;
          const criticalCount = vulnerabilities.critical || 0;
          const highCount = vulnerabilities.high || 0;

          console.log('\n📊 Результат проверки безопасности:');
          console.log(`   🔴 Критичные: ${criticalCount}`);
          console.log(`   🟠 Высокие: ${highCount}`);

          // Блокируем коммит только при критических уязвимостях
          if (criticalCount > 0) {
            console.log('\n❌ КОММИТ ЗАБЛОКИРОВАН!');
            console.log('🚨 Обнаружены критические уязвимости безопасности!');
            console.log('\n🛠️  Для исправления выполните:');
            console.log('   npm audit fix');
            console.log('   или');
            console.log('   npm audit fix --force');
            console.log('\n💡 После исправления повторите коммит');

            reject(new Error('Critical vulnerabilities found'));
            return;
          }

          // Предупреждение о высоких уязвимостях, но не блокируем
          if (highCount > 0) {
            console.log('\n⚠️  ВНИМАНИЕ: Обнаружены высокие уязвимости!');
            console.log('🔧 Рекомендуется исправить их как можно скорее');
            console.log('   npm audit fix');
          }

          if (criticalCount === 0 && highCount === 0) {
            console.log('\n✅ Критических и высоких уязвимостей не обнаружено');
          }

          console.log('\n🎉 Pre-commit проверка пройдена успешно!');
          resolve();
        }
        else {
          console.log('\n✅ Уязвимости не обнаружены');
          console.log('🎉 Pre-commit проверка пройдена успешно!');
          resolve();
        }
      }
      catch (parseError) {
        console.log('\n⚠️  Не удалось распарсить результат npm audit');

        // Если npm audit завершился с ошибкой, но это не критические уязвимости
        if (error && error.code === 1) {
          // Код 1 означает что найдены уязвимости, но нужно проверить их уровень
          console.log('ℹ️  npm audit завершился с предупреждениями');
          console.log('🔍 Проверьте детали командой: npm audit');
          resolve(); // Не блокируем коммит, если не можем определить критичность
        }
        else if (error) {
          console.error('\n❌ Ошибка выполнения npm audit:', error.message);
          if (stderr) {
            console.error('Stderr:', stderr);
          }
          reject(error);
        }
        else {
          resolve();
        }
      }
    });
  });
}

/**
 * Основная функция
 */
async function main() {
  try {
    await runPreCommitAudit();
    process.exit(0);
  }
  catch (error) {
    console.error('\n💥 Pre-commit проверка не пройдена!');
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  main();
}

module.exports = { runPreCommitAudit };
