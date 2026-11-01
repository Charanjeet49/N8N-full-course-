// Extra downloadable files (sample data + self-hosting configs)
const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Jaipur'];
const sales = ['order_id,date,city,product,amount'];
for (let i = 1; i <= 20; i++) sales.push(`ORD-${1000 + i},2026-11-${String((i % 28) + 1).padStart(2, '0')},${cities[(i * 7) % 5]},${['T-shirt', 'Mug', 'Cap', 'Hoodie'][i % 4]},${[799, 349, 299, 1499][i % 4] * ((i % 3) + 1)}`);

module.exports = {
  'sample-sales.csv': sales.join('\n') + '\n',
  'sample-leads-sheet.csv': 'Name,Email,Phone,Interest,submitted_at,source\n',
  'sample-ledger.csv': 'date,type,category,amount\n2026-10-02,income,Course sales,85000\n2026-10-05,expense,Ads,12000\n2026-10-09,expense,Software,4500\n2026-10-15,income,Consulting,30000\n2026-10-20,expense,Salaries,40000\n2026-10-28,expense,Office,6000\n',
  'day-19-docker-compose.yml': `# n8n + Postgres + Caddy (auto HTTPS) — Day 19
# Use: .env file banao (day-19-env.example dekho), phir: docker compose up -d
services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: n8n
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d n8n"]
      interval: 10s
      retries: 5

  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    environment:
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: \${POSTGRES_USER}
      DB_POSTGRESDB_PASSWORD: \${POSTGRES_PASSWORD}
      N8N_HOST: \${N8N_HOST}
      N8N_PROTOCOL: https
      WEBHOOK_URL: https://\${N8N_HOST}/
      N8N_ENCRYPTION_KEY: \${N8N_ENCRYPTION_KEY}
      GENERIC_TIMEZONE: Asia/Kolkata
      TZ: Asia/Kolkata
      N8N_PROXY_HOPS: 1
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy

  caddy:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on:
      - n8n

volumes:
  pg_data:
  n8n_data:
  caddy_data:
`,
  'day-19-env.example': `# .env naam se save karo (docker-compose.yml ke saath)
N8N_HOST=n8n.yourdomain.com
POSTGRES_USER=n8n
POSTGRES_PASSWORD=change-this-long-password
# Ek baar banao aur SAFE rakho (openssl rand -hex 32). Kho gaya to saare credentials bekaar!
N8N_ENCRYPTION_KEY=paste-a-long-random-string
`,
  'day-19-Caddyfile': `# "Caddyfile" naam se save karo. Domain ka A record VPS IP par point hona chahiye.
n8n.yourdomain.com {
  reverse_proxy n8n:5678
}
`,
  'day-19-setup-commands.sh': `#!/usr/bin/env bash
# Fresh Ubuntu VPS par (root ya sudo user) — Day 19
set -e
apt update && apt -y upgrade
curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
mkdir -p ~/n8n && cd ~/n8n
# Ab yahan docker-compose.yml, .env aur Caddyfile rakho, phir:
docker compose up -d
docker compose ps
# Backup (roz cron se chalao):
# docker compose exec -T postgres pg_dump -U n8n n8n > backup-$(date +%F).sql
# Update:
# docker compose pull && docker compose up -d
`,
};
