#!/usr/bin/env bash
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
