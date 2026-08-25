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

  # Kiểm tra xem có lệnh ffmpeg trực tiếp không
  if command -v ffmpeg &> /dev/null; then
    # Chạy ffmpeg trực tiếp (khi chạy trong docker container của NextJS)
    ffmpeg -i "$file" -c:v copy -c:a copy -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "$HLS_DIR/$name/index.m3u8"
  else
    # Chạy qua Docker (khi chạy ở máy host local)
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
  fi
done

echo "✅ Hoàn thành convert tất cả video sang HLS!"
