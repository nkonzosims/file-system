FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "index.js"]