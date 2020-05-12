
FROM node:14-alpine
USER node
COPY  package.json package.json
COPY package-lock.json package-lock.json
RUN npm install  --no-optional --force
RUN npm cache clean --force

EXPOSE 5000
CMD ["node", "server/server.js"]
