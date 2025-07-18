# Buổi 12: Module, DTO, Validation, Pipe (NestJS)

<!-- Page 1 -->
- Module: Gom nhóm controller, service liên quan, giúp code rõ ràng, dễ mở rộng.
- DTO: Định nghĩa cấu trúc dữ liệu vào/ra, validate, type-safe.
- Validation & Pipe: Kiểm tra, transform, sanitize dữ liệu trước khi vào controller.

---

<!-- Page 2 -->
## Câu hỏi mở đầu
- Làm sao để validate dữ liệu đầu vào hiệu quả trong NestJS?
- DTO là gì, tại sao nên dùng thay vì object thường?
- Pipe trong NestJS giúp ích gì cho việc xử lý dữ liệu?

---

<!-- Page 3 -->
## Module & DTO trong NestJS
- Module: Gom nhóm controller/service cùng domain.
- DTO: Class định nghĩa dữ liệu, dùng với class-validator để validate.
```typescript
export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;
  @IsNumber()
  @Min(0)
  price: number;
}
```

---

<!-- Page 4 -->
## Sử dụng DTO trong controller
```typescript
@Post()
create(@Body() dto: CreateProductDto) {
  // Nếu dữ liệu không hợp lệ, tự động trả lỗi 400
  return { message: 'Product created', data: dto };
}
```

---

<!-- Page 5 -->
## Validation & Pipe trong NestJS
- Validation: Kiểm tra dữ liệu đầu vào tự động bằng class-validator.
- Pipe: Xử lý, transform, validate dữ liệu trước khi vào controller.
- Kích hoạt global validation pipe:
```typescript
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
```

---

<!-- Page 6 -->
## Ví dụ custom pipe: ParseIntPipe
```typescript
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val)) throw new BadRequestException('Validation failed (numeric string is expected)');
    return val;
  }
}
// Sử dụng trong controller
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) { ... }
```

---

<!-- Page 7 -->
## Tips thực tế khi dùng DTO, Validation, Pipe
- Luôn dùng DTO cho mọi input (body, query, param).
- Dùng class-validator để validate, kết hợp nhiều decorator.
- Kích hoạt global ValidationPipe để tự động validate toàn app.
- Custom pipe cho các logic đặc biệt (parse, transform, sanitize...).
- Sử dụng whitelist để loại bỏ field thừa, forbidNonWhitelisted để báo lỗi nếu có field lạ.
- Có thể combine nhiều pipe cho 1 param.

---

<!-- Page 8 -->
## Ví dụ nâng cao về Pipe
- ParseBoolPipe: chuyển đổi string sang boolean.
- SanitizeHtmlPipe: loại bỏ tag HTML nguy hiểm.
- Combine nhiều pipe cho 1 param:
```typescript
@Post()
create(@Body('name', TrimStringPipe, CustomUppercasePipe) name: string) { ... }
```

---

<!-- Page 9 -->
## Bổ sung thực tế & nâng cao
- Custom message cho class-validator:
```typescript
@IsString({ message: 'Tên phải là chuỗi' })
name: string;
```
- Validate nested object:
```typescript
@ValidateNested()
@Type(() => CategoryDto)
category: CategoryDto;
```
- DTO kế thừa:
```typescript
export class UpdateProductDto extends CreateProductDto {}
```
- Pipe cho mọi loại input: body, param, query.
- Thứ tự thực thi pipe: trái sang phải.
- Tích hợp với Swagger:
```typescript
@ApiProperty({ example: 'Book', description: 'Tên sản phẩm' })
name: string;
```
- Exception khi validate: trả về lỗi 400 với message chi tiết.
- Global Pipe nâng cao:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => new BadRequestException(errors),
}));
```

---

<!-- Page 10 -->
## Best Practice khi validate với DTO & Pipe
- Tách DTO cho từng use-case (Create, Update, Query...)
- Đặt custom message cho từng rule (dễ debug, dễ hiểu)
- Validate nested object với @ValidateNested, @Type
- Sử dụng group để reuse DTO cho nhiều mục đích
- Viết unit test cho DTO, custom pipe
- Tài liệu hóa rule validate trong Swagger/Postman
- Không validate logic nghiệp vụ phức tạp trong DTO (để ở service)
- Không trả về lỗi lộ thông tin nhạy cảm

---

<!-- Page 11 -->
## Checklist review DTO & Validation
- [ ] Định nghĩa type rõ ràng cho mọi field
- [ ] Có validate cho tất cả field (IsString, IsNumber, ...)
- [ ] Custom message cho rule quan trọng
- [ ] Validate nested object nếu có
- [ ] Test case cho dữ liệu hợp lệ và không hợp lệ
- [ ] Tài liệu hóa rule validate (Swagger, docs)
- [ ] Không trả về lỗi lộ thông tin nhạy cảm
- [ ] Kết hợp pipe cho các trường cần transform/sanitize

---

<!-- Page 12 -->
## Bài tập thực hành
- Tạo DTO validate cho Product (name, price, description...)
- Kích hoạt global ValidationPipe, thử gửi dữ liệu sai để xem lỗi
- Viết custom pipe (ví dụ: trim, parse boolean, sanitize...)
- Viết unit test cho DTO và pipe

---

<!-- Page 13 -->
## Tham khảo
- https://docs.nestjs.com/techniques/validation
- https://github.com/typestack/class-validator
- https://docs.nestjs.com/pipes
- https://www.youtube.com/watch?v=1kF3jX6K8p8 (F8 NestJS Validation) 