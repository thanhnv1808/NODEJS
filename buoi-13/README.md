# 📚 Buổi 13: Authentication: JWT + Guard (NestJS)

## ❓ Câu hỏi mở đầu
- Làm sao để bảo vệ API, chỉ cho user đã đăng nhập truy cập?
- JWT là gì, tại sao phổ biến cho backend hiện đại?
- Guard trong NestJS giúp bảo vệ route như thế nào?

Have you ever wondered:
- How to protect your API so only logged-in users can access?
- What is JWT and why is it so popular for backend authentication?
- How do guards in NestJS help secure your routes?

---

## 1. 🔐 Authentication & JWT là gì?

- **Authentication**: Xác thực user (ai đang truy cập hệ thống?)
- **JWT (JSON Web Token)**: Chuẩn token hóa, mã hóa thông tin user, truyền qua header
- **Flow cơ bản**:
  1. User đăng nhập (POST /login)
  2. Server kiểm tra, trả về JWT
  3. Client gửi JWT ở header cho các request tiếp theo
  4. Server verify JWT, cho phép hoặc từ chối truy cập

### Ví dụ JWT payload
```json
{
  "sub": 1,
  "username": "alice",
  "role": "user",
  "iat": 1710000000,
  "exp": 1710003600
}
```

---

## 2. 🛡️ Guard trong NestJS

- **Guard**: Lớp bảo vệ, kiểm tra điều kiện trước khi cho vào controller (thường dùng cho auth, role)
- **CanActivate**: Interface chính, trả về true/false

### Ví dụ AuthGuard kiểm tra JWT
```typescript
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth) throw new UnauthorizedException('No token');
    const token = auth.replace('Bearer ', '');
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

---

## 3. ⚡ Ví dụ thực tế: Đăng ký, Đăng nhập, Bảo vệ route

### Đăng ký & Đăng nhập (tạo JWT)
```typescript
// auth.service.ts
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' })
    };
  }
}
```

### Bảo vệ route với guard
```typescript
// products.controller.ts
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Get('private')
getPrivateData() {
  return { message: 'This is protected data' };
}
```

---

## 💡 Tips thực tế khi dùng JWT + Guard
- Luôn lưu secret key ở biến môi trường (.env)
- Đặt expiresIn cho JWT, không để token sống mãi
- Không lưu thông tin nhạy cảm trong payload JWT
- Dùng HttpOnly cookie hoặc localStorage cho client (tùy use-case)
- Xử lý lỗi rõ ràng khi verify JWT
- Có thể custom guard cho role-based access (admin, user...)
- Test kỹ các case: thiếu token, token hết hạn, token sai

---

## 💡 Best Practice khi bảo mật JWT
- Luôn lưu secret key ở biến môi trường, không hardcode
- Định kỳ rotate (thay đổi) secret key nếu có thể
- Đặt expiresIn ngắn cho access token (5-15 phút), dùng refresh token cho login lâu dài
- Không lưu thông tin nhạy cảm (password, hash, ... ) trong payload JWT
- Kiểm tra blacklist/revoked token khi verify (để hỗ trợ logout, revoke)
- Chỉ truyền JWT qua HTTPS, không truyền qua HTTP
- Xử lý lỗi rõ ràng, không tiết lộ lý do chi tiết cho attacker
- Log các sự kiện bất thường (login fail, token invalid...)
- Test kỹ các case: token hết hạn, bị sửa, bị revoke, thiếu token

---

## 🌟 Ví dụ nâng cao: Refresh Token & Role-based Guard

### Refresh Token (giữ user đăng nhập lâu dài)
- Khi access token hết hạn, client gửi refresh token để lấy token mới
- Lưu refresh token ở DB, kiểm tra khi cấp lại access token

### Role-based Guard
```typescript
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('No permission');
    }
    return true;
  }
}
// Sử dụng: @UseGuards(new RolesGuard(['admin']))
```

---

## 🌟 Ví dụ nâng cao: Revoke Token (Logout an toàn)

### Cách làm phổ biến:
- Khi user logout hoặc bị khóa, lưu token/refresh token vào bảng blacklist trong DB
- Khi verify JWT, kiểm tra token có nằm trong blacklist không

```typescript
// auth.service.ts
async logout(token: string) {
  await this.tokenRepo.save({ token, revoked: true });
}

// auth.guard.ts
const isRevoked = await this.tokenRepo.findOne({ where: { token, revoked: true } });
if (isRevoked) throw new UnauthorizedException('Token revoked');
```

---

## 🌟 Bổ sung thực tế & nâng cao

### 1. Cấu hình Passport + JWT module
- NestJS hỗ trợ sẵn @nestjs/passport, @nestjs/jwt để triển khai JWT nhanh chóng.
```typescript
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
```

### 2. Custom decorator lấy user từ request
- Tạo decorator để lấy user đã verify từ guard:
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
// Sử dụng: @Get() getMe(@User() user) { ... }
```

### 3. Lưu token ở đâu trên client (cookie vs localStorage)
- **HttpOnly Cookie**: Bảo vệ khỏi XSS, nhưng cần CSRF protection.
- **localStorage**: Dễ dùng, nhưng dễ bị XSS tấn công.
- Tùy use-case, cân nhắc bảo mật khi lưu token trên client.

### 4. Refresh token best practice
- Lưu refresh token ở HttpOnly cookie hoặc DB.
- Khi cấp lại access token, nên rotate refresh token (tạo mới, vô hiệu hóa cái cũ).
- Có thể lưu refresh token hash trong DB để tăng bảo mật.

### 5. Cơ chế revoke token nâng cao
- Dùng Redis hoặc DB với TTL để lưu blacklist token.
- Có thể dùng JWT với short TTL, refresh liên tục, giảm nhu cầu revoke.

### 6. Tích hợp Swagger cho Auth
- Dùng @ApiBearerAuth() để tài liệu hóa route cần JWT:
```typescript
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Get('private')
getPrivateData() { ... }
```

### 7. Unit test cho guard/auth service
- Có thể dùng TestingModule để test guard, service:
```typescript
describe('AuthGuard', () => {
  it('should throw if no token', () => { /* ... */ });
  it('should pass if token valid', () => { /* ... */ });
});
```

---

## ✅ Checklist review bảo mật Auth/JWT
- [ ] Secret key lưu ở .env, không hardcode
- [ ] Token có expiresIn hợp lý, không để sống mãi
- [ ] Không lưu thông tin nhạy cảm trong payload
- [ ] Chỉ truyền JWT qua HTTPS
- [ ] Có cơ chế revoke/blacklist token khi logout hoặc bị khóa
- [ ] Test các case: hết hạn, sai, bị sửa, bị revoke
- [ ] Log sự kiện bất thường, cảnh báo brute-force
- [ ] Có tài liệu hướng dẫn sử dụng, rotate, revoke token

---

## 📝 Bài tập thực hành
- Cài đặt JWT cho project NestJS, tạo API đăng ký/đăng nhập trả về token
- Viết AuthGuard bảo vệ route, test các case thiếu/sai token
- Viết RolesGuard cho route chỉ cho admin truy cập
- Thử implement refresh token (nâng cao)

---

## 🔗 Tham khảo / References
- [NestJS Auth & JWT](https://docs.nestjs.com/security/authentication)
- [NestJS Guards](https://docs.nestjs.com/guards)
- [JWT.io](https://jwt.io/)
