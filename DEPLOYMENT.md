# 🚀 Deployment Guide: GCP VPS with Cloudflare Tunnel

This guide will help you set up CI/CD deployment for your portfolio on GCP with Cloudflare Tunnel.

---

## 📋 Prerequisites

- GCP VPS instance (Ubuntu 22.04 recommended)
- Domain configured with Cloudflare
- GitHub repository with this project

---

## 🖥️ Part 1: VPS Setup

### 1.1 Connect to your VPS
```bash
ssh your-username@your-vps-ip
```

### 1.2 Update system and install Docker
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Log out and back in for group changes to take effect
exit
```

### 1.3 Clone your repository
```bash
# Create deployment directory
mkdir -p ~/apps
cd ~/apps

# Clone your repository
git clone https://github.com/YOUR_USERNAME/rakabima-portofolio.git
cd rakabima-portofolio
```

### 1.4 Create environment file
```bash
# Create .env file
cat > .env << EOF
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
EOF
```

### 1.5 Initial deployment test
```bash
# Build and run
docker compose up -d --build

# Check if running
docker ps

# View logs
docker compose logs -f
```

---

## 🔒 Part 2: Cloudflare Tunnel Setup

### 2.1 Install cloudflared on VPS
```bash
# Download and install cloudflared
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# Authenticate with Cloudflare
cloudflared tunnel login
```

### 2.2 Create a tunnel
```bash
# Create tunnel (replace 'portfolio' with your preferred name)
cloudflared tunnel create portfolio

# Note the tunnel ID that's displayed (you'll need it)
```

### 2.3 Configure the tunnel
```bash
# Create config directory
mkdir -p ~/.cloudflared

# Create config file
cat > ~/.cloudflared/config.yml << EOF
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/$USER/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: yourdomain.com
    service: http://localhost:3000
  - hostname: www.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
EOF
```

### 2.4 Route DNS to tunnel
```bash
# Add DNS route (do this for each hostname)
cloudflared tunnel route dns portfolio yourdomain.com
cloudflared tunnel route dns portfolio www.yourdomain.com
```

### 2.5 Install tunnel as service
```bash
# Install as systemd service
sudo cloudflared service install

# Start the service
sudo systemctl start cloudflared
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared
```

---

## 🔑 Part 3: GitHub Secrets Setup

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `VPS_HOST` | Your VPS IP address | `34.123.45.67` |
| `VPS_USER` | SSH username | `your-username` |
| `VPS_SSH_KEY` | Private SSH key (entire content) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DEPLOY_PATH` | Path to project on VPS | `/home/your-username/apps/rakabima-portofolio` |
| `EMAIL_USER` | Email for contact form | `your-email@gmail.com` |
| `EMAIL_PASS` | App password for email | `xxxx xxxx xxxx xxxx` |

### 3.1 Generate SSH key for deployment
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_deploy.pub your-username@your-vps-ip

# The private key content goes into VPS_SSH_KEY secret
cat ~/.ssh/github_deploy
```

---

## 🔄 Part 4: CI/CD Workflow

### How it works:
1. Push code to `main` branch
2. GitHub Actions triggers the workflow
3. Build & test job runs (lint, build)
4. Deploy job SSHs into VPS
5. Pulls latest code, rebuilds Docker container
6. Application restarts with new changes

### Manual deployment:
You can also trigger deployment manually:
1. Go to Actions tab in GitHub
2. Select "Deploy to GCP VPS" workflow
3. Click "Run workflow"

---

## 🛠️ Part 5: Useful Commands

### On VPS:
```bash
# View running containers
docker ps

# View logs
docker compose logs -f

# Restart application
docker compose restart

# Rebuild and restart
docker compose up -d --build

# Stop application
docker compose down

# Check Cloudflare tunnel status
sudo systemctl status cloudflared

# View tunnel logs
sudo journalctl -u cloudflared -f
```

### Troubleshooting:
```bash
# Check Docker container health
docker inspect rakabima-portfolio | grep -A 10 Health

# Check port binding
sudo netstat -tlnp | grep 3000

# Test locally on VPS
curl http://localhost:3000

# Check disk space
df -h

# Check memory usage
free -m
```

---

## 📁 Project Structure for Deployment

```
rakabima-portofolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Docker Compose config
├── .dockerignore          # Files to exclude from Docker
├── .env                   # Environment variables (not in git)
└── ...                    # Your Next.js app files
```

---

## 🔐 Security Recommendations

1. **Firewall**: Only allow ports 22 (SSH) and 443 (Cloudflare)
   ```bash
   sudo ufw allow 22
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Disable password auth**: Use SSH keys only
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart sshd
   ```

3. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Use Cloudflare's security features**:
   - Enable "Always Use HTTPS"
   - Enable "Automatic HTTPS Rewrites"
   - Set SSL/TLS to "Full (strict)"

---

## 🎉 Done!

Your portfolio will now automatically deploy whenever you push to the `main` branch!

For development workflow:
1. Create feature branches from `dev`
2. Merge to `dev` for testing
3. When ready, merge `dev` → `main` for production deployment
