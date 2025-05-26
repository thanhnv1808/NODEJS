# 📚 Buổi 2: Vòng lặp, Hàm, Mảng cơ bản

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Vòng lặp**: `for`, `while`, `do-while`, `for...in`, `for...of`, `forEach`
- **Hàm**: function declaration, function expression, arrow function, parameters, return
- **Mảng cơ bản**: tạo mảng, truy cập phần tử, các method cơ bản như `push`, `pop`, `map`, `filter`

## 📖 Nội dung chi tiết

### 1. 🔄 Vòng lặp (Loops)

#### 1.1 For Loop
```javascript
// Cú pháp cơ bản
for (let i = 0; i < 5; i++) {
    console.log(`Lần lặp thứ ${i + 1}`);
}

// Ví dụ thực tế: Tính tổng từ 1 đến n
function calculateSum(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(calculateSum(10)); // 55
```

#### 1.2 While Loop
```javascript
// While loop - kiểm tra điều kiện trước khi thực hiện
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// Ví dụ: Tìm số nguyên tố đầu tiên lớn hơn n
function findNextPrime(n) {
    let candidate = n + 1;
    while (!isPrime(candidate)) {
        candidate++;
    }
    return candidate;
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
```

#### 1.3 Do-While Loop
```javascript
// Do-while loop - thực hiện ít nhất 1 lần
let userInput;
do {
    userInput = prompt("Nhập số từ 1-10:");
} while (userInput < 1 || userInput > 10);

console.log(`Bạn đã nhập: ${userInput}`);
```

#### 1.4 For...in và For...of
```javascript
// For...in - lặp qua keys của object
const student = {
    name: "John",
    age: 20,
    grade: "A"
};

for (let key in student) {
    console.log(`${key}: ${student[key]}`);
}

// For...of - lặp qua values của iterable
const fruits = ["apple", "banana", "orange"];

for (let fruit of fruits) {
    console.log(`Tôi thích ${fruit}`);
}
```

### 2. 🔧 Hàm (Functions)

#### 2.1 Function Declaration
```javascript
// Khai báo hàm truyền thống
function greetUser(userName, userAge = 18) {
    return `Xin chào ${userName}, bạn ${userAge} tuổi!`;
}

// Hoisting - có thể gọi trước khi khai báo
console.log(sayHello("World")); // "Hello, World!"

function sayHello(name) {
    return `Hello, ${name}!`;
}
```

#### 2.2 Function Expression
```javascript
// Function expression - không có hoisting
const calculateArea = function(width, height) {
    return width * height;
};

// Anonymous function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
    return num * 2;
});
```

#### 2.3 Arrow Function (ES6)
```javascript
// Arrow function cơ bản
const addNumbers = (a, b) => a + b;

// Arrow function với body
const processUserData = (userData) => {
    const processedData = {
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`,
        isAdult: userData.age >= 18
    };
    return processedData;
};

// Arrow function với một parameter
const squareNumber = num => num * num;

// Arrow function không parameter
const getCurrentTime = () => new Date().toLocaleString();
```

#### 2.4 Parameters và Arguments
```javascript
// Default parameters
function createUser(userName, userRole = "user", isActive = true) {
    return {
        name: userName,
        role: userRole,
        active: isActive,
        createdAt: new Date()
    };
}

// Rest parameters
function calculateTotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}

console.log(calculateTotal(10, 20, 30, 40)); // 100

// Destructuring parameters
function displayUserInfo({name, age, email}) {
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`Email: ${email}`);
}

const user = {name: "John", age: 25, email: "john@email.com"};
displayUserInfo(user);
```

### 3. 📊 Mảng cơ bản (Basic Arrays)

#### 3.1 Tạo và truy cập mảng
```javascript
// Tạo mảng
const emptyArray = [];
const numberArray = [1, 2, 3, 4, 5];
const mixedArray = ["hello", 42, true, null];
const arrayFromConstructor = new Array(5); // [empty × 5]

// Truy cập phần tử
console.log(numberArray[0]);    // 1 (phần tử đầu)
console.log(numberArray[-1]);   // undefined (không hỗ trợ negative index)
console.log(numberArray[numberArray.length - 1]); // 5 (phần tử cuối)

// Thuộc tính length
console.log(numberArray.length); // 5
```

#### 3.2 Thêm và xóa phần tử
```javascript
const fruits = ["apple", "banana"];

// Thêm vào cuối
fruits.push("orange");          // ["apple", "banana", "orange"]
fruits.push("grape", "mango");  // ["apple", "banana", "orange", "grape", "mango"]

// Xóa từ cuối
const lastFruit = fruits.pop(); // "mango", fruits = ["apple", "banana", "orange", "grape"]

// Thêm vào đầu
fruits.unshift("strawberry");   // ["strawberry", "apple", "banana", "orange", "grape"]

// Xóa từ đầu
const firstFruit = fruits.shift(); // "strawberry", fruits = ["apple", "banana", "orange", "grape"]
```

#### 3.3 Array Methods cơ bản
```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - tạo mảng mới với mỗi phần tử được transform
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// filter() - tạo mảng mới với các phần tử thỏa mãn điều kiện
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// find() - tìm phần tử đầu tiên thỏa mãn điều kiện
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 2

// includes() - kiểm tra mảng có chứa phần tử không
console.log(numbers.includes(3)); // true
console.log(numbers.includes(6)); // false

// indexOf() - tìm vị trí của phần tử
console.log(numbers.indexOf(3)); // 2
console.log(numbers.indexOf(6)); // -1 (không tìm thấy)
```

#### 3.4 Lặp qua mảng
```javascript
const students = ["An", "Bình", "Cường", "Dung"];

// forEach() - lặp qua từng phần tử
students.forEach((student, index) => {
    console.log(`${index + 1}. ${student}`);
});

// for...of - lặp qua values
for (let student of students) {
    console.log(`Học sinh: ${student}`);
}

// for...in - lặp qua indexes (không khuyến khích cho array)
for (let index in students) {
    console.log(`Index ${index}: ${students[index]}`);
}

// Traditional for loop
for (let i = 0; i < students.length; i++) {
    console.log(`${i}: ${students[i]}`);
}
```

## 🎯 Bài tập thực hành

### Exercise 1: Tính tổng số chẵn
Viết hàm tính tổng các số chẵn từ 1 đến n.

### Exercise 2: Kiểm tra số nguyên tố
Viết hàm kiểm tra một số có phải số nguyên tố không.

### Exercise 3: Quản lý danh sách học sinh
Tạo hệ thống quản lý học sinh với các chức năng thêm, xóa, tìm kiếm.

## 💡 Tips và Best Practices

1. **Sử dụng `for...of` cho arrays**, `for...in` cho objects
2. **Arrow functions** ngắn gọn nhưng không có `this` binding
3. **Array methods** như `map`, `filter` tốt hơn traditional loops
4. **Đặt tên hàm rõ ràng**: `calculateUserAge()` thay vì `calc()`
5. **Sử dụng default parameters** thay vì kiểm tra undefined

## 🔗 Tài liệu tham khảo

### 📚 Tài liệu chính thức
- [MDN - Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### 🎥 Video tutorials
- [JavaScript Loops - freeCodeCamp](https://www.youtube.com/watch?v=s9wW2PpJsmQ)
- [JavaScript Functions - Programming with Mosh](https://www.youtube.com/watch?v=N8ap4k_1QEQ)
- [JavaScript Arrays - The Net Ninja](https://www.youtube.com/watch?v=7W4pQQ20nJg)

### 📖 Bài viết hay
- [JavaScript Loops Explained](https://www.freecodecamp.org/news/javascript-loops-explained-for-loop-for/)
- [JavaScript Functions Guide](https://javascript.info/function-basics)
- [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- [Arrow Functions vs Regular Functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)

### 🛠️ Tools hữu ích
- [JavaScript Array Explorer](https://arrayexplorer.netlify.app/) - Find the right array method
- [JS Function Visualizer](https://ui.dev/javascript-visualizer/) - Visualize function execution
- [Repl.it](https://replit.com/) - Online JavaScript playground

---

## ➡️ Buổi tiếp theo
**Buổi 3**: Object, Scope, Callback, JSON
