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

## 🌟 Bổ sung: Middleware, Interceptor, Exception Filter, Swagger, Testing

### Middleware
- Xử lý request trước khi vào controller (logging, auth, ...)
- Đăng ký trong module hoặc toàn cục.
```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request...', req.method, req.url);
    next();
  }
}
// app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

### Interceptor
- Can thiệp vào request/response (transform, logging, cache...)
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => ({ data, success: true })));
  }
}
// main.ts
app.useGlobalInterceptors(new TransformInterceptor());
```

### Exception Filter
- Xử lý lỗi tập trung, custom response khi có exception.
```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
// main.ts
app.useGlobalFilters(new HttpErrorFilter());
```

### Swagger
- Tự động tạo tài liệu API.
```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const config = new DocumentBuilder().setTitle('API').setVersion('1.0').build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

### Testing
- NestJS hỗ trợ unit test (Jest) cho service/controller.
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
describe('ProductsService', () => {
  let service: ProductsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
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