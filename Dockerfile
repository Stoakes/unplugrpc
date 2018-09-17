FROM node:8-alpine as build
COPY ./gateway /gateway
COPY ./ui /ui
WORKDIR /gateway
RUN npm install && npm run build

FROM node:8-alpine
COPY --from=build /gateway/dist /app/dist
COPY --from=build /gateway/build-ui /app/build-ui
COPY --from=build /gateway/data/db.json.dist /app/data/db.json
COPY --from=build /gateway/package.json /app
WORKDIR /app
RUN mkdir -p /app/data/protoFolder && npm install --production
EXPOSE 8000
RUN adduser -S server && chown -R server /app
USER server
CMD ["npm", "start"]
