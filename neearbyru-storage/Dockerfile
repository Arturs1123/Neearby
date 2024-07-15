FROM node:17.3.0-alpine

  # создание директории приложения
WORKDIR /usr/src/app
RUN mkdir -p /usr/storage
  # установка зависимостей
  # символ астериск ("*") используется для того чтобы по возможности
  # скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
  # Если вы создаете сборку для продакшн
  # RUN npm ci --only=production

  # копируем исходный код
COPY . .

EXPOSE 3002
CMD [ "node", "app.js" ]