# 📚 Buổi 12: Module, DTO, Validation, Pipe (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để validate dữ liệu đầu vào hiệu quả trong NestJS?
- DTO là gì, tại sao nên dùng thay vì object thường?
- Pipe trong NestJS giúp ích gì cho việc xử lý dữ liệu?

Have you ever wondered:
- How to validate input data effectively in NestJS?
- What is a DTO and why use it instead of plain objects?
- How do pipes help with data processing in NestJS?

---

## 1. 🧩 Module & DTO trong NestJS

- **Module**: Gom nhóm các controller, service liên quan (giúp code rõ ràng, dễ mở rộng)
- **DTO (Data Transfer Object)**: Class định nghĩa cấu trúc dữ liệu vào/ra, dùng để validate, type-safe

### Ví dụ DTO với class-validator
```typescript
// create-product.dto.ts
import { IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
```

### Sử dụng DTO trong controller
```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';

@Controller('products')
export class ProductsController {
  @Post()
  create(@Body() dto: CreateProductDto) {
    // Nếu dữ liệu không hợp lệ, tự động trả lỗi 400
    return { message: 'Product created', data: dto };
  }
}
```

---

## 2. 🛡️ Validation & Pipe trong NestJS

- **Validation**: Kiểm tra dữ liệu đầu vào (body, param, query) tự động bằng class-validator
- **Pipe**: Xử lý, transform, validate dữ liệu trước khi vào controller

### Kích hoạt global validation pipe
```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
```

### Ví dụ custom pipe: ParseIntPipe
```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed (numeric string is expected)');
    }
    return val;
  }
}

// Sử dụng trong controller
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.productsService.findOne(id);
}
```

---

## 🌟 Bổ sung kiến thức thực tế & nâng cao

### 1. Custom message cho class-validator
- Có thể truyền message tùy chỉnh cho từng rule:
```typescript
@IsString({ message: 'Tên phải là chuỗi' })
name: string;
```

### 2. Validate nested object
- Dùng @ValidateNested và @Type để validate object lồng nhau:
```typescript
import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';
class CategoryDto {
  @IsString()
  name: string;
}
class ProductDto {
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
```

### 3. DTO kế thừa (extends)
- Có thể kế thừa DTO để tái sử dụng rule:
```typescript
export class UpdateProductDto extends CreateProductDto {
  // Có thể thêm rule riêng cho update
}
```

### 4. Pipe cho mọi loại input
- Pipe dùng được cho body, param, query, custom decorator:
```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) { ... }
@Post()
create(@Body(TrimStringPipe) name: string) { ... }
```

### 5. Thứ tự thực thi Pipe
- Pipe thực thi theo thứ tự khai báo (trái sang phải):
```typescript
@Post()
create(@Body('name', TrimStringPipe, CustomUppercasePipe) name: string) { ... }
// name sẽ được trim trước, rồi uppercase
```

### 6. Tích hợp với Swagger
- Dùng decorator để tài liệu hóa DTO:
```typescript
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({ example: 'Book', description: 'Tên sản phẩm' })
  name: string;
}
```

### 7. Exception khi validate
- Nếu validate fail, NestJS trả về lỗi 400 (BadRequestException) với message chi tiết.

### 8. Global Pipe nâng cao
- Có thể cấu hình thêm transform, forbidUnknownValues, custom error:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => new BadRequestException(errors),
}));
```

---

## 💡 Tips thực tế khi dùng DTO, Validation, Pipe
- Luôn dùng DTO cho mọi input (body, query, param)
- Dùng class-validator để validate, kết hợp nhiều decorator
- Kích hoạt global ValidationPipe để tự động validate toàn app
- Custom pipe cho các logic đặc biệt (parse, transform, sanitize...)
- Sử dụng whitelist để loại bỏ field thừa, forbidNonWhitelisted để báo lỗi nếu có field lạ
- Viết message rõ ràng cho từng rule validate
- Có thể combine nhiều pipe cho 1 param

---

## 🌟 Ví dụ nâng cao về Pipe

### Pipe chuyển đổi boolean
```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform<string, boolean> {
  transform(value: string) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new BadRequestException('Validation failed (boolean string is expected)');
  }
}
// Sử dụng trong controller
@Get()
findAll(@Query('active', ParseBoolPipe) active: boolean) {
  // active là boolean
}
```

### Pipe sanitize HTML (loại bỏ tag nguy hiểm)
```typescript
import { PipeTransform, Injectable } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeHtmlPipe implements PipeTransform<string, string> {
  transform(value: string) {
    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
  }
}
// Sử dụng trong controller
@Post()
create(@Body('description', SanitizeHtmlPipe) desc: string) {
  // desc đã được loại bỏ tag HTML
}
```

### Combine nhiều pipe cho 1 param
```typescript
@Post()
create(
  @Body('name', TrimStringPipe, CustomUppercasePipe) name: string
) {
  // name đã được trim và chuyển uppercase
}
```

---

## 💡 Best Practice khi validate với DTO & Pipe
- Tách DTO cho từng use-case (Create, Update, Query...)
- Đặt custom message cho từng rule (dễ debug, dễ hiểu)
- Validate nested object với @ValidateNested, @Type
- Sử dụng group để reuse DTO cho nhiều mục đích
- Viết unit test cho DTO, custom pipe
- Tài liệu hóa rule validate trong Swagger/Postman
- Không validate logic nghiệp vụ phức tạp trong DTO (để ở service)
- Không trả về lỗi lộ thông tin nhạy cảm

---

## ✅ Checklist review DTO & Validation
- [ ] Định nghĩa type rõ ràng cho mọi field
- [ ] Có validate cho tất cả field (IsString, IsNumber, ...)
- [ ] Custom message cho rule quan trọng
- [ ] Validate nested object nếu có
- [ ] Test case cho dữ liệu hợp lệ và không hợp lệ
- [ ] Tài liệu hóa rule validate (Swagger, docs)
- [ ] Không trả về lỗi lộ thông tin nhạy cảm
- [ ] Kết hợp pipe cho các trường cần transform/sanitize

---

## 📝 Bài tập thực hành
- Tạo DTO validate cho Product (name, price, description...)
- Kích hoạt global ValidationPipe, thử gửi dữ liệu sai để xem lỗi
- Viết custom pipe (ví dụ: trim, parse boolean, sanitize...)
- Viết unit test cho DTO và pipe

---

## 🔗 Tham khảo / References
- [NestJS Validation](https://docs.nestjs.com/techniques/validation)
- [class-validator Docs](https://github.com/typestack/class-validator)
- [NestJS Pipes](https://docs.nestjs.com/pipes)
- [F8: NestJS Validation (Video tiếng Việt)](https://www.youtube.com/watch?v=1kF3jX6K8p8) 