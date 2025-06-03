# 📚 Buổi 15: Advanced: Upload, Pagination, Filter (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để upload file (ảnh, tài liệu) qua API một cách an toàn?
- Làm thế nào để phân trang dữ liệu lớn, filter theo nhiều trường?
- Có thể kết hợp upload, filter, pagination trong 1 API không?

Have you ever wondered:
- How to upload files (images, docs) securely via API?
- How to paginate and filter large datasets in your API?
- Can you combine upload, filter, and pagination in a single API?

---

## 1. 📦 Upload file với Multer trong NestJS

- **Multer**: Middleware hỗ trợ upload file cho Express/NestJS
- NestJS tích hợp sẵn @nestjs/platform-express

### Cài đặt Multer
```bash
npm install --save @nestjs/platform-express multer
```

### Ví dụ upload 1 file
```typescript
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename, size: file.size };
  }
}
```

### Upload nhiều file
```typescript
import { FilesInterceptor } from '@nestjs/platform-express';

@Post('multi')
@UseInterceptors(FilesInterceptor('files', 5))
uploadMulti(@UploadedFiles() files: Express.Multer.File[]) {
  return files.map(f => ({ filename: f.filename, size: f.size }));
}
```

---

## 2. 📊 Pagination & Filter trong API

- **Pagination**: Chia nhỏ dữ liệu trả về theo trang (page, limit)
- **Filter**: Lọc dữ liệu theo trường (name, price, ...)

### Ví dụ phân trang & filter với TypeORM
```typescript
@Get()
async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('name') name?: string) {
  const [data, total] = await this.productRepo.findAndCount({
    where: name ? { name: Like(`%${name}%`) } : {},
    skip: (page - 1) * limit,
    take: limit,
  });
  return { data, total, page, limit };
}
```

---

## 💡 Tips thực tế khi làm upload, pagination, filter
- Giới hạn loại file, dung lượng khi upload (fileFilter, limits)
- Lưu file vào thư mục riêng, đặt tên unique (uuid, timestamp)
- Validate dữ liệu filter, phân trang (page > 0, limit hợp lý)
- Trả về tổng số trang, tổng bản ghi cho client
- Kết hợp filter nâng cao: nhiều trường, range (price_min, price_max)
- Test upload với file lớn, nhiều file cùng lúc
- Xử lý lỗi rõ ràng khi upload thất bại

---

## 💡 Best practice khi lưu file upload
- Lưu file vào thư mục riêng theo module/ngày (uploads/products/2024-06-01)
- Đặt tên file unique (uuid, timestamp, userId...)
- Không lưu file lớn trong repo, chỉ lưu path trong DB
- Validate mime type, kích thước trước khi lưu
- Xóa file cũ khi update hoặc xóa record
- Backup thư mục upload định kỳ
- Phân quyền truy cập file nếu cần (private/public)
- Không trả về path tuyệt đối, chỉ trả relative path/url

---

## ✅ Checklist review API upload/pagination/filter
- [ ] Validate loại file, kích thước khi upload
- [ ] Giới hạn số file upload/lần, dung lượng tối đa
- [ ] Trả về path/url file rõ ràng, không lộ thông tin nhạy cảm
- [ ] API phân trang trả về meta: total, page, limit, totalPages
- [ ] Hỗ trợ filter đủ trường cần thiết (name, price, ...)
- [ ] Có thể sort, filter range, filter nhiều trường cùng lúc
- [ ] Docs rõ ràng cho param upload, filter, pagination
- [ ] Test upload file lớn, filter nhiều trường, phân trang sâu

---

## 🌟 Ví dụ nâng cao: Filter động với query builder
```typescript
@Get()
async findAll(@Query() query: any) {
  const qb = this.productRepo.createQueryBuilder('product');
  if (query.name) qb.andWhere('product.name LIKE :name', { name: `%${query.name}%` });
  if (query.price_min) qb.andWhere('product.price >= :min', { min: query.price_min });
  if (query.price_max) qb.andWhere('product.price <= :max', { max: query.price_max });
  if (query.category) qb.andWhere('product.categoryId = :cat', { cat: query.category });
  // Filter in
  if (query.status) qb.andWhere('product.status IN (:...status)', { status: query.status.split(',') });
  // Sort
  if (query.sort) qb.orderBy(`product.${query.sort}`, query.order === 'desc' ? 'DESC' : 'ASC');
  // Pagination
  const page = +query.page || 1;
  const limit = +query.limit || 10;
  qb.skip((page-1)*limit).take(limit);
  const [data, total] = await qb.getManyAndCount();
  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total/limit) }
  };
}
```

---

## 📝 Bài tập thực hành
- Tích hợp upload file (ảnh) cho Product, validate loại file, dung lượng
- Thêm API phân trang, filter cho danh sách Product
- Viết API upload nhiều file, filter nâng cao (name, price range)
- Test upload file lớn, nhiều file, filter nhiều trường

---

## 🔗 Tham khảo / References
- [NestJS File Upload](https://docs.nestjs.com/techniques/file-upload)
- [Multer Docs](https://github.com/expressjs/multer)
- [TypeORM Pagination](https://typeorm.io/select-query-builder#pagination-using-take-and-skip)
- [F8: Upload & Pagination (Video tiếng Việt)](https://www.youtube.com/watch?v=1kF3jX6K8p8) 