# 📚 Buổi 10: Database Integration (MySQL + TypeORM)

## ❓ Câu hỏi mở đầu
- Làm sao để lưu trữ dữ liệu bền vững cho ứng dụng backend?
- Tại sao nên dùng MySQL thay vì chỉ lưu file?
- ORM là gì, có lợi ích gì khi làm việc với database?
- TypeORM khác gì Prisma/Sequelize?

Have you ever wondered:
- How to persist data for your backend apps?
- Why use MySQL instead of just saving to files?
- What is an ORM and why is it useful?
- How is TypeORM different from Prisma/Sequelize?

---

## 1. 🗄️ MySQL là gì?

**MySQL** là hệ quản trị cơ sở dữ liệu quan hệ (Relational Database Management System) phổ biến, mạnh mẽ, miễn phí.
- Lưu trữ dữ liệu dạng bảng (table), có thể liên kết (relation)
- Hỗ trợ truy vấn SQL mạnh mẽ
- Được dùng rộng rãi cho web/app backend

### Cài đặt MySQL
- Tải tại: https://dev.mysql.com/downloads/
- Hoặc dùng Docker:
```bash
docker run --name mysql-demo -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:8
```

---

## 2. 🔗 Kết nối Node.js + TypeScript với MySQL qua TypeORM

**TypeORM** là ORM mạnh mẽ cho Node.js, hỗ trợ TypeScript, migration, relation, transaction, ...
- Decorator style, dễ đọc, dễ mở rộng
- Hỗ trợ migration, seed, transaction, relation

### Cài đặt TypeORM
```bash
npm install typeorm mysql2 reflect-metadata
npm install @nestjs/typeorm typeorm --save
```

### Cấu hình kết nối (ormconfig.ts hoặc trong module NestJS)
```typescript
// ormconfig.ts
export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'mydb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // chỉ dùng dev
};
```

### Định nghĩa entity (Product)
```typescript
// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
```

### CRUD với TypeORM (TypeScript)
```typescript
// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(data: Partial<Product>) {
    return this.productRepo.save(data);
  }
  findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }
  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['category'] });
  }
  update(id: number, data: Partial<Product>) {
    return this.productRepo.update(id, data);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
```

---

## 🌟 Ví dụ nâng cao: Quan hệ bảng (One-to-Many)

### Category - Product (1 Category - n Product)
```typescript
// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
```

---

## 💡 Tips tối ưu query với MySQL + TypeORM
- Chỉ select trường cần thiết (`select` option)
- Dùng index cho các cột hay truy vấn (WHERE, JOIN)
- Luôn phân trang (take/skip) khi lấy nhiều dữ liệu
- Dùng transaction khi thao tác nhiều bảng liên quan
- Sử dụng query builder cho truy vấn phức tạp
- Test hiệu năng với dữ liệu lớn
- Không dùng synchronize=true ở production, luôn dùng migration

---

## 🌟 Ví dụ nâng cao: Transaction với TypeORM
```typescript
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async transferStock(productId1: number, productId2: number, qty: number) {
    await this.dataSource.transaction(async (manager) => {
      const p1 = await manager.findOneBy(Product, { id: productId1 });
      const p2 = await manager.findOneBy(Product, { id: productId2 });
      if (!p1 || !p2) throw new Error('Product not found');
      p1.stock -= qty;
      p2.stock += qty;
      await manager.save([p1, p2]);
    });
  }
}
```

---

## ✅ Checklist review Database
- [ ] Đặt tên bảng/cột rõ ràng, nhất quán (snake_case, tiếng Anh)
- [ ] Có index cho các cột truy vấn nhiều
- [ ] Định nghĩa constraint (NOT NULL, UNIQUE, FOREIGN KEY...)
- [ ] Migration rõ ràng, không sửa trực tiếp DB
- [ ] Có seed script tạo dữ liệu mẫu
- [ ] Backup DB định kỳ, test restore
- [ ] Test CRUD, quan hệ, transaction
- [ ] Kiểm tra security: không lộ thông tin nhạy cảm, hạn chế quyền user DB
- [ ] Tối ưu query, kiểm tra explain plan
- [ ] Có tài liệu ERD/schema cho team

---

## 💡 Tips thực tế khi dùng MySQL + TypeORM
- Luôn dùng biến môi trường (.env) cho thông tin kết nối DB
- Đặt tên bảng, cột rõ ràng, dùng tiếng Anh, snake_case
- Luôn tạo migration, không sửa trực tiếp DB
- Dùng seed script để tạo dữ liệu mẫu
- Validate dữ liệu ở cả backend (DTO) và DB (constraint)
- Backup DB định kỳ, test kỹ migration trước khi chạy production
- Đọc kỹ log lỗi khi thao tác với DB, chú ý transaction khi thao tác nhiều bảng
- Nếu dùng TypeORM: chú ý sync vs migration, mapping type

---

## 📝 Bài tập thực hành
- Cài đặt MySQL (local hoặc Docker), tạo DB demo
- Khởi tạo project Node.js + TypeScript + TypeORM, kết nối MySQL
- Định nghĩa entity Product, Category, tạo migration, CRUD Product qua API
- Viết seed script tạo dữ liệu mẫu
- Thử viết transaction chuyển stock giữa 2 product

---

## 🔗 Tham khảo / References
- [MySQL Official Docs](https://dev.mysql.com/doc/)
- [TypeORM Docs](https://typeorm.io/)
- [NestJS + TypeORM](https://docs.nestjs.com/techniques/database)
- [TypeORM Transaction](https://typeorm.io/transactions)
- [F8: MySQL cơ bản (Video tiếng Việt)](https://www.youtube.com/watch?v=7S_tz1z_5bA)
- [F8: TypeORM (Video tiếng Việt)](https://www.youtube.com/watch?v=6l8RWV8nN6g) 