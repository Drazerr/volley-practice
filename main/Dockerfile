FROM node:14-alpine3.10 as ts-compiler
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY app/package*.json ./
COPY app/tsconfig*.json ./
USER node
RUN npm install
COPY --chown=node:node main/app ./
RUN npm run build

FROM node:14-alpine3.10
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=ts-compiler /home/node/app/package*.json ./
USER node
RUN npm install --only=production
COPY --from=ts-compiler /home/node/app/build ./

EXPOSE 8080
CMD [ "node", "index.js" ]
