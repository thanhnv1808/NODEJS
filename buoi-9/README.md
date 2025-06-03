# 📚 Buổi 9: RESTful API chuẩn, Clean Architecture

## ❓ Câu hỏi mở đầu
- Làm sao để thiết kế API dễ dùng, dễ mở rộng, dễ bảo trì?
- RESTful API khác gì so với API thông thường?
- Clean Architecture giúp ích gì cho dự án lớn?

Have you ever wondered:
- How to design APIs that are easy to use, extend, and maintain?
- What makes an API truly RESTful?
- Why is Clean Architecture important for scalable projects?

---

## 1. 🌐 RESTful API là gì?

**RESTful API** là kiểu thiết kế API tuân theo các nguyên tắc REST (Representational State Transfer):
- Sử dụng HTTP method đúng mục đích: GET (lấy dữ liệu), POST (tạo mới), PUT/PATCH (cập nhật), DELETE (xóa)
- Địa chỉ endpoint rõ ràng, đại diện cho resource (danh từ, số nhiều)
- Stateless: server không lưu trạng thái client giữa các request
- Sử dụng status code HTTP hợp lý

### Ví dụ endpoint chuẩn RESTful
| Hành động | Endpoint | Method |
|-----------|----------|--------|
| Lấy danh sách users | /api/users | GET |
| Lấy 1 user | /api/users/:id | GET |
| Tạo user mới | /api/users | POST |
| Cập nhật user | /api/users/:id | PUT/PATCH |
| Xóa user | /api/users/:id | DELETE |

### Status code phổ biến
| Code | Ý nghĩa |
|------|---------|
| 200 | OK (Thành công) |
| 201 | Created (Tạo mới thành công) |
| 204 | No Content (Xóa thành công, không trả về dữ liệu) |
| 400 | Bad Request (Lỗi request) |
| 401 | Unauthorized (Chưa xác thực) |
| 403 | Forbidden (Không đủ quyền) |
| 404 | Not Found (Không tìm thấy) |
| 500 | Internal Server Error (Lỗi server) |

### Ví dụ code (TypeScript + Express)
```typescript
import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

app.get('/api/users', (req: Request, res: Response) => {
  // Lấy danh sách user
  res.json([{ id: 1, name: 'Alice' }]);
});

app.post('/api/users', (req: Request, res: Response) => {
  // Tạo user mới
  res.status(201).json({ id: 2, ...req.body });
});

app.listen(3000);
```

---

## 2. 🏗️ Clean Architecture là gì?

**Clean Architecture** là cách tổ chức code tách biệt rõ các tầng (layer):
- **Controller/Route**: nhận request, trả response
- **Service**: xử lý logic nghiệp vụ
- **Model/Repository**: truy xuất dữ liệu (DB, API, ...)
- **Middleware**: xử lý trung gian (auth, validate, log...)

### Sơ đồ Clean Architecture
```
Request → Route → Middleware → Controller → Service → Repository/Model → DB
```

### Ví dụ cấu trúc thư mục
```
📦 src
 ┣ 📂 controllers
 ┣ 📂 services
 ┣ 📂 models
 ┣ 📂 middlewares
 ┣ 📂 routes
 ┣ 📜 app.ts
```

### So sánh với tổ chức truyền thống
- Truyền thống: code lẫn lộn, khó mở rộng, khó test
- Clean: mỗi file 1 nhiệm vụ, dễ test, dễ bảo trì, dễ mở rộng

---

## 💡 Tips thực tế khi thiết kế RESTful API & Clean Architecture
- Đặt tên endpoint rõ ràng, dùng danh từ số nhiều (products, users...)
- Không lồng action vào URL (sai: /api/users/create, đúng: POST /api/users)
- Trả về status code đúng, kèm message rõ ràng
- Tách controller/service/model rõ ràng, không viết logic vào route
- Viết middleware cho validate, auth, log...
- Dùng DTO (Data Transfer Object) để validate dữ liệu vào/ra
- Viết tài liệu API (Swagger, Postman...)
- Viết test cho service/controller nếu có thể

---

## 📝 Bài tập thực hành
- Thiết kế API quản lý sản phẩm (CRUD) theo chuẩn RESTful, tách controller/service/model
- Viết middleware validate dữ liệu khi tạo/cập nhật sản phẩm
- Viết tài liệu API bằng Swagger hoặc Postman

---

## 🌟 Ví dụ nâng cao: API Products có phân trang, filter, validate (TypeScript)
```typescript
// DTO validate
interface ProductQuery {
  page?: number;
  limit?: number;
  keyword?: string;
}

app.get('/api/products', (req: Request<{}, {}, {}, ProductQuery>, res: Response) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  // Validate page, limit
  if (Number(page) < 1 || Number(limit) < 1) {
    return res.status(400).json({ message: 'Page/limit must be > 0' });
  }
  // Lọc, phân trang dữ liệu (giả lập)
  const products = [/* ... */];
  const filtered = products.filter(p => p.name.includes(keyword));
  const paged = filtered.slice((+page - 1) * +limit, +page * +limit);
  res.json({ data: paged, total: filtered.length });
});

---

## ✅ Checklist review API
- [ ] Endpoint rõ ràng, đúng RESTful
- [ ] Dùng đúng HTTP method (GET/POST/PUT/DELETE...)
- [ ] Trả về status code hợp lý (200, 201, 400, 404, 500...)
- [ ] Message trả về rõ ràng, nhất quán
- [ ] Validate dữ liệu đầu vào (body, query, params)
- [ ] Xử lý lỗi chuẩn, không lộ thông tin nhạy cảm
- [ ] Có tài liệu API (Swagger/Postman...)
- [ ] Có test cho các case chính
- [ ] Bảo mật: kiểm tra auth, phân quyền nếu cần
- [ ] Versioning nếu API lớn (v1, v2...)

---

## 💡 Tips khi dùng Swagger (OpenAPI)
- Đặt mô tả endpoint, request/response rõ ràng, dễ hiểu
- Sử dụng example cho body, response để dễ test
- Group các endpoint theo resource (user, product...)
- Thêm version cho API (v1, v2...)
- Định nghĩa rõ các status code trả về
- Thêm security (JWT, API key...) vào docs
- Export file docs (.json/.yaml) để chia sẻ hoặc import vào Postman
- Luôn cập nhật docs khi thay đổi API

---

## 🔗 Tham khảo / References
- [RESTful API Design (REST API Tutorial)](https://restfulapi.net/)
- [REST API Best Practices](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)
- [Clean Architecture (dev.to)](https://dev.to/abiodunjames/a-clean-architecture-for-expressjs-3gd1)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [F8: RESTful API là gì? (Video tiếng Việt)](https://www.youtube.com/watch?v=1j6YA03hm4k) 