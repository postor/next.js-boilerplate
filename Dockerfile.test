FROM ubuntu:16.04

WORKDIR /app

RUN apt-get update -y && apt-get install -yq curl sudo \ 
&& curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
&& apt-get install -yq nodejs python2.7 make build-essential \
gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

ADD . /app

RUN npm install 

ENV NODE_ENV=test

RUN echo "{\"args\": [\"--no-sandbox\"]}" > tests/launch.json 

CMD ["bash", "docker-test.sh"]
