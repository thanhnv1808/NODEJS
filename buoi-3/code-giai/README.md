# 💻 Exercise Solutions for Session 3

## 📁 File List

### 🔵 Session 3: Object, Scope, Callback, JSON
| File | Description | Key Skills |
|------|-------------|------------|
| `bai7-quan-ly-don-hang.js` | Order management system | Objects, methods, JSON processing, CRUD operations |
| `bai8-callback-delay.js` | Callback delay functions | Callbacks, async handling, setTimeout, rate limiting |
| `bai9-json-utilities.js` | JSON conversion utilities | JSON parsing, data transformation, schema validation |

## 🚀 How to Run

### Run individual files:
```bash
# Session 3 Exercises
node bai7-quan-ly-don-hang.js       # Exercise 7: Order management
node bai8-callback-delay.js         # Exercise 8: Callback delays
node bai9-json-utilities.js         # Exercise 9: JSON utilities
```

### Run all exercises:
```bash
# Run all files sequentially
for file in *.js; do echo "=== $file ==="; node "$file"; echo; done
```

## 📚 Applied Knowledge

### 🏗️ Objects (Session 3)
- ✅ **Object creation**: Literal notation, constructor functions
- ✅ **Property access**: Dot notation, bracket notation
- ✅ **Object methods**: Method definition, `this` context
- ✅ **Object destructuring**: Basic and nested destructuring
- ✅ **Object utilities**: `Object.keys()`, `Object.values()`, `Object.entries()`

### 🔍 Scope (Session 3)
- ✅ **Global scope**: Variables accessible everywhere
- ✅ **Function scope**: Variables scoped to functions
- ✅ **Block scope**: `let` and `const` block scoping
- ✅ **Hoisting**: Variable and function hoisting behavior
- ✅ **Closures**: Inner functions accessing outer scope

### 📞 Callbacks (Session 3)
- ✅ **Basic callbacks**: Function as parameter
- ✅ **Array methods**: `map`, `filter`, `reduce`, `forEach`
- ✅ **Async callbacks**: `setTimeout`, event handlers
- ✅ **Higher-order functions**: Functions returning functions
- ✅ **Error handling**: Node.js style callbacks (error, data)

### 📄 JSON (Session 3)
- ✅ **JSON parsing**: `JSON.parse()` with error handling
- ✅ **JSON stringifying**: `JSON.stringify()` with options
- ✅ **Data transformation**: Object manipulation and conversion
- ✅ **Schema validation**: Custom validation logic
- ✅ **API processing**: Response normalization and extraction

## 🎯 Exercise Highlights

### Exercise 7: Order Management System
```javascript
// Main technique: Object-oriented design with JSON processing
class OrderManager {
    createOrder(customerId, items) {
        const orderItems = this.validateAndProcessItems(items);
        const totalAmount = this.calculateTotal(orderItems);
        // ... order creation logic
    }
}
```

**Key Features:**
- Complete order management system
- Customer and product management
- JSON export/import functionality
- Order statistics and analytics
- Error handling and validation

### Exercise 8: Callback Delay Functions
```javascript
// Main technique: Asynchronous programming with callbacks
function executeInParallel(tasks, callback) {
    let completedTasks = 0;
    tasks.forEach((task, index) => {
        delayWithData(task.data, task.delay, (error, result) => {
            // Handle completion and call final callback
        });
    });
}
```

**Key Features:**
- Sequential and parallel execution
- Retry mechanisms with exponential backoff
- Debounce and throttle implementations
- Rate limiting with queue management
- Real-world async simulation

### Exercise 9: JSON Conversion Utilities
```javascript
// Main technique: Data transformation and validation
class JSONUtils {
    static validateSchema(data, schema) {
        // Custom schema validation logic
        return { isValid: errors.length === 0, errors };
    }
}
```

**Key Features:**
- Safe JSON parsing and stringifying
- Schema validation system
- Object flattening and unflattening
- Case conversion (camelCase ↔ snake_case)
- CSV ↔ JSON conversion
- API response processing

## 💡 Applied Best Practices

### ✅ Code Quality
- **Error handling**: Try-catch blocks, safe operations
- **Modular design**: Classes and utility functions
- **Consistent naming**: Clear, descriptive function names
- **Documentation**: Comprehensive comments and examples

### ✅ JavaScript Modern Features
- **ES6 Classes**: Object-oriented programming
- **Destructuring**: Object and array destructuring
- **Arrow functions**: Concise function syntax
- **Template literals**: String interpolation
- **Spread operator**: Object and array spreading

### ✅ Programming Principles
- **Single Responsibility**: Each function has one purpose
- **Error First Callbacks**: Node.js style error handling
- **Immutability**: Avoiding direct object mutation
- **Separation of Concerns**: Logic separation in classes

## 🧪 Test Cases Coverage

### Exercise 7: Order Management System
- ✅ Customer management: Add, update, retrieve
- ✅ Order creation: Valid and invalid scenarios
- ✅ Stock management: Inventory updates
- ✅ JSON operations: Export and import
- ✅ Statistics: Revenue, order counts, distributions

### Exercise 8: Callback Delay Functions
- ✅ Basic delays: Simple timeout functions
- ✅ Sequential execution: Ordered task completion
- ✅ Parallel execution: Concurrent task handling
- ✅ Retry mechanisms: Failure recovery
- ✅ Rate limiting: Controlled execution flow

### Exercise 9: JSON Conversion Utilities
- ✅ Safe parsing: Error handling for invalid JSON
- ✅ Schema validation: Complex object validation
- ✅ Data transformation: Flattening, case conversion
- ✅ Format conversion: CSV, XML-like objects
- ✅ API processing: Response normalization

## 🔗 Useful Links

### 📖 Documentation
- [MDN - Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN - Callback Functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [MDN - JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### 🎥 Video Tutorials
- [JavaScript Objects - Programming with Mosh](https://www.youtube.com/watch?v=PFmuCDHHpwk)
- [JavaScript Closures - freeCodeCamp](https://www.youtube.com/watch?v=3a0I8ICR1Vg)
- [Callback Functions - The Net Ninja](https://www.youtube.com/watch?v=QRq2zMHlBz4)
- [JSON Crash Course - Traversy Media](https://www.youtube.com/watch?v=wI1CWzNtE-M)

### 📖 Articles
- [JavaScript Objects Explained](https://javascript.info/object)
- [Understanding JavaScript Closures](https://www.freecodecamp.org/news/javascript-closures-explained/)
- [Callback Functions in JavaScript](https://www.javascripttutorial.net/javascript-callback/)
- [Working with JSON Data](https://www.w3schools.com/js/js_json.asp)
- [JavaScript Scope and Hoisting](https://www.digitalocean.com/community/tutorials/understanding-hoisting-in-javascript)

### 🛠️ Tools
- [JSON Formatter](https://jsonformatter.curiousconcept.com/) - Format and validate JSON
- [JSON Editor Online](https://jsoneditoronline.org/) - Edit JSON data
- [JavaScript Visualizer](https://ui.dev/javascript-visualizer/) - Visualize scope and closures
- [JSONLint](https://jsonlint.com/) - JSON validator
- [Postman](https://www.postman.com/) - API testing and JSON handling

### 🎮 Practice More
- [JavaScript Exercises - W3Schools](https://www.w3schools.com/js/js_exercises.asp)
- [Codewars - JavaScript](https://www.codewars.com/kata/search/javascript)
- [LeetCode - JavaScript](https://leetcode.com/problemset/all/?page=1&topicSlugs=javascript)
- [HackerRank - JavaScript](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript)

---

## ➡️ Next Step
After completing Session 3 exercises, move to **Session 4**: ES6+: Destructuring, Arrow Functions, Spread Operator, Classes
