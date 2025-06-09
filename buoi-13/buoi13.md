# Buổi 13: Authentication: JWT + Guard (NestJS)

<!-- Page 1 -->
- Authentication: Xác thực user, bảo vệ API.
- JWT: Token hóa thông tin user, truyền qua header.
- Guard: Bảo vệ route, kiểm tra điều kiện trước khi vào controller.

---

<!-- Page 2 -->
## Câu hỏi mở đầu
- Làm sao để bảo vệ API, chỉ cho user đã đăng nhập truy cập?
- JWT là gì, tại sao phổ biến cho backend hiện đại?
- Guard trong NestJS giúp bảo vệ route như thế nào?

---

<!-- Page 3 -->
## Authentication & JWT là gì?
- Authentication: Xác thực user (ai đang truy cập?).
- JWT: Token chuẩn, mã hóa thông tin user, truyền qua header.
- Flow: Đăng nhập → Server trả JWT → Client gửi JWT cho các request → Server verify JWT.
- Ví dụ JWT payload:
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

<!-- Page 4 -->
## Guard trong NestJS
- Guard: Lớp bảo vệ, kiểm tra điều kiện trước khi vào controller.
- CanActivate: Interface chính, trả về true/false.
- Ví dụ AuthGuard kiểm tra JWT:
```typescript
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
```

---

<!-- Page 5 -->
## Đăng ký, Đăng nhập, Bảo vệ route
- Đăng nhập trả về JWT:
```typescript
async login(user: any) {
  const payload = { sub: user.id, username: user.username, role: user.role };
  return { access_token: this.jwtService.sign(payload, { expiresIn: '1h' }) };
}
```
- Bảo vệ route với guard:
```typescript
@UseGuards(AuthGuard)
@Get('private')
getPrivateData() { return { message: 'This is protected data' }; }
```

---

<!-- Page 6 -->
## Tips thực tế khi dùng JWT + Guard
- Luôn lưu secret key ở biến môi trường (.env)
- Đặt expiresIn cho JWT, không để token sống mãi
- Không lưu thông tin nhạy cảm trong payload JWT
- Dùng HttpOnly cookie hoặc localStorage cho client (tùy use-case)
- Xử lý lỗi rõ ràng khi verify JWT
- Có thể custom guard cho role-based access (admin, user...)
- Test kỹ các case: thiếu token, token hết hạn, token sai

---

<!-- Page 7 -->
## Best Practice khi bảo mật JWT
- Secret key ở .env, không hardcode
- Định kỳ rotate secret key nếu có thể
- expiresIn ngắn cho access token (5-15 phút), dùng refresh token cho login lâu dài
- Không lưu thông tin nhạy cảm trong payload
- Kiểm tra blacklist/revoked token khi verify
- Chỉ truyền JWT qua HTTPS
- Xử lý lỗi rõ ràng, không tiết lộ lý do chi tiết
- Log các sự kiện bất thường
- Test kỹ các case: token hết hạn, bị sửa, bị revoke, thiếu token

---

<!-- Page 8 -->
## Ví dụ nâng cao: Refresh Token & Role-based Guard
- Refresh Token: Giữ user đăng nhập lâu dài, lưu refresh token ở DB, kiểm tra khi cấp lại access token.
- Role-based Guard:
```typescript
canActivate(context: ExecutionContext): boolean {
  const user = context.switchToHttp().getRequest().user;
  if (!user || !this.allowedRoles.includes(user.role)) throw new ForbiddenException('No permission');
  return true;
}
```

---

<!-- Page 9 -->
## Ví dụ nâng cao: Revoke Token (Logout an toàn)
- Khi logout hoặc bị khóa, lưu token vào blacklist (DB/Redis).
- Khi verify JWT, kiểm tra token có nằm trong blacklist không.
```typescript
async logout(token: string) { await this.tokenRepo.save({ token, revoked: true }); }
const isRevoked = await this.tokenRepo.findOne({ where: { token, revoked: true } });
if (isRevoked) throw new UnauthorizedException('Token revoked');
```

---

<!-- Page 10 -->
## Bổ sung thực tế & nâng cao
- Cấu hình Passport + JWT module:
```typescript
JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } })
```
- Custom decorator lấy user từ request:
```typescript
export const User = createParamDecorator((data, ctx) => ctx.switchToHttp().getRequest().user);
```
- Lưu token ở đâu trên client: HttpOnly cookie (an toàn hơn), localStorage (dễ bị XSS).
- Refresh token best practice: Lưu ở HttpOnly cookie hoặc DB, rotate refresh token, lưu hash.
- Cơ chế revoke nâng cao: Dùng Redis/DB với TTL, JWT short TTL, refresh liên tục.
- Tích hợp Swagger cho Auth:
```typescript
@ApiBearerAuth()
@UseGuards(AuthGuard)
```
- Unit test cho guard/auth service:
```typescript
describe('AuthGuard', () => { it('should throw if no token', () => { /* ... */ }); });
```

---

<!-- Page 11 -->
## Checklist review bảo mật Auth/JWT
- [ ] Secret key lưu ở .env, không hardcode
- [ ] Token có expiresIn hợp lý, không để sống mãi
- [ ] Không lưu thông tin nhạy cảm trong payload
- [ ] Chỉ truyền JWT qua HTTPS
- [ ] Có cơ chế revoke/blacklist token khi logout hoặc bị khóa
- [ ] Test các case: hết hạn, sai, bị sửa, bị revoke
- [ ] Log sự kiện bất thường, cảnh báo brute-force
- [ ] Có tài liệu hướng dẫn sử dụng, rotate, revoke token

---

<!-- Page 12 -->
## Bài tập thực hành
- Cài đặt JWT cho project NestJS, tạo API đăng ký/đăng nhập trả về token
- Viết AuthGuard bảo vệ route, test các case thiếu/sai token
- Viết RolesGuard cho route chỉ cho admin truy cập
- Thử implement refresh token (nâng cao)

---

<!-- Page 13 -->
## Tham khảo
- https://docs.nestjs.com/security/authentication
- https://docs.nestjs.com/guards
- https://jwt.io/
- https://www.youtube.com/watch?v=2jqok-WgelI (F8 JWT & Auth) 