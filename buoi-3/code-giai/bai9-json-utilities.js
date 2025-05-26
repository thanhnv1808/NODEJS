/**
 * Exercise 9: JSON Conversion Utilities
 * Build utilities for converting and processing JSON data.
 */

// JSON Utilities Class
class JSONUtils {
    // Safe JSON parse with error handling
    static safeParse(jsonString, defaultValue = null) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('JSON Parse Error:', error.message);
            return defaultValue;
        }
    }
    
    // Safe JSON stringify with error handling
    static safeStringify(data, space = null) {
        try {
            return JSON.stringify(data, null, space);
        } catch (error) {
            console.error('JSON Stringify Error:', error.message);
            return null;
        }
    }
    
    // Deep clone object using JSON
    static deepClone(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (error) {
            console.error('Deep Clone Error:', error.message);
            return null;
        }
    }
    
    // Convert object to pretty formatted JSON
    static toPrettyJSON(data) {
        return this.safeStringify(data, 2);
    }
    
    // Convert object to minified JSON
    static toMinifiedJSON(data) {
        return this.safeStringify(data);
    }
    
    // Validate JSON structure against schema
    static validateSchema(data, schema) {
        const errors = [];
        
        function validateProperty(obj, schemaObj, path = '') {
            for (const key in schemaObj) {
                const currentPath = path ? `${path}.${key}` : key;
                const schemaRule = schemaObj[key];
                const value = obj[key];
                
                // Check if required property exists
                if (schemaRule.required && (value === undefined || value === null)) {
                    errors.push(`Missing required property: ${currentPath}`);
                    continue;
                }
                
                // Skip validation if property is optional and not present
                if (!schemaRule.required && (value === undefined || value === null)) {
                    continue;
                }
                
                // Check type
                if (schemaRule.type && typeof value !== schemaRule.type) {
                    errors.push(`Invalid type for ${currentPath}: expected ${schemaRule.type}, got ${typeof value}`);
                }
                
                // Check nested objects
                if (schemaRule.properties && typeof value === 'object' && !Array.isArray(value)) {
                    validateProperty(value, schemaRule.properties, currentPath);
                }
                
                // Check arrays
                if (schemaRule.items && Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (schemaRule.items.type && typeof item !== schemaRule.items.type) {
                            errors.push(`Invalid array item type at ${currentPath}[${index}]: expected ${schemaRule.items.type}, got ${typeof item}`);
                        }
                    });
                }
            }
        }
        
        validateProperty(data, schema);
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    // Flatten nested JSON object
    static flatten(obj, prefix = '', separator = '.') {
        const flattened = {};
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}${separator}${key}` : key;
                
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(flattened, this.flatten(obj[key], newKey, separator));
                } else {
                    flattened[newKey] = obj[key];
                }
            }
        }
        
        return flattened;
    }
    
    // Unflatten flattened JSON object
    static unflatten(obj, separator = '.') {
        const result = {};
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const keys = key.split(separator);
                let current = result;
                
                for (let i = 0; i < keys.length - 1; i++) {
                    const k = keys[i];
                    if (!(k in current)) {
                        current[k] = {};
                    }
                    current = current[k];
                }
                
                current[keys[keys.length - 1]] = obj[key];
            }
        }
        
        return result;
    }
    
    // Filter JSON object by keys
    static filterByKeys(obj, allowedKeys) {
        const filtered = {};
        
        allowedKeys.forEach(key => {
            if (obj.hasOwnProperty(key)) {
                filtered[key] = obj[key];
            }
        });
        
        return filtered;
    }
    
    // Transform JSON object keys
    static transformKeys(obj, transformer) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.transformKeys(item, transformer));
        }
        
        if (typeof obj === 'object' && obj !== null) {
            const transformed = {};
            
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = transformer(key);
                    transformed[newKey] = this.transformKeys(obj[key], transformer);
                }
            }
            
            return transformed;
        }
        
        return obj;
    }
    
    // Convert camelCase to snake_case
    static camelToSnake(obj) {
        return this.transformKeys(obj, key => 
            key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        );
    }
    
    // Convert snake_case to camelCase
    static snakeToCamel(obj) {
        return this.transformKeys(obj, key =>
            key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
        );
    }
}

// Data Converter Class
class DataConverter {
    // Convert CSV string to JSON array
    static csvToJSON(csvString) {
        const lines = csvString.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            
            return obj;
        });
    }
    
    // Convert JSON array to CSV string
    static jsonToCSV(jsonArray) {
        if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
            return '';
        }
        
        const headers = Object.keys(jsonArray[0]);
        const csvHeaders = headers.join(',');
        
        const csvRows = jsonArray.map(obj => 
            headers.map(header => {
                const value = obj[header];
                // Escape commas and quotes in values
                return typeof value === 'string' && (value.includes(',') || value.includes('"'))
                    ? `"${value.replace(/"/g, '""')}"`
                    : value;
            }).join(',')
        );
        
        return [csvHeaders, ...csvRows].join('\n');
    }
    
    // Convert XML-like object to JSON
    static xmlObjectToJSON(xmlObj) {
        function convertNode(node) {
            if (typeof node === 'string') {
                return node;
            }
            
            const result = {};
            
            if (node.attributes) {
                result['@attributes'] = node.attributes;
            }
            
            if (node.children) {
                node.children.forEach(child => {
                    const key = child.tagName;
                    const value = convertNode(child);
                    
                    if (result[key]) {
                        if (!Array.isArray(result[key])) {
                            result[key] = [result[key]];
                        }
                        result[key].push(value);
                    } else {
                        result[key] = value;
                    }
                });
            }
            
            if (node.textContent && Object.keys(result).length === 0) {
                return node.textContent;
            }
            
            if (node.textContent) {
                result['#text'] = node.textContent;
            }
            
            return result;
        }
        
        return convertNode(xmlObj);
    }
}

// API Response Processor
class APIResponseProcessor {
    // Process paginated API response
    static processPaginatedResponse(response) {
        const processed = {
            data: response.data || [],
            pagination: {
                currentPage: response.page || 1,
                totalPages: response.totalPages || 1,
                totalItems: response.total || 0,
                itemsPerPage: response.limit || 10,
                hasNextPage: false,
                hasPreviousPage: false
            },
            meta: {
                processedAt: new Date().toISOString(),
                itemCount: (response.data || []).length
            }
        };
        
        processed.pagination.hasNextPage = processed.pagination.currentPage < processed.pagination.totalPages;
        processed.pagination.hasPreviousPage = processed.pagination.currentPage > 1;
        
        return processed;
    }
    
    // Normalize API response format
    static normalizeResponse(response, config = {}) {
        const {
            dataKey = 'data',
            errorKey = 'error',
            messageKey = 'message',
            statusKey = 'status'
        } = config;
        
        return {
            success: !response[errorKey],
            data: response[dataKey] || null,
            error: response[errorKey] || null,
            message: response[messageKey] || '',
            status: response[statusKey] || 'unknown',
            timestamp: new Date().toISOString()
        };
    }
    
    // Extract nested data from complex API responses
    static extractNestedData(response, path) {
        const keys = path.split('.');
        let current = response;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return null;
            }
        }
        
        return current;
    }
}

// Demo and testing
console.log("🧪 TESTING EXERCISE 9: JSON CONVERSION UTILITIES");
console.log("=" .repeat(70));

console.log("🔧 Basic JSON Utilities:");

// Test safe parsing
const validJSON = '{"name": "John", "age": 30}';
const invalidJSON = '{"name": "John", "age":}';

console.log("✅ Valid JSON:", JSONUtils.safeParse(validJSON));
console.log("❌ Invalid JSON:", JSONUtils.safeParse(invalidJSON, { error: "Invalid JSON" }));

// Test deep clone
const originalObject = {
    user: { name: "John", preferences: { theme: "dark" } },
    items: [1, 2, 3]
};

const clonedObject = JSONUtils.deepClone(originalObject);
clonedObject.user.name = "Jane";
console.log("Original:", originalObject.user.name);
console.log("Cloned:", clonedObject.user.name);

console.log("\n" + "=" .repeat(70));
console.log("📋 Schema Validation:");

const userSchema = {
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    email: { type: 'string', required: false },
    address: {
        type: 'object',
        required: false,
        properties: {
            street: { type: 'string', required: true },
            city: { type: 'string', required: true }
        }
    }
};

const validUser = { name: "John", age: 30, address: { street: "123 Main St", city: "NYC" } };
const invalidUser = { name: "John", age: "thirty" };

console.log("Valid user validation:", JSONUtils.validateSchema(validUser, userSchema));
console.log("Invalid user validation:", JSONUtils.validateSchema(invalidUser, userSchema));

console.log("\n" + "=" .repeat(70));
console.log("🔄 Object Transformation:");

const nestedObject = {
    user: {
        personalInfo: {
            firstName: "John",
            lastName: "Doe"
        },
        contactInfo: {
            email: "john@example.com"
        }
    }
};

const flattened = JSONUtils.flatten(nestedObject);
console.log("Flattened:", flattened);

const unflattened = JSONUtils.unflatten(flattened);
console.log("Unflattened:", unflattened);

console.log("\n" + "=" .repeat(70));
console.log("🐍 Case Conversion:");

const camelCaseObj = {
    firstName: "John",
    lastName: "Doe",
    userPreferences: {
        darkMode: true,
        emailNotifications: false
    }
};

const snakeCaseObj = JSONUtils.camelToSnake(camelCaseObj);
console.log("Snake case:", snakeCaseObj);

const backToCamel = JSONUtils.snakeToCamel(snakeCaseObj);
console.log("Back to camel:", backToCamel);

console.log("\n" + "=" .repeat(70));
console.log("📊 Data Format Conversion:");

// CSV to JSON
const csvData = `name,age,city
John,30,New York
Jane,25,Los Angeles
Bob,35,Chicago`;

const jsonFromCSV = DataConverter.csvToJSON(csvData);
console.log("CSV to JSON:", jsonFromCSV);

// JSON to CSV
const csvFromJSON = DataConverter.jsonToCSV(jsonFromCSV);
console.log("JSON to CSV:");
console.log(csvFromJSON);

console.log("\n" + "=" .repeat(70));
console.log("🌐 API Response Processing:");

// Simulate API response
const apiResponse = {
    data: [
        { id: 1, name: "Product 1", price: 99.99 },
        { id: 2, name: "Product 2", price: 149.99 }
    ],
    page: 1,
    totalPages: 5,
    total: 50,
    limit: 10
};

const processedResponse = APIResponseProcessor.processPaginatedResponse(apiResponse);
console.log("Processed API Response:", processedResponse);

// Normalize different API response formats
const apiResponse1 = { data: { users: [] }, status: 'success' };
const apiResponse2 = { result: { users: [] }, code: 200 };

console.log("Normalized Response 1:", APIResponseProcessor.normalizeResponse(apiResponse1));
console.log("Normalized Response 2:", APIResponseProcessor.normalizeResponse(apiResponse2, {
    dataKey: 'result',
    statusKey: 'code'
}));

console.log("\n" + "=" .repeat(70));
console.log("🎯 Advanced JSON Operations:");

// Filter object by keys
const userProfile = {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "secret123",
    internalId: "internal-123"
};

const publicProfile = JSONUtils.filterByKeys(userProfile, ['id', 'name', 'email']);
console.log("Public profile:", publicProfile);

// Extract nested data
const complexResponse = {
    meta: {
        status: 'success',
        data: {
            users: {
                active: [
                    { name: "John", role: "admin" },
                    { name: "Jane", role: "user" }
                ]
            }
        }
    }
};

const activeUsers = APIResponseProcessor.extractNestedData(complexResponse, 'meta.data.users.active');
console.log("Extracted active users:", activeUsers);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        JSONUtils,
        DataConverter,
        APIResponseProcessor
    };
}
