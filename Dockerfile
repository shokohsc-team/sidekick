FROM node:alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

FROM shokohsc/alpine-node

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY ./root/etc/services.d/node-consumer /etc/services.d/node-consumer
COPY . .

EXPOSE 3000
