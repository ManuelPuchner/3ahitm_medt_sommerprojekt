# Dockerfile

##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV GENERATE_SOURCEMAP=false


# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### BUILDER

FROM --platform=linux/amd64 node:16-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN pwd && ls -la

##### RUNNER

FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ARG BACKEND_URL
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite

COPY --from=builder /app/dist/ ./
USER vite
EXPOSE 3000
ENV PORT 3000


CMD ["BACKEND_URL=${BACKEND_URL} node", "server.js"]