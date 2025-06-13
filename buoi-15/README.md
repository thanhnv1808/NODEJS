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

### 1.1. File Upload Configuration
```typescript
// file-upload.constants.ts
export const FILE_UPLOAD_DESTINATION = 'uploads';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
```

### 1.2. File Upload Interceptor
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

### 1.3. File Upload Service
```typescript
// file-upload.ts
import { copyFile, mkdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export const moveUploadedFile = async (
  file: StoredFile,
  generateFilePathFn: (file: StoredFile) => string,
) => {
  const newPath = generateFilePathFn(file);
  const parentPath = dirname(newPath);
  await mkdir(parentPath, { recursive: true });

  await copyFile(file.path, newPath);
  await unlink(file.path);

  return { ...file, path: newPath };
};

export const removeUploadedFiles = async (files: StoredFile[]) => {
  return Promise.all(
    files.map((file) => unlink(file.path)),
  );
};
```

### 1.4. File Upload Controller
```typescript
// tasks.controller.ts
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AddFileUploadToRequestBodyInterceptor } from '../common/file-upload';

@Controller('tasks')
export class TasksController {
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file'),
    AddFileUploadToRequestBodyInterceptor,
  )
  async uploadFile(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    const file = body.files.file;
    const task = await this.tasksService.findOne(id);
    
    const filePath = `uploads/tasks/${task.id}/${file.filename}`;
    await moveUploadedFile(file, () => filePath);
    
    return this.tasksService.updateTaskFile(id, filePath);
  }
}
```

---

## 2. 💾 Database Operations

### 2.1. Pagination
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
    },
  };
}
```

### 2.2. Streaming Large Datasets
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

### 2.3. Query Builder
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
}
```

---

## 3. ⚡ Performance Optimization

### 3.1. Query Optimization
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  async findAllWithRelations(filters: TaskFiltersDto) {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.creator', 'creator');

    PgQueryBuilder.buildWhereClause(queryBuilder, filters);
    PgQueryBuilder.buildOrderByClause(queryBuilder, 'task.createdAt', 'DESC');

    return queryBuilder.getMany();
  }
}
```

### 3.2. Batch Processing
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

### 3.3. Caching
```typescript
// tasks.service.ts
@Injectable()
export class TasksService {
  @Cacheable('task', { ttl: 300 })
  async findOne(id: number) {
    return this.taskRepository.findOne(id);
  }

  @CacheEvict('task')
  async update(id: number, dto: UpdateTaskDto) {
    return this.taskRepository.update(id, dto);
  }
}
```

---

## 💡 Best Practices

### 1. File Handling
- Validate file size and type
- Use secure file names
- Implement proper cleanup
- Handle concurrent uploads
- Use streaming for large files

### 2. Database Operations
- Use pagination for large datasets
- Implement proper indexing
- Use query builder for complex queries
- Implement proper error handling
- Use transactions when needed

### 3. Performance
- Implement caching strategy
- Use batch processing
- Optimize database queries
- Monitor performance metrics
- Use proper indexing

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