/**
 * Exercise 4: Calculate Sum of Even Numbers
 * Write a function to calculate the sum of even numbers from 1 to n.
 */

// Method 1: Using for loop
function calculateEvenSum1(n) {
    let sum = 0;
    
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            sum += i;
        }
    }
    
    return sum;
}

// Method 2: Using while loop
function calculateEvenSum2(n) {
    let sum = 0;
    let currentNumber = 2; // Start with first even number
    
    while (currentNumber <= n) {
        sum += currentNumber;
        currentNumber += 2; // Jump to next even number
    }
    
    return sum;
}

// Method 3: Using for loop with step 2
function calculateEvenSum3(n) {
    let sum = 0;
    
    for (let i = 2; i <= n; i += 2) {
        sum += i;
    }
    
    return sum;
}

// Method 4: Using array and reduce
function calculateEvenSum4(n) {
    const evenNumbers = [];
    
    for (let i = 2; i <= n; i += 2) {
        evenNumbers.push(i);
    }
    
    return evenNumbers.reduce((sum, num) => sum + num, 0);
}

// Method 5: Using mathematical formula
function calculateEvenSum5(n) {
    // Sum of even numbers from 2 to n = 2 + 4 + 6 + ... + (2k)
    // where k = floor(n/2)
    // Formula: k * (k + 1)
    const k = Math.floor(n / 2);
    return k * (k + 1);
}

// Method 6: Using filter and reduce with range array
function calculateEvenSum6(n) {
    // Create array from 1 to n
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    
    return numbers
        .filter(num => num % 2 === 0)
        .reduce((sum, num) => sum + num, 0);
}

// Advanced: Function with detailed information
function calculateEvenSumDetailed(n) {
    const evenNumbers = [];
    let sum = 0;
    
    for (let i = 2; i <= n; i += 2) {
        evenNumbers.push(i);
        sum += i;
    }
    
    return {
        range: `1 to ${n}`,
        evenNumbers: evenNumbers,
        count: evenNumbers.length,
        sum: sum,
        average: evenNumbers.length > 0 ? sum / evenNumbers.length : 0,
        formula: `Mathematical formula result: ${calculateEvenSum5(n)}`
    };
}

// Test function to compare all methods
function testAllMethods(n) {
    console.log(`\n🧪 Testing all methods for n = ${n}`);
    console.log("=" .repeat(50));
    
    const methods = [
        { name: "For loop with if", func: calculateEvenSum1 },
        { name: "While loop", func: calculateEvenSum2 },
        { name: "For loop step 2", func: calculateEvenSum3 },
        { name: "Array + reduce", func: calculateEvenSum4 },
        { name: "Mathematical formula", func: calculateEvenSum5 },
        { name: "Filter + reduce", func: calculateEvenSum6 }
    ];
    
    methods.forEach((method, index) => {
        const startTime = performance.now();
        const result = method.func(n);
        const endTime = performance.now();
        
        console.log(`${index + 1}. ${method.name}: ${result} (${(endTime - startTime).toFixed(4)}ms)`);
    });
}

// Main testing
console.log("🧪 TESTING EXERCISE 4: CALCULATE SUM OF EVEN NUMBERS");
console.log("=" .repeat(60));

const testCases = [10, 20, 50, 100];

testCases.forEach(n => {
    console.log(`\n📊 Sum of even numbers from 1 to ${n}:`);
    const result = calculateEvenSum1(n);
    console.log(`Result: ${result}`);
    
    // Show detailed information
    const detailed = calculateEvenSumDetailed(n);
    console.log(`Even numbers: [${detailed.evenNumbers.join(', ')}]`);
    console.log(`Count: ${detailed.count}`);
    console.log(`Average: ${detailed.average.toFixed(2)}`);
    console.log(`${detailed.formula}`);
});

// Performance comparison
console.log("\n" + "=" .repeat(60));
console.log("⚡ PERFORMANCE COMPARISON:");

[100, 1000, 10000].forEach(n => {
    testAllMethods(n);
});

// Interactive example
function demonstrateEvenSumCalculation(n) {
    console.log(`\n🎯 Step-by-step calculation for n = ${n}:`);
    console.log("-" .repeat(40));
    
    let sum = 0;
    const steps = [];
    
    for (let i = 2; i <= n; i += 2) {
        sum += i;
        steps.push(`${i}`);
        
        if (steps.length <= 10) { // Show first 10 steps
            console.log(`Step ${steps.length}: ${steps.join(' + ')} = ${sum}`);
        }
    }
    
    if (steps.length > 10) {
        console.log(`... (${steps.length - 10} more steps)`);
        console.log(`Final: ${steps.join(' + ')} = ${sum}`);
    }
    
    return sum;
}

console.log("\n" + "=" .repeat(60));
console.log("📝 STEP-BY-STEP DEMONSTRATION:");

demonstrateEvenSumCalculation(20);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateEvenSum1,
        calculateEvenSum2,
        calculateEvenSum3,
        calculateEvenSum4,
        calculateEvenSum5,
        calculateEvenSum6,
        calculateEvenSumDetailed,
        demonstrateEvenSumCalculation
    };
}
