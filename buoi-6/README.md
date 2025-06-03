# 📚 Buổi 6: Node.js + Setup Project (TypeScript, ESLint, Prettier)

## 💡 Vì sao nên dùng TypeScript, ESLint, Prettier?

**TypeScript** giúp code an toàn hơn nhờ kiểm tra kiểu dữ liệu tĩnh, tự động gợi ý code, phát hiện lỗi khi biên dịch. Khi đã quen với TypeScript, bạn sẽ thấy code JavaScript truyền thống rất dễ lỗi và khó bảo trì!

_TypeScript brings static typing, better code suggestion, and compile-time error checking. Once you get used to it, you won't want to go back to plain JavaScript!_

**ESLint** giúp phát hiện lỗi, enforce coding standards, giữ code sạch và đồng nhất trong team.

**Prettier** tự động format code, giúp mọi người trong team có style code giống nhau, dễ đọc, dễ review.

> "Code đẹp, sạch, chuẩn hóa từ đầu sẽ giúp dự án dễ mở rộng, dễ bảo trì và tiết kiệm thời gian fix bug về sau!"

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Node.js**: Tổng quan, môi trường thực thi JavaScript phía server
- **TypeScript**: Cài đặt, cấu hình cơ bản cho project Node.js
- **ESLint & Prettier**: Giữ code sạch, chuẩn hóa style
- **Khởi tạo project Express với TypeScript**

---

## 1. 🌐 Node.js là gì? (What is Node.js?)

**Node.js** là môi trường chạy JavaScript phía server, giúp xây dựng ứng dụng backend hiệu quả.

Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing you to run JS on the server.

### Ưu điểm (Advantages)
- Hiệu năng cao (non-blocking I/O)
- Sử dụng JavaScript cả frontend & backend
- Hệ sinh thái npm lớn

### Kiểm tra cài đặt Node.js
```bash
node -v
npm -v
```

---

## 2. 🛠️ Khởi tạo project Node.js với TypeScript

### Bước 1: Tạo thư mục và khởi tạo npm
```bash
mkdir my-ts-app
cd my-ts-app
npm init -y
```

### Bước 2: Cài đặt TypeScript và types
```bash
npm install typescript ts-node @types/node --save-dev
```

### Bước 3: Tạo file cấu hình TypeScript
```bash
tsconfig.json
```
Ví dụ cấu hình cơ bản:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Bước 4: Tạo file code đầu tiên
```javascript
// src/index.ts
console.log("Hello from TypeScript!");
```

### Bước 5: Chạy thử code TypeScript
```bash
npx ts-node src/index.ts
```

---

## 3. 🚦 Cài đặt ESLint & Prettier cho TypeScript

**ESLint** giúp phát hiện lỗi code, **Prettier** giúp format code tự động.

### Cài đặt ESLint & Prettier
```bash
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

### Khởi tạo cấu hình ESLint
```bash
npx eslint --init
```
Chọn:
- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- TypeScript
- Node
- Use a popular style guide (Airbnb, Standard, v.v.) hoặc tự chọn
- JSON format

### Ví dụ file .eslintrc.json
```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### Thêm script vào package.json
```json
"scripts": {
  "lint": "eslint 'src/**/*.ts'",
  "format": "prettier --write 'src/**/*.ts'"
}
```

---

## 4. ⚡ Khởi tạo project Express với TypeScript

### Cài đặt Express và types
```bash
npm install express
npm install @types/express --save-dev
```

### Tạo file server cơ bản
```typescript
// src/server.ts
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/hello', (req, res) => {
  res.send('Hello, Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### Chạy thử server
```bash
npx ts-node src/server.ts
```

---

## 5. 📝 Bài tập nhỏ
- Tự khởi tạo một project Node.js + TypeScript, tạo endpoint `/hello` trả về JSON `{ message: "Hello, TypeScript!" }`
- Thử cấu hình ESLint/Prettier và fix warning nếu có

---

## 🔗 Tham khảo / References
- [Node.js Official](https://nodejs.org/en/docs) — Tài liệu Node.js
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — Hướng dẫn TypeScript
- [Express + TypeScript Starter](https://expressjs.com/en/advanced/best-practice-performance.html#use-typescript) — Express với TypeScript
- [ESLint for TypeScript](https://typescript-eslint.io/) — Cấu hình ESLint cho TypeScript
- [Prettier](https://prettier.io/docs/en/index.html) — Tài liệu Prettier
- [F8: Node.js là gì? (Video tiếng Việt)](https://www.youtube.com/watch?v=U4ogK0MIzqk)
- [F8: TypeScript cơ bản (Video tiếng Việt)](https://www.youtube.com/watch?v=G0jO8kUrg-I) 