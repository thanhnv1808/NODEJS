# 📚 Buổi 8: Git căn bản + Git Flow + Pull Request

## ❓ Câu hỏi mở đầu
- Bạn đã bao giờ gặp khó khăn khi làm việc nhóm, merge code, hoặc bị mất code chưa?
- Làm sao để quản lý lịch sử thay đổi, rollback khi cần?
- Làm thế nào để review code, đảm bảo chất lượng khi làm việc nhóm?

Have you ever struggled with code conflicts, lost code, or wondered how teams manage code changes and reviews?

---

## 1. 🗂️ Git là gì? (What is Git?)

**Git** là hệ thống quản lý phiên bản phân tán (distributed version control system) phổ biến nhất hiện nay.

- Lưu lại lịch sử thay đổi code
- Làm việc nhóm hiệu quả, tránh ghi đè code
- Dễ dàng rollback, tạo nhánh thử nghiệm

### Các lệnh Git cơ bản
```bash
git init           # Khởi tạo repo mới
git status         # Kiểm tra trạng thái file
git add .          # Thêm file vào staging
git commit -m "message"  # Lưu thay đổi
```

---

## 🔑 Các lệnh Git căn bản

| Lệnh | Ý nghĩa | Ví dụ |
|------|---------|-------|
| `git clone <url>` | Tải repo về máy | `git clone https://github.com/user/repo.git` |
| `git status` | Xem trạng thái file | `git status` |
| `git add <file>` | Thêm file vào staging | `git add index.js` |
| `git add .` | Thêm tất cả file | `git add .` |
| `git commit -m "msg"` | Lưu thay đổi vào lịch sử | `git commit -m "feat: add login"` |
| `git branch` | Xem các branch | `git branch -a` |
| `git checkout <branch>` | Chuyển branch | `git checkout develop` |
| `git switch <branch>` | Chuyển branch (mới) | `git switch feature/login` |
| `git checkout -b <branch>` | Tạo branch mới | `git checkout -b feature/login` |
| `git merge <branch>` | Gộp nhánh vào nhánh hiện tại | `git merge feature/login` |
| `git rebase <branch>` | Rebase nhánh hiện tại lên branch khác | `git rebase develop` |
| `git log` | Xem lịch sử commit | `git log --oneline --graph` |
| `git diff` | So sánh sự khác biệt | `git diff develop..feature/login` |
| `git stash` | Lưu tạm thay đổi chưa commit | `git stash` |
| `git stash pop` | Lấy lại thay đổi đã stash | `git stash pop` |
| `git remote -v` | Xem remote repo | `git remote -v` |
| `git fetch` | Lấy code mới về (chưa merge) | `git fetch origin` |
| `git pull` | Lấy code mới và merge | `git pull origin develop` |
| `git push` | Đẩy code lên remote | `git push origin feature/login` |
| `git rm <file>` | Xóa file khỏi repo | `git rm old.js` |
| `git mv <old> <new>` | Đổi tên file | `git mv old.js new.js` |
| `git reset --hard <commit>` | Quay lại commit cũ (mất thay đổi) | `git reset --hard HEAD~1` |
| `git revert <commit>` | Tạo commit đảo ngược | `git revert abc1234` |
| `git tag <name>` | Đánh dấu version | `git tag v1.0.0` |
| `git show <commit>` | Xem chi tiết commit | `git show HEAD` |
| `git blame <file>` | Xem ai sửa dòng nào | `git blame app.ts` |
| `git clean -fd` | Xóa file chưa track | `git clean -fd` |
| `git cherry-pick <commit>` | Lấy 1 commit từ nhánh khác | `git cherry-pick abc1234` |
| `git reflog` | Xem lịch sử HEAD (phục hồi commit lỡ xóa) | `git reflog` |

**Tips:**
- Dùng `git log --oneline --graph --decorate` để xem lịch sử trực quan
- Dùng `git diff <branch1>..<branch2>` để so sánh code giữa 2 nhánh
- Dùng `git stash` khi cần chuyển nhánh mà chưa muốn commit
- Dùng `git reset --hard` cẩn thận, có thể mất code chưa commit

---

## 2. 🌳 Git Flow (Quy trình làm việc với Git)

**Git Flow** là quy trình làm việc với nhiều nhánh (branch) giúp teamwork hiệu quả, giảm xung đột.

- `main`/`master`: code production
- `develop`: code phát triển
- `feature/*`: nhánh tính năng
- `hotfix/*`, `bugfix/*`: sửa lỗi

### Ví dụ workflow
```bash
git checkout -b feature/login   # Tạo nhánh mới cho tính năng login
# ... code, commit ...
git push origin feature/login   # Đẩy nhánh lên remote
```

### Merge code
```bash
git checkout develop
git merge feature/login
```

---

## 🌟 Workflow nâng cao & ví dụ conflict thực tế

### Workflow teamwork nâng cao
1. Luôn tạo nhánh mới từ develop/main cho mỗi tính năng hoặc bugfix
2. Commit code lên nhánh riêng, push lên remote
3. Tạo Pull Request, chờ review
4. Khi được approve, merge vào develop/main (ưu tiên squash hoặc rebase để lịch sử gọn)
5. Nếu develop/main thay đổi, rebase nhánh feature trước khi merge để tránh conflict

### Ví dụ conflict thực tế
Giả sử 2 bạn cùng sửa 1 dòng trong file `src/app.ts`:
- Nhánh A sửa dòng 10: `const PORT = 3000;` thành `const PORT = 4000;`
- Nhánh B sửa dòng 10: `const PORT = 3000;` thành `const PORT = 5000;`

Cả 2 cùng merge vào develop sẽ bị conflict:
```diff
<<<<<<< HEAD
const PORT = 4000;
=======
const PORT = 5000;
>>>>>>> feature/other
```
**Cách giải quyết:**
- Đọc kỹ, chọn giá trị đúng, xóa các dấu conflict `<<<<<<<`, `=======`, `>>>>>>>`
- Test lại code, commit với message rõ ràng: `fix: resolve port conflict in app.ts`

### Tips khi giải quyết conflict
- Luôn pull code mới nhất về trước khi merge
- Đọc kỹ từng phần conflict, hỏi team nếu không chắc
- Test lại sau khi resolve conflict

---

## 📋 Quy tắc đặt tên commit (Conventional Commit)

Sử dụng quy tắc đặt tên commit giúp lịch sử code rõ ràng, dễ hiểu, hỗ trợ tự động tạo changelog, CI/CD.

**Một số prefix phổ biến:**
- `feat`: Thêm tính năng mới (feature)
- `fix`: Sửa bug
- `refactor`: Refactor code, không thay đổi logic
- `chore`: Thay đổi nhỏ, không ảnh hưởng logic (update deps, config...)
- `docs`: Thay đổi tài liệu
- `test`: Thêm/sửa test
- `style`: Thay đổi style code (format, indent, ...)

**Cấu trúc:**
```
<type>(scope?): <short description>
```
**Ví dụ:**
- `feat(user): add login API`
- `fix(auth): wrong password error`
- `refactor(user): split controller and service`
- `docs: update README for setup`
- `chore: update dependencies`

**Tips:**
- Commit message ngắn gọn, rõ ý, dùng tiếng Anh nếu làm việc nhóm nhiều người
- Có thể dùng tool như commitizen để chuẩn hóa commit

---

## 3. 🔄 Pull Request (PR) & Code Review

**Pull Request** là cách đề xuất thay đổi code lên repository chung, giúp review, thảo luận, kiểm soát chất lượng code.

- Tạo PR khi hoàn thành tính năng/bugfix
- Reviewer kiểm tra, comment, yêu cầu sửa nếu cần
- Merge vào develop/main khi đã OK

### Ví dụ tạo Pull Request (GitHub)
1. Push nhánh mới lên GitHub
2. Vào repo → Pull requests → New pull request
3. Chọn base branch (develop/main), compare branch (feature/xxx)
4. Viết mô tả, gán reviewer

---

## 💡 Tips thực tế khi dùng Git & Git Flow
- Luôn pull code mới nhất về trước khi làm (git pull origin develop)
- Đặt tên nhánh rõ ràng: feature/login, bugfix/fix-header, hotfix/crash-app
- Commit message ngắn gọn, rõ ý ("Add login API", "Fix bug: wrong password")
- Không commit file thừa (.env, node_modules, build...)
- Luôn tạo PR, không push thẳng vào develop/main
- Review code của nhau, học hỏi best practice
- Khi conflict, đọc kỹ, chọn đúng phần code cần giữ

---

## 📝 Bài tập thực hành
- Tạo repo mới trên GitHub, clone về máy
- Tạo nhánh feature, commit code, push lên remote
- Tạo Pull Request, mời bạn cùng review
- Thử tạo conflict, giải quyết conflict

---

## 🔗 Tham khảo / References
- [Pro Git Book (English)](https://git-scm.com/book/en/v2)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Git Flow Explained](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests)
- [F8: Git cơ bản (Video tiếng Việt)](https://www.youtube.com/watch?v=1h9_cB9mPT8)
- [F8: Git Flow & Pull Request (Video tiếng Việt)](https://www.youtube.com/watch?v=G7uw6gB6ZpA) 