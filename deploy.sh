#!/usr/bin/env zsh
#
# deploy.sh — Build and deploy the Data Science for Educators static site
#             to data.educatebarry.co (served from lx-primary NUC).
#
# WHY THIS SCRIPT EXISTS
# ----------------------
# This site is NOT deployed via GitHub/CI. It is a Gatsby static site that
# serves from a Docker *named volume* on the lx-primary NUC:
#
#     Docker volume : matrix_caddy_data
#     Real path     : /var/lib/docker/volumes/matrix_caddy_data/_data/sites/data.educatebarry.co/
#     Container      : matrix-caddy-1  (Caddy, from /opt/matrix docker-compose)
#
# GOTCHA that cost real debugging time: the host path /data/sites/... is NOT
# what Caddy serves. rsync-ing there SUCCEEDS but the site never changes,
# because the container only sees the named volume. You must land files inside
# the volume path above, which is root-owned and requires sudo. This script
# stages to /tmp first (normal rsync over SSH), then sudo-copies into the
# volume on the NUC.
#
# USAGE
# -----
#     ./deploy.sh          # clean build + deploy
#     ./deploy.sh --skip-build   # deploy whatever is already in ./public
#
# REQUIREMENTS
# ------------
#   - SSH alias `lx-primary` reachable (see ~/.ssh/config)
#   - passwordless sudo on lx-primary for rsync/chown, or you'll be prompted
#   - node/npx with gatsby installed locally (npm install already run)

set -e  # exit on any error — a half-finished deploy is worse than none

# --- config ------------------------------------------------------------------
SITE_HOST="data.educatebarry.co"
PROJECT_DIR="/home/barry-schoedel/Documents/Development/data-science-for-educators"
REMOTE="lx-primary"
STAGE="/tmp/dsfe-deploy"
VOLUME="/var/lib/docker/volumes/matrix_caddy_data/_data/sites/${SITE_HOST}"

# --- build -------------------------------------------------------------------
cd "$PROJECT_DIR"

if [[ "$1" != "--skip-build" ]]; then
  echo "▶ Cleaning previous build…"
  npx gatsby clean >/dev/null 2>&1

  echo "▶ Building site with Gatsby…"
  npx gatsby build
else
  echo "▶ Skipping build (--skip-build); deploying existing ./public"
fi

if [[ ! -d "$PROJECT_DIR/public" ]]; then
  echo "✖ No ./public directory — build must have failed. Aborting." >&2
  exit 1
fi

# --- stage to NUC ------------------------------------------------------------
# rsync flags: -a archive (preserve perms/times, recurse), -z compress in
# transit, --delete remove files on the dest that no longer exist in source
# (keeps the site an exact mirror — no orphaned old pages).
echo "▶ Staging build to ${REMOTE}:${STAGE}…"
rsync -az --delete "$PROJECT_DIR/public/" "${REMOTE}:${STAGE}/"

# --- copy into the Docker volume (root-owned, needs sudo) --------------------
echo "▶ Publishing into Caddy volume on ${REMOTE}…"
ssh "$REMOTE" "sudo rsync -a --delete ${STAGE}/ ${VOLUME}/ && sudo chown -R root:root ${VOLUME}/"

# --- verify ------------------------------------------------------------------
# Resolve curl's full path so verification works even under a minimal PATH
# (a bare `curl` can fail when the script runs from a non-interactive shell).
CURL=$(command -v curl || echo /usr/bin/curl)
echo "▶ Verifying live endpoints…"
for path in "" research-question dataset analysis findings comparison visualization limitations research responsible-use recommendations ai-use references glossary; do
  code=$("$CURL" -s -o /dev/null -w "%{http_code}" "https://${SITE_HOST}/${path}/")
  printf "   /%s/ -> %s\n" "$path" "$code"
done

echo "✔ Deploy complete: https://${SITE_HOST}/"
