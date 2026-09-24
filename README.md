# CV Digital — Nguyen Gia Hy

Trang CV cá nhân dạng web tĩnh (HTML + CSS + JavaScript thuần), không cần cài đặt hay
build, chạy được trên mọi dịch vụ host tĩnh (GitHub Pages, Cloudflare Pages, Netlify...).

## Cấu trúc thư mục

| File / thư mục      | Vai trò                                                                 |
|---------------------|-------------------------------------------------------------------------|
| `index.html`        | Khung trang (không chứa nội dung, chỉ chứa bố cục)                     |
| `css/style.css`     | Giao diện: màu sắc, dark mode, responsive, bố cục khi in ra PDF        |
| `js/data.js`        | **Toàn bộ nội dung CV**. Muốn sửa gì chỉ cần sửa file này.             |
| `js/main.js`        | Đọc `data.js` và dựng trang, xử lý menu, dark mode, nút Download PDF   |
| `assets/avatar.jpg` | Ảnh chân dung (vuông, 640×640). Xoá file này thì trang hiện chữ cái tên |
| `.nojekyll`         | Báo GitHub Pages không chạy Jekyll, giữ nguyên file                     |

## Sửa nội dung CV

1. Mở `js/data.js` bằng bất kỳ trình soạn thảo nào (Notepad, VS Code...).
2. Sửa chữ nằm trong dấu ngoặc kép `"..."`. Danh sách nằm trong `[ ... ]`, các mục cách
   nhau bằng dấu phẩy.
3. Mục nào để trống (`""` hoặc `[]`) sẽ tự ẩn, kể cả cả một section (ví dụ
   `certifications: []` thì mục Certifications và link menu tương ứng biến mất).
4. Lưu file, tải lại trang. Nếu trang trắng, thường là thiếu dấu phẩy hoặc dấu ngoặc kép.

Các chỗ đang chờ bổ sung: `period` (năm) của từng mục Education/Experience,
`certifications`, `languages`, `linkedin`, và `link` của từng project.

## Xem thử trên máy

Chạy trong thư mục dự án rồi mở <http://localhost:8765>:

```bash
python -m http.server 8765
```

(Mở thẳng `index.html` bằng trình duyệt cũng được, nhưng một số trình duyệt chặn ảnh
hoặc font khi mở file trực tiếp.)

## Tải PDF

Nút **Download PDF** mở hộp thoại in của trình duyệt. Chọn máy in là **Save as PDF**
(Chrome/Edge) rồi bấm Save. Trang đã có bố cục riêng khi in: bỏ menu, gọn khổ A4.

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ tên `cv` (public).
2. Trong thư mục này chạy:

```bash
git init
git add .
git commit -m "Digital CV"
git branch -M main
git remote add origin https://github.com/ngiahy/cv.git
git push -u origin main
```

3. Vào **Settings → Pages** của repo, mục *Build and deployment* chọn
   **Source: Deploy from a branch**, Branch **main** / **/(root)**, bấm Save.
4. Sau khoảng 1–2 phút, CV có ở địa chỉ `https://ngiahy.github.io/cv/`.

Mỗi lần sửa `data.js` xong, chạy lại `git add . && git commit -m "Update CV" && git push`
là trang tự cập nhật.
