# 3.Express với TypeScript — Routing, Controller, Middleware, Service

## 1. Kiến thức chi tiết

### 1.1. Cấu trúc thư mục

```
src/
├── controllers/
│   └── userController.ts       # Xử lý request, gọi service, trả response
├── services/
│   └── userService.ts          # Business logic, thao tác dữ liệu
├── middleware/
│   └── validateUser.ts         # Middleware validate input
├── models/
│   └── user.ts                 # Interface / model dữ liệu
├── routes/
│   └── userRoutes.ts           # Định nghĩa route, kết nối controller
├── app.ts                      # Khởi tạo express app, middleware toàn cục
└── server.ts                   # Chạy app (tách riêng để dễ test)
```
### 1.2. Model (Kiểu dữ liệu)
Định nghĩa interface để xác định cấu trúc dữ liệu, tăng tính an toàn khi code

```typescript
// src/models/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```
### 1.3. Service layer
Chứa business logic, thao tác dữ liệu (lưu trữ, cập nhật...)

Không xử lý request/response, giúp tái sử dụng, test độc lập

```typescript
// src/services/userService.ts
import { User } from '../models/user';

let users: User[] = [
  { id: 1, name: 'Nguyen Van A', email: 'a@example.com' },
  { id: 2, name: 'Tran Thi B', email: 'b@example.com' },
];

export const getUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined => users.find(u => u.id === id);

export const createUser = (name: string, email: string): User => {
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser: User = { id: newId, name, email };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, name: string, email: string): User | null => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { id, name, email };
  return users[index];
};

export const deleteUser = (id: number): boolean => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
```
### 1.4. Controller layer
Nhận request từ client, gọi service xử lý, trả response

Controller không xử lý business logic, chỉ điều phối

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = (req: Request, res: Response) => {
  const users = userService.getUsers();
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = userService.createUser(name, email);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const updatedUser = userService.updateUser(id, name, email);
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json(updatedUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = userService.deleteUser(id);
  if (!success) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
};
```
### 1.5. Middleware
Middleware là hàm trung gian chạy giữa lúc request gửi lên server và trước khi response trả về

Có thể dùng để validate, authenticate, logging, error handling

Ví dụ middleware validate dữ liệu đầu vào:

```typescript
// src/middleware/validateUser.ts
import { Request, Response, NextFunction } from 'express';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Invalid user name' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  next();
};
```
### 1.6. Route
Định nghĩa URL + HTTP method + middleware + controller handler

Tách route riêng giúp dễ quản lý, mở rộng

```typescript
// src/routes/userRoutes.ts
import express from 'express';
import * as userController from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
```
### 1.7. Khởi tạo app và server

```typescript
// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

// Global logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
```

```typescript
// src/server.ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```
## 2. Bài tập

### Đề bài
Xây dựng API CRUD quản lý Product theo mô hình như trên (Model - Service - Controller - Middleware - Route)

Product có các trường:
- id: number
- name: string
- price: number
- description?: string (optional)

Tạo middleware validate Product khi tạo và cập nhật:
- name là chuỗi không rỗng
- price là số > 0

Tạo global middleware log mỗi request (đã có ví dụ)

Xử lý lỗi trả về status code phù hợp khi invalid data hoặc không tìm thấy

### Gợi ý
- Tạo thư mục mới src/models/product.ts, src/services/productService.ts, src/controllers/productController.ts, src/middleware/validateProduct.ts, src/routes/productRoutes.ts
- Khởi tạo app.ts để sử dụng /products route
- Test API bằng Postman hoặc curl

# Kiến thức thêm

## Sự khác nhau giữa interface và type trong TypeScript

### 1. interface là gì?

- Interface dùng để định nghĩa kiểu đối tượng (object shapes) hoặc các cấu trúc có thể mở rộng được (extend).
- Có thể khai báo nhiều lần cùng tên interface, TypeScript sẽ tự động hợp nhất (declaration merging).
- Chủ yếu dùng để định nghĩa đối tượng, lớp (class), contract cho các thành phần.

Ví dụ:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}
```

### 2. type alias là gì?

- Type cho phép bạn định nghĩa bí danh (alias) cho bất kỳ kiểu dữ liệu nào: kiểu nguyên thủy, union, intersection, tuple, hoặc object.
- Không thể khai báo lại type cùng tên (no declaration merging).
- Có thể dùng type để định nghĩa kiểu phức tạp hơn interface.

Ví dụ:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type ID = number | string; // union type
type Point = [number, number]; // tuple
```

### 3. So sánh chi tiết

| Tiêu chí | interface | type |
|----------|-----------|------|
| Định nghĩa đối tượng | Có thể, dành riêng cho object shapes | Có thể, nhưng còn định nghĩa kiểu khác |
| Union / Intersection | Không hỗ trợ trực tiếp | Hỗ trợ tốt (ví dụ: `type A = B | C`) |
| Khai báo lại (Declaration Merging) | Có, có thể khai báo nhiều interface cùng tên | Không thể khai báo lại cùng tên |
| Khả năng mở rộng (extend) | Có thể kế thừa và mở rộng bằng extends | Có thể mở rộng bằng intersection & |
| Tính linh hoạt | Chuyên dùng cho đối tượng, lớp | Rộng hơn, có thể dùng cho mọi kiểu |

### 4. Khi nào nên dùng interface?

- Khi bạn muốn định nghĩa cấu trúc một object hoặc class với khả năng mở rộng và kế thừa (extends).
- Khi bạn cần dùng declaration merging (ví dụ mở rộng interface ở nhiều file).
- Khi codebase lớn, cần định nghĩa API rõ ràng, interface cho các service, component.

Ví dụ:

```typescript
interface User {
  id: number;
  name: string;
}

// Mở rộng interface
interface User {
  email: string;
}
```

### 5. Khi nào nên dùng type?

- Khi bạn cần định nghĩa kiểu phức tạp hơn như union type, intersection type, tuple, primitive alias.
- Khi bạn muốn đặt tên cho một kiểu dữ liệu mà không chỉ là object.
- Khi bạn không cần khả năng khai báo lại hoặc mở rộng.

Ví dụ:

```typescript
type ID = number | string;

type User = {
  id: ID;
  name: string;
};

type Response<T> = {
  data: T;
  error?: string;
};
```

### 6. Tóm tắt & gợi ý

| Tình huống | Đề xuất sử dụng |
|------------|-----------------|
| Định nghĩa kiểu object rõ ràng, có thể mở rộng | interface |
| Định nghĩa kiểu phức tạp, union, tuple, alias | type |
| Cần declaration merging | interface |
| Cần sự linh hoạt với nhiều kiểu dữ liệu | type |

Ví dụ minh họa:

```typescript
// Interface mở rộng được và khai báo lại được
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

const dog: Animal = { name: 'Dog', age: 5 };

// Type không cho khai báo lại, hỗ trợ union type
type ID = string | number;

type User = {
  id: ID;
  name: string;
};```

