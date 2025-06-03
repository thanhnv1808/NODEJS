# 🚀 Khóa học Backend Developer với Node.js & NestJS

## 📚 Giới thiệu

Khóa học thực chiến 16 buổi từ JavaScript cơ bản đến Backend chuyên nghiệp với Node.js và NestJS. Khóa học được thiết kế theo lộ trình từ cơ bản đến nâng cao, giúp bạn:

- Nắm vững **JavaScript ES6+** và **TypeScript**
- Làm chủ **Node.js**, **Express**, và **NestJS**
- Xây dựng **RESTful API** chuẩn với authentication JWT
- Quản lý code chuyên nghiệp với **Git Flow**
- Triển khai backend thực tế với database, validation, pagination, upload file

---

## 📅 Lộ trình học tập chi tiết (16 buổi)

> **Lưu ý:** Từ buổi 6, toàn bộ code sẽ chuyển sang TypeScript. Học viên cần nắm vững các khái niệm: type, interface, class, function, module, generic, decorator, DTO... để học tốt Node.js và NestJS.

| Giai đoạn | Buổi | Chủ đề chính | Kỹ năng chính | Bài tập thực hành |
|-----------|------|--------------|--------------|-------------------|
| Giới thiệu | **0** | Giới thiệu, setup, mindset | Lộ trình, mục tiêu, cài đặt tool, tips học | Cài đặt Node.js, VSCode, Git, MySQL |
| JavaScript Basic | **1** | Biến, kiểu dữ liệu, toán tử, điều kiện | `var/let/const`, kiểu dữ liệu, if/switch | Kiểm tra số chia hết, phân loại học lực |
| JavaScript Basic | **2** | Vòng lặp, hàm, mảng cơ bản | for/while, function, array methods | Tính tổng số chẵn, quản lý danh sách |
| JavaScript Basic | **3** | Object, scope, callback, JSON | Object, scope/hoisting, callback, JSON | Quản lý đơn hàng, callback delay |
| JavaScript Advance | **4** | ES6+: Destructuring, arrow, spread, class | Destructuring, arrow function, class | Tạo class User, clone object |
| JavaScript Advance | **5** | Promise, async/await, module | Promise, async/await, import/export | Fetch API giả lập, module hóa |
| Node.js | **6** | Node.js, **TypeScript cơ bản**, setup project, ESLint, Prettier | Node.js, npm, **TypeScript: type, interface, class, function, module, type assertion** | Setup project TypeScript + Express, refactor code JS sang TS, tạo interface/class, cấu hình tsconfig |
| Node.js | **7** | Express: Routing, Middleware, Controller, Service | HTTP methods, middleware, MVC | CRUD products, middleware log IP |
| Node.js | **8** | Git, Git Flow, Pull Request, conflict | Git workflow, branching, conflict | Git flow với feature branch, xử lý conflict |
| Node.js | **9** | RESTful API, Clean Architecture | REST principles, folder structure | Refactor theo clean architecture, tài liệu API |
| Node.js | **10** | MySQL + TypeORM, Entity, CRUD | Cài MySQL, kết nối TypeORM, Entity, CRUD | Tạo bảng Product, CRUD với TypeORM |
| NestJS | **11** | **TypeScript recap nâng cao**, NestJS Introduction, Architecture | **TypeScript OOP, Decorator, Generic, Enum, DTO, type guard**; NestJS CLI, module | Tổng hợp ví dụ TypeScript nâng cao, module products, CRUD với NestJS |
| NestJS | **12** | Module, DTO, Validation, Pipe | DTO, class-validator, pipes, middleware | DTO validation, pipe kiểm tra ID |
| NestJS | **13** | Authentication: JWT, Guard, Role-based access | JWT, auth flow, guards, role | Register/login, JWT token, protect routes |
| NestJS | **14** | Swagger, Error Handling, API Testing | Swagger docs, global exception filter, Postman | Swagger integration, Postman testing |
| NestJS | **15** | File upload (Multer), Pagination, Filtering | Upload file, phân trang, filter, query builder | Upload ảnh, phân trang, filter theo price |
| NestJS | **16** | Testing (Unit test, E2E test), Performance, Security, Code Review, Final Project Demo | Jest, Supertest, bảo mật, tối ưu, review | Viết unit test, e2e test, demo project, code review |

---

## 🎯 Dự án cuối khóa

### 🎓 Backend API: Quản lý Sản phẩm & Đơn hàng

Xây dựng hệ thống backend hoàn chỉnh với NestJS cho phép:
- **Quản lý sản phẩm** (có và không có biến thể – variation)
- **Tạo đơn hàng** (order)
- **Xác thực người dùng** (JWT)
- **Áp dụng clean architecture**, validation, pagination, upload, và best practices

### 🧱 Chức năng bắt buộc

#### 1. Authentication & Authorization
- **Đăng ký / Đăng nhập** với JWT
- **Middleware bảo vệ route**
- **User roles**: admin, user

#### 2. Quản lý Sản phẩm
- **CRUD operations**: Tạo mới, sửa, xóa, xem danh sách sản phẩm
- **Hỗ trợ 2 loại sản phẩm**:
  - **Không có variation**: VD: sách, chai nước
  - **Có variation**: VD: áo có size M, L và màu đỏ, xanh
- **Mỗi variation** có sku, price, quantity riêng

```typescript
// Data Models
Product {
  id: number
  name: string
  description: string
  hasVariation: boolean
  variations?: Variation[] // optional
}

Variation {
  id: number
  productId: number
  name: string // VD: "Size M - Đỏ"
  sku: string
  price: number
  quantity: number
}
```

#### 3. Quản lý Đơn hàng
- **Tạo đơn hàng** gồm 1 hoặc nhiều sản phẩm (hoặc variation)
- **Theo dõi trạng thái** đơn hàng

```typescript
Order {
  id: number
  userId: number
  items: OrderItem[]
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled'
  createdAt: Date
}

OrderItem {
  productId: number
  variationId?: number // nếu có variation
  quantity: number
  price: number // tại thời điểm mua
}
```

### 🧪 Yêu cầu kỹ thuật

| Tính năng | Bắt buộc |
|-----------|----------|
| NestJS structure (Module, DTO...) | ✅ |
| TypeScript | ✅ |
| JWT Authentication | ✅ |
| CRUD Product | ✅ |
| CRUD Variation (nếu có) | ✅ |
| CRUD Order | ✅ |
| Validation với class-validator | ✅ |
| Swagger docs | ✅ |
| Middleware (Logging/Auth check) | ✅ |
| Upload ảnh sản phẩm (Multer) | ✅ |
| Pagination + Filter sản phẩm | ✅ |
| Error handling | ✅ |
| Clean folder structure | ✅ |

### 📦 Yêu cầu nộp bài

#### ✅ Deliverables
- **Source code đầy đủ** trên GitHub
- **README.md** mô tả:
  - Hướng dẫn cài đặt
  - Mô hình CSDL (sử dụng schema hoặc ERD)
  - Swagger endpoint link
- **Demo trực tiếp** (5–10 phút)
- **Code review** (naming, cấu trúc, best practices)

#### 🚀 Gợi ý mở rộng (nếu còn thời gian)
- **Role-based access** (admin vs user)
- **Trạng thái đơn hàng** (update workflow)
- **Tích hợp thanh toán** giả lập
- **Unit test** cho service layer

---

## ✅ Kết quả đạt được sau khóa học

### 🎓 Kiến thức Core
- **JavaScript ES6+** và **TypeScript** thành thạo
- **Node.js** ecosystem và package management
- **Express.js** framework và middleware system
- **NestJS** advanced framework với dependency injection

### 🛠️ Kỹ năng Thực tế
- Thiết kế **RESTful API** chuẩn
- Implement **JWT Authentication** và authorization
- **Database integration** với ORM (TypeORM)
- **Git Flow** và collaborative development
- **API documentation** với Swagger
- **Error handling** và validation patterns

### 🚀 Năng lực Triển khai
- Xây dựng backend production-ready
- Clean architecture và best practices
- Testing và debugging API
- File upload và data processing
- Performance optimization với pagination

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: Node.js
- **Language**: TypeScript
- **Frameworks**: Express.js, NestJS
- **Database**: PostgreSQL / MySQL
- **ORM**: TypeORM

### Development Tools
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git, GitHub
- **API Testing**: Postman
- **Documentation**: Swagger/OpenAPI
- **Authentication**: JWT (JSON Web Tokens)

### Advanced Features
- **File Upload**: Multer
- **Validation**: class-validator, class-transformer
- **Error Handling**: Global exception filters
- **Data Processing**: Pagination, filtering, sorting

---

## 📚 Cấu trúc học tập

### 📖 Mỗi buổi học bao gồm:
- **Lý thuyết**: Concepts và best practices
- **Demo code**: Live coding examples
- **Hands-on**: Bài tập thực hành ngay
- **Assignment**: Bài tập về nhà

### 🎯 Phương pháp học:
- **Learning by doing**: 70% thực hành, 30% lý thuyết
- **Progressive complexity**: Từ cơ bản đến nâng cao
- **Real-world projects**: Áp dụng vào dự án thực tế
- **Code review**: Feedback và cải thiện code quality

---

## 🚀 Bắt đầu học ngay

1. **Prerequisites**: Kiến thức HTML/CSS cơ bản
2. **Setup**: Node.js, VS Code, Git
3. **Mindset**: Sẵn sàng code mỗi ngày
4. **Goal**: Trở thành Backend Developer chuyên nghiệp

> 💡 **Tip**: Mỗi buổi học đều có bài tập thực hành. Hãy hoàn thành đầy đủ để đạt hiệu quả tối đa!

## 📝 Lưu ý khi giảng dạy & tổ chức lớp học

### 1. Kiến thức (Lý thuyết)
- Giải thích ngắn gọn, thực tế, liên hệ ví dụ thực tế.
- Bám sát lộ trình, mỗi buổi chỉ tập trung 1–2 chủ đề chính.
- Nhấn mạnh nền tảng: JavaScript, TypeScript, OOP.
- So sánh công nghệ (Express vs NestJS, Prisma vs TypeORM...).
- Giải thích best practice: tại sao dùng DTO, validation, tách service/controller...

### 2. Thực hành
- Code live từng bước, vừa code vừa giải thích.
- Chia nhỏ bài tập, có mini-exercise sau mỗi phần lý thuyết.
- Khuyến khích học viên tự code lại, tự sửa lỗi.
- Review code mẫu, chỉ ra điểm mạnh/yếu, refactor nếu cần.
- Tạo môi trường thực tế: dùng Git, branch, pull request, code review.

### 3. Tips & Kỹ năng mềm
- Khuyến khích chủ động hỏi/tra cứu, không ngại sai.
- Hướng dẫn đọc docs chính thống (MDN, NestJS, TypeORM...).
- Chỉ cách debug hiệu quả: đọc lỗi, breakpoint, log, tìm bug.
- Quản lý thời gian hợp lý, ưu tiên thực hành.
- Giao tiếp & teamwork: làm việc nhóm, code review, giải thích cho nhau.
- Ghi chú & tổng kết sau mỗi buổi, highlight lỗi thường gặp và mẹo xử lý.

### 4. Mẹo thực tế khi dạy
- Luôn chuẩn bị code mẫu, slide, checklist trước buổi học.
- Dùng nhiều ví dụ thực tế (CRUD, login, upload, pagination...).
- Tạo không khí học tập tích cực, động viên học viên thử và sai.
- Theo sát tiến độ, hỗ trợ cá nhân nếu học viên bị chậm.
- Định kỳ tổ chức mini review, quiz, hoặc demo nhỏ để kiểm tra kiến thức.

> **Tóm lại:** 70% thực hành, 30% lý thuyết. Luôn giải thích "tại sao" chứ không chỉ "làm gì". Tạo động lực và thói quen tự học, tự giải quyết vấn đề cho học viên.

---

## 📋 Checklist chi tiết cho từng buổi & Template review code

### Checklist từng buổi

#### Buổi 0: Giới thiệu, setup, mindset
- **Lý thuyết:** Giới thiệu khóa học, lộ trình, mục tiêu, công cụ cần thiết, mindset học thực chiến
- **Demo/code mẫu:** Hướng dẫn cài đặt Node.js, VSCode, Git, MySQL
- **Bài tập thực hành:** Cài đặt đầy đủ các công cụ, thử tạo project Node.js đầu tiên
- **Assignment:** Viết 1 đoạn giới thiệu bản thân, lý do học backend, chụp màn hình cài đặt thành công
- **Lưu ý:** Tạo không khí tích cực, giải thích rõ kỳ vọng và phương pháp học

#### Buổi 1: Biến, kiểu dữ liệu, toán tử, điều kiện
- **Lý thuyết:** var/let/const, kiểu dữ liệu cơ bản, toán tử, if/switch
- **Demo/code mẫu:** So sánh var/let/const, ví dụ kiểm tra số chẵn/lẻ, phân loại học lực
- **Bài tập thực hành:** Viết hàm kiểm tra số chia hết, phân loại học lực theo điểm
- **Assignment:** Bài tập về biến, kiểu dữ liệu, toán tử, điều kiện (tự nghĩ thêm ví dụ)
- **Lưu ý:** Nhấn mạnh sự khác biệt var/let/const, giải thích scope

#### Buổi 2: Vòng lặp, hàm, mảng cơ bản
- **Lý thuyết:** for/while, function declaration/expression, array methods (push, map, filter)
- **Demo/code mẫu:** Tính tổng số chẵn, kiểm tra số nguyên tố, quản lý danh sách
- **Bài tập thực hành:** Viết hàm tính tổng, filter mảng, tìm phần tử lớn nhất
- **Assignment:** Bài tập về vòng lặp, hàm, mảng (tự nghĩ thêm ví dụ)
- **Lưu ý:** Khuyến khích học viên tự code lại demo

#### Buổi 3: Object, scope, callback, JSON
- **Lý thuyết:** Object, thuộc tính/phương thức, scope/hoisting, callback, JSON
- **Demo/code mẫu:** Quản lý đơn hàng bằng object, callback delay, chuyển đổi JSON
- **Bài tập thực hành:** Viết object quản lý học sinh, sử dụng callback cho delay
- **Assignment:** Bài tập về object, callback, JSON
- **Lưu ý:** Giải thích kỹ callback và JSON.stringify/parse

#### Buổi 4: ES6+: Destructuring, arrow, spread, class
- **Lý thuyết:** Destructuring, arrow function, spread/rest, class, inheritance
- **Demo/code mẫu:** Tạo class User, clone object, filter theo role
- **Bài tập thực hành:** Viết class Product, sử dụng destructuring và spread
- **Assignment:** Bài tập về class, arrow function, destructuring
- **Lưu ý:** Nhấn mạnh sự tiện lợi của ES6+ cho code backend

#### Buổi 5: Promise, async/await, module
- **Lý thuyết:** Promise, async/await, import/export, module hóa code
- **Demo/code mẫu:** Fetch API giả lập, gọi API liên tiếp, tách code thành module
- **Bài tập thực hành:** Viết hàm fetch giả lập, sử dụng async/await, tách module
- **Assignment:** Bài tập về Promise, async/await, module
- **Lưu ý:** Giải thích rõ callback hell và cách async/await giải quyết

#### Buổi 6: Node.js, TypeScript cơ bản, setup project, ESLint, Prettier
- **Lý thuyết:** Node.js runtime, package.json, TypeScript (type, interface, class, function, module, type assertion), cấu hình tsconfig, code style
- **Demo/code mẫu:** Setup project TypeScript + Express, refactor code JS sang TS, tạo interface/class
- **Bài tập thực hành:** Chuyển 1 file JS sang TS, tạo interface/class, cấu hình ESLint/Prettier
- **Assignment:** Viết 1 module nhỏ bằng TypeScript, đảm bảo pass lint
- **Lưu ý:** Hướng dẫn debug TypeScript, giải thích lỗi thường gặp

#### Buổi 7: Express: Routing, Middleware, Controller, Service
- **Lý thuyết:** HTTP methods, routing, middleware, controller, service, MVC pattern
- **Demo/code mẫu:** CRUD products, middleware log IP, tách service layer
- **Bài tập thực hành:** Viết CRUD cho 1 resource, thêm middleware log
- **Assignment:** Refactor code theo MVC, viết thêm 1 middleware mới
- **Lưu ý:** Nhấn mạnh separation of concerns

#### Buổi 8: Git, Git Flow, Pull Request, conflict
- **Lý thuyết:** Git workflow, branch, commit, merge, conflict, Pull Request
- **Demo/code mẫu:** Tạo repo, branch, merge, giải quyết conflict, tạo PR
- **Bài tập thực hành:** Thực hành Git Flow với feature branch, xử lý conflict
- **Assignment:** Tạo repo cá nhân, push code, tạo PR, mô tả quy trình
- **Lưu ý:** Hướng dẫn commit message chuẩn, giải thích ý nghĩa từng bước

#### Buổi 9: RESTful API, Clean Architecture
- **Lý thuyết:** REST principles, status code, folder structure, clean architecture
- **Demo/code mẫu:** Refactor project theo clean architecture, tài liệu API
- **Bài tập thực hành:** Refactor code, viết tài liệu endpoint
- **Assignment:** Review lại code, bổ sung tài liệu API
- **Lưu ý:** Nhấn mạnh tính mở rộng, maintainable

#### Buổi 10: MySQL + TypeORM, Entity, CRUD
- **Lý thuyết:** MySQL cơ bản, kết nối DB, TypeORM, Entity, migration, CRUD
- **Demo/code mẫu:** Tạo bảng Product, CRUD với TypeORM, liên kết bảng
- **Bài tập thực hành:** Tạo Entity Product, CRUD đầy đủ, thử liên kết với User/Order
- **Assignment:** Viết migration, seed data, tối ưu query
- **Lưu ý:** Giải thích sự khác biệt giữa ORM và query thuần

#### Buổi 11: TypeScript recap nâng cao, NestJS Introduction, Architecture
- **Lý thuyết:** Tổng hợp TypeScript nâng cao (OOP, Decorator, Generic, Enum, DTO, type guard), NestJS CLI, module hóa
- **Demo/code mẫu:** Module products, CRUD với NestJS, ví dụ decorator
- **Bài tập thực hành:** Tổng hợp ví dụ TypeScript nâng cao, tạo module mới
- **Assignment:** Viết 1 decorator hoặc generic function cho project
- **Lưu ý:** Nhấn mạnh sự khác biệt giữa Express và NestJS

#### Buổi 12: Module, DTO, Validation, Pipe
- **Lý thuyết:** Module, DTO, class-validator, pipes, middleware
- **Demo/code mẫu:** DTO validation, pipe kiểm tra ID, middleware custom
- **Bài tập thực hành:** Viết DTO, validation, custom pipe
- **Assignment:** Refactor input validation toàn project
- **Lưu ý:** Giải thích rõ vai trò của DTO và pipe

#### Buổi 13: Authentication: JWT, Guard, Role-based access
- **Lý thuyết:** JWT, auth flow, guard, role-based access
- **Demo/code mẫu:** Register/login, JWT token, protect routes, guard
- **Bài tập thực hành:** Thêm auth cho 1 resource, phân quyền user/admin
- **Assignment:** Viết guard custom, refresh token
- **Lưu ý:** Nhấn mạnh bảo mật, không hardcode secret

#### Buổi 14: Swagger, Error Handling, API Testing
- **Lý thuyết:** Swagger docs, global exception filter, Postman/Newman
- **Demo/code mẫu:** Swagger integration, custom error, test API
- **Bài tập thực hành:** Viết tài liệu Swagger, test API với Postman
- **Assignment:** Bổ sung test case, custom error cho 1 endpoint
- **Lưu ý:** Hướng dẫn viết tài liệu rõ ràng, test kỹ các case lỗi

#### Buổi 15: File upload (Multer), Pagination, Filtering
- **Lý thuyết:** Upload file, Multer, phân trang, filter, query builder
- **Demo/code mẫu:** Upload ảnh, phân trang, filter theo price
- **Bài tập thực hành:** Thêm upload cho Product, filter nâng cao
- **Assignment:** Viết API phân trang, filter động
- **Lưu ý:** Giải thích cách lưu file an toàn, tối ưu query

#### Buổi 16: Testing (Unit test, E2E test), Performance, Security, Code Review, Final Project Demo
- **Lý thuyết:** Unit test, E2E test (Jest, Supertest), performance, security, code review
- **Demo/code mẫu:** Viết unit test cho service, e2e test cho controller, tối ưu code, review project
- **Bài tập thực hành:** Viết test cho 1 module, tối ưu 1 query, review code nhóm
- **Assignment:** Chuẩn bị demo project, checklist review cuối khóa
- **Lưu ý:** Động viên học viên tự tin trình bày, nhận feedback, tổng kết khóa học

### Template review code

#### 📋 Mẫu review code thực chiến

1. **Tổng quan (General impression)**
   - Code có dễ đọc, dễ hiểu không?
   - Có comment hợp lý, giải thích đủ ý?

2. **Đọc/hiểu code (Readability)**
   - Tên biến, hàm, class rõ ràng, đúng ý nghĩa?
   - Code có bị lặp, dư thừa, khó đọc không?
   - Có sử dụng type/interface hợp lý (với TypeScript)?

3. **Kiến trúc & tổ chức (Architecture & Structure)**
   - Đã tách module, controller, service, DTO hợp lý chưa?
   - Có vi phạm nguyên tắc separation of concerns?
   - Folder structure rõ ràng, dễ mở rộng?

4. **Biến, hàm, class (Naming & conventions)**
   - Đặt tên theo chuẩn camelCase/PascalCase?
   - Có tuân thủ quy tắc đặt tên, code style (lint, prettier)?

5. **Logic & bug**
   - Đã xử lý hết các case edge/corner chưa?
   - Có bug logic, thiếu validate, thiếu error handling?
   - Có hardcode giá trị không nên?

6. **Best practice & security**
   - Đã dùng DTO, validation, guard, middleware đúng chỗ?
   - Có lộ secret/key, thiếu check quyền, thiếu try/catch?
   - Có SQL Injection, XSS, lỗ hổng bảo mật?

7. **Test & coverage**
   - Đã có unit test, e2e test cho các chức năng chính?
   - Test case có đủ happy path, edge case?

8. **Gợi ý cải thiện (Suggestions)**
   - Đề xuất refactor, tối ưu, chia nhỏ function/class
   - Đề xuất bổ sung test, tài liệu, comment

9. **Đánh giá tổng thể (Overall rating)**
   - Điểm mạnh:
   - Điểm cần cải thiện:
   - Đánh giá chung (1-5 ⭐️):

---

