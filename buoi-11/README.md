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

## 1. 🚀 NestJS là gì?

**NestJS** là framework Node.js hiện đại, xây dựng trên TypeScript, lấy cảm hứng từ Angular:
- Kiến trúc module hóa, dễ mở rộng, bảo trì
- Hỗ trợ Dependency Injection mạnh mẽ
- Tích hợp sẵn validation, guard, pipe, interceptor, middleware
- Dễ test, dễ tổ chức code lớn

### So sánh nhanh với Express
| Tiêu chí | Express | NestJS |
|----------|---------|--------|
| Kiến trúc | Tự do, không ràng buộc | Module hóa, rõ ràng |
| DI | Không có | Có sẵn, mạnh mẽ |
| Decorator | Không | Có (TypeScript) |
| Test | Tự setup | Hỗ trợ tốt |
| Tích hợp | Thủ công | Có sẵn (Swagger, Validation, Auth...) |

---

## 2. 🏗️ Kiến trúc cơ bản của NestJS

- **Module**: Đơn vị tổ chức lớn nhất, gom controller/service liên quan
- **Controller**: Nhận request, trả response (giống Express route handler)
- **Service**: Xử lý logic nghiệp vụ, inject vào controller
- **Provider**: Bất kỳ class nào có thể inject (service, repo, ...)

### Sơ đồ luồng
```
Request → Controller → Service → (Provider/Repository) → Response
```

### Ví dụ cấu trúc thư mục
```
📦 src
 ┣ 📂 products
 ┃ ┣ 📜 products.controller.ts
 ┃ ┣ 📜 products.service.ts
 ┃ ┣ 📜 products.module.ts
 ┣ 📜 app.module.ts
```

---

## 3. ⚡ Bắt đầu với NestJS (TypeScript)

### Cài đặt Nest CLI
```bash
npm i -g @nestjs/cli
nest new my-nest-app
```

### Tạo module + controller + service
```bash
nest g module products
nest g controller products
nest g service products
```

### Ví dụ Product CRUD (products.controller.ts)
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

## 💡 Tips thực tế khi dùng NestJS
- Luôn chia nhỏ module theo domain (products, users, orders...)
- Inject service qua constructor, không dùng new trực tiếp
- Dùng DTO + class-validator để validate dữ liệu vào
- Sử dụng guard cho auth, role-based access
- Tận dụng pipe để transform/validate dữ liệu
- Tích hợp Swagger cho tài liệu API tự động
- Viết unit test cho service, controller
- Đọc kỹ error NestJS, tận dụng CLI để generate code

---

## 🌟 Ví dụ nâng cao: Guard & Pipe

### Guard: AuthGuard kiểm tra JWT
```typescript
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth) throw new UnauthorizedException('No token');
    const token = auth.replace('Bearer ', '');
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

### Pipe: ParseIntPipe & Custom ValidationPipe
```typescript
// Sử dụng ParseIntPipe cho param
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.productsService.findOne(id);
}

// Custom ValidationPipe (global)
import { ValidationPipe } from '@nestjs/common';
// main.ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
```

---

## 💡 Best Practice khi scale project NestJS
- Chia module theo domain (products, users, orders...), dùng SharedModule cho logic dùng chung
- Sử dụng env/config module để quản lý biến môi trường
- Đặt global pipe/guard/interceptor ở main.ts để áp dụng toàn app
- Luôn dùng DTO + class-validator cho mọi input
- Tách logic nghiệp vụ vào service, controller chỉ nhận request/response
- Viết unit test cho service, e2e test cho controller
- Tài liệu hóa API với Swagger, update khi thay đổi
- Tổ chức folder rõ ràng, tránh file quá dài
- Tận dụng CLI để generate code, tránh lặp lại
- Đọc kỹ error, tận dụng log/debug của NestJS

---

## 🌟 Ví dụ nâng cao: Custom Provider & Dependency Injection

### Custom provider (token-based)
```typescript
// logger.provider.ts
export const LOGGER = 'LOGGER';
export const loggerProvider = {
  provide: LOGGER,
  useValue: console,
};

// app.module.ts
import { Module } from '@nestjs/common';
import { loggerProvider } from './logger.provider';

@Module({
  providers: [loggerProvider],
})
export class AppModule {}

// Inject vào service
import { Inject, Injectable } from '@nestjs/common';
import { LOGGER } from './logger.provider';

@Injectable()
export class ProductsService {
  constructor(@Inject(LOGGER) private logger: Console) {}
}
```

---

## 📝 Bài tập thực hành
- Khởi tạo project NestJS, tạo module/controller/service cho Product
- Cài class-validator, tạo DTO validate khi tạo Product
- Tích hợp Swagger, thử viết unit test cho service

---

## 🔗 Tham khảo / References
- [NestJS Official Docs](https://docs.nestjs.com/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [NestJS Providers](https://docs.nestjs.com/providers)
- [NestJS Dependency Injection](https://docs.nestjs.com/fundamentals/custom-providers)
- [F8: NestJS cơ bản (Video tiếng Việt)](https://www.youtube.com/watch?v=1kF3jX6K8p8) 