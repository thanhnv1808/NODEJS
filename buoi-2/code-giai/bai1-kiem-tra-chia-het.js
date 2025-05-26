/**
 * Exercise 1: Check Divisibility
 * Write a program to check if a number is divisible by 3 and 5.
 */

// Method 1: Using if/else
function checkDivisibility1(number) {
    console.log(`\n=== Checking number ${number} ===`);

    if (number % 3 === 0 && number % 5 === 0) {
        console.log(`${number} is divisible by both 3 and 5`);
    } else if (number % 3 === 0) {
        console.log(`${number} is divisible by 3 but not by 5`);
    } else if (number % 5 === 0) {
        console.log(`${number} is divisible by 5 but not by 3`);
    } else {
        console.log(`${number} is not divisible by 3 or 5`);
    }
}

// Method 2: Using switch/case with true
function checkDivisibility2(number) {
    console.log(`\n=== Checking number ${number} (Method 2) ===`);

    const divisibleBy3 = number % 3 === 0;
    const divisibleBy5 = number % 5 === 0;

    switch (true) {
        case divisibleBy3 && divisibleBy5:
            console.log(`${number} is divisible by both 3 and 5`);
            break;
        case divisibleBy3:
            console.log(`${number} is divisible by 3 but not by 5`);
            break;
        case divisibleBy5:
            console.log(`${number} is divisible by 5 but not by 3`);
            break;
        default:
            console.log(`${number} is not divisible by 3 or 5`);
    }
}

// Method 3: Using ternary operator
function checkDivisibility3(number) {
    console.log(`\n=== Checking number ${number} (Method 3) ===`);

    const result = (number % 3 === 0 && number % 5 === 0)
        ? `${number} is divisible by both 3 and 5`
        : (number % 3 === 0)
            ? `${number} is divisible by 3 but not by 5`
            : (number % 5 === 0)
                ? `${number} is divisible by 5 but not by 3`
                : `${number} is not divisible by 3 or 5`;

    console.log(result);
}

// Method 4: Return object with detailed information
function checkDivisibilityDetailed(number) {
    const divisibleBy3 = number % 3 === 0;
    const divisibleBy5 = number % 5 === 0;

    return {
        number: number,
        divisibleBy3: divisibleBy3,
        divisibleBy5: divisibleBy5,
        divisibleByBoth: divisibleBy3 && divisibleBy5,
        message: divisibleBy3 && divisibleBy5
            ? `${number} is divisible by both 3 and 5`
            : divisibleBy3
                ? `${number} is divisible by 3 but not by 5`
                : divisibleBy5
                    ? `${number} is divisible by 5 but not by 3`
                    : `${number} is not divisible by 3 or 5`
    };
}

// Test cases
console.log("🧪 TESTING EXERCISE 1: CHECK DIVISIBILITY");
console.log("=========================================");

const testNumbers = [15, 9, 10, 7, 30, 0, -15];

testNumbers.forEach(num => {
    checkDivisibility1(num);
});

console.log("\n" + "=".repeat(50));
console.log("📊 DETAILED INFORMATION:");

testNumbers.forEach(num => {
    const result = checkDivisibilityDetailed(num);
    console.log(`\nNumber ${result.number}:`);
    console.log(`  - Divisible by 3: ${result.divisibleBy3}`);
    console.log(`  - Divisible by 5: ${result.divisibleBy5}`);
    console.log(`  - Divisible by both: ${result.divisibleByBoth}`);
    console.log(`  - Conclusion: ${result.message}`);
});

// Bonus: FizzBuzz pattern
console.log("\n" + "=".repeat(50));
console.log("🎯 BONUS - FIZZBUZZ PATTERN (1-30):");

for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(`${i}: FizzBuzz`);
    } else if (i % 3 === 0) {
        console.log(`${i}: Fizz`);
    } else if (i % 5 === 0) {
        console.log(`${i}: Buzz`);
    } else {
        console.log(`${i}: ${i}`);
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkDivisibility1,
        checkDivisibility2,
        checkDivisibility3,
        checkDivisibilityDetailed
    };
}
