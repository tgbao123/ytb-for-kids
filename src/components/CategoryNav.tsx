'use client';

const chips = [
  "Tất cả", "Trò chơi", "Âm nhạc", "Danh sách kết hợp", 
  "Trò chơi hành động phiêu lưu", "Đọc rap", "Bóng đá", 
  "Mới tải lên gần đây", "Đã xem", "Đề xuất mới"
];

export default function CategoryNav() {
  return (
    <div className="sticky top-0 bg-[#0f0f0f] bg-opacity-95 backdrop-blur z-30 px-6 py-3 flex gap-3 overflow-x-auto no-scrollbar">
      {chips.map((chip, index) => (
        <button 
          key={index}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            index === 0 
              ? 'bg-white text-black' 
              : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
