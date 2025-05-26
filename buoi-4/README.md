# 📚 Buổi 4: ES6+: Destructuring, Arrow Functions, Spread Operator, Classes

## 🎯 Mục tiêu học tập

Sau buổi học này, bạn sẽ nắm vững:
- **Destructuring**: Object destructuring, array destructuring, nested destructuring
- **Arrow Functions**: Syntax, this binding, use cases và limitations
- **Spread Operator**: Object spread, array spread, function parameters
- **Classes**: Class declaration, constructor, methods, inheritance, static methods

## 📖 Nội dung chi tiết

### 1. 🔧 Destructuring Assignment

#### 1.1 Object Destructuring
```javascript
// Basic object destructuring
const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    role: "admin"
};

// Extract properties
const { name, email, age } = user;
console.log(name, email, age); // "John Doe" "john@example.com" 30

// Destructuring với alias
const { name: userName, email: userEmail } = user;
console.log(userName, userEmail); // "John Doe" "john@example.com"

// Default values
const { role = "user", department = "IT" } = user;
console.log(role, department); // "admin" "IT"

// Rest operator trong destructuring
const { id, ...userDetails } = user;
console.log(id);          // 1
console.log(userDetails); // { name: "John Doe", email: "john@example.com", age: 30, role: "admin" }
```

#### 1.2 Nested Object Destructuring
```javascript
const employee = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        contact: {
            phone: "123-456-7890",
            email: "john@company.com"
        }
    },
    workInfo: {
        position: "Developer",
        department: "Engineering",
        salary: 75000
    }
};

// Nested destructuring
const {
    personalInfo: {
        firstName,
        lastName,
        contact: { phone, email }
    },
    workInfo: { position, salary }
} = employee;

console.log(firstName, lastName, phone, position, salary);
```

#### 1.3 Array Destructuring
```javascript
const colors = ["red", "green", "blue", "yellow", "purple"];

// Basic array destructuring
const [first, second, third] = colors;
console.log(first, second, third); // "red" "green" "blue"

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary); // "red" "blue"

// Rest operator với arrays
const [firstColor, ...remainingColors] = colors;
console.log(firstColor);       // "red"
console.log(remainingColors);  // ["green", "blue", "yellow", "purple"]

// Default values
const [a, b, c, d, e, f = "orange"] = colors;
console.log(f); // "purple" (not "orange" because element exists)

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

#### 1.4 Function Parameter Destructuring
```javascript
// Object parameter destructuring
function createUser({ name, email, age = 18, role = "user" }) {
    return {
        id: Date.now(),
        name,
        email,
        age,
        role,
        createdAt: new Date()
    };
}

const newUser = createUser({
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25
});

// Array parameter destructuring
function calculateDistance([x1, y1], [x2, y2]) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const distance = calculateDistance([0, 0], [3, 4]); // 5
```

### 2. ➡️ Arrow Functions

#### 2.1 Basic Arrow Function Syntax
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const getCurrentTime = () => new Date();

// Multiple statements (need curly braces and return)
const processUser = (user) => {
    const processedUser = {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        isAdult: user.age >= 18
    };
    return processedUser;
};
```

#### 2.2 Arrow Functions và this Binding
```javascript
// Traditional function - has its own 'this'
const traditionalObject = {
    name: "Traditional",
    greet: function() {
        console.log(`Hello, I'm ${this.name}`);
    },
    delayedGreet: function() {
        setTimeout(function() {
            console.log(`Delayed: Hello, I'm ${this.name}`); // 'this' is undefined or window
        }, 1000);
    }
};

// Arrow function - inherits 'this' from enclosing scope
const arrowObject = {
    name: "Arrow",
    greet: () => {
        console.log(`Hello, I'm ${this.name}`); // 'this' không refer đến object
    },
    delayedGreet: function() {
        setTimeout(() => {
            console.log(`Delayed: Hello, I'm ${this.name}`); // 'this' refers to object
        }, 1000);
    }
};

// Practical example: Event handlers
class Button {
    constructor(element) {
        this.element = element;
        this.clickCount = 0;
        
        // Arrow function preserves 'this'
        this.element.addEventListener('click', () => {
            this.clickCount++;
            console.log(`Button clicked ${this.clickCount} times`);
        });
    }
}
```

#### 2.3 Arrow Functions với Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map với arrow function
const doubled = numbers.map(n => n * 2);
const squared = numbers.map(n => n * n);

// filter với arrow function
const evenNumbers = numbers.filter(n => n % 2 === 0);
const greaterThanFive = numbers.filter(n => n > 5);

// reduce với arrow function
const sum = numbers.reduce((total, n) => total + n, 0);
const product = numbers.reduce((total, n) => total * n, 1);

// Complex operations
const users = [
    { name: "John", age: 30, role: "admin" },
    { name: "Jane", age: 25, role: "user" },
    { name: "Bob", age: 35, role: "moderator" }
];

const adminUsers = users
    .filter(user => user.role === "admin")
    .map(user => ({ ...user, isAdmin: true }));
```

### 3. 📦 Spread Operator (...)

#### 3.1 Array Spread
```javascript
const fruits = ["apple", "banana", "orange"];
const vegetables = ["carrot", "broccoli", "spinach"];

// Combine arrays
const food = [...fruits, ...vegetables];
console.log(food); // ["apple", "banana", "orange", "carrot", "broccoli", "spinach"]

// Copy array
const fruitsCopy = [...fruits];
fruitsCopy.push("grape");
console.log(fruits);     // ["apple", "banana", "orange"] (unchanged)
console.log(fruitsCopy); // ["apple", "banana", "orange", "grape"]

// Add elements
const moreFruits = ["mango", ...fruits, "kiwi"];

// Convert NodeList to Array
const divElements = [...document.querySelectorAll('div')];

// Math functions với arrays
const scores = [85, 92, 78, 96, 88];
const maxScore = Math.max(...scores);
const minScore = Math.min(...scores);
```

#### 3.2 Object Spread
```javascript
const baseUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

const userPreferences = {
    theme: "dark",
    language: "en",
    notifications: true
};

// Merge objects
const completeUser = {
    ...baseUser,
    ...userPreferences,
    lastLogin: new Date()
};

// Override properties
const updatedUser = {
    ...baseUser,
    name: "John Smith", // Override name
    age: 30             // Add new property
};

// Conditional spreading
const isAdmin = true;
const userWithRole = {
    ...baseUser,
    ...(isAdmin && { role: "admin", permissions: ["read", "write", "delete"] })
};
```

#### 3.3 Function Parameters Spread
```javascript
// Rest parameters
function calculateTotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}

console.log(calculateTotal(10, 20, 30, 40)); // 100

// Spread trong function calls
function greetUser(firstName, lastName, age) {
    console.log(`Hello ${firstName} ${lastName}, you are ${age} years old`);
}

const userInfo = ["John", "Doe", 30];
greetUser(...userInfo); // "Hello John Doe, you are 30 years old"

// Combining rest và spread
function processData(firstItem, ...restItems) {
    console.log("First:", firstItem);
    console.log("Rest:", restItems);
    
    return [firstItem * 2, ...restItems.map(item => item * 3)];
}

const result = processData(1, 2, 3, 4, 5);
console.log(result); // [2, 6, 9, 12, 15]
```

### 4. 🏗️ ES6 Classes

#### 4.1 Basic Class Declaration
```javascript
class User {
    // Constructor method
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.createdAt = new Date();
        this.isActive = true;
    }
    
    // Instance methods
    getInfo() {
        return `${this.name} (${this.email}) - Age: ${this.age}`;
    }
    
    updateEmail(newEmail) {
        this.email = newEmail;
        this.updatedAt = new Date();
    }
    
    deactivate() {
        this.isActive = false;
        this.deactivatedAt = new Date();
    }
    
    // Getter
    get displayName() {
        return this.name.toUpperCase();
    }
    
    // Setter
    set userAge(age) {
        if (age >= 0 && age <= 120) {
            this.age = age;
        } else {
            throw new Error("Invalid age");
        }
    }
}

// Create instances
const user1 = new User("John Doe", "john@example.com", 30);
const user2 = new User("Jane Smith", "jane@example.com", 25);

console.log(user1.getInfo());
console.log(user1.displayName); // "JOHN DOE"
user1.userAge = 31;
```

#### 4.2 Static Methods và Properties
```javascript
class MathUtils {
    static PI = 3.14159;
    
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static calculateCircleArea(radius) {
        return this.PI * radius * radius;
    }
    
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Use static methods (không cần tạo instance)
console.log(MathUtils.add(5, 3));              // 8
console.log(MathUtils.calculateCircleArea(5));  // 78.53975
console.log(MathUtils.getRandomNumber(1, 10));  // Random number 1-10
```

#### 4.3 Class Inheritance
```javascript
// Base class
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.isAlive = true;
    }
    
    makeSound() {
        console.log(`${this.name} makes a sound`);
    }
    
    eat(food) {
        console.log(`${this.name} eats ${food}`);
    }
    
    sleep() {
        console.log(`${this.name} is sleeping`);
    }
}

// Derived class
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canine"); // Call parent constructor
        this.breed = breed;
        this.isLoyal = true;
    }
    
    // Override parent method
    makeSound() {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
    
    // New method specific to Dog
    fetch(item) {
        console.log(`${this.name} fetches the ${item}`);
    }
    
    // Method using super
    eat(food) {
        super.eat(food); // Call parent method
        console.log(`${this.name} wags tail happily`);
    }
}

// Another derived class
class Cat extends Animal {
    constructor(name, breed) {
        super(name, "Feline");
        this.breed = breed;
        this.isIndependent = true;
    }
    
    makeSound() {
        console.log(`${this.name} meows: Meow!`);
    }
    
    climb() {
        console.log(`${this.name} climbs up the tree`);
    }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Persian");

dog.makeSound(); // "Buddy barks: Woof! Woof!"
dog.fetch("ball");
dog.eat("kibble");

cat.makeSound(); // "Whiskers meows: Meow!"
cat.climb();
```

## 🎯 Bài tập thực hành

### Exercise 1: Tạo class User
Tạo class User với các tính năng quản lý người dùng, authentication và role management.

### Exercise 2: Clone object utilities
Xây dựng utilities để clone objects (shallow và deep clone) sử dụng spread operator và các techniques khác.

### Exercise 3: Filter theo role
Tạo hệ thống filter users theo role với destructuring và arrow functions.

## 💡 Tips và Best Practices

1. **Sử dụng destructuring** để code ngắn gọn và dễ đọc
2. **Arrow functions** cho callbacks ngắn, traditional functions cho methods
3. **Spread operator** thay vì `Object.assign()` và `Array.concat()`
4. **Classes** cho object-oriented programming, nhưng functions cũng OK
5. **Consistent naming** cho class names (PascalCase) và methods (camelCase)

## 🔗 Tài liệu tham khảo

### 📚 Tài liệu chính thức
- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN - Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN - Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### 🎥 Video tutorials
- [ES6 Destructuring - freeCodeCamp](https://www.youtube.com/watch?v=NIq3qLaHCIs)
- [Arrow Functions - Programming with Mosh](https://www.youtube.com/watch?v=h33Srr5J9nY)
- [Spread Operator - The Net Ninja](https://www.youtube.com/watch?v=1INe_jCWq1Q)
- [JavaScript Classes - Traversy Media](https://www.youtube.com/watch?v=RBLIm5LMrmc)

### 📖 Bài viết hay
- [ES6 Features Overview](https://github.com/lukehoban/es6features)
- [Destructuring in JavaScript](https://javascript.info/destructuring-assignment)
- [Arrow Functions vs Regular Functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)
- [JavaScript Classes Explained](https://www.freecodecamp.org/news/javascript-classes-how-they-work-with-use-case/)

### 🛠️ Tools hữu ích
- [Babel REPL](https://babeljs.io/repl) - Test ES6+ features
- [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/) - Browser support
- [ESLint](https://eslint.org/) - Code quality and ES6+ rules

---

## ➡️ Buổi tiếp theo
**Buổi 5**: Promise, Async/Await, Module
