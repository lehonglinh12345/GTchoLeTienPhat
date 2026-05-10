# HƯỚNG DẪN QUẢN TRỊ & PHÁT TRIỂN 3COVANGOC STUDIO

## 1. Cách chạy ứng dụng (Commands)
Dự án này sử dụng Vite và React. Các lệnh chính bạn có thể dùng trong terminal:
- `npm run dev`: Chạy server phát triển (môi trường bạn đang làm việc).
- `npm run build`: Đóng gói ứng dụng để đưa lên hosting/production.
- `npm run lint`: Kiểm tra lỗi code theo chuẩn.

## 2. Quản lý hình ảnh (Assets)
Tất cả các tệp hình ảnh nên được để trong thư mục `/public/images`.
- Tui đã tạo sẵn thư mục `/public/images/` cho bạn rồi đó.
- **Cách thêm ảnh:** Bạn chỉ cần kéo thả ảnh từ máy tính vào thư mục này trong khung quản lý file bên trái.
- **Cách dùng trong code:** Nếu bạn để ảnh tên là `logo.png` vào đó, trong code bạn chỉ cần viết: `src="/images/logo.png"`.
- Hiện tại các file cũ như `input_file_0.png` đang ở ngoài gốc, bạn có thể chuyển chúng vào đây và cập nhật lại đường dẫn nếu muốn gọn hơn. (Ví dụ: từ `src="/input_file_0.png"` thành `src="/images/input_file_0.png"`)

## 3. Cách thêm Video (Giải pháp cho video nặng)
Đúng như bạn nói, để video trực tiếp trong source code sẽ làm web load rất chậm (ảnh hưởng SEO và trải nghiệm). Có 3 cách tốt nhất:

### Cách 1: Sử dụng Youtube/Vimeo (Khuyên dùng)
- Tải video lên Youtube (để chế độ "Không công khai" nếu muốn riêng tư).
- Copy mã nhúng hoặc ID video.
- Sử dụng iframe hoặc thư viện `react-player`.
- **Ưu điểm:** Tốc độ load cực nhanh vì server Youtube xử lý, không tốn băng thông của bạn.

### Cách 2: Sử dụng Cloudinary hoặc Bunny.net
- Đây là các dịch vụ lưu trữ media chuyên nghiệp.
- Họ cung cấp đường dẫn (URL) đã được tối ưu hóa dung lượng.
- Bạn chỉ cần dùng thẻ `<video src="https://cloudinary.com/..." />`.

### Cách 3: Tối ưu video thủ công (Nếu vẫn muốn để file gốc)
- Chuyển đổi video sang định dạng `.webm` (nhẹ hơn `.mp4` rất nhiều).
- Giảm độ phân giải xuống 720p hoặc 1080p với bitrate thấp.
- Sử dụng thuộc tính `preload="none"` hoặc `lazy load` cho video.

## 4. Cấu trúc thư mục chính
- `/src/components`: Chứa các phần của trang web (Navbar, Footer, Hero...).
- `/src/App.tsx`: File tổng hợp các component.
- `/src/index.css`: Nơi quản lý màu sắc (Tailwind) và font chữ.
