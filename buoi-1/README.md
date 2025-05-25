# 📚 Buổi 1: Biến, Kiểu dữ liệu, Toán tử, Câu lệnh điều kiện

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Biến**: `var`, `let`, `const` và sự khác biệt
- **Kiểu dữ liệu**: primitive types và reference types
- **Toán tử**: arithmetic, comparison, logical, assignment
- **Câu lệnh điều kiện**: `if/else`, `switch/case`, ternary operator

## 📖 Nội dung chi tiết

### 1. 🔤 Biến (Variables)

#### 1.1 Khai báo biến
```javascript
// var - function scoped, có thể redeclare
var name = "John";
var name = "Jane"; // OK

// let - block scoped, không thể redeclare
let age = 25;
// let age = 30; // Error!

// const - block scoped, không thể reassign
const PI = 3.14159;
// PI = 3.14; // Error!
```

#### 1.2 Sự khác biệt quan trọng
| Từ khóa | Scope | Hoisting | Redeclare | Reassign |
|---------|-------|----------|-----------|----------|
| `var` | Function | Yes (undefined) | ✅ | ✅ |
| `let` | Block | Yes (TDZ) | ❌ | ✅ |
| `const` | Block | Yes (TDZ) | ❌ | ❌ |

### 2. 📊 Kiểu dữ liệu (Data Types)

#### 2.1 Primitive Types
```javascript
// Number
let score = 100;
let price = 99.99;
let negative = -50;

// String
let firstName = "John";
let lastName = 'Doe';
let fullName = `${firstName} ${lastName}`; // Template literal

// Boolean
let isActive = true;
let isCompleted = false;

// Undefined
let data; // undefined
let result = undefined;

// Null
let user = null;

// Symbol (ES6)
let id = Symbol('id');

// BigInt (ES2020)
let bigNumber = 123456789012345678901234567890n;
```

#### 2.2 Reference Types
```javascript
// Object
let person = {
    name: "John",
    age: 30,
    isStudent: false
};

// Array
let numbers = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "orange"];

// Function
function greet(name) {
    return `Hello, ${name}!`;
}
```

#### 2.3 Kiểm tra kiểu dữ liệu
```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (quirk!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"

// Kiểm tra Array
console.log(Array.isArray([])); // true
```

### 3. ➕ Toán tử (Operators)

#### 3.1 Toán tử số học (Arithmetic)
```javascript
let a = 10, b = 3;

console.log(a + b);  // 13 - Cộng
console.log(a - b);  // 7  - Trừ
console.log(a * b);  // 30 - Nhân
console.log(a / b);  // 3.333... - Chia
console.log(a % b);  // 1  - Chia lấy dư
console.log(a ** b); // 1000 - Lũy thừa (ES2016)

// Increment/Decrement
let count = 5;
console.log(++count); // 6 (pre-increment)
console.log(count++); // 6 (post-increment)
console.log(count);   // 7
```

#### 3.2 Toán tử so sánh (Comparison)
```javascript
let x = 5, y = "5";

// So sánh giá trị
console.log(x == y);   // true (type coercion)
console.log(x === y);  // false (strict equality)
console.log(x != y);   // false
console.log(x !== y);  // true

// So sánh thứ tự
console.log(x > 3);    // true
console.log(x < 10);   // true
console.log(x >= 5);   // true
console.log(x <= 4);   // false
```

#### 3.3 Toán tử logic (Logical)
```javascript
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin); // false (AND)
console.log(isLoggedIn || isAdmin); // true (OR)
console.log(!isLoggedIn);           // false (NOT)

// Short-circuit evaluation
let user = null;
let name = user && user.name; // undefined (không lỗi)
let defaultName = name || "Guest"; // "Guest"
```

#### 3.4 Toán tử gán (Assignment)
```javascript
let num = 10;

num += 5;  // num = num + 5 → 15
num -= 3;  // num = num - 3 → 12
num *= 2;  // num = num * 2 → 24
num /= 4;  // num = num / 4 → 6
num %= 4;  // num = num % 4 → 2
```

### 4. 🔀 Câu lệnh điều kiện (Conditional Statements)

#### 4.1 If/Else Statement
```javascript
let score = 85;

if (score >= 90) {
    console.log("Xuất sắc");
} else if (score >= 80) {
    console.log("Giỏi");
} else if (score >= 70) {
    console.log("Khá");
} else if (score >= 60) {
    console.log("Trung bình");
} else {
    console.log("Yếu");
}
```

#### 4.2 Switch/Case Statement
```javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Thứ 2";
        break;
    case 2:
        dayName = "Thứ 3";
        break;
    case 3:
        dayName = "Thứ 4";
        break;
    case 4:
        dayName = "Thứ 5";
        break;
    case 5:
        dayName = "Thứ 6";
        break;
    case 6:
        dayName = "Thứ 7";
        break;
    case 7:
        dayName = "Chủ nhật";
        break;
    default:
        dayName = "Không hợp lệ";
}

console.log(dayName); // "Thứ 4"
```

#### 4.3 Ternary Operator
```javascript
let age = 18;

// Cách viết dài
let status;
if (age >= 18) {
    status = "Người lớn";
} else {
    status = "Trẻ em";
}

// Cách viết ngắn với ternary
let status2 = age >= 18 ? "Người lớn" : "Trẻ em";

// Nested ternary (nên tránh)
let category = age >= 18 ? (age >= 65 ? "Cao tuổi" : "Người lớn") : "Trẻ em";
```

## 🎯 Practical Exercises

### Exercise 1: Check Divisibility
Write a program to check if a number is divisible by 3 and 5.

### Exercise 2: Find Maximum Number
Write a program to find the largest number among three numbers.

### Exercise 3: Grade Classification
Write a program to classify academic performance based on scores.

## 💡 Tips và Best Practices

1. **Luôn dùng `const`** trước, chỉ dùng `let` khi cần reassign
2. **Tránh dùng `var`** trong code hiện đại
3. **Dùng `===` thay vì `==`** để tránh type coercion
4. **Đặt tên biến có ý nghĩa**: `userName` thay vì `u`
5. **Sử dụng template literals** cho string interpolation

## 🔗 Tài liệu tham khảo

### 📚 Tài liệu chính thức
- [MDN - JavaScript Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variables)
- [MDN - JavaScript Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN - JavaScript Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [MDN - Conditional Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

### 🎥 Video tutorials
- [JavaScript Variables - freeCodeCamp](https://www.youtube.com/watch?v=9WIJQDvt4Us)
- [JavaScript Data Types - Programming with Mosh](https://www.youtube.com/watch?v=W6NZfCO5SIk)

### 📖 Bài viết hay
- [JavaScript Variables: var, let, const](https://javascript.info/variables)
- [JavaScript Data Types Explained](https://www.freecodecamp.org/news/javascript-data-types-typeof-explained/)
- [JavaScript Operators Guide](https://www.w3schools.com/js/js_operators.asp)

### 🛠️ Tools hữu ích
- [JavaScript Visualizer](https://ui.dev/javascript-visualizer/) - Visualize code execution
- [JS Bin](https://jsbin.com/) - Online JavaScript editor
- [CodePen](https://codepen.io/) - Frontend playground

---

## ➡️ Buổi tiếp theo
**Buổi 2**: Vòng lặp, Hàm, Mảng cơ bản
