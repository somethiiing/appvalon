
FROM node:14-alpine
USER node
COPY  . .
RUN npm install  --no-optional
RUN npm cache clean --force

EXPOSE 5000
CMD ["node", "server/server.js"]
