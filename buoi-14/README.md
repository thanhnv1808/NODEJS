# 📚 Buổi 14: Swagger, Error Handling, API Testing (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để tài liệu hóa API một cách tự động?
- Xử lý lỗi trong NestJS như thế nào cho hiệu quả?
- Test API với Postman và Jest ra sao?

Have you ever wondered:
- How to automatically document your APIs?
- How to handle errors effectively in NestJS?
- How to test APIs with Postman and Jest?

---

## 1. 📚 Swagger Integration

### 1.1. Khái niệm và Mục đích
- Swagger (OpenAPI) là công cụ tạo tài liệu API tự động
- Giúp mô tả API một cách chuẩn hóa và dễ hiểu
- Tạo giao diện tương tác để test API
- Giảm thời gian viết tài liệu thủ công
- Tạo contract rõ ràng giữa frontend và backend

### 1.2. Cài đặt và Cấu hình
```bash
# Cài đặt dependencies
pnpm add @nestjs/swagger swagger-ui-express
```

```typescript
// main.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('The Task Management API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
```

### 1.3. Tài liệu hóa DTO và Controller
```typescript
// create-task.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implement login feature',
    description: 'The name of the task',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Create login form with validation',
    description: 'The description of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

// tasks.controller.ts
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ 
    status: 201, 
    description: 'Task created successfully',
    type: TaskResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input',
    type: ErrorResponseDto 
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
}
```

---

## 2. 🚨 Error Handling

### 2.1. Khái niệm và Mục đích
- Xử lý lỗi một cách nhất quán trong toàn bộ ứng dụng
- Format lỗi theo chuẩn để client dễ xử lý
- Log lỗi để debug và monitoring
- Đảm bảo response lỗi nhất quán
- Tăng tính bảo mật bằng cách không lộ thông tin nhạy cảm

### 2.2. Custom Exception
```typescript
// business.exception.ts
export class BusinessException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    status: number = HttpStatus.BAD_REQUEST,
    details?: any
  ) {
    super(
      {
        message,
        errorCode,
        timestamp: new Date().toISOString(),
        details,
        traceId: randomUUID()
      },
      status
    );
  }
}

// Sử dụng trong service
@Injectable()
export class TasksService {
  async findOne(id: number) {
    const task = await this.repository.findOne(id);
    if (!task) {
      throw new BusinessException(
        'Task not found',
        'TASK_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        { taskId: id }
      );
    }
    return task;
  }
}
```

### 2.3. Exception Filter
```typescript
// global-exception.filter.ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    const status = exception.status || 500;
    const message = exception.message || 'Internal server error';
    
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      traceId: randomUUID()
    });
  }
}
```

---

## 3. 🧪 API Testing

### 3.1. Khái niệm và Mục đích
- Kiểm tra API hoạt động đúng như mong đợi
- Đảm bảo chất lượng và độ tin cậy của API
- Phát hiện lỗi sớm trong quá trình phát triển
- Tự động hóa quá trình test
- Tăng độ tin cậy của hệ thống

### 3.2. Unit Testing với Jest
```typescript
// tasks.controller.spec.ts
describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService]
    }).compile();

    controller = module.get(TasksController);
    service = module.get(TasksService);
  });

  it('should create task', async () => {
    const createTaskDto = {
      name: 'Test Task',
      description: 'Test Description'
    };
    
    const result = await controller.create(createTaskDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(createTaskDto.name);
  });
});
```

### 3.3. API Testing với Postman
```javascript
// Test script trong Postman
pm.test("Task creation successful", function () {
  pm.response.to.have.status(201);
  const response = pm.response.json();
  pm.expect(response).to.have.property('id');
  pm.expect(response.name).to.eql(pm.request.body.name);
});

pm.test("Response has correct structure", function () {
  const response = pm.response.json();
  pm.expect(response).to.have.property('data');
  pm.expect(response).to.have.property('meta');
});
```

---

## 💡 Best Practices

### 1. Swagger Documentation
- Luôn cập nhật Swagger khi thay đổi API
- Đặt example, description rõ ràng cho từng field
- Định nghĩa schema cho cả response thành công và lỗi
- Sử dụng @ApiTags để nhóm các endpoint liên quan
- Thêm authentication vào Swagger UI

### 2. Error Handling
- Sử dụng custom exception cho các lỗi nghiệp vụ
- Format lỗi nhất quán trong toàn bộ ứng dụng
- Log đầy đủ thông tin lỗi để debug
- Không lộ thông tin nhạy cảm trong response lỗi
- Thêm traceId để theo dõi lỗi

### 3. API Testing
- Viết test case cho tất cả các endpoint
- Test các case: thành công, lỗi validate, lỗi server
- Sử dụng environment variables trong Postman
- Tự động hóa test CI/CD
- Lưu collection Postman để chia sẻ với team

---

## ✅ Checklist review
- [ ] Swagger documentation đầy đủ và rõ ràng
- [ ] Error handling nhất quán và an toàn
- [ ] Unit test cho controller và service
- [ ] API test với Postman
- [ ] Tự động hóa test với CI/CD

---

## 📝 Bài tập thực hành
1. Tích hợp Swagger cho project:
   - Cấu hình Swagger
   - Tài liệu hóa DTO và Controller
   - Thêm authentication

2. Implement Error Handling:
   - Custom exception
   - Exception filter
   - Error logging

3. Viết Test Cases:
   - Unit test với Jest
   - API test với Postman
   - Tự động hóa test

---

## 🔗 Tham khảo / References
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)
- [Postman Learning Center](https://learning.postman.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

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
- Kết hợp test tự động tích hợp CI/CD
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
