FROM node:20-alpine3.18

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 4000

CMD ng serve --host 0.0.0.0 --poll 2000