/**
 * Exercise 2: Find Maximum Number
 * Write a program to find the largest number among three numbers.
 */

// Method 1: Using if/else
function findMaximum1(a, b, c) {
    console.log(`\n=== Finding maximum among ${a}, ${b}, ${c} ===`);

    let max;

    if (a >= b && a >= c) {
        max = a;
    } else if (b >= a && b >= c) {
        max = b;
    } else {
        max = c;
    }

    console.log(`The maximum number is: ${max}`);
    return max;
}

// Method 2: Using nested ternary
function findMaximum2(a, b, c) {
    console.log(`\n=== Finding maximum among ${a}, ${b}, ${c} (Method 2) ===`);

    const max = (a >= b) ? (a >= c ? a : c) : (b >= c ? b : c);

    console.log(`The maximum number is: ${max}`);
    return max;
}

// Method 3: Using Math.max()
function findMaximum3(a, b, c) {
    console.log(`\n=== Finding maximum among ${a}, ${b}, ${c} (Method 3) ===`);

    const max = Math.max(a, b, c);

    console.log(`The maximum number is: ${max}`);
    return max;
}

// Method 4: Using switch/case with comparison
function findMaximum4(a, b, c) {
    console.log(`\n=== Finding maximum among ${a}, ${b}, ${c} (Method 4) ===`);

    let max;

    switch (true) {
        case (a >= b && a >= c):
            max = a;
            break;
        case (b >= a && b >= c):
            max = b;
            break;
        default:
            max = c;
    }

    console.log(`The maximum number is: ${max}`);
    return max;
}

// Method 5: Return detailed information
function findMaximumDetailed(a, b, c) {
    const numbers = [a, b, c];
    const max = Math.max(a, b, c);
    const min = Math.min(a, b, c);

    // Find middle number
    const middle = numbers.find(num => num !== max && num !== min) || max;

    // Count occurrences of maximum number
    const maxCount = numbers.filter(num => num === max).length;

    return {
        numbers: [a, b, c],
        max: max,
        min: min,
        middle: middle,
        maxCount: maxCount,
        isAllEqual: a === b && b === c,
        isAllDifferent: a !== b && b !== c && a !== c,
        sorted: [...numbers].sort((x, y) => y - x), // Sort in descending order
        message: maxCount > 1
            ? `There are ${maxCount} equal numbers with maximum value: ${max}`
            : `The maximum number is: ${max}`
    };
}

// Method 6: Handle special cases
function findMaximumAdvanced(a, b, c) {
    // Check valid input
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        return {
            error: "All parameters must be numbers",
            input: [a, b, c]
        };
    }

    // Check for NaN
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        return {
            error: "Cannot contain NaN",
            input: [a, b, c]
        };
    }

    const max = Math.max(a, b, c);

    // Determine positions of maximum number
    const positions = [];
    if (a === max) positions.push('a (position 1)');
    if (b === max) positions.push('b (position 2)');
    if (c === max) positions.push('c (position 3)');

    return {
        input: [a, b, c],
        max: max,
        positions: positions,
        message: `Maximum number ${max} at position: ${positions.join(', ')}`
    };
}

// Test cases
console.log("🧪 TESTING EXERCISE 2: FIND MAXIMUM NUMBER");
console.log("==========================================");

const testCases = [
    [5, 3, 8],
    [10, 10, 5],
    [7, 7, 7],
    [-5, -2, -10],
    [0, 0, 1],
    [100, 50, 75],
    [3.14, 2.71, 3.14]
];

testCases.forEach(([a, b, c]) => {
    findMaximum1(a, b, c);
});

console.log("\n" + "=".repeat(50));
console.log("📊 DETAILED INFORMATION:");

testCases.forEach(([a, b, c]) => {
    const result = findMaximumDetailed(a, b, c);
    console.log(`\nNumbers [${result.numbers.join(', ')}]:`);
    console.log(`  - Maximum: ${result.max}`);
    console.log(`  - Minimum: ${result.min}`);
    console.log(`  - Middle: ${result.middle}`);
    console.log(`  - Sorted: [${result.sorted.join(', ')}]`);
    console.log(`  - All equal: ${result.isAllEqual}`);
    console.log(`  - All different: ${result.isAllDifferent}`);
    console.log(`  - Conclusion: ${result.message}`);
});

console.log("\n" + "=".repeat(50));
console.log("🔍 TESTING SPECIAL CASES:");

const specialCases = [
    ["hello", 2, 3],
    [1, NaN, 3],
    [Infinity, 100, -Infinity],
    [1.5, 2.7, 1.9]
];

specialCases.forEach(([a, b, c]) => {
    const result = findMaximumAdvanced(a, b, c);
    console.log(`\nInput: [${a}, ${b}, ${c}]`);
    if (result.error) {
        console.log(`  ❌ Error: ${result.error}`);
    } else {
        console.log(`  ✅ ${result.message}`);
    }
});

// Bonus: Find maximum in any array
function findMaximumInArray(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return { error: "Invalid or empty array" };
    }

    const validNumbers = numbers.filter(num => typeof num === 'number' && !isNaN(num));

    if (validNumbers.length === 0) {
        return { error: "No valid numbers in array" };
    }

    const max = Math.max(...validNumbers);
    const maxIndex = numbers.indexOf(max);

    return {
        originalArray: numbers,
        validNumbers: validNumbers,
        max: max,
        maxIndex: maxIndex,
        message: `Maximum number ${max} at index ${maxIndex}`
    };
}

console.log("\n" + "=".repeat(50));
console.log("🎯 BONUS - FIND MAXIMUM IN ARRAY:");

const arrays = [
    [1, 5, 3, 9, 2],
    [-1, -5, -2],
    [3.14, 2.71, 1.41, 2.23],
    [100],
    []
];

arrays.forEach(arr => {
    const result = findMaximumInArray(arr);
    console.log(`\nArray: [${arr.join(', ')}]`);
    if (result.error) {
        console.log(`  ❌ ${result.error}`);
    } else {
        console.log(`  ✅ ${result.message}`);
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        findMaximum1,
        findMaximum2,
        findMaximum3,
        findMaximum4,
        findMaximumDetailed,
        findMaximumAdvanced,
        findMaximumInArray
    };
}
