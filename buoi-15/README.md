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

### 1.3. File Upload Service
```typescript
// file-upload.service.ts
@Injectable()
export class FileUploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {}

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    try {
      // Validate file
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        throw new BadRequestException('Invalid file type');
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new BadRequestException('File too large');
      }

      // Create folder if not exists
      const uploadPath = join(FILE_UPLOAD_DESTINATION, folder);
      await mkdir(uploadPath, { recursive: true });

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`;
      const filepath = join(uploadPath, filename);

      // Move file to destination
      await copyFile(file.path, filepath);
      await unlink(file.path);

      // Return relative path
      return join(folder, filename);
    } catch (error) {
      this.logger.error('File upload failed', error);
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async deleteFile(filepath: string): Promise<void> {
    try {
      const fullPath = join(FILE_UPLOAD_DESTINATION, filepath);
      await unlink(fullPath);
    } catch (error) {
      this.logger.error('File deletion failed', error);
      throw new InternalServerErrorException('File deletion failed');
    }
  }
}
```

### 1.4. File Upload Controller
```typescript
// tasks.controller.ts
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Validate task exists
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Upload file
    const filepath = await this.fileUploadService.uploadFile(file, `tasks/${id}`);

    // Update task with file path
    return this.tasksService.updateTaskFile(id, filepath);
  }

  @Delete(':id/file')
  async deleteFile(@Param('id') id: number) {
    // Validate task exists
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Delete file if exists
    if (task.filepath) {
      await this.fileUploadService.deleteFile(task.filepath);
    }

    // Update task to remove file path
    return this.tasksService.updateTaskFile(id, null);
  }
}
```

### 1.5. Task Entity với File
```typescript
// task.entity.ts
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  filepath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

### 1.6. Task Service với File Operations
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTaskFile(id: number, filepath: string | null): Promise<Task> {
    const task = await this.findOne(id);
    task.filepath = filepath;
    task.updatedAt = new Date();
    return this.taskRepository.save(task);
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