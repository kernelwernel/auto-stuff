FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install -y
ENV NODE_ENV=production
CMD ["npm", "start"]
EXPOSE 3000