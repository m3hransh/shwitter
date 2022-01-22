#!/bin/sh

chown -R node:node /app/node_modules
npx prisma migrate dev
