FROM node:12.18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .

CMD ["npm", "start"]
