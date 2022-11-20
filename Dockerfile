FROM node:16-alpine

RUN apk update && apk upgrade --no-cache
RUN apk add git

WORKDIR /app

COPY . frontend

WORKDIR /app/frontend

RUN npm install --silent
RUN npm install -g serve --silent
RUN npm run build
ENV REACT_APP_SCM_API_BASE_URL="https://calendario-medico-api.herokuapp.com"
ENV HTTPS=true

EXPOSE 3000

CMD ["serve", "-s", "build"]
