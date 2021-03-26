FROM node

WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY . .
USER node

EXPOSE 3001
CMD npm run dev