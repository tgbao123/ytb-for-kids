#!/bin/bash

# Dùng host alias từ .ssh/config
HOST="grandm-mac1"
REMOTE_DIR="~/youtube-kids-clone"

echo "🚀 Bắt đầu đồng bộ code và video lên server $HOST..."

# Tạo thư mục trên server nếu chưa có
ssh -o StrictHostKeyChecking=no $HOST "mkdir -p $REMOTE_DIR"

# Rsync toàn bộ source code và thư mục public/videos, prisma sang server
rsync -avz --delete \
           --exclude 'node_modules' \
           --exclude '.next' \
           --exclude '.git' \
           --exclude 'tests' \
           ./ $HOST:$REMOTE_DIR

echo "✅ Đồng bộ hoàn tất! Bắt đầu Build và Run Docker trên server..."

# Chạy Docker Compose trên Server
ssh $HOST "cd $REMOTE_DIR && export PATH=/usr/local/bin:/opt/homebrew/bin:\$PATH && docker-compose up -d --build"

echo "🎉 Triển khai thành công! 🚀"
