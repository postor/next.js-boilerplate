FROM ubuntu:16.04

WORKDIR /app

ENV NODE_ENV=production PORT=80

ADD . /app

RUN npm install && npm run build

EXPOSE 80

CMD ["node", "server.js"]
