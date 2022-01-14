FROM node:14-alpine3.10 as ts-compiler
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig*.json ./
USER node
RUN npm install
COPY --chown=node:node . ./
RUN npm run build

FROM node:14-alpine3.10
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=ts-compiler /usr/app/package*.json ./
USER node
RUN npm install --only=production
COPY --from=ts-compiler /usr/app/build ./

EXPOSE 8080
CMD [ "node", "index.js" ]