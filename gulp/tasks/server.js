import { plugins } from '../config/plugins.js';

const server = () => {
  plugins.browserSync.init({
    server: {
      baseDir: './dist',
    },
    logLevel: 'info', // Подробный уровень логирования
    cors: true,
    notify: true,
    port: 3000,
    open: false, // Отключаем автоматическое открытие браузера
    logConnections: true, // Логируем подключения к серверу
  });
};
// Сайт можно будет открыть с других устройств, по одной сети wifi
// с помощью локального ip + port, пример:
// http://192.168.x.x:3000

export { server };