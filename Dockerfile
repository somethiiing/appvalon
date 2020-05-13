
FROM node:14-alpine
ENV PORT=5000
COPY  package.json package.json
COPY package-lock.json package-lock.json
RUN npm install  --no-optional --force
RUN npm cache clean --force
COPY . .
RUN npm run build
USER node
EXPOSE $port
CMD ["node", "server/server.js"]
