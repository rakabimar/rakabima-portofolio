#!/bin/bash
# ================================================
# VPS Initial Setup Script for Portfolio Deployment
# Run this on your fresh GCP VPS (Ubuntu 22.04)
# ================================================

set -e

echo "🚀 Starting VPS setup for portfolio deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run as root. Run as your regular user."
    exit 1
fi

# Update system
echo ""
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_status "System updated"

# Install essential packages
echo ""
echo "📦 Installing essential packages..."
sudo apt install -y curl wget git htop nano ufw
print_status "Essential packages installed"

# Install Docker
echo ""
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    sudo usermod -aG docker $USER
    print_status "Docker installed"
else
    print_warning "Docker already installed"
fi

# Install Docker Compose plugin
echo ""
echo "🐳 Installing Docker Compose..."
sudo apt install -y docker-compose-plugin
print_status "Docker Compose installed"

# Install cloudflared
echo ""
echo "☁️ Installing Cloudflare Tunnel..."
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    sudo dpkg -i cloudflared.deb
    rm cloudflared.deb
    print_status "Cloudflared installed"
else
    print_warning "Cloudflared already installed"
fi

# Setup firewall
echo ""
echo "🔒 Configuring firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 443/tcp # HTTPS (for Cloudflare)
sudo ufw --force enable
print_status "Firewall configured"

# Create apps directory
echo ""
echo "📁 Creating deployment directory..."
mkdir -p ~/apps
print_status "Directory ~/apps created"

# Summary
echo ""
echo "=========================================="
echo -e "${GREEN}✅ VPS Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Log out and back in (for Docker group to take effect)"
echo "2. Clone your repository: cd ~/apps && git clone YOUR_REPO_URL"
echo "3. Authenticate Cloudflare: cloudflared tunnel login"
echo "4. Create tunnel: cloudflared tunnel create portfolio"
echo "5. Configure tunnel (see DEPLOYMENT.md)"
echo ""
echo "Run 'docker --version' after re-login to verify Docker is working."
echo ""
