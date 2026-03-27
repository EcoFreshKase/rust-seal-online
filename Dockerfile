FROM oven/bun:latest AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["bun", "run", "start"]
