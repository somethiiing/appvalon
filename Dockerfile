
FROM node:14-alpine

COPY  . .
RUN npm install  --no-optional
RUN npm cache clean --force
USER node
EXPOSE 5000
CMD ["node", "server/server.js"]
