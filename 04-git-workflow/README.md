# 4. Git Flow, Branch, Pull Request, Conflict — Git nâng cao và Code theo Git Flow

## 1. Git Branch là gì?
Branch là một nhánh riêng biệt trong Git dùng để phát triển tính năng, sửa lỗi mà không ảnh hưởng đến nhánh chính (thường là main hoặc master).

- Mỗi branch là một dòng lịch sử commit riêng biệt.
- Giúp làm việc song song, tránh conflict khi nhiều người cùng phát triển.

Ví dụ tạo branch:

```bash
git checkout -b feature/login
```
## 2. Git Flow là gì?
Git Flow là một quy trình làm việc với Git để quản lý các branch một cách khoa học, hiệu quả.

Phù hợp cho các dự án có nhiều người cùng làm việc.

Được phát triển bởi Vincent Driessen, gồm các branch chính:

| Branch | Mục đích |
|--------|----------|
| main | Chứa code ổn định, production-ready |
| develop | Chứa code đang phát triển, tích hợp các tính năng mới |
| feature/* | Branch phát triển tính năng mới |
| release/* | Chuẩn bị cho release (sửa lỗi nhỏ, tinh chỉnh) |
| hotfix/* | Sửa lỗi khẩn cấp trên production |

## 3. Quy trình Git Flow
1. Tạo branch feature từ develop để phát triển tính năng mới.
2. Khi feature hoàn thành, merge vào develop.
3. Tạo release branch từ develop để chuẩn bị release.
4. Merge release vào main và develop.
5. Nếu phát hiện lỗi trên production, tạo hotfix branch từ main, fix lỗi, rồi merge lại vào main và develop.

## 4. Pull Request (PR) là gì?
Pull Request (hoặc Merge Request) là yêu cầu hợp nhất code từ một branch này sang branch khác (thường là từ feature vào develop hoặc từ develop vào main).

- PR giúp review code, thảo luận, phát hiện lỗi trước khi merge.
- Là một bước quan trọng trong quy trình làm việc nhóm để đảm bảo chất lượng code.

## 5. Conflict trong Git
- Xảy ra khi hai nhánh chỉnh sửa cùng một phần code khác nhau.
- Git không thể tự động merge và yêu cầu developer giải quyết thủ công.
- Khi có conflict, Git sẽ đánh dấu phần code bị conflict để bạn chỉnh sửa.

## 6. Code theo Git Flow: Các bước thực tế

### Checkout develop branch mới nhất
```bash
git checkout develop
git pull origin develop
```

### Tạo branch feature
```bash
git checkout -b feature/your-feature-name
```

### Phát triển, commit code
```bash
git add .
git commit -m "feat: implement feature X"
```

### Push feature lên remote
```bash
git push -u origin feature/your-feature-name
```

### Tạo Pull Request
1. Tạo Pull Request từ feature/your-feature-name vào develop
2. Đợi review, sửa đổi nếu cần
3. Khi approved, merge PR

### Update develop
```bash
git checkout develop
git pull origin develop
```

### Tạo release branch khi chuẩn bị release
```bash
git checkout -b release/v1.0.0 develop
```
Sửa lỗi nhỏ, tinh chỉnh.

### Merge release vào main và develop
```bash
git checkout main
git merge release/v1.0.0
git push origin main

git checkout develop
git merge release/v1.0.0
git push origin develop
```

### Tạo hotfix khi cần fix lỗi khẩn
```bash
git checkout -b hotfix/bugfix-issue main
# fix lỗi
git commit -m "fix: critical bug"
git push origin hotfix/bugfix-issue
```
Tạo PR merge hotfix vào main và develop.

## 7. Giải quyết conflict (merge conflict)
Khi merge hoặc rebase có conflict, Git báo lỗi.

Mở file bị conflict, Git sẽ đánh dấu:

```diff
<<<<<<< HEAD
Code trên branch hiện tại
=======
Code trên branch được merge vào
>>>>>>> feature/your-feature-name
```

Chỉnh sửa lại cho đúng, xóa các ký hiệu `<<<<<<<`, `=======`, `>>>>>>>`.

Sau đó:

```bash
git add <file-fixed>
git commit
```

## 8. Một số lệnh Git hữu ích trong Git Flow

### Xem các branch:
```bash
git branch      # Xem branch local
git branch -r   # Xem branch remote
```

### Xoá branch sau khi merge:
```bash
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### Rebase feature lên develop mới nhất để tránh conflict:
```bash
git checkout feature/your-feature-name
git fetch origin
git rebase origin/develop
```

## 🔍 Comment thường dùng khi review Pull Request

| Comment | Ý nghĩa |
|---------|---------|
| LGTM (Looks Good To Me) | Code ổn, có thể merge |
| nit (nitpick) | Góp ý nhỏ, không bắt buộc sửa |
| WIP (Work In Progress) | Pull request đang làm dở, chưa sẵn sàng để review |
| Needs changes / Please fix | Có lỗi hoặc chưa đúng, cần chỉnh sửa lại |
| Optional | Gợi ý thêm, có thể làm hoặc không |
| Can you clarify this? | Yêu cầu giải thích thêm đoạn code |
| Consider renaming this | Nên đổi tên biến/hàm cho dễ hiểu hơn |
| Typo | Có lỗi chính tả trong code hoặc comment |
| This can be simplified | Có thể viết ngắn gọn và dễ hiểu hơn |
| Missing test | Thiếu test case cho phần code mới |
| Add documentation | Cần thêm mô tả hoặc comment trong code |
| This is a breaking change | Cảnh báo thay đổi có thể làm hỏng các phần khác |
| Security concern | Cảnh báo liên quan đến bảo mật |

## 💬 Comment khi làm việc nhóm qua Git

| Comment | Ngữ cảnh sử dụng |
|---------|------------------|
| Rebased on latest develop | Đã rebase lên nhánh develop mới nhất |
| Please resolve conflicts | Có xung đột code, cần resolve trước khi merge |
| Merged after review | Đã được review và merge |
| Closing this in favor of #123 | Đóng PR này, thay bằng PR khác |
| Let's discuss this offline | Cần trao đổi thêm ngoài GitHub/GitLab |
| Can you split this into smaller commits? | Commit quá lớn, nên chia nhỏ để dễ review |
| Thanks for the update! | Cảm ơn đã cập nhật hoặc sửa lỗi |

## ✅ Checklist mẫu cho Pull Request

Thường dùng dạng checklist để người tạo PR và reviewer theo dõi:

### ✅ PR Checklist

- [ ] Code được format đúng chuẩn
- [ ] Đã test thủ công
- [ ] Không có lỗi lint
- [ ] Đã cập nhật README (nếu cần)
- [ ] Không có thay đổi breaking

👉 **Gợi ý cho nhóm bạn**
- Có thể thiết lập template PR để các comment này có sẵn khi tạo PR.
- Trong GitHub hoặc GitLab, có thể tạo label: needs review, approved, needs rebase, v.v.

## Kiến thức thêm

### 📌 1. git merge – Kết hợp lịch sử theo hướng "song song"

#### ✅ Định nghĩa:
git merge dùng để hợp nhất hai nhánh lại với nhau, tạo ra một commit mới (merge commit) thể hiện sự kết hợp của các thay đổi từ cả hai nhánh.

#### 🧠 Ví dụ:
```bash
git checkout develop
git merge feature/login
```

Sau khi merge, Git sẽ tạo một commit mới kiểu:

```
*   Merge branch 'feature/login' into develop
|\
| * commit từ feature/login
* |
|/
* commit trước đó
```

#### ✅ Ưu điểm:
- Lịch sử commit giữ nguyên gốc.
- Dễ theo dõi quá trình phát triển song song từ nhiều nhánh.

#### ❌ Nhược điểm:
- Lịch sử có thể rối nếu merge nhiều nhánh (quá nhiều merge commits).
- Xung đột khó debug hơn vì xảy ra ở thời điểm trộn nhiều thay đổi.

### 📌 2. git rebase – Kết hợp lịch sử theo hướng "tuyến tính"

#### ✅ Định nghĩa:
git rebase sẽ di chuyển các commit của nhánh hiện tại lên đầu của một nhánh khác, như thể bạn viết lại lịch sử để làm quá trình phát triển trông liền mạch.

#### 🧠 Ví dụ:
```bash
git checkout feature/login
git rebase develop
```

Sau đó, feature/login sẽ được "dời" đến trên cùng của develop:

```
* commit từ feature/login (rebase)
* commit từ feature/login (rebase)
* commit mới nhất từ develop
* commit develop cũ
```

#### ✅ Ưu điểm:
- Lịch sử gọn gàng, dễ đọc.
- Dễ git bisect, dễ hiểu ai viết cái gì.

#### ❌ Nhược điểm:
- Thay đổi lịch sử commit (rủi ro nếu dùng trên nhánh đã push).
- Có thể gây lỗi nếu team không hiểu rõ về rebase.

### 🔄 So sánh nhanh: merge vs rebase

| Tiêu chí | git merge | git rebase |
|----------|-----------|------------|
| Lịch sử commit | Phân nhánh, merge rõ ràng | Tuyến tính, gọn gàng |
| Tạo merge commit | Có | Không (trừ khi --no-ff) |
| An toàn với nhánh đã push | ✔️ | ❌ Không an toàn nếu không cẩn thận |
| Khả năng đọc lịch sử | Có thể rối | Dễ đọc hơn |
| Giữ nguyên thời gian & tác giả | ✔️ | Có thể thay đổi |

### ✅ Khi nào nên dùng merge?

| Tình huống | Giải thích |
|------------|------------|
| Team đông người làm cùng một nhánh | Merge giúp không thay đổi lịch sử đã push |
| Nhánh chính (main, develop) cần merge từ feature | Giữ lại rõ ràng ai làm gì |
| Muốn ghi lại sự kiện hợp nhất (merge commit) | Merge sẽ có commit mô tả rõ |

```bash
git checkout develop
git merge feature/login
```

### ✅ Khi nào nên dùng rebase?

| Tình huống | Giải thích |
|------------|------------|
| Muốn lịch sử gọn, tuyến tính | Rebase tạo ra commit liền mạch |
| Đang làm việc cá nhân trên feature branch | Ít rủi ro khi rebase |
| Trước khi mở PR, rebase để cập nhật nhánh mới nhất | Tránh conflict khi merge vào develop/main |

```bash
git checkout feature/login
git fetch origin
git rebase origin/develop
```

### ⚠️ Lưu ý khi dùng rebase
Không rebase nhánh đã chia sẻ hoặc đã push cho người khác (trừ khi tất cả đều hiểu cách xử lý).

Nếu lỡ push sau khi rebase, cần dùng:

```bash
git push --force-with-lease
```

### 🎯 Mẹo chuyên nghiệp
- merge dùng khi teamwork.
- rebase dùng khi làm việc cá nhân trước khi push.

Kết hợp cả hai là cách tốt nhất:

**Rebase local → push → Merge qua Pull Request**