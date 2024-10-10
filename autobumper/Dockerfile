FROM node:18-alpine as build
RUN apk update && apk upgrade --no-cache && apk add --no-cache git
WORKDIR /app
COPY . .
RUN npm install -y
ENV NODE_ENV=production
CMD ["npm", "start"]
EXPOSE 3000