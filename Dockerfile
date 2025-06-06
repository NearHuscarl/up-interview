FROM node:22.14-alpine
WORKDIR /app
COPY ./dist/interview-repo/package.json \
  ./dist/interview-repo/yarn.lock \
  ./dist/interview-repo/.yarnrc.yml \
  ./dist/interview-repo/.yarn \
  ./
COPY ./dist/interview-repo/.yarn ./.yarn
RUN yarn install --immutable
COPY ./dist/interview-repo .
EXPOSE 3000 4200
CMD ["yarn", "start"]