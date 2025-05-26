/**
 * Exercise 10: User Class System
 * Create a User class with authentication, role management, and user operations.
 */

// Base User class
class User {
    static userCount = 0;
    static users = [];
    
    constructor({ name, email, age, role = 'user', department = null }) {
        this.id = ++User.userCount;
        this.name = name;
        this.email = email;
        this.age = age;
        this.role = role;
        this.department = department;
        this.isActive = true;
        this.createdAt = new Date();
        this.lastLogin = null;
        this.loginAttempts = 0;
        this.isLocked = false;
        
        User.users.push(this);
    }
    
    // Getter methods
    get displayName() {
        return this.name.toUpperCase();
    }
    
    get userInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            isActive: this.isActive
        };
    }
    
    get isAdmin() {
        return this.role === 'admin';
    }
    
    get isModerator() {
        return this.role === 'moderator';
    }
    
    // Setter methods
    set userRole(newRole) {
        const validRoles = ['user', 'moderator', 'admin'];
        if (validRoles.includes(newRole)) {
            this.role = newRole;
            this.updatedAt = new Date();
        } else {
            throw new Error(`Invalid role: ${newRole}`);
        }
    }
    
    // Authentication methods
    login(password) {
        if (this.isLocked) {
            throw new Error('Account is locked due to too many failed attempts');
        }
        
        if (!this.isActive) {
            throw new Error('Account is deactivated');
        }
        
        // Simulate password check (in real app, use proper hashing)
        const isValidPassword = password === 'password123'; // Demo password
        
        if (isValidPassword) {
            this.lastLogin = new Date();
            this.loginAttempts = 0;
            console.log(`✅ ${this.name} logged in successfully`);
            return true;
        } else {
            this.loginAttempts++;
            if (this.loginAttempts >= 3) {
                this.isLocked = true;
                console.log(`🔒 Account locked for ${this.name}`);
            }
            console.log(`❌ Invalid password for ${this.name}`);
            return false;
        }
    }
    
    logout() {
        console.log(`👋 ${this.name} logged out`);
    }
    
    unlockAccount() {
        this.isLocked = false;
        this.loginAttempts = 0;
        console.log(`🔓 Account unlocked for ${this.name}`);
    }
    
    // Profile management
    updateProfile({ name, email, age, department }) {
        if (name) this.name = name;
        if (email) this.email = email;
        if (age) this.age = age;
        if (department) this.department = department;
        this.updatedAt = new Date();
    }
    
    deactivate() {
        this.isActive = false;
        this.deactivatedAt = new Date();
        console.log(`❌ User ${this.name} deactivated`);
    }
    
    activate() {
        this.isActive = true;
        this.activatedAt = new Date();
        console.log(`✅ User ${this.name} activated`);
    }
    
    // Permission checking
    hasPermission(action) {
        const permissions = {
            user: ['read'],
            moderator: ['read', 'write'],
            admin: ['read', 'write', 'delete', 'manage_users']
        };
        
        return permissions[this.role]?.includes(action) || false;
    }
    
    // Static methods
    static findById(id) {
        return User.users.find(user => user.id === id);
    }
    
    static findByEmail(email) {
        return User.users.find(user => user.email === email);
    }
    
    static findByRole(role) {
        return User.users.filter(user => user.role === role);
    }
    
    static getActiveUsers() {
        return User.users.filter(user => user.isActive);
    }
    
    static getUserStats() {
        const totalUsers = User.users.length;
        const activeUsers = User.getActiveUsers().length;
        const roleDistribution = User.users.reduce((stats, user) => {
            stats[user.role] = (stats[user.role] || 0) + 1;
            return stats;
        }, {});
        
        return {
            totalUsers,
            activeUsers,
            inactiveUsers: totalUsers - activeUsers,
            roleDistribution
        };
    }
}

// Admin class extending User
class Admin extends User {
    constructor({ name, email, age, department = 'Administration' }) {
        super({ name, email, age, role: 'admin', department });
        this.permissions = ['read', 'write', 'delete', 'manage_users', 'system_admin'];
    }
    
    // Admin-specific methods
    createUser(userData) {
        const newUser = new User(userData);
        console.log(`👤 Admin ${this.name} created user: ${newUser.name}`);
        return newUser;
    }
    
    deleteUser(userId) {
        const userIndex = User.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            const deletedUser = User.users.splice(userIndex, 1)[0];
            console.log(`🗑️ Admin ${this.name} deleted user: ${deletedUser.name}`);
            return deletedUser;
        }
        throw new Error(`User with ID ${userId} not found`);
    }
    
    changeUserRole(userId, newRole) {
        const user = User.findById(userId);
        if (user) {
            const oldRole = user.role;
            user.userRole = newRole;
            console.log(`🔄 Admin ${this.name} changed ${user.name}'s role from ${oldRole} to ${newRole}`);
            return user;
        }
        throw new Error(`User with ID ${userId} not found`);
    }
    
    unlockUserAccount(userId) {
        const user = User.findById(userId);
        if (user) {
            user.unlockAccount();
            console.log(`🔓 Admin ${this.name} unlocked account for ${user.name}`);
            return user;
        }
        throw new Error(`User with ID ${userId} not found`);
    }
    
    generateUserReport() {
        const stats = User.getUserStats();
        const report = {
            generatedBy: this.name,
            generatedAt: new Date(),
            statistics: stats,
            users: User.users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt
            }))
        };
        
        console.log(`📊 Admin ${this.name} generated user report`);
        return report;
    }
}

// Moderator class extending User
class Moderator extends User {
    constructor({ name, email, age, department = 'Moderation' }) {
        super({ name, email, age, role: 'moderator', department });
        this.permissions = ['read', 'write', 'moderate_content'];
    }
    
    moderateUser(userId, action) {
        const user = User.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        
        switch (action) {
            case 'warn':
                console.log(`⚠️ Moderator ${this.name} warned user ${user.name}`);
                break;
            case 'suspend':
                user.deactivate();
                console.log(`⏸️ Moderator ${this.name} suspended user ${user.name}`);
                break;
            case 'unsuspend':
                user.activate();
                console.log(`▶️ Moderator ${this.name} unsuspended user ${user.name}`);
                break;
            default:
                throw new Error(`Invalid moderation action: ${action}`);
        }
        
        return user;
    }
}

// User Management System
class UserManagementSystem {
    static authenticateUser(email, password) {
        const user = User.findByEmail(email);
        if (user) {
            return user.login(password);
        }
        throw new Error('User not found');
    }
    
    static registerUser(userData) {
        // Check if email already exists
        const existingUser = User.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }
        
        const newUser = new User(userData);
        console.log(`📝 New user registered: ${newUser.name}`);
        return newUser;
    }
    
    static getUsersByDepartment(department) {
        return User.users.filter(user => user.department === department);
    }
    
    static searchUsers(searchTerm) {
        const term = searchTerm.toLowerCase();
        return User.users.filter(user => 
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term)
        );
    }
}

// Demo and testing
console.log("🧪 TESTING EXERCISE 10: USER CLASS SYSTEM");
console.log("=" .repeat(70));

console.log("👤 Creating Users:");

// Create regular users
const user1 = new User({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    department: "Engineering"
});

const user2 = new User({
    name: "Jane Smith",
    email: "jane@example.com",
    age: 28,
    role: "moderator",
    department: "Content"
});

// Create admin
const admin = new Admin({
    name: "Alice Admin",
    email: "alice@example.com",
    age: 35
});

// Create moderator
const moderator = new Moderator({
    name: "Bob Moderator",
    email: "bob@example.com",
    age: 32
});

console.log(`✅ Created ${User.userCount} users`);

console.log("\n" + "=" .repeat(70));
console.log("🔐 Authentication Testing:");

// Test login
user1.login("password123");
user2.login("wrongpassword");
user2.login("wrongpassword");
user2.login("wrongpassword"); // Should lock account

console.log("\n" + "=" .repeat(70));
console.log("👑 Admin Operations:");

// Admin creates new user
const newUser = admin.createUser({
    name: "Charlie User",
    email: "charlie@example.com",
    age: 25,
    department: "Marketing"
});

// Admin changes user role
admin.changeUserRole(newUser.id, "moderator");

// Admin unlocks account
admin.unlockUserAccount(user2.id);

console.log("\n" + "=" .repeat(70));
console.log("🛡️ Moderator Operations:");

// Moderator actions
moderator.moderateUser(user1.id, "warn");
moderator.moderateUser(newUser.id, "suspend");
moderator.moderateUser(newUser.id, "unsuspend");

console.log("\n" + "=" .repeat(70));
console.log("🔍 User Search and Filtering:");

// Search users
const searchResults = UserManagementSystem.searchUsers("john");
console.log("Search results for 'john':", searchResults.map(u => u.name));

// Filter by role
const admins = User.findByRole("admin");
console.log("Admins:", admins.map(u => u.name));

// Filter by department
const engineeringUsers = UserManagementSystem.getUsersByDepartment("Engineering");
console.log("Engineering users:", engineeringUsers.map(u => u.name));

console.log("\n" + "=" .repeat(70));
console.log("📊 User Statistics:");

const stats = User.getUserStats();
console.log("User Statistics:", stats);

// Generate admin report
const report = admin.generateUserReport();
console.log(`Report generated with ${report.users.length} users`);

console.log("\n" + "=" .repeat(70));
console.log("🔑 Permission Testing:");

const testPermissions = ['read', 'write', 'delete', 'manage_users'];
testPermissions.forEach(permission => {
    console.log(`${permission}:`);
    console.log(`  User: ${user1.hasPermission(permission)}`);
    console.log(`  Moderator: ${moderator.hasPermission(permission)}`);
    console.log(`  Admin: ${admin.hasPermission(permission)}`);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        User,
        Admin,
        Moderator,
        UserManagementSystem
    };
}
