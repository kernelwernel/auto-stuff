FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -y
CMD ["node", "run start"]
EXPOSE 3000