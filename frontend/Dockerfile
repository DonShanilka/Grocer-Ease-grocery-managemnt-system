# 1️⃣ Base image (Node 20)
FROM node:20-alpine AS builder

WORKDIR /app

# 2️⃣ Install dependencies
COPY package*.json ./
RUN npm install

# 3️⃣ Copy source code
COPY . .

# 4️⃣ Build Next.js app
RUN npm run build

# -----------------------------

# 5️⃣ Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 6️⃣ Copy only required files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# 7️⃣ Expose port
EXPOSE 3000

# 8️⃣ Start Next.js
CMD ["npm", "start"]
