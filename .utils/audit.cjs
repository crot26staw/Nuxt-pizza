const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Форматирует дату в формат DD-MM-YYYY_HH:MM
 */
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year}_${hours}-${minutes}`;
}

/**
 * Создает папку если она не существует
 */
function ensureDirectoryExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Создана папка: ${dirPath}`);
    }
    return true;
  }
  catch (error) {
    console.error(`❌ Ошибка создания папки ${dirPath}:`, error.message);
    return false;
  }
}

/**
 * Выполняет npm audit и сохраняет отчет
 */
function runAudit() {
  console.log('🔍 Запуск npm audit...\n');

  // Определяем пути
  const auditDir = path.join(__dirname, 'audit');
  const timestamp = formatDate(new Date());
  const reportFileName = `audit-report_${timestamp}.json`;
  const reportPath = path.join(auditDir, reportFileName);

  // Создаем папку для отчетов
  if (!ensureDirectoryExists(auditDir)) {
    process.exit(1);
  }

  // Команда npm audit
  const auditCommand = 'npm audit --json';

  console.log(`📋 Выполняется команда: ${auditCommand}`);
  console.log(`📁 Отчет будет сохранен в: ${reportPath}\n`);

  // Выполняем команду
  exec(auditCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    try {
      // Сохраняем результат в файл
      fs.writeFileSync(reportPath, stdout);

      console.log(`✅ Отчет npm audit сохранен: ${reportFileName}`);
      console.log(`📍 Полный путь: ${reportPath}`);

      // Парсим JSON для получения статистики
      try {
        const auditData = JSON.parse(stdout);

        if (auditData.metadata && auditData.metadata.vulnerabilities) {
          const vulnerabilities = auditData.metadata.vulnerabilities;
          console.log('\n📊 Статистика уязвимостей:');
          console.log(`   🔴 Критичные: ${vulnerabilities.critical || 0}`);
          console.log(`   🟠 Высокие: ${vulnerabilities.high || 0}`);
          console.log(`   🟡 Средние: ${vulnerabilities.moderate || 0}`);
          console.log(`   🔵 Низкие: ${vulnerabilities.low || 0}`);
          console.log(`   ℹ️  Информационные: ${vulnerabilities.info || 0}`);

          const totalVulnerabilities = Object.values(vulnerabilities).reduce((sum, count) => sum + (count || 0), 0);

          if (totalVulnerabilities === 0) {
            console.log('\n🎉 Критичных уязвимостей не обнаружено!');
          }
          else if (vulnerabilities.critical > 0) {
            console.log('\n⚠️  ВНИМАНИЕ: Обнаружены критичные уязвимости!');
            console.log('🛠️  Рекомендуется выполнить: npm audit fix');
          }
        }
      }
      catch (parseError) {
        console.log('\n⚠️  Не удалось распарсить JSON отчет для статистики');
      }

      // Проверяем код выхода npm audit
      if (error) {
        if (error.code === 1) {
          console.log('\n⚠️  npm audit завершился с кодом 1 (обнаружены уязвимости)');
          console.log('📄 Отчет сохранен, проверьте детали в файле');
        }
        else {
          console.error('\n❌ Ошибка выполнения npm audit:', error.message);
          if (stderr) {
            console.error('Stderr:', stderr);
          }
        }
      }
      else {
        console.log('\n✨ npm audit выполнен успешно!');
      }

      console.log('\n🏁 Процесс завершен');
    }
    catch (writeError) {
      console.error('❌ Ошибка сохранения отчета:', writeError.message);
      process.exit(1);
    }
  });
}

/**
 * Основная функция
 */
function main() {
  console.log('🚀 Запуск утилиты npm audit...\n');

  try {
    runAudit();
  }
  catch (error) {
    console.error('💥 Произошла неожиданная ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  main();
}

module.exports = { runAudit };
