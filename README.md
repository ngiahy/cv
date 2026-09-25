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
| `assets/Nguyen-Gia-Hy-CV.pdf` | Bản PDF tĩnh mà nút Download PDF tải về (sinh bằng `tools/build.py`) |
| `assets/og-image.jpg` | Ảnh xem trước khi chia sẻ link lên LinkedIn, Zalo, Facebook... (sinh bằng `tools/build.py`) |
| `tools/`            | Script dựng PDF và ảnh xem trước (`build.py`), mẫu ảnh xem trước (`og-image.html`), sơ đồ kiến trúc dự án (`diagrams/*.html`) |
| `.nojekyll`         | Báo GitHub Pages không chạy Jekyll, giữ nguyên file                     |

## Sửa nội dung CV

1. Mở `js/data.js` bằng bất kỳ trình soạn thảo nào (Notepad, VS Code...).
2. Sửa chữ nằm trong dấu ngoặc kép `"..."`. Danh sách nằm trong `[ ... ]`, các mục cách
   nhau bằng dấu phẩy.
3. Mục nào để trống (`""` hoặc `[]`) sẽ tự ẩn, kể cả cả một section (ví dụ
   `certifications: []` thì mục Certifications và link menu tương ứng biến mất).
4. Lưu file, tải lại trang. Nếu trang trắng, thường là thiếu dấu phẩy hoặc dấu ngoặc kép.

Các chỗ còn trống: `linkedin` và `link` của từng project.

## Xem thử trên máy

Chạy trong thư mục dự án rồi mở <http://localhost:8765>:

```bash
python -m http.server 8765
```

(Mở thẳng `index.html` bằng trình duyệt cũng được, nhưng một số trình duyệt chặn ảnh
hoặc font khi mở file trực tiếp.)

## Tải PDF và ảnh xem trước

Nút **Download PDF** tải file tĩnh `assets/Nguyen-Gia-Hy-CV.pdf` (2 trang A4), nên mọi
trình duyệt đều nhận đúng một bản. File này được sinh từ chính trang web bằng bố cục in
trong `css/style.css`. **Sau mỗi lần sửa `data.js`, chạy lại:**

```bash
python tools/build.py
```

Lệnh trên cần Microsoft Edge hoặc Google Chrome có sẵn trên máy; nó dựng lại cả PDF lẫn
ảnh xem trước khi chia sẻ link (`assets/og-image.jpg`, 1200×630). Chạy
`python tools/build.py pdf` hoặc `python tools/build.py og` nếu chỉ cần một trong hai,
rồi commit và push các file vừa sinh. Script cũng tự ghi tháng hiện tại vào `lastUpdated`
trong `data.js` (dòng "Last updated" ở chân trang và cuối PDF).

Nếu để `pdfFile: ""` trong `data.js`, nút Download quay về mở hộp thoại in của trình
duyệt (chọn máy in **Save as PDF**).

Sơ đồ kiến trúc của các dự án là file HTML trong `tools/diagrams/`. Sửa xong chạy
`python tools/build.py diagrams` để xuất lại ảnh vào `assets/projects/`.

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
