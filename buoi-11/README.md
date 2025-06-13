# 📚 Buổi 11: NestJS Introduction + Architecture

## ❓ Câu hỏi mở đầu
- Tại sao nên dùng NestJS thay vì Express truyền thống?
- NestJS giúp tổ chức code lớn, phức tạp như thế nào?
- Module, Controller, Service trong NestJS khác gì Express?

Have you ever wondered:
- Why use NestJS instead of plain Express?
- How does NestJS help organize large, complex projects?
- What are modules, controllers, and services in NestJS?

---

## 🟦 Kiến thức TypeScript cần nắm (Essential TypeScript Knowledge)

NestJS được xây dựng hoàn toàn trên TypeScript. Để học tốt NestJS, bạn cần nắm vững các kiến thức TypeScript sau:

NestJS is built entirely on TypeScript. To master NestJS, you should be comfortable with these TypeScript concepts:

### 1. Interface & Type
- Định nghĩa cấu trúc dữ liệu, giúp code rõ ràng, dễ kiểm soát.
- Define data structures for clarity and type safety.

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

const p: Product = { id: 1, name: 'Book', price: 100 };
```

### 2. Class & Access Modifier
- NestJS sử dụng class cho controller, service, module.
- Sử dụng public/private/protected để kiểm soát truy cập thuộc tính/phương thức.
- NestJS uses classes for controllers, services, modules. Use access modifiers for encapsulation.

```typescript
class ProductService {
  private products: Product[] = [];
  public addProduct(p: Product) {
    this.products.push(p);
  }
}
```

### 3. Decorator
- Decorator là cú pháp quan trọng trong NestJS (@Controller, @Injectable, @Get, ...)
- Decorators are a key feature in NestJS.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return [];
  }
}
```

### 4. Generics
- Dùng để tái sử dụng code với nhiều kiểu dữ liệu khác nhau.
- Use generics for reusable, type-safe code.

```typescript
function wrap<T>(data: T): { data: T } {
  return { data };
}
const result = wrap<string>('hello');
```

### 5. Enum
- Quản lý các giá trị cố định (status, role, ...)
- Manage fixed sets of values (status, roles, ...)

```typescript
enum Role {
  Admin = 'admin',
  User = 'user',
}
```

### 6. Data Transfer Object (DTO) & Validation
- DTO giúp định nghĩa dữ liệu vào/ra, kết hợp class-validator để validate.
- DTOs define input/output data, used with class-validator for validation.

```typescript
import { IsString, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;
}
```

### 💡 Tips sử dụng TypeScript hiệu quả trong backend
- Luôn định nghĩa type/interface cho dữ liệu, tránh dùng any
- Sử dụng DTO cho mọi input/output
- Tận dụng tính năng autocomplete, type checking của VSCode
- Đọc kỹ error TypeScript, sửa lỗi triệt để
- Always define types/interfaces, avoid using any
- Use DTOs for all input/output
- Leverage VSCode's autocomplete and type checking
- Read and fix TypeScript errors thoroughly

Tài liệu: https://www.typescriptlang.org/docs/
---

## 1. 🚀 NestJS là gì?

**NestJS** là framework Node.js hiện đại, xây dựng trên TypeScript, lấy cảm hứng từ Angular:
- Kiến trúc module hóa, dễ mở rộng, bảo trì
- Hỗ trợ Dependency Injection mạnh mẽ
- Tích hợp sẵn validation, guard, pipe, interceptor, middleware
- Dễ test, dễ tổ chức code lớn

---

## 📊 So sánh Node.js, Express và NestJS

| Tiêu chí                     | Node.js                        | Express                          | NestJS                                                                 |
|-----------------------------|--------------------------------|----------------------------------|------------------------------------------------------------------------|
| **Mục tiêu chính**          | Runtime (nền tảng chạy JS)     | Web framework siêu nhẹ           | Framework toàn diện cho server-side app                               |
| **Cấp độ trừu tượng**       | Rất thấp (core module thuần)   | Trung bình (HTTP layer cơ bản)   | Cao (Module hóa, DI, Decorator...)                                     |
| **Kiến trúc**               | Tuỳ bạn tự xây                 | Không ràng buộc, tự tổ chức      | Rõ ràng: Module → Controller → Service → Provider                     |
| **Khả năng mở rộng dự án** | Rất khó nếu không có framework | Dễ rối nếu codebase lớn          | Dễ mở rộng và bảo trì, kiến trúc giống Angular                        |
| **Dependency Injection (DI)** | Không có                      | Không có                         | Có sẵn, mạnh mẽ, dễ dùng                                               |
| **TypeScript hỗ trợ**       | Có thể dùng, nhưng thủ công     | Hỗ trợ TS nhưng không tối ưu     | Xây dựng trên TypeScript, tận dụng tối đa type safety                  |
| **Decorators**              | Không                          | Không                            | Có, dựa trên ES Decorators (@Controller, @Injectable, ...)            |
| **Tích hợp sẵn các tính năng** | Không                        | Không                            | Có sẵn: Validation, Auth, Swagger, Middleware, Guard, Pipe, Interceptor |
| **Testing hỗ trợ**          | Không có                       | Phải tự setup                    | Hỗ trợ tốt với Jest, TestingModule                                     |
| **Cộng đồng / Tài liệu**    | Rộng, chung cho JS             | Rộng, lâu đời                    | Cộng đồng đang phát triển, tài liệu chính thức rõ ràng                |
| **Use case phù hợp**        | Tool/script nhỏ                | App nhỏ/trung                   | App trung/lớn, dự án enterprise, microservices                        |

---

## 2. 🏗️ Kiến trúc cơ bản của NestJS

### 2.1. Các thành phần chính

- **Module**: Đơn vị tổ chức lớn nhất, gom controller/service liên quan
- **Controller**: Nhận request, trả response (giống Express route handler)
- **Service**: Xử lý logic nghiệp vụ, inject vào controller
- **Provider**: Bất kỳ class nào có thể inject (service, repo, ...)

### 2.2. Dependency Injection trong NestJS

```typescript
// product.service.ts
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private configService: ConfigService
  ) {}
}

// product.controller.ts
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
}
```

### 2.3. Domain-Driven Design (DDD) trong NestJS

```
📦 src
 ┣ 📂 modules
 ┃ ┣ 📂 products
 ┃ ┃ ┣ 📂 domain
 ┃ ┃ ┃ ┣ 📜 product.entity.ts
 ┃ ┃ ┃ ┣ 📜 product.repository.ts
 ┃ ┃ ┃ ┗ 📜 product.service.ts
 ┃ ┃ ┣ 📂 application
 ┃ ┃ ┃ ┣ 📜 product.controller.ts
 ┃ ┃ ┃ ┗ 📜 product.dto.ts
 ┃ ┃ ┗ 📜 product.module.ts
 ┃ ┗ 📂 users
 ┃   ┣ 📂 domain
 ┃   ┃ ┣ 📜 user.entity.ts
 ┃   ┃ ┗ 📜 user.service.ts
 ┃   ┣ 📂 application
 ┃   ┃ ┣ 📜 user.controller.ts
 ┃   ┃ ┗ 📜 user.dto.ts
 ┃   ┗ 📜 user.module.ts
 ┣ 📂 shared
 ┃ ┣ 📂 infrastructure
 ┃ ┃ ┣ 📜 database.module.ts
 ┃ ┃ ┗ 📜 config.module.ts
 ┃ ┗ 📂 utils
 ┃   ┣ 📜 logger.ts
 ┃   ┗ 📜 validators.ts
 ┗ 📜 app.module.ts
```

---

## 3. ⚡ Bắt đầu với NestJS (TypeScript)

### 3.1. Cài đặt Nest CLI
```bash
# Using pnpm
pnpm add -g @nestjs/cli
nest new my-nest-app
cd my-nest-app
pnpm start:dev
```

### 3.2. Tạo module + controller + service
```bash
nest g module products
nest g controller products
nest g service products
```

### 3.3. Ví dụ Product CRUD (products.controller.ts)
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }
}
```

---

## 💡 Best Practices khi tổ chức code NestJS

### 1. Module Organization
- Chia module theo domain (products, users, orders...)
- Mỗi module nên có một trách nhiệm rõ ràng
- Sử dụng shared module cho code dùng chung
- Tránh circular dependency giữa các module

### 2. Service Layer
- Service chứa business logic
- Mỗi service nên có một trách nhiệm cụ thể
- Sử dụng interface cho service để dễ test
- Inject dependencies qua constructor

### 3. Controller Design
- Controller chỉ xử lý HTTP request/response
- Validate input với DTO
- Trả về response chuẩn
- Xử lý error với exception filter

### 4. Error Handling
- Sử dụng custom exception
- Implement global exception filter
- Log error đầy đủ
- Trả về error message rõ ràng

### 5. Testing Strategy
- Unit test cho service
- E2E test cho controller
- Mock external dependencies
- Test error cases

---

## 🌟 Ví dụ nâng cao: Custom Provider & Factory

### Custom Provider
```typescript
@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: {
        apiKey: process.env.API_KEY,
        timeout: 5000
      }
    }
  ]
})
export class AppModule {}
```

### Factory Provider
```typescript
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return await createConnection({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'user',
          password: 'password',
          database: 'db'
        });
      }
    }
  ]
})
export class DatabaseModule {}
```

---

## ✅ Checklist review kiến trúc NestJS
- [ ] Module được tổ chức theo domain
- [ ] Service chứa business logic
- [ ] Controller chỉ xử lý HTTP
- [ ] Dependencies được inject đúng cách
- [ ] Error handling rõ ràng
- [ ] Có unit test và E2E test
- [ ] Code tuân thủ SOLID principles
- [ ] Có documentation cho API

---

## 🔗 Tham khảo / References
- [NestJS Official Docs](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
