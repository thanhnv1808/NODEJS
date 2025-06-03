# 📚 Buổi 5: Promise, Async/Await, Module hóa code

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Promise**: Khái niệm, cách sử dụng, xử lý bất đồng bộ (asynchronous)
- **Async/Await**: Cú pháp hiện đại, code bất đồng bộ dễ đọc hơn
- **Module hóa code**: import/export, tách file, tái sử dụng code

---

## 1. 🔮 Promise là gì? (What is a Promise?)

**Promise** là một đối tượng đại diện cho một thao tác bất đồng bộ (asynchronous operation) sẽ hoàn thành trong tương lai (future value).

A Promise represents a value which may be available now, or in the future, or never.

### Trạng thái của Promise (Promise States)
- `pending`: Đang chờ xử lý
- `fulfilled`: Thành công (resolved)
- `rejected`: Thất bại (error)

### Ví dụ tạo Promise cơ bản
```javascript
// Create a new Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Data loaded successfully!");
        } else {
            reject("Error loading data!");
        }
    }, 1000);
});

// Consume the Promise
myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });
```
**Giải thích:**
- `resolve()` sẽ gọi khi thành công, `reject()` khi thất bại.
- `.then()` dùng để xử lý khi Promise thành công, `.catch()` cho lỗi.

### Bài tập nhỏ
- Tạo một Promise kiểm tra số chẵn/lẻ (even/odd) với số nhập vào. Nếu chẵn resolve, nếu lẻ reject.

---

## 2. ⏳ Async/Await

**Async/Await** là cú pháp giúp viết code bất đồng bộ (asynchronous) trông giống code đồng bộ (synchronous), dễ đọc hơn.

Async/Await makes asynchronous code look and behave a little more like synchronous code.

### Ví dụ chuyển từ Promise sang async/await
```javascript
// Promise style
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data from server"), 1000);
    });
}

fetchData().then(data => {
    console.log("Promise:", data);
});

// Async/Await style
async function getData() {
    const data = await fetchData();
    console.log("Async/Await:", data);
}

getData();
```
**Giải thích:**
- Hàm có `async` sẽ luôn trả về Promise.
- Dùng `await` để "đợi" kết quả Promise, chỉ dùng được trong hàm async.

### Xử lý lỗi với async/await
```javascript
async function getUser() {
    try {
        const user = await fetchUserFromAPI();
        console.log(user);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

### Bài tập nhỏ
- Viết hàm async nhận vào một số, trả về bình phương sau 1 giây (dùng Promise + await).

---

## 3. 📦 Module hóa code (Code Modularization)

**Module** giúp chia nhỏ chương trình thành các phần (file) riêng biệt, dễ quản lý, tái sử dụng.

Module helps you split your code into separate files for better organization and reusability.

### ES6 Module: import/export

#### Tạo module (export)
```javascript
// file: mathUtils.js
export function add(a, b) {
    return a + b;
}

export const PI = 3.14159;
```

#### Sử dụng module (import)
```javascript
// file: app.js
import { add, PI } from './mathUtils.js';

console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159
```

#### Export default
```javascript
// file: greet.js
export default function greet(name) {
    return `Hello, ${name}!`;
}

// file: app.js
import greet from './greet.js';
console.log(greet("Alice"));
```

### So sánh với CommonJS (Node.js)
- CommonJS: `module.exports` và `require()` (dùng nhiều trong Node.js cũ)
- ES6 Module: `export` và `import` (chuẩn hiện đại, dùng được cả frontend/backend)

### Bài tập nhỏ
- Tạo 2 file: `calculator.js` (export các hàm add, subtract, multiply, divide), `main.js` (import và sử dụng các hàm này).

---

## 📝 Tổng kết
- Promise và async/await giúp xử lý bất đồng bộ dễ dàng hơn.
- Module hóa code giúp chương trình rõ ràng, dễ bảo trì.
- Practice: Hãy làm các bài tập nhỏ để hiểu sâu hơn!

---

## 🔗 Tham khảo / References

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — Tổng quan về Promise (English)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) — Hướng dẫn async/await (English)
- [MDN: ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — Giới thiệu module hóa code (English)
- [JavaScript.info: Promise](https://javascript.info/promise-basics) — Promise cơ bản (English)
- [JavaScript.info: Async/await](https://javascript.info/async-await) — Giải thích async/await (English)
- [F8: Promise là gì? (Video tiếng Việt)](https://www.youtube.com/watch?v=DnD_ql5w7_A)
- [F8: Async/Await là gì? (Video tiếng Việt)](https://www.youtube.com/watch?v=VvK1a8b6FYA) 