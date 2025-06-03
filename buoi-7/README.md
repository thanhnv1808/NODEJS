# 📚 Buổi 7: Express Routing, Middleware, Controller, Service

## 🚀 Giới thiệu & Câu hỏi mở đầu

Bạn đã bao giờ tự hỏi:
- Làm sao để một ứng dụng backend biết được client đang gọi API nào?
- Làm thế nào để tách biệt phần xử lý logic, validate, và trả về dữ liệu?
- Làm sao để code backend dễ mở rộng, dễ bảo trì?

Have you ever wondered:
- How does a backend app know which API the client is calling?
- How to separate logic, validation, and response?
- How to make backend code scalable and maintainable?

Hôm nay, chúng ta sẽ cùng khám phá các khái niệm cực kỳ quan trọng trong Express + TypeScript:
- **Routing** (Định tuyến)
- **Middleware** (Tầng trung gian)
- **Controller** (Điều phối xử lý)
- **Service** (Xử lý nghiệp vụ)

---

## 💡 Tips thực tế khi dùng TypeScript với Express

- **Luôn import type cho Request, Response, NextFunction** từ 'express' để có gợi ý và kiểm tra type tốt nhất.
  ```typescript
  import { Request, Response, NextFunction } from 'express';
  ```
- **Custom type cho req.body, req.query, req.params**: Dùng generic của Express để định nghĩa rõ kiểu dữ liệu request.
  ```typescript
  interface UserBody {
    username: string;
    email: string;
  }
  app.post('/register', (req: Request<{}, {}, UserBody>, res: Response) => {
    // req.body sẽ có type UserBody
  });
  ```
- **Tổ chức import/export rõ ràng**: Luôn dùng `export`/`import` chuẩn ES6, tách controller/service/middleware thành file riêng.
- **Dùng interface/type cho dữ liệu**: Giúp code dễ đọc, dễ refactor, giảm bug.
- **Luôn bật strict mode trong tsconfig.json** để tận dụng tối đa sức mạnh của TypeScript.
- **Cài đặt @types/express** để có đầy đủ type cho Express.

### Ví dụ nâng cao: Validate dữ liệu với interface/type và middleware
```typescript
// types/user.ts
export interface User {
  username: string;
  email: string;
}

// middlewares/validateUser.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user';

export function validateUser(req: Request<{}, {}, User>, res: Response, next: NextFunction) {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  next();
}
```

### Ví dụ nâng cao: Custom error handler middleware với TypeScript
```typescript
// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

// app.ts
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
const app = express();
// ... các route, middleware khác
app.use(errorHandler); // Đặt cuối cùng
```

---

## 1. 🛣️ Express Routing (Định tuyến)

**Routing** là cách Express xác định API nào sẽ xử lý request nào.

_Routing is how Express matches incoming requests to the right handler._

### Ví dụ cơ bản (TypeScript)
```typescript
import express, { Request, Response } from 'express';
const app = express();

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.post('/users', (req: Request, res: Response) => {
  // Create user logic
  res.send('User created!');
});

app.listen(3000);
```
**Giải thích:**
- `app.get('/hello', ...)` chỉ xử lý request GET tới /hello
- `app.post('/users', ...)` chỉ xử lý request POST tới /users

### Bài tập nhỏ
- Tạo 2 route: GET `/about` trả về "About page", POST `/login` trả về "Login success!"

---

## 2. 🧩 Middleware (Tầng trung gian)

**Middleware** là các hàm chạy trước khi request đến route handler cuối cùng. Dùng để validate, log, kiểm tra quyền, xử lý lỗi...

_Middleware are functions that run before the final route handler. Used for validation, logging, auth, error handling, etc._

### Ví dụ middleware log request (TypeScript)
```typescript
import { Request, Response, NextFunction } from 'express';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next(); // Chuyển sang middleware/route tiếp theo
}

app.use(logger);
```

### Middleware validate (TypeScript)
```typescript
function validateUser(req: Request, res: Response, next: NextFunction) {
  if (!req.body.username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  next();
}

app.post('/register', validateUser, (req: Request, res: Response) => {
  // Xử lý đăng ký
  res.send('Register success!');
});
```
**Giải thích:**
- Middleware có thể dùng cho toàn app (`app.use`) hoặc riêng từng route.
- Gọi `next()` để chuyển tiếp, hoặc trả response để kết thúc.

### Bài tập nhỏ
- Viết middleware kiểm tra nếu request có header `x-api-key` thì mới cho truy cập route `/secret`.

---

## 3. 🕹️ Controller & Service (Tách biệt xử lý)

**Controller** nhận request, validate, gọi service xử lý logic, trả response.

**Service** chứa logic nghiệp vụ (business logic), không phụ thuộc Express.

_Controllers handle requests, call services for business logic, and send responses. Services contain business logic and are independent from Express._

### Ví dụ tách controller/service (TypeScript)
```typescript
// userService.ts
export function createUser(data: { username: string; email: string }) {
  // Business logic, e.g. save to DB
  return { id: 1, ...data };
}

// userController.ts
import { Request, Response } from 'express';
import { createUser } from './userService';

export function register(req: Request, res: Response) {
  const user = createUser(req.body);
  res.status(201).json(user);
}

// app.ts
import express from 'express';
import { register } from './userController';
const app = express();
app.use(express.json());

app.post('/register', register);

app.listen(3000);
```
**Giải thích:**
- Controller chỉ nhận request, gọi service, trả response.
- Service chỉ xử lý logic, không biết gì về Express.

### Bài tập nhỏ
- Tách 2 file: `mathService.ts` (có hàm add, subtract), `mathController.ts` (nhận request, gọi service, trả kết quả), route `/add` và `/subtract`.

---

## 4. 🏗️ Clean Architecture cho Express + TypeScript

- Tách biệt rõ: routes → controller → service → (model/database)
- Dễ test, dễ mở rộng, dễ bảo trì
- Mỗi file chỉ làm 1 nhiệm vụ (Single Responsibility)

### Sơ đồ luồng
```
Request → Route → Middleware → Controller → Service → Response
```

### Gợi ý cấu trúc thư mục
```
📦 src
 ┣ 📂 controllers
 ┣ 📂 services
 ┣ 📂 middlewares
 ┣ 📂 routes
 ┣ 📜 app.ts
```

---

## 5. 📝 Bài tập tổng hợp
- Tạo project Express + TypeScript, tách route/controller/service cho chức năng quản lý user (GET, POST user)
- Thêm middleware log request và validate body khi tạo user

---

## 🔗 Tham khảo / References
- [Express Routing (Official)](https://expressjs.com/en/guide/routing.html)
- [Express Middleware (Official)](https://expressjs.com/en/guide/using-middleware.html)
- [MVC Pattern in Node.js](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- [Clean Architecture for Express](https://dev.to/abiodunjames/a-clean-architecture-for-expressjs-3gd1)
- [F8: Express Routing (Video tiếng Việt)](https://www.youtube.com/watch?v=knW7-x7Y7RE) 