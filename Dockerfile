FROM node:20-bullseye-slim AS build

RUN npm install -g pnpm

COPY . /src
WORKDIR /src

RUN pnpm install
RUN npx @cloudflare/next-on-pages

FROM node:20-bullseye-slim AS runtime

COPY --from=build /src/.vercel /app/.vercel
WORKDIR /app
RUN npm install wrangler@3.24.0
RUN apt update && apt -y install ca-certificates && rm -rf /var/lib/apt/lists/*

EXPOSE 8788

CMD ["npx", "wrangler", "pages", "dev", ".vercel/output/static", "--ip=0.0.0.0", "--compatibility-flag=nodejs_compat", "--compatibility-date=2023-10-10", "--kv=ONEDRIVE_CF_INDEX_KV"]