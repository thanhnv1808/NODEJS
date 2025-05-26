/**
 * Exercise 5: Check Prime Numbers
 * Write a function to check if a number is prime.
 */

// Method 1: Basic prime check
function isPrime1(number) {
    // Handle edge cases
    if (number < 2) return false;
    if (number === 2) return true;
    if (number % 2 === 0) return false;
    
    // Check odd divisors up to sqrt(number)
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    
    return true;
}

// Method 2: Optimized prime check with early returns
function isPrime2(number) {
    if (number < 2) return false;
    if (number === 2 || number === 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    // Check for divisors of the form 6k ± 1
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) {
            return false;
        }
    }
    
    return true;
}

// Method 3: Prime check with detailed steps
function isPrimeDetailed(number) {
    const steps = [];
    steps.push(`Checking if ${number} is prime...`);
    
    if (number < 2) {
        steps.push(`${number} < 2, so it's not prime`);
        return { isPrime: false, steps };
    }
    
    if (number === 2) {
        steps.push(`${number} is 2, which is prime`);
        return { isPrime: true, steps };
    }
    
    if (number % 2 === 0) {
        steps.push(`${number} is even and > 2, so it's not prime`);
        return { isPrime: false, steps };
    }
    
    const sqrtNumber = Math.sqrt(number);
    steps.push(`Checking divisors from 3 to √${number} ≈ ${sqrtNumber.toFixed(2)}`);
    
    for (let i = 3; i <= sqrtNumber; i += 2) {
        steps.push(`Checking ${number} ÷ ${i} = ${(number / i).toFixed(2)}`);
        if (number % i === 0) {
            steps.push(`${number} is divisible by ${i}, so it's not prime`);
            return { isPrime: false, steps, divisor: i };
        }
    }
    
    steps.push(`No divisors found, ${number} is prime!`);
    return { isPrime: true, steps };
}

// Function to find all primes up to n (Sieve of Eratosthenes)
function findPrimesUpTo(n) {
    if (n < 2) return [];
    
    const sieve = new Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = false;
            }
        }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }
    
    return primes;
}

// Function to find next prime after n
function findNextPrime(n) {
    let candidate = n + 1;
    while (!isPrime1(candidate)) {
        candidate++;
    }
    return candidate;
}

// Function to find previous prime before n
function findPreviousPrime(n) {
    if (n <= 2) return null;
    
    let candidate = n - 1;
    while (candidate >= 2 && !isPrime1(candidate)) {
        candidate--;
    }
    
    return candidate >= 2 ? candidate : null;
}

// Function to check if a number is a twin prime
function isTwinPrime(number) {
    if (!isPrime1(number)) return false;
    
    const nextPrime = findNextPrime(number);
    const prevPrime = findPreviousPrime(number);
    
    return (nextPrime - number === 2) || (number - prevPrime === 2);
}

// Function to generate prime factorization
function primeFactorization(number) {
    if (number < 2) return [];
    
    const factors = [];
    let divisor = 2;
    
    while (divisor * divisor <= number) {
        while (number % divisor === 0) {
            factors.push(divisor);
            number /= divisor;
        }
        divisor++;
    }
    
    if (number > 1) {
        factors.push(number);
    }
    
    return factors;
}

// Test cases
console.log("🧪 TESTING EXERCISE 5: CHECK PRIME NUMBERS");
console.log("=" .repeat(60));

const testNumbers = [2, 3, 4, 5, 17, 25, 29, 97, 100, 101];

console.log("📊 Basic Prime Check Results:");
testNumbers.forEach(num => {
    const result = isPrime1(num);
    console.log(`${num}: ${result ? '✅ Prime' : '❌ Not Prime'}`);
});

console.log("\n" + "=" .repeat(60));
console.log("🔍 Detailed Prime Check:");

[17, 25, 29].forEach(num => {
    console.log(`\nChecking ${num}:`);
    const detailed = isPrimeDetailed(num);
    detailed.steps.forEach(step => console.log(`  ${step}`));
});

console.log("\n" + "=" .repeat(60));
console.log("🎯 Prime Numbers up to 50:");
const primesUpTo50 = findPrimesUpTo(50);
console.log(primesUpTo50.join(', '));
console.log(`Total: ${primesUpTo50.length} primes`);

console.log("\n" + "=" .repeat(60));
console.log("🔄 Next and Previous Primes:");

[10, 20, 30].forEach(num => {
    const next = findNextPrime(num);
    const prev = findPreviousPrime(num);
    console.log(`Number: ${num}`);
    console.log(`  Next prime: ${next}`);
    console.log(`  Previous prime: ${prev || 'None'}`);
});

console.log("\n" + "=" .repeat(60));
console.log("👥 Twin Primes Check:");

primesUpTo50.forEach(prime => {
    if (isTwinPrime(prime)) {
        const next = findNextPrime(prime);
        const prev = findPreviousPrime(prime);
        
        if (next - prime === 2) {
            console.log(`(${prime}, ${next}) - Twin primes`);
        }
    }
});

console.log("\n" + "=" .repeat(60));
console.log("🔢 Prime Factorization:");

[12, 24, 60, 100].forEach(num => {
    const factors = primeFactorization(num);
    console.log(`${num} = ${factors.join(' × ')}`);
});

// Performance comparison
console.log("\n" + "=" .repeat(60));
console.log("⚡ Performance Comparison:");

const largePrimes = [982451653, 982451654, 982451655];

largePrimes.forEach(num => {
    console.log(`\nTesting ${num}:`);
    
    const start1 = performance.now();
    const result1 = isPrime1(num);
    const end1 = performance.now();
    
    const start2 = performance.now();
    const result2 = isPrime2(num);
    const end2 = performance.now();
    
    console.log(`  Method 1: ${result1} (${(end1 - start1).toFixed(4)}ms)`);
    console.log(`  Method 2: ${result2} (${(end2 - start2).toFixed(4)}ms)`);
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isPrime1,
        isPrime2,
        isPrimeDetailed,
        findPrimesUpTo,
        findNextPrime,
        findPreviousPrime,
        isTwinPrime,
        primeFactorization
    };
}
