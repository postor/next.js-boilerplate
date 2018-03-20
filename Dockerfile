FROM ubuntu:16.04

WORKDIR /app

RUN apt-get update -y && apt-get install -yq curl sudo \ 
&& curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
&& apt-get install -yq nodejs python2.7 make build-essential

ENV NODE_ENV=production PORT=80

ADD . /app

RUN npm install && npm run build

EXPOSE 80

CMD ["node", "server.js"]
