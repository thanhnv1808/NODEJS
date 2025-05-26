# 💻 Exercise Solutions for Sessions 1 & 2

## 📁 File List

### 🟡 Session 1: Variables, Data Types, Operators, Conditionals
| File | Description | Key Skills |
|------|-------------|------------|
| `bai1-kiem-tra-chia-het.js` | Check divisibility by 3 and 5 | `if/else`, `%` operator, `switch/case` |
| `bai2-tim-so-lon-nhat.js` | Find maximum among 3 numbers | Comparison operators, `Math.max()`, nested conditions |
| `bai3-phan-loai-hoc-luc.js` | Grade classification by score | Multiple conditions, range checking, data validation |

### 🔵 Session 2: Loops, Functions, Basic Arrays
| File | Description | Key Skills |
|------|-------------|------------|
| `bai4-tinh-tong-so-chan.js` | Calculate sum of even numbers | `for/while` loops, mathematical formulas, performance |
| `bai5-kiem-tra-so-nguyen-to.js` | Check prime numbers | Algorithms, optimization, `Math.sqrt()`, Sieve of Eratosthenes |
| `bai6-quan-ly-hoc-sinh.js` | Student management system | Arrays, objects, CRUD operations, `filter/map/find` |

## 🚀 How to Run

### Run individual files:
```bash
# Session 1 Exercises
node bai1-kiem-tra-chia-het.js      # Exercise 1: Check divisibility
node bai2-tim-so-lon-nhat.js        # Exercise 2: Find maximum number
node bai3-phan-loai-hoc-luc.js      # Exercise 3: Grade classification

# Session 2 Exercises
node bai4-tinh-tong-so-chan.js      # Exercise 4: Sum of even numbers
node bai5-kiem-tra-so-nguyen-to.js  # Exercise 5: Check prime numbers
node bai6-quan-ly-hoc-sinh.js       # Exercise 6: Student management
```

### Run all exercises:
```bash
# Run all files sequentially
for file in *.js; do echo "=== $file ==="; node "$file"; echo; done
```

## 📚 Applied Knowledge

### 🔤 Variables
- ✅ `const` for immutable values
- ✅ `let` for mutable values
- ✅ Avoid using `var`

### 📊 Data Types
- ✅ `number`: scores, integers
- ✅ `string`: messages, grade names
- ✅ `boolean`: check results
- ✅ `object`: detailed information
- ✅ `array`: test case lists

### ➕ Operators
- ✅ **Arithmetic**: `%` (modulo), `+`, `-`, `*`, `/`
- ✅ **Comparison**: `===`, `!==`, `>=`, `<=`, `>`, `<`
- ✅ **Logical**: `&&` (AND), `||` (OR), `!` (NOT)
- ✅ **Assignment**: `=`, `+=`, `-=`

### 🔀 Conditional Statements
- ✅ **if/else**: Handle multiple conditions
- ✅ **switch/case**: Classify by value
- ✅ **Ternary operator**: Concise writing
- ✅ **Nested conditions**: Nested conditions

### 🔄 Loops (Session 2)
- ✅ **for loop**: Iterate with counter
- ✅ **while loop**: Condition-based iteration
- ✅ **for...of**: Iterate over array values
- ✅ **forEach**: Array method iteration

### 🔧 Functions (Session 2)
- ✅ **Function declaration**: Traditional functions with hoisting
- ✅ **Function expression**: Functions as values
- ✅ **Arrow functions**: Modern ES6 syntax
- ✅ **Parameters**: Default, rest, destructuring

### 📊 Arrays (Session 2)
- ✅ **Array creation**: `[]`, `new Array()`, `Array.from()`
- ✅ **Array methods**: `push`, `pop`, `map`, `filter`, `find`
- ✅ **Array iteration**: Multiple approaches
- ✅ **Array manipulation**: Add, remove, search elements

## 🎯 Exercise Highlights

### Exercise 1: Check Divisibility
```javascript
// Main technique: % operator and logical operators
if (number % 3 === 0 && number % 5 === 0) {
    console.log("Divisible by both 3 and 5");
}
```

**Key Features:**
- 4 different solution methods
- Bonus: FizzBuzz pattern
- Error handling and edge cases

### Exercise 2: Find Maximum Number
```javascript
// Main technique: Comparison and Math.max()
const max = Math.max(a, b, c);
const max2 = (a >= b) ? (a >= c ? a : c) : (b >= c ? b : c);
```

**Key Features:**
- 6 solutions from basic to advanced
- Input validation
- Bonus: Find max in any array

### Exercise 3: Grade Classification
```javascript
// Main technique: Range checking and multiple conditions
if (score >= 90) {
    grade = "Excellent";
} else if (score >= 80) {
    grade = "Good";
}
```

**Key Features:**
- 6 solutions with increasing complexity
- Object mapping technique
- Bonus: Class statistics

### Exercise 4: Sum of Even Numbers (Session 2)
```javascript
// Main technique: Loops and mathematical optimization
for (let i = 2; i <= n; i += 2) {
    sum += i;
}
// Mathematical formula: k * (k + 1) where k = floor(n/2)
```

**Key Features:**
- 6 different approaches (loops, arrays, formula)
- Performance comparison
- Mathematical optimization
- Step-by-step demonstration

### Exercise 5: Check Prime Numbers (Session 2)
```javascript
// Main technique: Algorithm optimization
for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) return false;
}
// Advanced: Sieve of Eratosthenes for multiple primes
```

**Key Features:**
- Multiple algorithms with optimization
- Sieve of Eratosthenes implementation
- Prime factorization
- Twin primes detection
- Performance benchmarking

### Exercise 6: Student Management System (Session 2)
```javascript
// Main technique: Array methods and object manipulation
const students = this.students.filter(student =>
    student.name.toLowerCase().includes(searchName.toLowerCase())
);
// Class-based and functional approaches
```

**Key Features:**
- Complete CRUD operations
- Class-based and functional programming
- Advanced array methods (`filter`, `map`, `find`)
- Statistics and data analysis
- Soft delete functionality

## 💡 Applied Best Practices

### ✅ Code Quality
- **Meaningful names**: `checkDivisibility`, `findMaximum`, `classifyGrade`
- **Consistent formatting**: Indentation and spacing
- **Comments**: Clear description for each function
- **Error handling**: Input validation

### ✅ JavaScript Modern Features
- **Template literals**: `` `Number ${number} is divisible by 3` ``
- **Arrow functions**: `numbers.filter(num => num > 0)`
- **Destructuring**: `const [a, b, c] = numbers`
- **Spread operator**: `Math.max(...array)`

### ✅ Programming Principles
- **DRY**: Don't Repeat Yourself
- **Single Responsibility**: Each function does one thing
- **Input Validation**: Check input data
- **Comprehensive Testing**: Multiple test cases

## 🧪 Test Cases Coverage

### Exercise 1: Check Divisibility
- ✅ Divisible by both 3 and 5: `15, 30`
- ✅ Divisible by 3 only: `9`
- ✅ Divisible by 5 only: `10`
- ✅ Not divisible: `7`
- ✅ Edge cases: `0, -15`

### Exercise 2: Find Maximum Number
- ✅ 3 different numbers: `[5, 3, 8]`
- ✅ 2 equal numbers: `[10, 10, 5]`
- ✅ 3 equal numbers: `[7, 7, 7]`
- ✅ Negative numbers: `[-5, -2, -10]`
- ✅ Decimal numbers: `[3.14, 2.71, 3.14]`

### Exercise 3: Grade Classification
- ✅ All levels: `95, 85, 75, 65, 55, 45`
- ✅ Boundary values: `90, 80, 70, 60, 50`
- ✅ Edge cases: `0, 100, 89.5`
- ✅ Invalid inputs: `"hello", -10, 150, NaN`

### Exercise 4: Sum of Even Numbers (Session 2)
- ✅ Small numbers: `10, 20`
- ✅ Medium numbers: `50, 100`
- ✅ Large numbers: `1000, 10000`
- ✅ Edge cases: `1, 2, 3`
- ✅ Performance testing: Multiple algorithms

### Exercise 5: Check Prime Numbers (Session 2)
- ✅ Small primes: `2, 3, 5, 7, 11, 13`
- ✅ Composite numbers: `4, 6, 8, 9, 10, 12`
- ✅ Large primes: `97, 101, 982451653`
- ✅ Edge cases: `0, 1, -5`
- ✅ Special cases: Twin primes, prime factorization

### Exercise 6: Student Management System (Session 2)
- ✅ CRUD operations: Add, update, remove, search
- ✅ Search functionality: By name, grade, age range
- ✅ Data validation: Required fields, data types
- ✅ Edge cases: Empty database, duplicate names
- ✅ Advanced features: Statistics, sorting, filtering

## 🔗 Useful Links

### 📖 Documentation
- [MDN - Conditional Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN - Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)

### 🎮 Practice More
- [JavaScript Exercises - W3Schools](https://www.w3schools.com/js/js_exercises.asp)
- [Codewars - JavaScript](https://www.codewars.com/kata/search/javascript)

---

## ➡️ Next Step
After completing Sessions 1 & 2 exercises, move to **Session 3**: Object, Scope, Callback, JSON
