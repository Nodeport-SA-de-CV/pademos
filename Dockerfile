FROM node:14.15.5

RUN mkdir -p /user/src/app
WORKDIR /usr/src/app

COPY .  /usr/src/app

RUN ls -la .

RUN npm install
RUN npm run build:production

EXPOSE 9090
EXPOSE 9091

CMD ["node","deploy.js"]
