/**
 * Exercise 11: Object Cloning Utilities
 * Build utilities for cloning objects using spread operator and various techniques.
 */

// Object Cloning Utilities Class
class ObjectCloner {
    // Shallow clone using spread operator
    static shallowCloneSpread(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (Array.isArray(obj)) {
            return [...obj];
        }
        
        return { ...obj };
    }
    
    // Shallow clone using Object.assign
    static shallowCloneAssign(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (Array.isArray(obj)) {
            return Object.assign([], obj);
        }
        
        return Object.assign({}, obj);
    }
    
    // Deep clone using JSON (limited - doesn't handle functions, dates, etc.)
    static deepCloneJSON(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (error) {
            console.error('JSON deep clone failed:', error);
            return null;
        }
    }
    
    // Deep clone using recursive approach
    static deepCloneRecursive(obj) {
        // Handle null and non-objects
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        // Handle Date objects
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        // Handle Arrays
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepCloneRecursive(item));
        }
        
        // Handle RegExp
        if (obj instanceof RegExp) {
            return new RegExp(obj);
        }
        
        // Handle Functions
        if (typeof obj === 'function') {
            return obj; // Functions are typically not cloned
        }
        
        // Handle Objects
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = this.deepCloneRecursive(obj[key]);
            }
        }
        
        return clonedObj;
    }
    
    // Advanced deep clone with circular reference handling
    static deepCloneAdvanced(obj, visited = new WeakMap()) {
        // Handle null and non-objects
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        // Handle circular references
        if (visited.has(obj)) {
            return visited.get(obj);
        }
        
        let clonedObj;
        
        // Handle Date objects
        if (obj instanceof Date) {
            clonedObj = new Date(obj.getTime());
        }
        // Handle Arrays
        else if (Array.isArray(obj)) {
            clonedObj = [];
            visited.set(obj, clonedObj);
            obj.forEach((item, index) => {
                clonedObj[index] = this.deepCloneAdvanced(item, visited);
            });
        }
        // Handle RegExp
        else if (obj instanceof RegExp) {
            clonedObj = new RegExp(obj);
        }
        // Handle Map
        else if (obj instanceof Map) {
            clonedObj = new Map();
            visited.set(obj, clonedObj);
            obj.forEach((value, key) => {
                clonedObj.set(
                    this.deepCloneAdvanced(key, visited),
                    this.deepCloneAdvanced(value, visited)
                );
            });
        }
        // Handle Set
        else if (obj instanceof Set) {
            clonedObj = new Set();
            visited.set(obj, clonedObj);
            obj.forEach(value => {
                clonedObj.add(this.deepCloneAdvanced(value, visited));
            });
        }
        // Handle Objects
        else {
            clonedObj = {};
            visited.set(obj, clonedObj);
            
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepCloneAdvanced(obj[key], visited);
                }
            }
        }
        
        return clonedObj;
    }
    
    // Clone with property filtering
    static cloneWithFilter(obj, filterFn) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (Array.isArray(obj)) {
            return obj.filter(filterFn).map(item => 
                typeof item === 'object' ? this.cloneWithFilter(item, filterFn) : item
            );
        }
        
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && filterFn(key, obj[key])) {
                clonedObj[key] = typeof obj[key] === 'object' 
                    ? this.cloneWithFilter(obj[key], filterFn)
                    : obj[key];
            }
        }
        
        return clonedObj;
    }
    
    // Clone with property transformation
    static cloneWithTransform(obj, transformFn) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (Array.isArray(obj)) {
            return obj.map(item => 
                typeof item === 'object' 
                    ? this.cloneWithTransform(item, transformFn)
                    : transformFn('arrayItem', item)
            );
        }
        
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const transformedValue = transformFn(key, obj[key]);
                clonedObj[key] = typeof transformedValue === 'object' && transformedValue !== null
                    ? this.cloneWithTransform(transformedValue, transformFn)
                    : transformedValue;
            }
        }
        
        return clonedObj;
    }
    
    // Merge objects with cloning
    static mergeWithClone(...objects) {
        const result = {};
        
        objects.forEach(obj => {
            if (obj && typeof obj === 'object') {
                const clonedObj = this.deepCloneRecursive(obj);
                Object.assign(result, clonedObj);
            }
        });
        
        return result;
    }
    
    // Compare objects for equality (deep comparison)
    static deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        
        if (obj1 === null || obj2 === null) {
            return obj1 === obj2;
        }
        
        if (typeof obj1 !== typeof obj2) {
            return false;
        }
        
        if (typeof obj1 !== 'object') {
            return obj1 === obj2;
        }
        
        if (Array.isArray(obj1) !== Array.isArray(obj2)) {
            return false;
        }
        
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) {
            return false;
        }
        
        for (const key of keys1) {
            if (!keys2.includes(key)) {
                return false;
            }
            
            if (!this.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
        
        return true;
    }
}

// Specialized cloning utilities
class ArrayCloner {
    // Clone array with element transformation
    static cloneAndTransform(arr, transformFn) {
        return arr.map((item, index) => transformFn(item, index));
    }
    
    // Clone array with filtering
    static cloneAndFilter(arr, filterFn) {
        return arr.filter(filterFn).map(item => 
            typeof item === 'object' ? ObjectCloner.deepCloneRecursive(item) : item
        );
    }
    
    // Clone and sort array
    static cloneAndSort(arr, compareFn) {
        const cloned = [...arr];
        return cloned.sort(compareFn);
    }
    
    // Clone array and remove duplicates
    static cloneAndDeduplicate(arr, keyFn = item => item) {
        const seen = new Set();
        return arr.filter(item => {
            const key = keyFn(item);
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        }).map(item => 
            typeof item === 'object' ? ObjectCloner.deepCloneRecursive(item) : item
        );
    }
}

// Performance testing utilities
class ClonePerformanceTester {
    static testClonePerformance(obj, iterations = 1000) {
        const methods = [
            { name: 'Spread Operator', fn: () => ObjectCloner.shallowCloneSpread(obj) },
            { name: 'Object.assign', fn: () => ObjectCloner.shallowCloneAssign(obj) },
            { name: 'JSON Clone', fn: () => ObjectCloner.deepCloneJSON(obj) },
            { name: 'Recursive Clone', fn: () => ObjectCloner.deepCloneRecursive(obj) },
            { name: 'Advanced Clone', fn: () => ObjectCloner.deepCloneAdvanced(obj) }
        ];
        
        const results = {};
        
        methods.forEach(method => {
            const startTime = performance.now();
            
            for (let i = 0; i < iterations; i++) {
                method.fn();
            }
            
            const endTime = performance.now();
            results[method.name] = {
                totalTime: endTime - startTime,
                averageTime: (endTime - startTime) / iterations
            };
        });
        
        return results;
    }
}

// Demo and testing
console.log("🧪 TESTING EXERCISE 11: OBJECT CLONING UTILITIES");
console.log("=" .repeat(70));

// Test data
const originalObject = {
    id: 1,
    name: "John Doe",
    age: 30,
    address: {
        street: "123 Main St",
        city: "New York",
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    },
    hobbies: ["reading", "swimming", "coding"],
    createdAt: new Date(),
    isActive: true,
    metadata: {
        tags: ["user", "premium"],
        settings: {
            theme: "dark",
            notifications: true
        }
    }
};

console.log("📋 Original Object:");
console.log("Original object created with nested properties");

console.log("\n" + "=" .repeat(70));
console.log("🔄 Shallow Cloning Tests:");

// Shallow clone with spread
const shallowSpread = ObjectCloner.shallowCloneSpread(originalObject);
shallowSpread.name = "Jane Doe";
shallowSpread.address.city = "Los Angeles"; // This will affect original!

console.log("Original city after shallow clone modification:", originalObject.address.city);
console.log("Shallow clone city:", shallowSpread.address.city);

console.log("\n" + "=" .repeat(70));
console.log("🏗️ Deep Cloning Tests:");

// Reset original object
originalObject.address.city = "New York";

// Deep clone with JSON
const deepJSON = ObjectCloner.deepCloneJSON(originalObject);
deepJSON.address.city = "Chicago";
deepJSON.name = "Bob Smith";

console.log("Original city after deep JSON clone:", originalObject.address.city);
console.log("Deep JSON clone city:", deepJSON.address.city);

// Deep clone with recursive method
const deepRecursive = ObjectCloner.deepCloneRecursive(originalObject);
deepRecursive.address.coordinates.lat = 41.8781;
deepRecursive.hobbies.push("gaming");

console.log("Original coordinates:", originalObject.address.coordinates);
console.log("Deep recursive clone coordinates:", deepRecursive.address.coordinates);
console.log("Original hobbies length:", originalObject.hobbies.length);
console.log("Deep recursive clone hobbies length:", deepRecursive.hobbies.length);

console.log("\n" + "=" .repeat(70));
console.log("🔍 Advanced Cloning Features:");

// Clone with filtering (exclude sensitive data)
const filteredClone = ObjectCloner.cloneWithFilter(originalObject, (key, value) => {
    return !['id', 'createdAt'].includes(key);
});

console.log("Filtered clone keys:", Object.keys(filteredClone));
console.log("Has ID:", 'id' in filteredClone);
console.log("Has createdAt:", 'createdAt' in filteredClone);

// Clone with transformation
const transformedClone = ObjectCloner.cloneWithTransform(originalObject, (key, value) => {
    if (key === 'name') {
        return value.toUpperCase();
    }
    if (key === 'age') {
        return value + 1; // Add one year
    }
    return value;
});

console.log("Original name:", originalObject.name);
console.log("Transformed name:", transformedClone.name);
console.log("Original age:", originalObject.age);
console.log("Transformed age:", transformedClone.age);

console.log("\n" + "=" .repeat(70));
console.log("🔗 Circular Reference Test:");

// Create object with circular reference
const circularObj = { name: "Circular" };
circularObj.self = circularObj;

try {
    const circularClone = ObjectCloner.deepCloneAdvanced(circularObj);
    console.log("✅ Circular reference handled successfully");
    console.log("Clone has self reference:", circularClone.self === circularClone);
} catch (error) {
    console.log("❌ Circular reference error:", error.message);
}

console.log("\n" + "=" .repeat(70));
console.log("📊 Array Cloning Tests:");

const originalArray = [
    { id: 1, name: "Alice", score: 95 },
    { id: 2, name: "Bob", score: 87 },
    { id: 3, name: "Charlie", score: 92 },
    { id: 1, name: "Alice", score: 95 }, // Duplicate
];

// Clone and transform
const transformedArray = ArrayCloner.cloneAndTransform(originalArray, (item, index) => ({
    ...item,
    index,
    grade: item.score >= 90 ? 'A' : 'B'
}));

console.log("Transformed array sample:", transformedArray[0]);

// Clone and filter
const highScorers = ArrayCloner.cloneAndFilter(originalArray, item => item.score >= 90);
console.log("High scorers count:", highScorers.length);

// Clone and deduplicate
const uniqueUsers = ArrayCloner.cloneAndDeduplicate(originalArray, item => item.id);
console.log("Original array length:", originalArray.length);
console.log("Deduplicated array length:", uniqueUsers.length);

// Clone and sort
const sortedByScore = ArrayCloner.cloneAndSort(originalArray, (a, b) => b.score - a.score);
console.log("Sorted array (first item):", sortedByScore[0]);

console.log("\n" + "=" .repeat(70));
console.log("🔍 Object Equality Testing:");

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log("obj1 === obj2:", obj1 === obj2); // false (different references)
console.log("Deep equal obj1 and obj2:", ObjectCloner.deepEqual(obj1, obj2)); // true
console.log("Deep equal obj1 and obj3:", ObjectCloner.deepEqual(obj1, obj3)); // false

console.log("\n" + "=" .repeat(70));
console.log("⚡ Performance Comparison:");

const performanceResults = ClonePerformanceTester.testClonePerformance(originalObject, 100);

Object.entries(performanceResults).forEach(([method, result]) => {
    console.log(`${method}: ${result.totalTime.toFixed(2)}ms total, ${result.averageTime.toFixed(4)}ms avg`);
});

console.log("\n" + "=" .repeat(70));
console.log("🔄 Merge with Clone:");

const obj1ToMerge = { a: 1, b: { x: 10 } };
const obj2ToMerge = { b: { y: 20 }, c: 3 };

const merged = ObjectCloner.mergeWithClone(obj1ToMerge, obj2ToMerge);
console.log("Merged object:", merged);

// Modify original to show independence
obj1ToMerge.a = 999;
console.log("Original obj1 modified, merged obj1.a:", merged.a); // Should still be 1

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ObjectCloner,
        ArrayCloner,
        ClonePerformanceTester
    };
}
