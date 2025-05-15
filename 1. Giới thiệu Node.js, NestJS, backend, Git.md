# 1.Giới thiệu Node.js, NestJS, Backend và Git

## 🧩 I. Kiến thức nền tảng về Backend

### 1. Frontend vs Backend
- **Frontend**: Giao diện người dùng (HTML, CSS, JS)
- **Backend**: Xử lý logic, giao tiếp CSDL, xác thực, API

### 2. Backend làm gì?
- Nhận yêu cầu từ client → xử lý → trả về kết quả
- Quản lý người dùng, đơn hàng, thanh toán, v.v.
- Đọc/ghi dữ liệu từ CSDL (SQL hoặc NoSQL)
- Phục vụ các API: REST hoặc GraphQL

### 3. Mô hình hoạt động phổ biến
- Client – Server
- REST API: GET, POST, PUT, DELETE
- MVC & Service Layer

## 🚀 II. Node.js là gì?

### 1. Node.js là môi trường chạy JavaScript ngoài trình duyệt
- Dựa trên V8 Engine (của Chrome)
- Single-thread, event-driven, non-blocking I/O

### 2. Ưu điểm
- Dùng chung ngôn ngữ với frontend (JS)
- Phù hợp làm web server, API server
- Tốc độ xử lý nhanh, nhẹ

### 3. Cài đặt Node.js qua NVM

```bash
# Cài đặt nvm (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Sau đó, restart terminal và chạy:
nvm install 20
nvm use 20
nvm alias default 20

# Kiểm tra version
node -v
npm -v
```
## 🧱 III. NestJS là gì?
- Framework xây dựng trên Node.js
- Dùng TypeScript, hỗ trợ DI, decorators, module hoá
- Ảnh hưởng bởi Angular, kiến trúc rõ ràng, dễ test

### So với Express:
- Rõ ràng hơn về cấu trúc
- Mạnh về tính mở rộng, maintain project lớn

## 🛠 IV. Git là gì và tại sao quan trọng?
**Git**: Hệ thống quản lý mã nguồn phân tán

### Giúp:
- Quản lý lịch sử code
- Làm việc nhóm
- Tạo các nhánh để phát triển độc lập
- Giảm rủi ro mất mát mã nguồn

## 📌 V. Git Cheatsheet

### 1. Staging & Committing
```bash
git status                # Kiểm tra thay đổi
git add .                 # Stage toàn bộ file
git commit -m "Message"   # Tạo commit
git commit --amend        # Chỉnh sửa commit cuối
```

### 2. Repository Setup
```bash
git init                  # Khởi tạo repo mới
git clone <repo_url>      # Clone repo có sẵn
```

### 3. Branch Management
```bash
git branch -a                     # Liệt kê branch
git checkout -b feature/login     # Tạo + chuyển branch
git merge dev                     # Gộp branch khác
git branch -d hotfix              # Xoá branch local
```

### 4. Remote Repositories
```bash
git remote add origin <url>               # Thêm remote
git push -u origin main                   # Push nhánh main
git pull                                  # Kéo thay đổi mới nhất
git fetch                                 # Tải thay đổi mà không merge
git push origin --delete old-feature      # Xoá branch remote
```

### 5. Logs & History
```bash
git log --oneline                         # Lịch sử ngắn gọn
git log --graph --oneline --all           # Dạng cây nhánh
git show <commit>                         # Chi tiết commit
```
### 6. Comparing & Diff
```bash
git diff                                  # So sánh chưa stage
git diff --staged                         # So sánh đã stage
git diff branch1 branch2                  # So sánh 2 branch
```

### 7. Stashing (Lưu tạm thay đổi)
```bash
git stash                                 # Lưu tạm
git stash pop                             # Áp dụng lại
```

### 8. Tags
```bash
git tag -a v1.0 -m "Release 1.0"          # Tạo tag
git push origin --tags                    # Push tất cả tag
```

### 9. Undoing Changes
```bash
git restore <file>                        # Khôi phục file
git reset <file>                          # Bỏ stage
git reset --soft HEAD~1                   # Undo commit nhưng giữ stage
git reset --hard HEAD~1                   # Xoá commit và thay đổi
git revert <hash>                         # Tạo commit ngược lại
```

### 10. Rebase & Cherry-Pick
```bash
git rebase main                           # Rebase với nhánh main
git rebase -i HEAD~3                      # Rebase tương tác
git cherry-pick <commit>                  # Lấy commit từ nhánh khác
```

### 11. Clean Up
```bash
git clean -fd                             # Xoá file chưa track
git gc                                    # Dọn dẹp repo
```

### 12. Submodules
```bash
git submodule add <repo> <path>           # Thêm submodule
git submodule update --init               # Khởi tạo submodule
```

### 13. Git Configuration
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor code
git config --list
```
## 📝 VI. Bài tập / Chuẩn bị cho buổi sau

### Cài đặt:
- nvm, node v20
- Git + VS Code
- Tạo tài khoản GitHub

### Thực hành:
- Tạo 1 repo GitHub và clone về máy
- Thực hiện 1 commit đơn giản (add 1 file README)
- Tạo 1 branch mới, push lên GitHub

### Đọc thêm:
- [Node.js](https://nodejs.org/en/about/)
- [NestJS](https://docs.nestjs.com/)
- [Git Tutorials](https://www.atlassian.com/git/tutorials)
