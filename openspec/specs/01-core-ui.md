# Core UI Specification

## Overview
Xây dựng giao diện cốt lõi cho ứng dụng YouTube Kids Clone. Giao diện cần đảm bảo tính thân thiện với trẻ em: nút bấm lớn, màu sắc tươi sáng, dễ nhìn và dễ thao tác.

## Components

### 1. Header (Navbar)
- **Vị trí**: Cố định ở phía trên cùng trang.
- **Thành phần**:
  - Logo "YouTube Kids Clone" (có thể sử dụng text hoặc icon đơn giản).
  - Thanh tìm kiếm (Search Bar) - có thể bị ẩn nếu Parental Controls kích hoạt.
  - Nút Profile / Parental Controls (Hình ổ khoá).

### 2. Category Navigation (Thanh điều hướng danh mục)
- **Vị trí**: Nằm dưới Header hoặc là thanh Sidebar bên trái (ưu tiên thanh ngang dưới header cho giống YouTube Kids).
- **Các danh mục**:
  - Shows (Chương trình) - Icon TV
  - Music (Âm nhạc) - Icon Nốt nhạc
  - Learning (Học tập) - Icon Bóng đèn
  - Explore (Khám phá) - Icon La bàn
  - Shorts (Video ngắn) - Icon Tia chớp/Điện thoại
- **Kiểu dáng**: Nút bấm to, bo góc tròn (rounded-full), màu sắc đa dạng cho mỗi danh mục (Đỏ, Xanh lá, Vàng, Xanh dương).

### 3. Main Content Area (Khu vực nội dung chính)
- **Vị trí**: Chiếm phần lớn không gian bên dưới.
- **Chức năng**: Container để render nội dung của các trang (Grid video, Trình phát video, v.v.).

## Layout Structure (Next.js App Router)
- Sử dụng `app/layout.tsx` để bao bọc toàn bộ ứng dụng với Header và Category Navigation (nếu áp dụng chung cho mọi trang).
- Cân nhắc ẩn Category Navigation ở trang Xem Video chi tiết để tập trung vào video.

## Design Tokens (Tailwind)
- Góc bo: `rounded-2xl` hoặc `rounded-full` cho các element tương tác.
- Màu nền: Trắng hoặc màu xám nhạt (`bg-slate-50`).
- Text: Font chữ to, đậm (`font-bold`, `text-lg`, `text-xl`).
