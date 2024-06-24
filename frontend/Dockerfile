FROM node:20.13-alpine3.18 AS frontend

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
