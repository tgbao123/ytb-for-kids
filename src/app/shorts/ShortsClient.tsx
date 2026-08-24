'use client';

import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Repeat, ArrowDown, ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Short {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  views: string;
  likes: number;
  authorName: string;
  authorAvatar: string;
}

export default function ShortsClient({ initialShorts }: { initialShorts: Short[] }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [disliked, setDisliked] = useState<Record<string, boolean>>({});
  
  // Thuật toán "Túi bốc thăm" (Bag Randomizer - giống game Xếp hình Tetris)
  const bagRef = useRef<Short[]>([]);
  const getNextFromBag = () => {
    if (bagRef.current.length === 0) {
      // Hết túi -> Đảo lộn danh sách mới và nạp vào túi
      bagRef.current = [...initialShorts].sort(() => Math.random() - 0.5);
    }
    // Bốc 1 cái ra khỏi túi
    return bagRef.current.pop()!;
  };

  const [feedList, setFeedList] = useState<(Short & { uniqueId: string })[]>(() => {
    // Tạo sẵn 101 video từ túi ngay từ đầu
    return Array.from({ length: 101 }).map(() => {
      const s = getNextFromBag();
      return { ...s, uniqueId: `rand-${Math.random()}` };
    });
  });
  const [activeId, setActiveId] = useState<string | null>(feedList[50]?.uniqueId || null);
  const [isMuted, setIsMuted] = useState(true); // Mặc định tắt tiếng để autoplay luôn hoạt động trên mobile
  const hasInteractedRef = useRef(false); // Theo dõi user đã tap chưa
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    if (disliked[id]) setDisliked(prev => ({ ...prev, [id]: false }));
  };

  const appendAndScroll = () => {
    if (containerRef.current) {
      // Create a new random video and append it
      const randomShort = initialShorts[Math.floor(Math.random() * initialShorts.length)];
      const newItem = { ...randomShort, uniqueId: `${randomShort.id}-${Math.random()}` };
      
      setFeedList(prev => [...prev, newItem]);
      
      // Give React a tick to render the new item, then scroll to it
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ top: containerRef.current.clientHeight, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollToNext = () => {
    appendAndScroll();
  };

  const scrollToPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -containerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Jump to the 51st video (index 50) initially to create a scroll buffer ABOVE!
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.clientHeight * 50;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const uid = entry.target.getAttribute('data-uid');
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
              setActiveId(uid);
            }, 250);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const elements = document.querySelectorAll('.short-container');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [feedList]);

  useEffect(() => {
    if (activeId) {
      const activeIndex = feedList.findIndex(item => item.uniqueId === activeId);
      
      // Infinite scroll DOWN
      if (activeIndex >= feedList.length - 2) {
        const newItems = Array.from({ length: 3 }).map(() => {
          const s = getNextFromBag();
          return { ...s, uniqueId: `rand-${Math.random()}` };
        });
        setFeedList(prev => [...prev, ...newItems]);
      }
    }
  }, [activeId, feedList]);

  useEffect(() => {
    // Play active video, pause others
    const videos = document.querySelectorAll('.short-video-el');
    videos.forEach((video) => {
      const el = video as HTMLVideoElement;
      const container = el.closest('.short-container');
      const uid = container?.getAttribute('data-uid');
      if (uid === activeId) {
        setTimeout(() => {
          if (el.paused && el.src) {
            const playPromise = el.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Mobile browser chặn autoplay có tiếng → ép muted rồi play lại
                el.muted = true;
                setIsMuted(true);
                el.play().catch(() => {});
              });
            }
          }
        }, 50);
      } else {
        if (!el.paused) {
          el.pause();
        }
        if (el.currentTime > 0) {
          el.currentTime = 0;
        }
      }
    });
  }, [activeId]);

  const activeIndex = feedList.findIndex(s => s.uniqueId === activeId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 50;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full bg-[#0f0f0f] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {feedList.map((short, index) => {
        const isNearActive = Math.abs(index - safeActiveIndex) <= 5;
        return (
        <div 
          key={short.uniqueId} 
          data-uid={short.uniqueId}
          className="short-container w-full h-[calc(100vh-56px)] snap-start snap-always flex items-center justify-center relative sm:py-6"
        >
          {/* Main Video Wrapper */}
          <div className="flex gap-4 h-full sm:max-h-[85vh] w-full sm:w-auto sm:aspect-[9/16] relative sm:ml-[-64px]">
            {/* Video Container */}
            <div 
              className="relative w-full h-full bg-[#0f0f0f] sm:rounded-xl overflow-hidden sm:shadow-lg cursor-pointer"
              onClick={(e) => {
                // Lần tap đầu tiên → bật tiếng (giống TikTok)
                if (!hasInteractedRef.current) {
                  hasInteractedRef.current = true;
                  setIsMuted(false);
                }
                
                const videoEl = e.currentTarget.querySelector('video');
                if (videoEl) {
                  if (videoEl.paused) {
                    videoEl.muted = false; // Bật tiếng khi user chủ động tap
                    videoEl.play().catch(console.error);
                  } else {
                    videoEl.pause();
                  }
                }
              }}
            >
              
              {/* Video LUÔN tồn tại trong DOM — chỉ bật/tắt src, không bao giờ xoá thẻ */}
              <div className="absolute inset-0 pointer-events-none bg-[#0f0f0f]">
                <video
                  src={isNearActive ? short.videoUrl : undefined}
                  loop
                  muted={isMuted}
                  preload={activeId === short.uniqueId ? "auto" : "metadata"}
                  className="short-video-el w-full h-full object-cover"
                  playsInline
                />
              </div>
              
              {/* Mute Toggle Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài làm pause video
                  setIsMuted(!isMuted);
                }}
                className="absolute top-4 right-4 sm:right-12 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white pointer-events-auto transition"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Info Overlay (Bottom Left) */}
              <div className="absolute bottom-4 left-4 right-16 sm:right-12 text-white z-10 pb-4 sm:pb-0 pointer-events-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                    {short.authorAvatar || short.authorName.charAt(0)}
                  </div>
                  <span className="font-medium text-sm">@{short.authorName.toLowerCase().replace(/\s+/g, '')}</span>
                  <button className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold ml-2 hover:bg-gray-200 transition">Đăng ký</button>
                </div>
                <p className="font-medium text-base line-clamp-2">{short.title}</p>
              </div>
            </div>

            {/* Action Buttons (Mobile: Inside video container overlay, Desktop: Outside video container) */}
            <div className="absolute right-2 bottom-4 sm:-right-16 sm:bottom-0 flex flex-col justify-end pb-8 sm:pb-4 gap-4 w-12 z-20 pointer-events-auto">
              <div className="flex flex-col items-center gap-1.5">
                <button 
                  onClick={() => toggleLike(short.id)}
                  className="w-12 h-12 sm:bg-[#272727] sm:hover:bg-[#3f3f3f] rounded-full flex items-center justify-center transition-colors"
                >
                  <ThumbsUp className="w-7 h-7 sm:w-6 sm:h-6" fill={liked[short.id] ? 'white' : 'none'} stroke={liked[short.id] ? 'white' : 'white'} />
                </button>
                <span className="text-white text-xs font-medium drop-shadow-md sm:drop-shadow-none">{liked[short.id] ? '84' : '83'}</span>
              </div>
              
              <div className="flex flex-col items-center gap-1.5">
                <button className="w-12 h-12 sm:bg-[#272727] sm:hover:bg-[#3f3f3f] rounded-full flex items-center justify-center transition-colors text-white">
                  <ThumbsDown className="w-7 h-7 sm:w-6 sm:h-6" />
                </button>
                <span className="text-white text-xs font-medium drop-shadow-md sm:drop-shadow-none hidden sm:block">Không thích</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button className="w-12 h-12 sm:bg-[#272727] sm:hover:bg-[#3f3f3f] rounded-full flex items-center justify-center transition-colors text-white">
                  <MessageSquare className="w-7 h-7 sm:w-6 sm:h-6" />
                </button>
                <span className="text-white text-xs font-medium drop-shadow-md sm:drop-shadow-none">5</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button className="w-12 h-12 sm:bg-[#272727] sm:hover:bg-[#3f3f3f] rounded-full flex items-center justify-center transition-colors text-white">
                  <Share2 className="w-7 h-7 sm:w-6 sm:h-6" />
                </button>
                <span className="text-white text-xs font-medium drop-shadow-md sm:drop-shadow-none">Chia sẻ</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button className="w-12 h-12 sm:bg-[#272727] sm:hover:bg-[#3f3f3f] rounded-full flex items-center justify-center transition-colors text-white">
                  <Repeat className="w-7 h-7 sm:w-6 sm:h-6" />
                </button>
                <span className="text-white text-xs font-medium drop-shadow-md sm:drop-shadow-none hidden sm:block">Phối lại</span>
              </div>

              <div className="mt-2 w-10 h-10 bg-gray-600 rounded-lg overflow-hidden mx-auto border-[3px] border-transparent hover:border-white cursor-pointer transition-colors shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={short.thumbnail} className="w-full h-full object-cover" alt="music" />
              </div>
            </div>

          </div>
        </div>
        );
      })}
      
      {/* Floating navigation buttons (Right edge) - Desktop only */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 hidden sm:flex">
        <button onClick={scrollToPrev} className="w-12 h-12 bg-[#272727] hover:bg-[#3f3f3f] rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
          <ArrowUp size={24} />
        </button>
        <button onClick={scrollToNext} className="w-12 h-12 bg-[#272727] hover:bg-[#3f3f3f] rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
          <ArrowDown size={24} />
        </button>
      </div>
    </div>
  );
}
