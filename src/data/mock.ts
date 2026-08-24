export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  category: string;
  type: 'regular' | 'short';
  url?: string;
};

export const videos: Video[] = [
  {
    id: "1",
    title: "Khám Phá Vũ Trụ Cùng Peppa Pig",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    channelName: "Peppa Pig Tiếng Việt",
    category: "shows",
    type: "regular"
  },
  {
    id: "2",
    title: "Học Bảng Chữ Cái ABC",
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    channelName: "Baby Bus",
    category: "learning",
    type: "regular"
  },
  {
    id: "3",
    title: "Bài Hát Chúc Bé Ngủ Ngon",
    thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
    channelName: "CocoMelon",
    category: "music",
    type: "regular"
  },
  {
    id: "4",
    title: "Chú Chó Cứu Hộ Paw Patrol",
    thumbnail: "https://images.unsplash.com/photo-1548681528-6a5e45b5cb59?auto=format&fit=crop&q=80&w=800",
    channelName: "Paw Patrol VN",
    category: "shows",
    type: "regular"
  },
  {
    id: "5",
    title: "Thế Giới Khủng Long Bạo Chúa",
    thumbnail: "https://images.unsplash.com/photo-1518342417105-01e4a3111f18?auto=format&fit=crop&q=80&w=800",
    channelName: "Dino Kids",
    category: "explore",
    type: "regular"
  },
  {
    id: "6",
    title: "Nhảy Múa Cùng Baby Shark",
    thumbnail: "https://images.unsplash.com/photo-1534068590799-09895a7090aa?auto=format&fit=crop&q=80&w=800",
    channelName: "Pinkfong",
    category: "music",
    type: "regular"
  }
];

export const shorts: Video[] = [
  {
    id: "lfhvt2d2Ekw",
    title: "DOOSAN excavator",
    thumbnail: "https://i.ytimg.com/vi/lfhvt2d2Ekw/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gSAAuADigIMCAAQARgoIGAocjAP&rs=AOn4CLDrLTGqQ5YaZoABc2KKmXdatlTHZQ",
    channelName: "DOOSAN 140W tổng hợp",
    category: "shorts",
    type: "short"
  },
  {
    id: "xnihTQpdAM0",
    title: "4 Cỗ Máy Xúc Cẩu Lớn Nhất Việt Nam. Bạn Đã Biết Chưa? Máy Xúc Cẩu | Máy Công Nghệ Cao",
    thumbnail: "https://i.ytimg.com/vi/xnihTQpdAM0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBxOJaqiJKgLr_3l95_Ght-TTGyIQ",
    channelName: "Khoa Học & Khám Phá",
    category: "shorts",
    type: "short"
  },
  {
    id: "RarBn46bSDg",
    title: "TỔNG HỢP MÁY XÚC TRIỆU VIEW LÀM VIỆC TẠI CÔNG TRÌNH THÁI THỤY | EXCAVATOR TRUCK | HUU KHOAI TV",
    thumbnail: "https://i.ytimg.com/vi/RarBn46bSDg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC_Z5O0n1eD7--LySFEuI9SjlllAA",
    channelName: "Huu Khoai TV",
    category: "shorts",
    type: "short"
  },
  {
    id: "Uhpn2uokJOc",
    title: "Top 3 Máy Xúc Siêu To Khổng Lồ - Máy Cẩu Lớn Nhất Thế Giới | Máy Cẩu Công Nghệ Cao",
    thumbnail: "https://i.ytimg.com/vi/Uhpn2uokJOc/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA7JhayjV1Knzv9acVRXC1WUFR9nA",
    channelName: "Khoa Học & Khám Phá",
    category: "shorts",
    type: "short"
  },
  {
    id: "Zhl_KEKPuQI",
    title: "Máy xúc chân nhện",
    thumbnail: "https://i.ytimg.com/vi/Zhl_KEKPuQI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjfxuWklrn-CoQcxr6GOhNz5ZrgA",
    channelName: "Vùng Quê Nhật Bản",
    category: "shorts",
    type: "short"
  },
  {
    id: "aBmUoymLSy8",
    title: "Top 5 siêu phẩm máy xúc Nhật Bản ĐÁNG MUA nhất!!!",
    thumbnail: "https://i.ytimg.com/vi/aBmUoymLSy8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxEFm-eMwkKVHkUnkfT9m4iZE3Pg",
    channelName: "RCE",
    category: "shorts",
    type: "short"
  },
  {
    id: "YPLmCkDuxt0",
    title: "Máy Xúc DX1000LC-7 \"Máy Xúc 100 Tấn Đầu Tiên Của Doosan Tại Việt Nam\"",
    thumbnail: "https://i.ytimg.com/vi/YPLmCkDuxt0/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGiqFPNq-MKQQt_BNWAOcQzC0jWA",
    channelName: "Máy xúc Develon Việt Nam",
    category: "shorts",
    type: "short"
  },
  {
    id: "SUHnjyEBdF0",
    title: "Xe Container chở Máy Xúc Khổng Lồ , Xe Cẩu , Xe Tải , Ô Tô Múc Cát , Xe Đồ Chơi Chó Cứu Hộ",
    thumbnail: "https://i.ytimg.com/vi/SUHnjyEBdF0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDP52gKFF6pWasWwqjD1IwAY8VkOQ",
    channelName: "Hé Lô TV",
    category: "shorts",
    type: "short"
  },
  {
    id: "je0Rqf3ffAk",
    title: "Máy Xúc Điều Khiển Từ Xa , Huina 1594 , Xe Cẩu Múc Cát , WL Toys 16800 , Ô Tô Đồ Chơi , Xe Cuốc Đất",
    thumbnail: "https://i.ytimg.com/vi/je0Rqf3ffAk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBX6vxMLIF01YuR1tfAoo2zNbfYIg",
    channelName: "Anh Henry",
    category: "shorts",
    type: "short"
  },
  {
    id: "PCx_vzjufb4",
    title: "Máy Xúc Khổng Lồ Kobelco Cần Dài Đóng Cừ, Đóng Cọc, Múc Đất Làm Việc #450",
    thumbnail: "https://i.ytimg.com/vi/PCx_vzjufb4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD6fckizyV-orVz1rWyNAQ6x6lxVQ",
    channelName: "MinhAn Toys",
    category: "shorts",
    type: "short"
  },
  {
    id: "123NT2N_IS0",
    title: "MÁY XÚC ÔTÔ NHẢY MÚA VUI NHỘN - XE TẢI NHẢY TIK TOK - MÁY XÚC BIỂU DIỄN",
    thumbnail: "https://i.ytimg.com/vi/123NT2N_IS0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCBU9DjjgPOpTVmnK2XD58V9MzM9g",
    channelName: "DUDU Channel",
    category: "shorts",
    type: "short"
  },
  {
    id: "Qt5gTNkFrjg",
    title: "Xe Cẩu , Xe Container chở Máy Xúc Điều Khiển Từ Xa , Xe Tải lội nước , Xe Ben chở Đất , Ô Tô Đồ Chơi",
    thumbnail: "https://i.ytimg.com/vi/Qt5gTNkFrjg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCMZtKQX9QKgChyA39xTlSnt5nA6w",
    channelName: "Video Đồ Chơi",
    category: "shorts",
    type: "short"
  },
  {
    id: "jV6nxDcIug0",
    title: "Ô Tô Máy Xúc, Xe Cẩu Múc Cát, Máy Xúc Đất, Xe Cần Cẩu, Xe Tải Chở Đất, Xe Chở Trái Cây, Xe Đồ Chơi",
    thumbnail: "https://i.ytimg.com/vi/jV6nxDcIug0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVVx4Xgao8JI_IYN6B4gdxf2ZzSw",
    channelName: "CC Car",
    category: "shorts",
    type: "short"
  },
  {
    id: "MYoREgCOtPQ",
    title: "NHỮNG LOẠI MÁY XÚC MINI NÊN MUA | ComacPro Máy Thiết Bị Số 1 Việt Nam",
    thumbnail: "https://i.ytimg.com/vi/MYoREgCOtPQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA0xx3MmxMdD_1mWeqZZwCn3aj7zA",
    channelName: "ComacPro Official",
    category: "shorts",
    type: "short"
  },
  {
    id: "WFdDFKSAhvg",
    title: "TIẾNG ĐỘNG CƠ MÁY XÚC #Shorts",
    thumbnail: "https://i.ytimg.com/vi/WFdDFKSAhvg/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB1AaAAuADigIMCAAQARhlIGUoZTAP&rs=AOn4CLCbl5cvG2_yLBKH25_maL458JZDOA",
    channelName: "Vũ Hải Quân",
    category: "shorts",
    type: "short"
  },
  {
    id: "95p0dVKj3dE",
    title: "Máy xúc điều khiển từ xa 11 kênh - shopee 400k",
    thumbnail: "https://i.ytimg.com/vi/95p0dVKj3dE/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIFooWzAP&rs=AOn4CLCjvctRemMVvNO-teS5ZHwnwWIdhA",
    channelName: "Max Free",
    category: "shorts",
    type: "short"
  },
  {
    id: "uUCs5-C3bLc",
    title: "Máy Xúc Cần Dài Điều Khiển Từ Xa / Xe Cẩu Múc Cát / Xe Cuốc Đất / Huina 1551 / Ô Tô Đồ Chơi",
    thumbnail: "https://i.ytimg.com/vi/uUCs5-C3bLc/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBxthdddSIhlwV1dbj9DDGFwEQotA",
    channelName: "Anh Henry",
    category: "shorts",
    type: "short"
  },
  {
    id: "C9H8Sy9Q6Ms",
    title: "Máy Xúc Bắt Cá - MinhAn Toys",
    thumbnail: "https://i.ytimg.com/vi/C9H8Sy9Q6Ms/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhiIGUoUDAP&rs=AOn4CLDXiQegnyRbBJsT4wS8iVQJpCrk4g",
    channelName: "MinhAn Toys",
    category: "shorts",
    type: "short"
  },
  {
    id: "rMky9dr_XZU",
    title: "Máy Xúc, Máy Đào Rãnh, Xe Trộn Bê Tông, Xe Lu, Xe Cẩu / CÁC LOẠI THIẾT BỊ NẶNG CÔNG NGHIỆP",
    thumbnail: "https://i.ytimg.com/vi/rMky9dr_XZU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBCZ4WikCkymMwOLaFTTHuNL21Z8w",
    channelName: "Duka Toys",
    category: "shorts",
    type: "short"
  },
  {
    id: "ycre4UezNhY",
    title: "#Ep6: Máy xúc đào thế hệ mới Doosan DX300LCA-7M \"HIỆU NĂNG CAO - CHI PHÍ THẤP\"",
    thumbnail: "https://i.ytimg.com/vi/ycre4UezNhY/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IDYoEzAP&rs=AOn4CLCzup9ot6j1Deukt4gnF6k5fqObRw",
    channelName: "Máy xúc Develon Việt Nam",
    category: "shorts",
    type: "short"
  }
];


