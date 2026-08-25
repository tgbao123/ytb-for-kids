import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
}

export default function HlsVideo({ src, ...props }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clear previous HLS instance if any
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (src) {
      // Ưu tiên Native HLS trên Safari (macOS và iOS) vì Safari hỗ trợ HLS siêu mượt và ít bị lỗi Security Policy
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isSafari && video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          // Tối ưu hóa bộ đệm cho Shorts (nhanh & mượt)
          maxBufferLength: 10,
          maxMaxBufferLength: 20,
          startLevel: -1, // Tự động chọn chất lượng
        });
        hlsRef.current = hls;

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Khi manifest (.m3u8) tải xong, nếu video đang được yêu cầu play() thì nó sẽ tự chạy
          // vì ta đã config autoplay/muted ở bên ngoài ShortsClient
        });

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback cho Safari (hỗ trợ HLS native)
        video.src = src;
      }
    } else {
      // Khi src bị gỡ (để tiết kiệm bộ nhớ), clear src của thẻ video
      video.removeAttribute('src');
      video.load();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return <video ref={videoRef} {...props} />;
}
