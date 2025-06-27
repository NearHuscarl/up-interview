FROM node:22.14-alpine
WORKDIR /app
COPY ./package.json \
  ./yarn.lock \
  ./.yarnrc.yml \
  ./.yarn \
  ./
COPY ./.yarn ./.yarn
RUN yarn install --immutable
COPY . .
EXPOSE 3000 4200
CMD ["yarn", "start"]