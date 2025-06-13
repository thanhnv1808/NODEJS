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

### 1.1. Module là gì?
- **Module**: Đơn vị tổ chức code, gom nhóm các controller, service liên quan
- Mỗi module là một class có decorator `@Module()`
- Module có thể import/export các module khác

```typescript
// tasks.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    FileStorageModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
```

### 1.2. DTO (Data Transfer Object)
- **DTO**: Class định nghĩa cấu trúc dữ liệu vào/ra
- Giúp validate, type-safe, tài liệu hóa API
- Thường kết hợp với class-validator để validate

```typescript
// create-task.dtos.ts
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement login feature' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Create login form with validation' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'IN_PROGRESS', enum: TaskStatus })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  assigneeId: number;
}
```

### 1.3. Sử dụng DTO trong controller
```typescript
// tasks.controller.ts
@Controller('tasks')
export class TasksController {
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: GetAllTasksDto) {
    return this.tasksService.findAll(query);
  }
}
```

---

## 2. 🛡️ Validation & Pipe trong NestJS

### 2.1. Validation Pipe
- **ValidationPipe**: Tự động validate dữ liệu dựa trên class-validator
- Có thể cấu hình global hoặc cho từng route

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

### 2.2. Custom Validation Pipe
```typescript
// parse-date.pipe.ts
@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }
}

// Sử dụng trong controller
@Get()
findAll(@Query('startDate', ParseDatePipe) startDate: Date) {
  return this.tasksService.findByDate(startDate);
}
```

### 2.3. Validate Nested Objects
```typescript
// task-update.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested, IsString, IsOptional } from 'class-validator';

class TaskAssigneeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;
}

export class UpdateTaskDto {
  @ValidateNested()
  @Type(() => TaskAssigneeDto)
  assignee: TaskAssigneeDto;

  @IsString()
  @IsOptional()
  description?: string;
}
```

---

## 3. 🌟 Ví dụ nâng cao từ Task Management

### 3.1. Query DTO với Pagination
```typescript
// get-all-tasks.dtos.ts
export class GetAllTasksDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
```

### 3.2. File Upload DTO
```typescript
// images-upload.dto.ts
export class ImagesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsArray()
  @IsOptional()
  images?: Express.Multer.File[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  taskId: number;
}
```

### 3.3. Custom Validation Decorator
```typescript
// task-status.decorator.ts
export function IsValidTaskStatus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidTaskStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Object.values(TaskStatus).includes(value);
        },
      },
    });
  };
}
```

---

## 💡 Best Practices khi dùng DTO & Validation

### 1. DTO Organization
- Tách DTO cho từng use-case (Create, Update, Query...)
- Đặt trong thư mục dto riêng
- Kế thừa DTO để tái sử dụng rule

```typescript
// base-task.dto.ts
export class BaseTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// create-task.dto.ts
export class CreateTaskDto extends BaseTaskDto {
  @IsNumber()
  assigneeId: number;
}
```

### 2. Validation Rules
- Validate sớm với class-validator
- Custom message rõ ràng
- Validate cả nested objects
- Sử dụng groups khi cần

### 3. Error Handling
- Custom exception cho validation error
- Log đầy đủ thông tin lỗi
- Trả về message thân thiện với user

### 4. Performance
- Validate ở tầng controller
- Tránh validate trùng lặp
- Cache kết quả validate nếu cần

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
1. Tạo DTO cho Task Management:
   - CreateTaskDto với validation
   - UpdateTaskDto với partial fields
   - QueryTaskDto với pagination và filter

2. Viết custom validation pipe:
   - ParseDatePipe cho date fields
   - SanitizeHtmlPipe cho description
   - ParseEnumPipe cho status

3. Tích hợp Swagger:
   - Mô tả DTO với @ApiProperty
   - Thêm example cho từng field
   - Tài liệu hóa validation rules

---

## 🔗 Tham khảo / References
- [NestJS Validation](https://docs.nestjs.com/techniques/validation)
- [Class Validator](https://github.com/typestack/class-validator)
- [Class Transformer](https://github.com/typestack/class-transformer)
- [NestJS Pipes](https://docs.nestjs.com/pipes)
