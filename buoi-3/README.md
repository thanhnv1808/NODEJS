# 📚 Buổi 3: Object, Scope, Callback, JSON

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Object**: tạo object, truy cập thuộc tính, methods, object destructuring
- **Scope**: global scope, function scope, block scope, hoisting, closure
- **Callback**: callback functions, higher-order functions, callback hell
- **JSON**: JSON.parse(), JSON.stringify(), làm việc với API data

## 📖 Nội dung chi tiết

### 1. 🏗️ Object (Đối tượng)

#### 1.1 Tạo và truy cập Object
```javascript
// Tạo object literal
const user = {
    name: "John Doe",
    age: 25,
    email: "john@example.com",
    isActive: true
};

// Truy cập thuộc tính
console.log(user.name);        // "John Doe" - dot notation
console.log(user["email"]);    // "john@example.com" - bracket notation

// Thêm thuộc tính mới
user.phone = "0123456789";
user["address"] = "123 Main St";

// Xóa thuộc tính
delete user.isActive;
```

#### 1.2 Object Methods
```javascript
const calculator = {
    result: 0,
    
    // Method shorthand (ES6)
    add(number) {
        this.result += number;
        return this;
    },
    
    // Traditional method
    subtract: function(number) {
        this.result -= number;
        return this;
    },
    
    // Arrow function (không có this binding)
    multiply: (number) => {
        // this.result sẽ không hoạt động ở đây
        console.log("Arrow function không có this context");
    },
    
    getValue() {
        return this.result;
    },
    
    reset() {
        this.result = 0;
        return this;
    }
};

// Method chaining
calculator.add(10).subtract(3).add(5);
console.log(calculator.getValue()); // 12
```

#### 1.3 Object Destructuring
```javascript
const product = {
    id: 1,
    name: "Laptop",
    price: 999,
    category: "Electronics",
    specs: {
        cpu: "Intel i7",
        ram: "16GB",
        storage: "512GB SSD"
    }
};

// Basic destructuring
const { name, price, category } = product;
console.log(name, price, category); // "Laptop" 999 "Electronics"

// Destructuring với alias
const { name: productName, price: productPrice } = product;

// Destructuring với default values
const { discount = 0, warranty = "1 year" } = product;

// Nested destructuring
const { specs: { cpu, ram } } = product;

// Rest operator trong destructuring
const { id, ...productDetails } = product;
```

#### 1.4 Object Methods và Utilities
```javascript
const inventory = {
    laptop: 10,
    mouse: 25,
    keyboard: 15
};

// Object.keys() - lấy tất cả keys
const productNames = Object.keys(inventory);
console.log(productNames); // ["laptop", "mouse", "keyboard"]

// Object.values() - lấy tất cả values
const quantities = Object.values(inventory);
console.log(quantities); // [10, 25, 15]

// Object.entries() - lấy cặp [key, value]
const entries = Object.entries(inventory);
console.log(entries); // [["laptop", 10], ["mouse", 25], ["keyboard", 15]]

// Object.assign() - merge objects
const newProducts = { tablet: 5, phone: 20 };
const allProducts = Object.assign({}, inventory, newProducts);

// Spread operator (ES6) - cách hiện đại
const allProductsSpread = { ...inventory, ...newProducts };
```

### 2. 🔍 Scope (Phạm vi)

#### 2.1 Global Scope
```javascript
// Global scope - có thể truy cập từ mọi nơi
var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "I'm global too";

function showGlobalVars() {
    console.log(globalVar);   // Accessible
    console.log(globalLet);   // Accessible
    console.log(globalConst); // Accessible
}
```

#### 2.2 Function Scope
```javascript
function functionScopeExample() {
    var functionVar = "I'm in function scope";
    let functionLet = "Me too";
    const functionConst = "Me three";
    
    if (true) {
        var stillFunctionScoped = "var is function scoped";
        let blockScoped = "let is block scoped";
        const alsoBlockScoped = "const is block scoped";
    }
    
    console.log(stillFunctionScoped); // Accessible
    // console.log(blockScoped);      // Error! Not accessible
    // console.log(alsoBlockScoped);  // Error! Not accessible
}
```

#### 2.3 Block Scope
```javascript
function blockScopeExample() {
    let outerVariable = "I'm outside the block";
    
    if (true) {
        let innerVariable = "I'm inside the block";
        const anotherInnerVar = "Me too";
        
        console.log(outerVariable);  // Accessible
        console.log(innerVariable);  // Accessible
    }
    
    console.log(outerVariable);  // Accessible
    // console.log(innerVariable);  // Error! Not accessible outside block
}

// Loop scope example
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 0, 1, 2 (với let)
    }, 100);
}

// So sánh với var
for (var j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log(j); // 3, 3, 3 (với var)
    }, 100);
}
```

#### 2.4 Hoisting
```javascript
// Variable hoisting
console.log(hoistedVar); // undefined (not error)
var hoistedVar = "I'm hoisted";

// console.log(notHoistedLet); // Error! Cannot access before initialization
let notHoistedLet = "I'm not hoisted";

// Function hoisting
sayHello(); // "Hello!" - works because function is hoisted

function sayHello() {
    console.log("Hello!");
}

// Function expression không được hoist
// sayGoodbye(); // Error! Cannot access before initialization
const sayGoodbye = function() {
    console.log("Goodbye!");
};
```

#### 2.5 Closure
```javascript
// Closure example
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (independent counter)

// Practical closure example
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 3. 📞 Callback Functions

#### 3.1 Basic Callbacks
```javascript
// Simple callback example
function greetUser(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function afterGreeting() {
    console.log("Nice to meet you!");
}

greetUser("John", afterGreeting);

// Inline callback
greetUser("Jane", function() {
    console.log("How are you today?");
});

// Arrow function callback
greetUser("Bob", () => {
    console.log("Have a great day!");
});
```

#### 3.2 Array Methods với Callbacks
```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - transform mỗi element
const doubled = numbers.map(function(num) {
    return num * 2;
});

// filter() - lọc elements
const evenNumbers = numbers.filter(num => num % 2 === 0);

// reduce() - tính toán tổng hợp
const sum = numbers.reduce((total, num) => total + num, 0);

// forEach() - thực hiện action cho mỗi element
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// find() - tìm element đầu tiên thỏa mãn
const firstEven = numbers.find(num => num % 2 === 0);
```

#### 3.3 Asynchronous Callbacks
```javascript
// setTimeout callback
function delayedMessage(message, delay, callback) {
    setTimeout(() => {
        console.log(message);
        if (callback) callback();
    }, delay);
}

delayedMessage("First message", 1000, () => {
    delayedMessage("Second message", 1000, () => {
        delayedMessage("Third message", 1000, () => {
            console.log("All messages sent!");
        });
    });
});

// Event listener callbacks
function setupEventListeners() {
    const button = document.getElementById('myButton');
    
    button.addEventListener('click', function(event) {
        console.log('Button clicked!', event);
    });
    
    button.addEventListener('mouseover', (event) => {
        console.log('Mouse over button!');
    });
}
```

#### 3.4 Higher-Order Functions
```javascript
// Function nhận callback làm parameter
function processArray(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];

// Sử dụng với different callbacks
const squared = processArray(numbers, (num) => num * num);
const withIndex = processArray(numbers, (num, index) => `${index}: ${num}`);

// Function trả về function khác
function createValidator(minLength) {
    return function(input) {
        return input.length >= minLength;
    };
}

const validatePassword = createValidator(8);
const validateUsername = createValidator(3);

console.log(validatePassword("12345678")); // true
console.log(validateUsername("ab"));       // false
```

### 4. 📄 JSON (JavaScript Object Notation)

#### 4.1 JSON Basics
```javascript
// JSON string
const jsonString = `{
    "name": "John Doe",
    "age": 30,
    "isStudent": false,
    "courses": ["JavaScript", "React", "Node.js"],
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
    }
}`;

// Parse JSON string thành JavaScript object
const userData = JSON.parse(jsonString);
console.log(userData.name);     // "John Doe"
console.log(userData.courses);  // ["JavaScript", "React", "Node.js"]

// Convert JavaScript object thành JSON string
const userObject = {
    name: "Jane Smith",
    age: 25,
    skills: ["HTML", "CSS", "JavaScript"]
};

const jsonOutput = JSON.stringify(userObject);
console.log(jsonOutput); // '{"name":"Jane Smith","age":25,"skills":["HTML","CSS","JavaScript"]}'
```

#### 4.2 JSON Methods với Options
```javascript
const complexObject = {
    name: "Product",
    price: 99.99,
    createdAt: new Date(),
    calculate: function() { return this.price * 1.1; },
    undefined: undefined,
    nullValue: null
};

// JSON.stringify với replacer function
const jsonWithReplacer = JSON.stringify(complexObject, (key, value) => {
    if (typeof value === 'function') {
        return value.toString();
    }
    if (value instanceof Date) {
        return value.toISOString();
    }
    return value;
});

// JSON.stringify với space parameter (pretty print)
const prettyJson = JSON.stringify(complexObject, null, 2);
console.log(prettyJson);

// JSON.parse với reviver function
const jsonWithDate = '{"name":"Event","date":"2023-12-25T00:00:00.000Z"}';
const parsedWithReviver = JSON.parse(jsonWithDate, (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
});
```

#### 4.3 Working with API Data
```javascript
// Simulate API response
const apiResponse = `{
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "name": "John", "email": "john@example.com"},
            {"id": 2, "name": "Jane", "email": "jane@example.com"}
        ],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 2
        }
    }
}`;

// Process API data
function processApiResponse(jsonString) {
    try {
        const response = JSON.parse(jsonString);
        
        if (response.status === 'success') {
            const users = response.data.users;
            return users.map(user => ({
                id: user.id,
                displayName: user.name,
                contactEmail: user.email
            }));
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        console.error('Error processing API response:', error);
        return [];
    }
}

const processedUsers = processApiResponse(apiResponse);
console.log(processedUsers);
```

## 🎯 Bài tập thực hành

### Exercise 1: Quản lý đơn hàng (Order Management)
Tạo hệ thống quản lý đơn hàng với objects, methods và JSON processing.

### Exercise 2: Callback delay functions
Tạo các hàm delay với callbacks để xử lý các tác vụ bất đồng bộ.

### Exercise 3: JSON conversion utilities
Xây dựng utilities để chuyển đổi và xử lý dữ liệu JSON.

## 💡 Tips và Best Practices

1. **Sử dụng const cho objects** không thay đổi reference
2. **Destructuring** giúp code ngắn gọn và dễ đọc
3. **Tránh callback hell** bằng cách tách functions
4. **Luôn try-catch** khi parse JSON
5. **Sử dụng meaningful names** cho callback parameters

## 🔗 Tài liệu tham khảo

### 📚 Tài liệu chính thức
- [MDN - Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN - Callback Functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [MDN - JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### 🎥 Video tutorials
- [JavaScript Objects - Programming with Mosh](https://www.youtube.com/watch?v=PFmuCDHHpwk)
- [JavaScript Closures - freeCodeCamp](https://www.youtube.com/watch?v=3a0I8ICR1Vg)
- [Callback Functions - The Net Ninja](https://www.youtube.com/watch?v=QRq2zMHlBz4)

### 📖 Bài viết hay
- [JavaScript Objects Explained](https://javascript.info/object)
- [Understanding JavaScript Closures](https://www.freecodecamp.org/news/javascript-closures-explained/)
- [Callback Functions in JavaScript](https://www.javascripttutorial.net/javascript-callback/)
- [Working with JSON Data](https://www.w3schools.com/js/js_json.asp)

### 🛠️ Tools hữu ích
- [JSON Formatter](https://jsonformatter.curiousconcept.com/) - Format and validate JSON
- [JSON Editor Online](https://jsoneditoronline.org/) - Edit JSON data
- [JavaScript Visualizer](https://ui.dev/javascript-visualizer/) - Visualize scope and closures

---

## ➡️ Buổi tiếp theo
**Buổi 4**: ES6+: Destructuring, Arrow Functions, Spread Operator, Classes
