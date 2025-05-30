# 2.Setup Node.js + TypeScript + ESLint + Prettier + Express

Năm 2025 rồi, còn code Node.js bằng JavaScript thì có hơi "cổ điển" 🥲
Trong vài năm trở lại đây, TypeScript gần như đã trở thành tiêu chuẩn khi làm việc với các dự án liên quan đến JavaScript — đặc biệt là với backend dùng Node.js. Việc bổ sung kiểu dữ liệu tĩnh, tự động gợi ý code, kiểm tra lỗi khi compile,... giúp TypeScript trở thành một công cụ không thể thiếu trong quá trình phát triển phần mềm hiện đại.

👉 Một khi bạn đã quen với TypeScript, bạn sẽ không muốn quay lại với JavaScript nữa đâu. Tin mình đi 😎

Vậy ESLint và Prettier là gì?
Khi làm việc trong team, việc tất cả mọi người tuân thủ cùng một chuẩn viết code là điều tối quan trọng. Nếu không, project sẽ trở nên rối rắm, khó đọc, khó review và dễ sinh lỗi.

Đây là lúc ESLint và Prettier phát huy tác dụng:

ESLint: kiểm tra và đảm bảo chất lượng code (linting rules).

Prettier: định dạng code tự động để code luôn đồng nhất, dễ đọc.

Trong dự án cá nhân, bạn có thể bỏ qua. Nhưng nếu làm việc nhóm hoặc muốn code chuyên nghiệp hơn, setup ESLint và Prettier là việc nên làm ngay từ đầu.

Trong bài viết này, mình sẽ hướng dẫn bạn:
Khởi tạo một dự án Node.js dùng TypeScript chuẩn chỉnh

Cài đặt và cấu hình ESLint + Prettier

Thiết lập cấu trúc thư mục dự án dễ mở rộng

Đảm bảo code sạch, chuẩn hóa và dễ maintain

Dù bạn là người mới học TypeScript hay là một developer lâu năm đang muốn chuẩn hóa quy trình phát triển, bài hướng dẫn này sẽ giúp bạn tiết kiệm rất nhiều thời gian và công sức.

## Cấu trúc thư mục dự án
Cấu trúc thư mục dự án mình sẽ sử dụng như sau:


📦 nodejs-typescript  
 ┣ 📂 dist  
 ┣ 📂 src  
 ┃ ┣ 📂 constants  
 ┃ ┃ ┣ 📜 enum.ts  
 ┃ ┃ ┣ 📜 httpStatus.ts  
 ┃ ┃ ┗ 📜 message.ts  
 ┃ ┣ 📂 controllers  
 ┃ ┃ ┗ 📜 users.controllers.ts  
 ┃ ┣ 📂 middlewares  
 ┃ ┃ ┣ 📜 error.middlewares.ts  
 ┃ ┃ ┣ 📜 file.middlewares.ts  
 ┃ ┃ ┣ 📜 users.middlewares.ts  
 ┃ ┃ ┗ 📜 validation.middlewares.ts  
 ┃ ┣ 📂 models  
 ┃ ┃ ┣ 📂 database  
 ┃ ┃ ┃ ┣ 📜 Blacklist.ts  
 ┃ ┃ ┃ ┣ 📜 Bookmark.ts  
 ┃ ┃ ┃ ┣ 📜 Follower.ts  
 ┃ ┃ ┃ ┣ 📜 Hashtag.ts  
 ┃ ┃ ┃ ┣ 📜 Like.ts  
 ┃ ┃ ┃ ┣ 📜 Media.ts  
 ┃ ┃ ┃ ┣ 📜 Tweet.ts  
 ┃ ┃ ┃ ┗ 📜 User.ts  
 ┃ ┃ ┣ 📜 Error.ts  
 ┃ ┃ ┗ 📜 Success.ts  
 ┃ ┣ 📂 routes  
 ┃ ┃ ┗ 📜 users.routes.ts  
 ┃ ┣ 📂 services  
 ┃ ┃ ┣ 📜 bookmarks.services.ts  
 ┃ ┃ ┣ 📜 database.services.ts  
 ┃ ┃ ┣ 📜 followers.services.ts  
 ┃ ┃ ┣ 📜 hashtags.services.ts  
 ┃ ┃ ┣ 📜 likes.services.ts  
 ┃ ┃ ┣ 📜 medias.services.ts  
 ┃ ┃ ┣ 📜 tweets.services.ts  
 ┃ ┃ ┗ 📜 users.services.ts  
 ┃ ┣ 📂 utils  
 ┃ ┃ ┣ 📜 crypto.ts  
 ┃ ┃ ┣ 📜 email.ts  
 ┃ ┃ ┣ 📜 file.ts  
 ┃ ┃ ┣ 📜 helpers.ts  
 ┃ ┃ ┗ 📜 jwt.ts  
 ┃ ┣ 📜 index.ts  
 ┃ ┗ 📜 type.d.ts  
 ┣ 📜 .editorconfig  
 ┣ 📜 .env  
 ┣ 📜 .eslintignore  
 ┣ 📜 .eslintrc  
 ┣ 📜 .gitignore  
 ┣ 📜 .prettierignore  
 ┣ 📜 .prettierrc  
 ┣ 📜 nodemon.json  
 ┣ 📜 package.json  
 ┣ 📜 tsconfig.json  
 ┗ 📜 yarn.lock  

### Giải thích các thư mục:

- **dist**: Thư mục chứa các file build
- **src**: Thư mục chứa mã nguồn
- **src/constants**: Chứa các file chứa các hằng số
- **src/middlewares**: Chứa các file chứa các hàm xử lý middleware, như validate, check token, ...
- **src/controllers**: Chứa các file nhận request, gọi đến service để xử lý logic nghiệp vụ, trả về response
- **src/services**: Chứa các file chứa method gọi đến database để xử lý logic nghiệp vụ
- **src/models**: Chứa các file chứa các model
- **src/routes**: Chứa các file chứa các route
- **src/utils**: Chứa các file chứa các hàm tiện ích, như mã hóa, gửi email, ...

Còn lại là những file config cho project như .eslintrc, .prettierrc, ... mình sẽ giới thiệu ở bên dưới
## Khởi tạo dự án
Đầu tiên chúng ta cần tạo folder để làm việc.

```bash
mkdir nodejs-typescript
cd nodejs-typescript
```

Tiếp theo, chúng ta sẽ setup dự án với package.json và thêm các dependencies cần thiết.

### Tạo dự án Node.js
Sử dụng -y khi chạy lệnh npm init khi tạo file package.json để không cần nhập các thông tin về project. Chúng ta có thể vào file package.json để chỉnh sửa sau.

```bash
npm init -y
```
### Thêm TypeScript như một dev dependency
Bước này chắc sẽ không bất ngờ lắm nhỉ, để sử dụng Typescript, chúng ta cần phải cài đặt nó trước.

```bash
npm install typescript --save-dev
```

Sau khi cài typescript, chúng ta có thể dùng TypeScript để biên dịch code bằng câu lệnh tsc (lưu ý là mình cài local (không phải global) nên muốn dùng tsc thì phải gián tiếp qua script trong package.json hoặc dùng trực tiếp thì npx tsc).

### Cài đặt kiểu dữ liệu TypeScript cho Node.js
Vì dùng TypeScript để code Node.js nên chúng ta cần cài thêm kiểu dữ liệu cho Node.js.

```bash
npm install @types/node --save-dev
```
### Cài đặt ESLint
Cứ theo doc ESLint mà "vả" thôi

```bash
npm init @eslint/config@latest
```

Khi chạy câu lệnh này nó sẽ cho bạn chọn một số option phù hợp, các bạn chọn theo mình dưới đây là được nhé:

Để ý cho mình cái bước Where does your code run, các bạn dùng phím cách trên bàn phím để bỏ đi Browser và chọn Node rồi enter nhé.

```
? How would you like to use ESLint? …
  To check syntax only
❯ To check syntax and find problems

? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
  React
  Vue.js
❯ None of these

? Does your project use TypeScript? …
  No
❯ Yes

? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
  Browser
✔ Node

The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
? Would you like to install them now? › No / Yes

? Which package manager do you want to use? …
❯ npm
  yarn
  pnpm
  bun
```

Kết quả chọn là như thế này nhé anh em:

```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · node
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
```

Sau khi chạy xong, nó sẽ tạo ra 1 file eslint.config.mjs trong thư mục gốc của dự án.

**eslint.config.mjs**

```javascript
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
```

và tự động cài một số package liên quan đến ESLint vào devDependencies trong package.json.

### Cài đặt các package config cần thiết còn lại
Chúng ta cần cài đặt các package config cần thiết để làm việc với TypeScript như ESLint, Prettier, ...

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier tsx tsc-alias rimraf nodemon --save-dev
```

- **prettier**: Code formatter chính
- **eslint-config-prettier**: Cấu hình ESLint để không bị xung đột với Prettier
- **eslint-plugin-prettier**: Dùng thêm một số rule prettier cho eslint
- **tsx**: Dùng để chạy TypeScript code trực tiếp mà không cần build
- **tsc-alias**: Xử lý alias khi build
- **rimraf**: Dùng để xóa folder dist khi trước khi build
- **nodemon**: Dùng để tự động restart server khi có sự thay đổi trong code
### Cấu hình tsconfig.json
Tạo file tsconfig.json tại thư mục root, có thể tạo bằng lệnh `touch tsconfig.json` hoặc cứ tạo bằng tay, quen cái nào thì dùng cái đấy.

Tiếp theo copy và paste cấu hình dưới đây vào file tsconfig.json của bạn:

```json
{
  "compilerOptions": {
    "module": "NodeNext", // Quy định output module được sử dụng
    "moduleResolution": "NodeNext",
    "target": "ES2023", // Target output cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
}
```

> 💡 **Mẹo**: Nếu muốn bỏ qua check lỗi khi build thì các bạn có thể thêm "noEmit": true vào file tsconfig.json nhé. Mà mình nghĩ không ai muốn làm vậy đâu, thế thì thà dùng JavaScript cho rồi 😂

### Cấu hình file config cho ESLint
Mở file eslint.config.mjs lên và thêm nội dung dưới đây.

Các bạn import cái này vào đầu file eslint.config.mjs:

```javascript
import eslintPluginPrettier from 'eslint-plugin-prettier'
```

Thêm đoạn này vào cuối cùng phần array export default:

```javascript
{
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
```

Cuối cùng chúng ta sẽ có file eslint.config.mjs như sau:

```javascript
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
```

> 💡 **Mẹo**: Anh em nhớ cài extension ESLint cho VS Code để nó hiểu được file này nhé

### Cấu hình file config cho Prettier
Tạo file .prettierrc trong thư mục root với nội dung dưới đây:

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

Mục đích là cấu hình prettier.

> 💡 **Mẹo**: Anh em nên cài Extension Prettier - Code formatter cho VS Code để nó hiểu nhé.

Tiếp theo tạo file .prettierignore ở thư mục root:

```
node_modules/
dist/
```

Mục đích là Prettier bỏ qua các file không cần thiết.
### Config editor để chuẩn hóa cấu hình editor
Tạo file .editorconfig ở thư mục root.

Mục đích là cấu hình các config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia.

Để VS Code hiểu được file này thì anh em cài Extension là EditorConfig for VS Code nhé.

```
[*]
indent_size = 2
indent_style = space
```
### Cấu hình file gitignore
Tạo file .gitignore ở thư mục root.

Mục đích là cấu hình các file không cần đẩy lên git:

```
node_modules/
dist/
```

### Cấu hình file nodemon.json
Tạo file nodemon.json ở thư mục root.

Mục đích là cấu hình nodemon để tự động restart server khi có sự thay đổi trong code:

```json
{
  "watch": ["src", ".env"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "tsx ./src/index.ts"
}
```
### Cấu hình file package.json
Mở file package.json lên, thêm đoạn script này vào:

```json
"scripts": {
  "dev": "npx nodemon",
  "build": "rimraf ./dist && tsc && tsc-alias",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prettier": "prettier --check .",
  "prettier:fix": "prettier --write ."
}
```
### Tạo file type.d.ts
Tạo file type.d.ts trong thư mục src, tạm thời bây giờ các bạn để trống cũng được. Mục đích là để defined các global type cho dự án.

Các bạn mở file tsconfig.json lên sẽ thấy dòng mình add file này vào để cho typescript nó nhận diện.

### Tạo file index.ts
Tạo file index.ts trong thư mục src:

```typescript
const name: string = 'Hello World'
console.log(name)
```

Bây giờ dùng các câu lệnh dưới để test thử nhé.

## Câu lệnh để chạy dự án
Đến đây là xong rồi đó. Các bạn có thể chạy dự án bằng các câu lệnh sau:

### Chạy dự án trong môi trường dev

```bash
npm run dev
```
### Build dự án TypeScript sang JavaScript cho production
Có thể các bạn sẽ hỏi rằng tại sao phải build, để nguyên TypeScript thì luôn vẫn được mà. Đúng vậy nhưng khi build thì chúng ta sẽ có những lợi ích sau:

- Code chạy được mà không cần cài đặt TypeScript
- Chạy nhanh hơn vì đã được biên dịch rồi
- Có thể minify code để giảm dung lượng
- Code chạy được trên những môi trường không hỗ trợ TypeScript

Để build thì chạy câu lệnh sau:

```bash
npm run build
```

Tiếp theo chạy câu lệnh sau để chạy dự án, lưu ý câu lệnh này đòi hỏi bạn phải build trước để có code trong thư mục dist:

```bash
npm run start
```
### Kiểm tra lỗi ESLint / Prettier bằng Terminal
Câu lệnh này sẽ giúp bạn kiểm tra lỗi ESLint trong dự án:

```bash
npm run lint
```

Nếu bạn muốn ESLint tự động fix lỗi thì chạy câu lệnh sau:

```bash
npm run lint:fix
```

Tương tự với Prettier, ta có câu lệnh:

```bash
npm run prettier
```

và

```bash
npm run prettier:fix
```
## Một số lưu ý

### Skip kiểm tra lỗi TypeScript khi build
Chỉ cần vào package.json sửa lại script build như sau:

```json
"build": "rimraf ./dist && tsc --noCheck && tsc-alias",
```

### Lưu ý cài thêm gói @types/ten-thu-vien nếu cần
Vì đây là dự án chạy với Typescript nên khi cài đặt bất cứ một thư viện này chúng ta nên xem thư viện đó có hỗ trợ TypeScript không nhé. Có một số thư viện ở npm hỗ trợ TypeScript sẵn, có một số thì chúng ta phải cài thêm bộ TypeScript của chúng qua @types/ten-thu-vien.

Ví dụ như express thì chúng ta cài như sau:

```bash
npm i express
npm i @types/express -D
```

Chúc các bạn học vui vẻ.

Thank me later 🤪

# 📘 Bài Tập

## 🎯 Mục tiêu
- Làm quen với cấu trúc dự án Node.js hiện đại.
- Cấu hình TypeScript, ESLint, Prettier.
- Viết ứng dụng Express đầu tiên với cấu trúc tách riêng thư mục.

## 📝 Yêu Cầu

### 1. Tạo mới một project Node.js + TypeScript
- Tên thư mục: `nodejs-ts-express-boilerplate`
- Khởi tạo bằng lệnh:
  ```bash
  npm init -y
  ```
- Cài đặt các package:
  ```bash
  npm install express
  npm install -D typescript ts-node @types/node @types/express \
    eslint prettier eslint-plugin-prettier eslint-config-prettier \
    nodemon rimraf
  ```

### 2. Cấu hình đầy đủ
- `tsconfig.json`: cấu hình chuẩn như buổi học.
- `.eslintrc.json`, `.prettierrc`: cấu hình chuẩn, tương thích với TypeScript.
- Scripts trong `package.json`:
  ```json
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "rimraf dist && tsc",
    "start": "node dist/index.js",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write ."
  }
  ```

### 3. Tạo cấu trúc thư mục như sau:
```
src/
├── index.ts
├── routes/
│   └── user.route.ts
├── controllers/
│   └── user.controller.ts
├── services/
│   └── user.service.ts
```

### 4. Tạo route GET /users
Trả về danh sách người dùng (hardcode):
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

### 5. 🎁 Bonus (optional)
- Tạo thêm POST /users
- Nhận name từ req.body.
- Trả về user vừa tạo (tạm lưu trong biến cục bộ).

## ✅ Kết Quả Mong Đợi
- Truy cập http://localhost:3000/users trả về dữ liệu JSON như trên.
- Các lệnh `npm run lint` và `npm run format` chạy không lỗi.
- Cấu trúc thư mục rõ ràng, dễ bảo trì, chuẩn RESTful.

## 📤 Nộp Bài
- Đẩy source code lên GitHub (private hoặc public).
- Gửi link GitHub cho mentor hoặc giảng viên phụ trách.

