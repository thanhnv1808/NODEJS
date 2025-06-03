# 📚 Buổi 14: Swagger, Error Handling, API Testing (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để tự động tạo tài liệu API cho backend?
- Làm thế nào để trả lỗi API rõ ràng, dễ debug?
- Test API hiệu quả với Postman như thế nào?

Have you ever wondered:
- How to auto-generate API docs for your backend?
- How to return clear, debuggable API errors?
- How to test APIs efficiently with Postman?

---

## 1. 📖 Swagger là gì? Tích hợp Swagger với NestJS

- **Swagger (OpenAPI)**: Chuẩn mô tả API, giúp tự động sinh docs, test trực tiếp trên web
- **NestJS** tích hợp sẵn module @nestjs/swagger

### Cài đặt và cấu hình Swagger
```bash
npm install --save @nestjs/swagger swagger-ui-express
```
```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Product API')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```
- Truy cập docs tại: http://localhost:3000/api-docs

### Decorator mô tả DTO, response
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'Book', description: 'Product name' })
  name: string;
  @ApiProperty({ example: 10, description: 'Product price' })
  price: number;
}
```

---

## 2. 🛡️ Error Handling (Exception Filter)

- **Exception Filter**: Xử lý lỗi tập trung, trả về response chuẩn
- **NestJS** có built-in HttpException, ExceptionFilter

### Ví dụ custom Exception Filter
```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
// main.ts: app.useGlobalFilters(new CustomExceptionFilter());
```

### Best practice trả lỗi API
- Luôn trả về status code đúng (400, 401, 404, 500...)
- Message rõ ràng, không lộ thông tin nhạy cảm
- Có thể trả thêm field code, timestamp, traceId
- Định nghĩa error schema trong Swagger

---

## 3. 🧪 API Testing với Postman

- **Postman**: Công cụ test API phổ biến, hỗ trợ gửi request, kiểm tra response, viết test script
- Có thể import collection từ Swagger/OpenAPI

### Tips khi test API
- Tạo collection cho từng module (user, product...)
- Sử dụng environment variable cho base URL, token
- Viết test script kiểm tra status, response body
- Lưu lại example response để làm tài liệu
- Kết hợp với Newman để test tự động (CI/CD)

---

## 🌟 Ví dụ nâng cao: Custom Exception Filter & Response Schema

### Custom Exception Filter trả lỗi chuẩn
```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500;
    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
      error: exception.name || 'Error',
      timestamp: new Date().toISOString(),
    });
  }
}
```

### Định nghĩa response schema cho lỗi trong Swagger
```typescript
@ApiResponse({
  status: 400,
  description: 'Bad Request',
  schema: {
    example: {
      statusCode: 400,
      message: 'Invalid input',
      error: 'BadRequest',
      timestamp: '2024-06-01T12:00:00.000Z'
    }
  }
})
```

---

## 💡 Tips thực tế khi viết docs & test API
- Luôn cập nhật Swagger khi thay đổi API
- Đặt example, description rõ ràng cho từng field
- Định nghĩa schema cho cả response thành công và lỗi
- Test các case: thành công, lỗi validate, lỗi server, lỗi auth
- Lưu lại collection Postman, chia sẻ cho team
- Kết hợp test tự động với Newman, CI/CD

---

## 📝 Bài tập thực hành
- Tích hợp Swagger cho project NestJS, mô tả đầy đủ DTO, response
- Viết custom Exception Filter trả lỗi chuẩn
- Test API với Postman, viết test script kiểm tra response
- Định nghĩa schema lỗi trong Swagger

---

## 🔗 Tham khảo / References
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [NestJS Exception Filter](https://docs.nestjs.com/exception-filters)
- [Postman Docs](https://learning.postman.com/docs/getting-started/introduction/)
- [Newman CLI](https://www.npmjs.com/package/newman)
- [F8: Swagger & API Testing (Video tiếng Việt)](https://www.youtube.com/watch?v=1kF3jX6K8p8)

---

## ✅ Checklist review tài liệu API (Swagger)
- [ ] Đầy đủ endpoint, method, path, param, body, query
- [ ] Mô tả rõ ràng cho từng field (description, example)
- [ ] Định nghĩa schema cho response thành công và lỗi
- [ ] Có mô tả status code cho từng endpoint
- [ ] Định nghĩa rõ các lỗi phổ biến (400, 401, 404, 500...)
- [ ] Có example cho từng response
- [ ] Versioning rõ ràng (v1, v2...)
- [ ] Mô tả auth (Bearer, API key...)
- [ ] Docs luôn được cập nhật khi thay đổi API

---

## 💡 Best practice khi test API
- Test đủ các case: thành công, lỗi validate, lỗi server, lỗi auth, lỗi permission
- Sử dụng environment variable cho base URL, token, param động
- Viết test script kiểm tra status, body, header, thời gian phản hồi
- Lưu lại example response để làm tài liệu, so sánh khi regression
- Kết hợp test tự động với Newman, tích hợp CI/CD
- Chia sẻ collection Postman cho team, update khi thay đổi API
- Test với dữ liệu lớn, case đặc biệt (ký tự lạ, null, empty...)

---

## 🌟 Ví dụ nâng cao: Exception Filter sinh traceId cho lỗi

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Catch()
export class TraceIdExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500;
    const traceId = randomUUID();
    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
      error: exception.name || 'Error',
      traceId,
      timestamp: new Date().toISOString(),
    });
    // Có thể log traceId + error để debug
  }
}
```

--- 