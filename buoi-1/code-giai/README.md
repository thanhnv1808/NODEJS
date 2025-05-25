# 💻 Exercise Solutions for Session 1

## 📁 File List

| File | Description | Key Skills |
|------|-------------|------------|
| `bai1-kiem-tra-chia-het.js` | Check divisibility by 3 and 5 | `if/else`, `%` operator, `switch/case` |
| `bai2-tim-so-lon-nhat.js` | Find maximum among 3 numbers | Comparison operators, `Math.max()`, nested conditions |
| `bai3-phan-loai-hoc-luc.js` | Grade classification by score | Multiple conditions, range checking, data validation |

## 🚀 How to Run

### Run individual files:
```bash
# Exercise 1: Check divisibility
node bai1-kiem-tra-chia-het.js

# Exercise 2: Find maximum number
node bai2-tim-so-lon-nhat.js

# Exercise 3: Grade classification
node bai3-phan-loai-hoc-luc.js
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

## 🔗 Useful Links

### 📖 Documentation
- [MDN - Conditional Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN - Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)

### 🎮 Practice More
- [JavaScript Exercises - W3Schools](https://www.w3schools.com/js/js_exercises.asp)
- [Codewars - JavaScript](https://www.codewars.com/kata/search/javascript)

---

## ➡️ Next Step
After completing Session 1 exercises, move to **Session 2**: Loops, Functions, Basic Arrays
