FROM node:18.13-slim

RUN apt update && \
    apt install -y nano

RUN npm install pm2 -g

USER node

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["pm2-runtime", "start", "npm", "--name", "nextjs", "--", "start"]