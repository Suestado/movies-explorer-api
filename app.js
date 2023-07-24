require('dotenv').config();
const express = require('express');
const { connect: mongooseConnect, connection: mongooseConnection } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/router');
const errorsGlobalHandler = require('./middlewares/errorsGlobalHandler');

const { PORT = 4000 } = process.env;
const app = express();

// mongooseConnect('mongodb://127.0.0.1/explorefilmsdb', {
//   useUnifiedTopology: true,
// });

mongooseConnect('mongodb://localhost:27017/explorefilmsdb', {
  useUnifiedTopology: true,
});


mongooseConnection.on('error', (err) => console.log(`Ошибка подключения к базе данных: ${err}`));
mongooseConnection.once('open', () => console.log('Подключение к базе данных установлено'));

app.use(cookieParser());
// app.use(cors({ origin: 'https://suestado.nomoredomains.work', credentials: true }));
app.use(express.json());
app.use(requestLogger);

app.use(errorLogger);
app.use(errors());
app.use(errorsGlobalHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});