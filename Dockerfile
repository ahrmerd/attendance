FROM node:20.12.2-alpine3.18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


# All deps stage
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS deps
# WORKDIR /app
# ADD package.json package-lock.json ./
# RUN npm ci

# Production only deps stage
# FROM base AS production-deps
# WORKDIR /app
# ADD package.json package-lock.json ./
# RUN npm ci --omit=dev

# Build stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build --ignore-ts-errors

# FROM base AS build
# WORKDIR /app
# COPY --from=deps /app/node_modules /app/node_modules
# ADD . .
# RUN node ace build --ignore-ts-errors

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
