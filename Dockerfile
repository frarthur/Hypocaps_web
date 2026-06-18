FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
ENV BUILD_TARGET=docker
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/public ./public
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
