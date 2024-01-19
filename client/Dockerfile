FROM node:20.11-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 4000

CMD ng serve --host 0.0.0.0 --poll 2000