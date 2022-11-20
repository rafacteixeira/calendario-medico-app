FROM node:16-alpine

RUN apk update && apk upgrade --no-cache
RUN apk add git

WORKDIR /app

COPY . frontend

WORKDIR /app/frontend

RUN npm install --silent
RUN npm install -g serve --silent
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
