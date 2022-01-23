FROM node:16-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY commands.sh /scripts/commands.sh
COPY ./prisma .env ./
RUN ["chmod", "+x", "/scripts/commands.sh"]

# RUN chown node:node /app
# USER node
CMD ["/bin/sh", "-c", "/scripts/commands.sh && yarn dev"]
