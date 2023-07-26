require('dotenv').config();
const express = require('express');
const { connect: mongooseConnect, connection: mongooseConnection } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/router');
const errorsGlobalHandler = require('./middlewares/errorsGlobalHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongooseConnect(process.env.NODE_ENV === 'production' ? process.env.MONGO_CONNECTION : 'mongodb://127.0.0.1/bitfilmsdb', {
  useUnifiedTopology: true,
});

mongooseConnection.on('error', (err) => console.log(`Ошибка подключения к базе данных: ${err}`));
mongooseConnection.once('open', () => console.log('Подключение к базе данных установлено'));

app.use(limiter);

app.use(cookieParser());
app.use(cors({
  origin: [
    'http://suestado-diploma.nomoredomains.xyz',
    'https://suestado-diploma.nomoredomains.xyz',
    'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsGlobalHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
