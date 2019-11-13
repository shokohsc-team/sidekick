FROM shokohsc/alpine-node

ADD ./root/etc/services.d/node-consumer /etc/services.d/node-consumer
ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 3000
