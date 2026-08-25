#!/bin/bash

# Thư mục chứa file gốc MP4
VIDEO_DIR="./public/videos"
# Thư mục đầu ra HLS
HLS_DIR="./public/videos/hls"

mkdir -p "$HLS_DIR"

echo "Bắt đầu băm nhỏ video (HLS)..."

# Duyệt qua từng file MP4
for file in "$VIDEO_DIR"/*.mp4; do
  # Lấy tên file bỏ đi phần đuôi .mp4
  filename=$(basename -- "$file")
  name="${filename%.*}"
  
  # Tạo thư mục con cho mỗi video
  mkdir -p "$HLS_DIR/$name"

  # Kiểm tra xem đã convert chưa
  if [ -f "$HLS_DIR/$name/index.m3u8" ]; then
    echo "⏭️  Bỏ qua: $name (đã convert)"
    continue
  fi

  echo "⏳ Đang xử lý: $name..."

  # Chạy FFmpeg thông qua Docker để convert MP4 -> HLS (băm thành mảnh 4 giây)
  # Dùng codec copy (-c:v copy -c:a copy) giúp tốc độ xử lý tính bằng giây, không làm giảm chất lượng.
  docker run --rm \
    -v "$(pwd)/public/videos:/videos" \
    linuxserver/ffmpeg \
    -i "/videos/$filename" \
    -c:v copy -c:a copy \
    -start_number 0 \
    -hls_time 4 \
    -hls_list_size 0 \
    -f hls \
    "/videos/hls/$name/index.m3u8"
done

echo "✅ Hoàn thành convert tất cả video sang HLS!"
