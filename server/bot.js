import TelegramBot from 'node-telegram-bot-api';

// Замените на ваш токен
const token = '7455823877:AAHgY-UoWo3KP6LDYnF88oSduByyt_2U2KE';
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Это бот для получения информации. Для получения ссылки введите /link');
});

// Обработка команды /link
bot.onText(/\/link/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Перейдите по ссылке: https://example.com');
});

// Приветственное сообщение новым пользователям
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.new_chat_members && msg.new_chat_members.length > 0) {
        bot.sendMessage(chatId, 'Добро пожаловать! Для получения дополнительной информации введите /start');
    }
});
