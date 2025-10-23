require('dotenv').config();
const { spawn } = require('child_process');

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL;
const unlighthouse = spawn('npx', ['unlighthouse', '--site', siteUrl, '--no-cache'], {
  stdio: 'inherit',
  shell: true,
});

unlighthouse.on('close', () => {
  console.log('\x1b[33m', `Анализ ${siteUrl} приостановлен`);
});
