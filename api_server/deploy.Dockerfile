FROM node:20.14.0-alpine AS builder
ENV NODE_ENV=development
WORKDIR /api_server/app
COPY ./app/package.json ./
COPY ./app/prisma ./prisma
RUN npm install
RUN npm run prisma generate
COPY ./app .
RUN npm run build

FROM node:20.14.0-alpine AS runner
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /api_server/app
COPY --from=builder /api_server/app/node_modules ./node_modules
COPY ./app/package.json ./
COPY ./app/prisma ./prisma
COPY ./app/start.sh ./
RUN npm run install
COPY --from=builder /api_server/app/dist ./dist
RUN chmod +x ./start.sh
CMD ["./start.sh"]
