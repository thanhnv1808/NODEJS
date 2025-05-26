/**
 * Exercise 8: Callback Delay Functions
 * Create delay functions with callbacks for handling asynchronous tasks.
 */

// Basic delay function with callback
function delay(milliseconds, callback) {
    setTimeout(() => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    }, milliseconds);
}

// Enhanced delay function with message and callback
function delayWithMessage(message, milliseconds, callback) {
    console.log(`⏳ Starting: ${message}`);
    
    setTimeout(() => {
        console.log(`✅ Completed: ${message}`);
        if (callback) {
            callback(message);
        }
    }, milliseconds);
}

// Delay function that passes data to callback
function delayWithData(data, milliseconds, callback) {
    setTimeout(() => {
        const result = {
            originalData: data,
            processedAt: new Date(),
            processingTime: milliseconds
        };
        
        if (callback) {
            callback(null, result); // Node.js style callback (error, data)
        }
    }, milliseconds);
}

// Sequential delay execution
function executeSequentially(tasks, callback) {
    if (tasks.length === 0) {
        if (callback) callback();
        return;
    }
    
    const [firstTask, ...remainingTasks] = tasks;
    
    delayWithMessage(firstTask.message, firstTask.delay, () => {
        executeSequentially(remainingTasks, callback);
    });
}

// Parallel delay execution with callback when all complete
function executeInParallel(tasks, callback) {
    let completedTasks = 0;
    const results = [];
    
    if (tasks.length === 0) {
        if (callback) callback(results);
        return;
    }
    
    tasks.forEach((task, index) => {
        delayWithData(task.data, task.delay, (error, result) => {
            if (error) {
                console.error(`❌ Task ${index} failed:`, error);
            } else {
                results[index] = result;
                console.log(`✅ Task ${index} completed`);
            }
            
            completedTasks++;
            
            if (completedTasks === tasks.length) {
                if (callback) {
                    callback(results);
                }
            }
        });
    });
}

// Retry mechanism with exponential backoff
function retryWithDelay(operation, maxRetries, baseDelay, callback) {
    let attempts = 0;
    
    function attempt() {
        attempts++;
        console.log(`🔄 Attempt ${attempts}/${maxRetries}`);
        
        operation((error, result) => {
            if (error && attempts < maxRetries) {
                const delayTime = baseDelay * Math.pow(2, attempts - 1); // Exponential backoff
                console.log(`⏳ Retrying in ${delayTime}ms...`);
                
                setTimeout(attempt, delayTime);
            } else {
                if (callback) {
                    callback(error, result, attempts);
                }
            }
        });
    }
    
    attempt();
}

// Debounce function - delays execution until after delay has passed
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Throttle function - limits execution to once per delay period
function throttle(func, delay) {
    let lastExecuted = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastExecuted >= delay) {
            lastExecuted = now;
            func.apply(this, args);
        }
    };
}

// Advanced: Rate limiter with queue
class RateLimiter {
    constructor(maxCalls, timeWindow) {
        this.maxCalls = maxCalls;
        this.timeWindow = timeWindow;
        this.calls = [];
        this.queue = [];
    }
    
    execute(func, callback) {
        const now = Date.now();
        
        // Remove old calls outside time window
        this.calls = this.calls.filter(callTime => now - callTime < this.timeWindow);
        
        if (this.calls.length < this.maxCalls) {
            // Execute immediately
            this.calls.push(now);
            this.executeFunction(func, callback);
        } else {
            // Add to queue
            this.queue.push({ func, callback });
            this.scheduleNext();
        }
    }
    
    executeFunction(func, callback) {
        try {
            const result = func();
            if (callback) callback(null, result);
        } catch (error) {
            if (callback) callback(error);
        }
    }
    
    scheduleNext() {
        if (this.queue.length === 0) return;
        
        const oldestCall = this.calls[0];
        const timeToWait = this.timeWindow - (Date.now() - oldestCall);
        
        setTimeout(() => {
            if (this.queue.length > 0) {
                const { func, callback } = this.queue.shift();
                this.execute(func, callback);
            }
        }, Math.max(0, timeToWait));
    }
}

// Simulation functions for testing
function simulateApiCall(data, callback) {
    const shouldFail = Math.random() < 0.3; // 30% chance of failure
    const delay = Math.random() * 2000 + 500; // 500-2500ms delay
    
    setTimeout(() => {
        if (shouldFail) {
            callback(new Error(`API call failed for ${data}`));
        } else {
            callback(null, { data, response: `Success for ${data}`, timestamp: new Date() });
        }
    }, delay);
}

function simulateFileProcessing(filename, callback) {
    const processingTime = Math.random() * 3000 + 1000; // 1-4 seconds
    
    console.log(`📁 Processing file: ${filename}`);
    
    setTimeout(() => {
        const result = {
            filename,
            size: Math.floor(Math.random() * 1000000),
            processedAt: new Date(),
            processingTime: Math.round(processingTime)
        };
        
        console.log(`✅ File processed: ${filename}`);
        callback(null, result);
    }, processingTime);
}

// Demo and testing
console.log("🧪 TESTING EXERCISE 8: CALLBACK DELAY FUNCTIONS");
console.log("=" .repeat(70));

console.log("⏱️ Basic Delay Functions:");
delay(1000, () => {
    console.log("✅ Basic delay completed after 1 second");
});

delayWithMessage("Processing user data", 1500, (message) => {
    console.log(`🎉 Callback received for: ${message}`);
});

console.log("\n" + "=" .repeat(70));
console.log("📊 Delay with Data Processing:");

delayWithData("User Profile", 2000, (error, result) => {
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("📋 Processing result:", result);
    }
});

console.log("\n" + "=" .repeat(70));
console.log("🔄 Sequential Task Execution:");

const sequentialTasks = [
    { message: "Initialize database", delay: 1000 },
    { message: "Load user data", delay: 800 },
    { message: "Process calculations", delay: 1200 },
    { message: "Generate report", delay: 600 }
];

executeSequentially(sequentialTasks, () => {
    console.log("🎉 All sequential tasks completed!");
});

console.log("\n" + "=" .repeat(70));
console.log("⚡ Parallel Task Execution:");

const parallelTasks = [
    { data: "Task A", delay: 1500 },
    { data: "Task B", delay: 1000 },
    { data: "Task C", delay: 2000 },
    { data: "Task D", delay: 800 }
];

executeInParallel(parallelTasks, (results) => {
    console.log("🎉 All parallel tasks completed!");
    console.log("📊 Results summary:", results.map(r => r.originalData));
});

console.log("\n" + "=" .repeat(70));
console.log("🔁 Retry Mechanism Demo:");

retryWithDelay(
    (callback) => simulateApiCall("important-data", callback),
    3, // max retries
    1000, // base delay
    (error, result, attempts) => {
        if (error) {
            console.log(`❌ Failed after ${attempts} attempts:`, error.message);
        } else {
            console.log(`✅ Success after ${attempts} attempts:`, result);
        }
    }
);

console.log("\n" + "=" .repeat(70));
console.log("🎛️ Debounce and Throttle Demo:");

// Debounce example
const debouncedLog = debounce((message) => {
    console.log(`🔄 Debounced: ${message} at ${new Date().toLocaleTimeString()}`);
}, 1000);

// Throttle example
const throttledLog = throttle((message) => {
    console.log(`⚡ Throttled: ${message} at ${new Date().toLocaleTimeString()}`);
}, 2000);

// Simulate rapid calls
console.log("Simulating rapid function calls...");
for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
        debouncedLog(`Debounce call ${i}`);
        throttledLog(`Throttle call ${i}`);
    }, i * 200);
}

console.log("\n" + "=" .repeat(70));
console.log("🚦 Rate Limiter Demo:");

const rateLimiter = new RateLimiter(3, 5000); // 3 calls per 5 seconds

for (let i = 1; i <= 6; i++) {
    rateLimiter.execute(
        () => {
            console.log(`🎯 Rate limited function executed: Call ${i}`);
            return `Result ${i}`;
        },
        (error, result) => {
            if (error) {
                console.error(`❌ Error in call ${i}:`, error);
            } else {
                console.log(`✅ Call ${i} result:`, result);
            }
        }
    );
}

console.log("\n" + "=" .repeat(70));
console.log("📁 File Processing Simulation:");

const files = ["document1.pdf", "image1.jpg", "data.csv", "report.docx"];

files.forEach((filename, index) => {
    setTimeout(() => {
        simulateFileProcessing(filename, (error, result) => {
            if (error) {
                console.error(`❌ Error processing ${filename}:`, error);
            } else {
                console.log(`📊 ${filename} processed: ${result.size} bytes in ${result.processingTime}ms`);
            }
        });
    }, index * 500); // Stagger the start times
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        delay,
        delayWithMessage,
        delayWithData,
        executeSequentially,
        executeInParallel,
        retryWithDelay,
        debounce,
        throttle,
        RateLimiter,
        simulateApiCall,
        simulateFileProcessing
    };
}
