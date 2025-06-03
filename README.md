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

