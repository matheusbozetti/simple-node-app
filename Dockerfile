FROM node:lts-alpine AS base
RUN npm i -g corepack@latest
RUN corepack enable pnpm

# --

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# --

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

RUN chown api:nodejs .

COPY --chown=api:nodejs . .
COPY --from=deps /app/node_modules ./node_modules

USER api

EXPOSE 3030

ENV PORT=3030
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["npm", "run", "start"]
