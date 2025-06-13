# 📚 Buổi 15: File Handling, Database Operations & Performance (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để xử lý upload file an toàn và hiệu quả?
- Tối ưu query database như thế nào?
- Xử lý dữ liệu lớn với streaming ra sao?

Have you ever wondered:
- How to handle file uploads safely and efficiently?
- How to optimize database queries?
- How to process large datasets with streaming?

---

## 1. 📁 File Handling

### 1.1. Khái niệm và Mục đích
- Xử lý upload và lưu trữ file từ client
- Validate file trước khi lưu (kích thước, loại file)
- Quản lý file an toàn và hiệu quả
- Tối ưu hiệu năng khi xử lý file lớn
- Đảm bảo bảo mật khi lưu trữ file

### 1.2. File Upload Configuration
```typescript
// file-upload.constants.ts
export const FILE_UPLOAD_DESTINATION = 'uploads';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// file-upload.config.ts
export const multerConfig = {
  storage: diskStorage({
    destination: FILE_UPLOAD_DESTINATION,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE
  }
};
```

### 1.3. File Upload Interceptor
```typescript
// add-file-upload-to-request-body.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUploadedFilesFromRequestAsMap } from './file-upload';

@Injectable()
export class AddFileUploadToRequestBodyInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const uploadedFiles = await getUploadedFilesFromRequestAsMap(request);
    
    return next.handle().pipe(
      map((data) => ({
        ...data,
        files: uploadedFiles,
      })),
    );
  }
}
```

### 1.4. File Upload Service
```typescript
// file-upload.service.ts
@Injectable()
export class FileUploadService {
  async moveUploadedFile(
    file: StoredFile,
    generateFilePathFn: (file: StoredFile) => string,
  ) {
    const newPath = generateFilePathFn(file);
    const parentPath = dirname(newPath);
    await mkdir(parentPath, { recursive: true });

    await copyFile(file.path, newPath);
    await unlink(file.path);

    return { ...file, path: newPath };
  }

  async removeUploadedFiles(files: StoredFile[]) {
    return Promise.all(
      files.map((file) => unlink(file.path)),
    );
  }

  async validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File too large');
    }
  }
}
```

### 1.5. File Upload Controller
```typescript
// tasks.controller.ts
@Controller('tasks')
export class TasksController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', multerConfig),
    AddFileUploadToRequestBodyInterceptor,
  )
  async uploadFile(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    const file = body.files.file;
    await this.fileUploadService.validateFile(file);
    
    const task = await this.tasksService.findOne(id);
    const filePath = `uploads/tasks/${task.id}/${file.filename}`;
    
    const movedFile = await this.fileUploadService.moveUploadedFile(
      file,
      () => filePath
    );
    
    return this.tasksService.updateTaskFile(id, movedFile.path);
  }
}
```

---

## 2. 💾 Database Operations

### 2.1. Khái niệm và Mục đích
- Thao tác với database hiệu quả
- Tối ưu query để tăng hiệu năng
- Xử lý dữ liệu lớn
- Đảm bảo tính nhất quán của dữ liệu
- Giảm tải cho database

### 2.2. Pagination
```typescript
// paginate.ts
export async function paginate<Entity extends ObjectLiteral>(
  repositoryOrQueryBuilder: Repository<Entity> | SelectQueryBuilder<Entity>,
  paginationInputDto: PaginationInputDto,
  findManyOptions?: FindManyOptions<Entity>,
): Promise<PaginationDto<Entity>> {
  const { page, skip, take } = paginationInputDto;
  let items = [];
  let total = 0;

  if (repositoryOrQueryBuilder instanceof Repository) {
    [items, total] = await repositoryOrQueryBuilder.findAndCount({
      skip,
      take,
      ...findManyOptions,
    });
  } else {
    [items, total] = await repositoryOrQueryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  return {
    items,
    pagination: {
      total,
      page,
      pageSize: take,
      totalPages: Math.ceil(total / take),
      hasNext: page * take < total,
      hasPrev: page > 1
    },
  };
}
```

### 2.3. Streaming Large Datasets
```typescript
// paginate.ts
export const paginateStream = async <Entity extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<Entity>,
  batchFn: (items: Entity[], totalCount: number) => Promise<any>,
  size = 100,
): Promise<any> => {
  const stream = await queryBuilder.stream();
  return pipeline(stream, async function* (source: any) {
    let totalCount = 0;
    let items: Entity[] = [];

    for await (const row of source) {
      totalCount += 1;
      items.push(row);

      if (items.length >= size) {
        yield await batchFn(items, totalCount);
        items = [];
      }
    }

    if (items.length > 0) {
      yield await batchFn(items, totalCount);
    }
  });
};
```

### 2.4. Query Builder
```typescript
// pg-query.ts
export class PgQueryBuilder {
  static buildWhereClause(
    queryBuilder: SelectQueryBuilder<any>,
    filters: Record<string, any>,
  ) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
      }
    });
  }

  static buildOrderByClause(
    queryBuilder: SelectQueryBuilder<any>,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    queryBuilder.orderBy(sortBy, sortOrder);
  }

  static buildRangeClause(
    queryBuilder: SelectQueryBuilder<any>,
    field: string,
    min?: number,
    max?: number,
  ) {
    if (min !== undefined) {
      queryBuilder.andWhere(`${field} >= :min${field}`, { [`min${field}`]: min });
    }
    if (max !== undefined) {
      queryBuilder.andWhere(`${field} <= :max${field}`, { [`max${field}`]: max });
    }
  }
}
```

---

## 3. ⚡ Performance Optimization

### 3.1. Khái niệm và Mục đích
- Tối ưu hiệu năng của ứng dụng
- Sử dụng caching để tăng tốc độ
- Monitoring để phát hiện vấn đề
- Giảm tải cho server
- Cải thiện trải nghiệm người dùng

### 3.2. Query Optimization
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  async findAllWithRelations(filters: TaskFiltersDto) {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.creator', 'creator')
      .leftJoinAndSelect('task.category', 'category');

    PgQueryBuilder.buildWhereClause(queryBuilder, filters);
    PgQueryBuilder.buildOrderByClause(queryBuilder, 'task.createdAt', 'DESC');
    PgQueryBuilder.buildRangeClause(
      queryBuilder,
      'task.priority',
      filters.minPriority,
      filters.maxPriority
    );

    return queryBuilder.getMany();
  }
}
```

### 3.3. Batch Processing
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  async processLargeDataset() {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .where('task.status = :status', { status: 'PENDING' });

    await paginateStream(queryBuilder, async (tasks, total) => {
      await Promise.all(
        tasks.map(task => this.processTask(task)),
      );
    }, 100);
  }
}
```

### 3.4. Caching
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly taskRepository: Repository<Task>
  ) {}

  @Cacheable('task', { ttl: 300 })
  async findOne(id: number) {
    return this.taskRepository.findOne(id);
  }

  @CacheEvict('task')
  async update(id: number, dto: UpdateTaskDto) {
    return this.taskRepository.update(id, dto);
  }

  @CacheEvict('task')
  async delete(id: number) {
    return this.taskRepository.delete(id);
  }
}
```

### 3.5. Monitoring và Logging
```typescript
// logger.service.ts
@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
      ]
    });
  }

  log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }
}
```

---

## 💡 Best Practices

### 1. File Handling
- Validate file size và type trước khi lưu
- Sử dụng tên file unique để tránh conflict
- Implement proper cleanup cho file tạm
- Xử lý concurrent uploads an toàn
- Sử dụng streaming cho file lớn

### 2. Database Operations
- Sử dụng pagination cho large datasets
- Implement proper indexing cho các trường thường query
- Sử dụng query builder cho complex queries
- Implement proper error handling
- Sử dụng transactions khi cần

### 3. Performance
- Implement caching strategy phù hợp
- Sử dụng batch processing cho large datasets
- Tối ưu database queries
- Monitor performance metrics
- Sử dụng proper indexing

---

## ✅ Checklist review
- [ ] File upload validation
- [ ] Secure file storage
- [ ] Proper file cleanup
- [ ] Database pagination
- [ ] Query optimization
- [ ] Caching implementation
- [ ] Performance monitoring
- [ ] Error handling

---

## 📝 Bài tập thực hành
1. Implement File Upload:
   - File validation
   - Secure storage
   - Cleanup mechanism

2. Database Operations:
   - Pagination
   - Complex queries
   - Batch processing

3. Performance Optimization:
   - Query optimization
   - Caching
   - Monitoring

---

## 🔗 Tham khảo / References
- [NestJS File Upload](https://docs.nestjs.com/techniques/file-upload)
- [TypeORM Documentation](https://typeorm.io/)
- [Node.js Streams](https://nodejs.org/api/stream.html)
- [Redis Caching](https://redis.io/topics/caching)
- [Winston Logger](https://github.com/winstonjs/winston) 