const fs = require('fs').promises;
const path = require('path');

const sharp = require('sharp');
const toIco = require('to-ico');

// Конфигурация размеров favicon
const FAVICON_CONFIG = [
  { name: 'apple-touch-icon.png', size: 120 },
  { name: 'icon-32x32.png', size: 32 },
  { name: 'icon-120x120.png', size: 120 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-360x360.png', size: 360 },
];

// Пути к файлам
const INPUT_SVG = path.join(process.cwd(), 'public', 'icon.svg');
const OUTPUT_DIR = path.join(process.cwd(), 'public');

/**
 * Проверяет существование входного SVG файла
 */
async function checkInputFile() {
  try {
    await fs.access(INPUT_SVG);
    console.log('✅ Найден входной файл:', INPUT_SVG);
  }
  catch (error) {
    console.error('❌ Ошибка: Файл icon.svg не найден в папке public/');
    console.error('   Убедитесь, что файл public/icon.svg существует');
    process.exit(1);
  }
}

/**
 * Генерирует PNG файл указанного размера из SVG
 */
async function generatePNG(outputPath, size) {
  try {
    await sharp(INPUT_SVG)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(outputPath);

    console.log(`✅ Создан: ${path.basename(outputPath)} (${size}x${size})`);
  }
  catch (error) {
    console.error(`❌ Ошибка создания ${path.basename(outputPath)}:`, error.message);
    throw error;
  }
}

/**
 * Создает favicon.ico из PNG 32x32
 */
async function generateICO() {
  const png32Path = path.join(OUTPUT_DIR, 'icon-32x32.png');
  const icoPath = path.join(OUTPUT_DIR, 'favicon.ico');

  try {
    const pngBuffer = await fs.readFile(png32Path);
    const icoBuffer = await toIco([pngBuffer]);
    await fs.writeFile(icoPath, icoBuffer);

    console.log('✅ Создан: favicon.ico (32x32)');
  }
  catch (error) {
    console.error('❌ Ошибка создания favicon.ico:', error.message);
    throw error;
  }
}

/**
 * Основная функция генерации всех favicon
 */
async function generateFavicons() {
  console.log('🚀 Начинаю генерацию favicon...\n');

  try {
    // Проверяем входной файл
    await checkInputFile();

    // Создаем все PNG файлы
    console.log('\n📁 Генерация PNG файлов:');
    for (const config of FAVICON_CONFIG) {
      const outputPath = path.join(OUTPUT_DIR, config.name);
      await generatePNG(outputPath, config.size);
    }

    // Создаем favicon.ico
    console.log('\n🔄 Генерация ICO файла:');
    await generateICO();

    console.log('\n✨ Все favicon успешно созданы!');
    console.log('\n📋 Созданные файлы:');
    console.log('   • apple-touch-icon.png (120x120)');
    console.log('   • favicon.ico (32x32)');
    console.log('   • icon-32x32.png (32x32)');
    console.log('   • icon-120x120.png (120x120)');
    console.log('   • icon-192x192.png (192x192)');
    console.log('   • icon-360x360.png (360x360)');
  }
  catch (error) {
    console.error('\n💥 Произошла ошибка при генерации favicon:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  generateFavicons();
}

module.exports = { generateFavicons };
