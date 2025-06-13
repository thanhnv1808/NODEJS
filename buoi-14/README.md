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

### 1.1. Cài đặt và cấu hình
```bash
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

### 1.2. Tài liệu hóa DTO
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

  @ApiProperty({
    example: 'IN_PROGRESS',
    enum: TaskStatus,
    description: 'The status of the task',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
```

### 1.3. Tài liệu hóa Controller
```typescript
// tasks.controller.ts
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ 
    status: 201, 
    description: 'The task has been successfully created.',
    type: TaskDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
}
```

---

## 2. 🛡️ Error Handling

### 2.1. Custom Exception
```typescript
// application.error.ts
export class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: number = 400,
  ) {
    super(message);
  }
}

// not-found.errors.ts
export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super('NOT_FOUND', message, 404);
  }
}

// validation.errors.ts
export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
  }
}
```

### 2.2. Exception Filter
```typescript
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: exceptionResponse['message'] || exception.message,
    });
  }
}
```

### 2.3. Sử dụng trong Service
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  async findOne(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(dto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(dto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new ValidationError('Invalid task data');
    }
  }
}
```

---

## 3. 🧪 API Testing

### 3.1. Unit Testing với Jest
```typescript
// tasks.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const task = new Task();
      jest.spyOn(repository, 'findOne').mockResolvedValue(task);

      expect(await service.findOne(1)).toBe(task);
    });

    it('should throw NotFoundError if task not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundError);
    });
  });
});
```

### 3.2. E2E Testing
```typescript
// tasks.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'Test Task',
        status: 'TODO',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('Test Task');
      });
  });
});
```

### 3.3. Postman Collection
```json
{
  "info": {
    "name": "Task Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/tasks",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ]
          }
        },
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/tasks",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"New Task\",\n  \"status\": \"TODO\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        }
      ]
    }
  ]
}
```

---

## 💡 Best Practices

### 1. Swagger Documentation
- Sử dụng @ApiProperty cho mọi DTO
- Thêm mô tả chi tiết cho mỗi endpoint
- Phân loại API theo tags
- Tài liệu hóa response codes

### 2. Error Handling
- Tạo custom exceptions cho từng loại lỗi
- Implement global exception filter
- Log đầy đủ thông tin lỗi
- Trả về message thân thiện với user

### 3. Testing Strategy
- Unit test cho service logic
- E2E test cho API endpoints
- Test các error cases
- Sử dụng test database

### 4. API Testing
- Tổ chức Postman collection theo module
- Sử dụng environment variables
- Tự động hóa test với Newman
- Test các edge cases

---

## ✅ Checklist review
- [ ] Swagger documentation đầy đủ
- [ ] Custom exceptions cho mọi error case
- [ ] Global exception filter hoạt động
- [ ] Unit tests cho service
- [ ] E2E tests cho API
- [ ] Postman collection đầy đủ
- [ ] Test coverage đạt yêu cầu
- [ ] CI/CD pipeline cho testing

---

## 📝 Bài tập thực hành
1. Tài liệu hóa API với Swagger:
   - Cấu hình Swagger
   - Tài liệu hóa DTOs
   - Tài liệu hóa Controllers

2. Implement Error Handling:
   - Custom exceptions
   - Exception filter
   - Error logging

3. Viết Tests:
   - Unit tests cho services
   - E2E tests cho APIs
   - Postman collection

---

## 🔗 Tham khảo / References
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Postman Documentation](https://learning.postman.com/docs/)

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
