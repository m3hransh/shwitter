FROM node:16-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .
RUN yarn generate
RUN yarn tsc


FROM node:16-alpine 
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
RUN chown -R node:node /app/dist
USER node
EXPOSE 4000
CMD  ["yarn", "start"]
