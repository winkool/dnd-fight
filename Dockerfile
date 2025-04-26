# Этап сборки
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Этап запуска
FROM nginx:stable-alpine

# Копируем собранные файлы в директорию, обслуживаемую nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем nginx-конфиг (опционально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
