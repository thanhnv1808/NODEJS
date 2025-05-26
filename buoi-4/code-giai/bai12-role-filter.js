/**
 * Exercise 12: Role-based Filtering System
 * Create a system to filter users by role using destructuring and arrow functions.
 */

// Sample user data
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@company.com",
        role: "admin",
        department: "IT",
        permissions: ["read", "write", "delete", "manage_users"],
        profile: {
            age: 35,
            experience: 8,
            skills: ["JavaScript", "Node.js", "React"],
            location: { city: "New York", country: "USA" }
        },
        isActive: true,
        joinedAt: "2020-01-15",
        lastLogin: "2024-05-25"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@company.com",
        role: "moderator",
        department: "Content",
        permissions: ["read", "write", "moderate"],
        profile: {
            age: 28,
            experience: 4,
            skills: ["Content Writing", "SEO", "Social Media"],
            location: { city: "Los Angeles", country: "USA" }
        },
        isActive: true,
        joinedAt: "2021-03-20",
        lastLogin: "2024-05-24"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@company.com",
        role: "user",
        department: "Sales",
        permissions: ["read"],
        profile: {
            age: 32,
            experience: 6,
            skills: ["Sales", "CRM", "Customer Service"],
            location: { city: "Chicago", country: "USA" }
        },
        isActive: true,
        joinedAt: "2019-07-10",
        lastLogin: "2024-05-23"
    },
    {
        id: 4,
        name: "Alice Brown",
        email: "alice@company.com",
        role: "admin",
        department: "HR",
        permissions: ["read", "write", "delete", "manage_users", "hr_admin"],
        profile: {
            age: 40,
            experience: 12,
            skills: ["HR Management", "Recruitment", "Training"],
            location: { city: "Boston", country: "USA" }
        },
        isActive: false,
        joinedAt: "2018-02-28",
        lastLogin: "2024-04-15"
    },
    {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@company.com",
        role: "moderator",
        department: "Support",
        permissions: ["read", "write", "support"],
        profile: {
            age: 26,
            experience: 2,
            skills: ["Customer Support", "Technical Writing", "Troubleshooting"],
            location: { city: "Seattle", country: "USA" }
        },
        isActive: true,
        joinedAt: "2022-11-05",
        lastLogin: "2024-05-25"
    },
    {
        id: 6,
        name: "Diana Prince",
        email: "diana@company.com",
        role: "user",
        department: "Marketing",
        permissions: ["read", "marketing"],
        profile: {
            age: 29,
            experience: 5,
            skills: ["Digital Marketing", "Analytics", "Campaign Management"],
            location: { city: "Miami", country: "USA" }
        },
        isActive: true,
        joinedAt: "2020-09-12",
        lastLogin: "2024-05-22"
    }
];

// Role-based filtering utilities
class RoleFilter {
    // Basic role filtering with destructuring
    static filterByRole(users, targetRole) {
        return users.filter(({ role }) => role === targetRole);
    }
    
    // Multiple roles filtering
    static filterByRoles(users, targetRoles) {
        return users.filter(({ role }) => targetRoles.includes(role));
    }
    
    // Filter with role hierarchy
    static filterByRoleHierarchy(users, minRole) {
        const roleHierarchy = {
            user: 1,
            moderator: 2,
            admin: 3
        };
        
        const minLevel = roleHierarchy[minRole] || 0;
        
        return users.filter(({ role }) => {
            return (roleHierarchy[role] || 0) >= minLevel;
        });
    }
    
    // Filter active users by role
    static filterActiveUsersByRole(users, targetRole) {
        return users.filter(({ role, isActive }) => 
            role === targetRole && isActive
        );
    }
    
    // Filter by role and department
    static filterByRoleAndDepartment(users, targetRole, targetDepartment) {
        return users.filter(({ role, department }) => 
            role === targetRole && department === targetDepartment
        );
    }
    
    // Filter by role with permission check
    static filterByRoleWithPermission(users, targetRole, requiredPermission) {
        return users.filter(({ role, permissions }) => 
            role === targetRole && permissions.includes(requiredPermission)
        );
    }
    
    // Advanced filtering with multiple criteria
    static filterAdvanced(users, criteria) {
        const {
            roles = [],
            departments = [],
            permissions = [],
            isActive = null,
            minExperience = 0,
            maxAge = Infinity,
            skills = [],
            cities = []
        } = criteria;
        
        return users.filter(user => {
            const { 
                role, 
                department, 
                permissions: userPermissions, 
                isActive: userActive,
                profile: { age, experience, skills: userSkills, location: { city } }
            } = user;
            
            // Check role
            if (roles.length > 0 && !roles.includes(role)) return false;
            
            // Check department
            if (departments.length > 0 && !departments.includes(department)) return false;
            
            // Check permissions
            if (permissions.length > 0 && !permissions.every(perm => userPermissions.includes(perm))) {
                return false;
            }
            
            // Check active status
            if (isActive !== null && userActive !== isActive) return false;
            
            // Check experience
            if (experience < minExperience) return false;
            
            // Check age
            if (age > maxAge) return false;
            
            // Check skills
            if (skills.length > 0 && !skills.some(skill => userSkills.includes(skill))) {
                return false;
            }
            
            // Check cities
            if (cities.length > 0 && !cities.includes(city)) return false;
            
            return true;
        });
    }
}

// User transformation utilities with destructuring
class UserTransformer {
    // Extract basic info with destructuring
    static extractBasicInfo(users) {
        return users.map(({ id, name, email, role, isActive }) => ({
            id,
            name,
            email,
            role,
            isActive
        }));
    }
    
    // Extract profile info with nested destructuring
    static extractProfileInfo(users) {
        return users.map(({ 
            id, 
            name, 
            profile: { 
                age, 
                experience, 
                skills, 
                location: { city, country } 
            } 
        }) => ({
            id,
            name,
            age,
            experience,
            skills,
            location: `${city}, ${country}`
        }));
    }
    
    // Transform users with role-based data
    static transformByRole(users) {
        return users.map(user => {
            const { role, permissions, ...basicInfo } = user;
            
            const roleConfig = {
                admin: { level: 3, canManageUsers: true, badge: "👑" },
                moderator: { level: 2, canModerate: true, badge: "🛡️" },
                user: { level: 1, canView: true, badge: "👤" }
            };
            
            return {
                ...basicInfo,
                role,
                permissions,
                roleInfo: roleConfig[role] || { level: 0, badge: "❓" }
            };
        });
    }
    
    // Group users by role
    static groupByRole(users) {
        return users.reduce((groups, user) => {
            const { role } = user;
            if (!groups[role]) {
                groups[role] = [];
            }
            groups[role].push(user);
            return groups;
        }, {});
    }
    
    // Create role summary
    static createRoleSummary(users) {
        const grouped = this.groupByRole(users);
        
        return Object.entries(grouped).map(([role, roleUsers]) => {
            const activeCount = roleUsers.filter(({ isActive }) => isActive).length;
            const avgExperience = roleUsers.reduce((sum, { profile: { experience } }) => 
                sum + experience, 0) / roleUsers.length;
            
            return {
                role,
                totalUsers: roleUsers.length,
                activeUsers: activeCount,
                inactiveUsers: roleUsers.length - activeCount,
                averageExperience: Math.round(avgExperience * 10) / 10,
                departments: [...new Set(roleUsers.map(({ department }) => department))]
            };
        });
    }
}

// Role-based analytics
class RoleAnalytics {
    // Get role distribution
    static getRoleDistribution(users) {
        return users.reduce((distribution, { role }) => {
            distribution[role] = (distribution[role] || 0) + 1;
            return distribution;
        }, {});
    }
    
    // Get permission analysis
    static getPermissionAnalysis(users) {
        const allPermissions = new Set();
        const permissionByRole = {};
        
        users.forEach(({ role, permissions }) => {
            permissions.forEach(perm => allPermissions.add(perm));
            
            if (!permissionByRole[role]) {
                permissionByRole[role] = new Set();
            }
            permissions.forEach(perm => permissionByRole[role].add(perm));
        });
        
        // Convert Sets to Arrays for easier handling
        Object.keys(permissionByRole).forEach(role => {
            permissionByRole[role] = Array.from(permissionByRole[role]);
        });
        
        return {
            allPermissions: Array.from(allPermissions),
            permissionsByRole: permissionByRole
        };
    }
    
    // Get department-role matrix
    static getDepartmentRoleMatrix(users) {
        return users.reduce((matrix, { department, role }) => {
            if (!matrix[department]) {
                matrix[department] = {};
            }
            matrix[department][role] = (matrix[department][role] || 0) + 1;
            return matrix;
        }, {});
    }
}

// Demo and testing
console.log("🧪 TESTING EXERCISE 12: ROLE-BASED FILTERING SYSTEM");
console.log("=" .repeat(70));

console.log("👥 Total Users:", users.length);

console.log("\n" + "=" .repeat(70));
console.log("🔍 Basic Role Filtering:");

// Filter by single role
const admins = RoleFilter.filterByRole(users, "admin");
console.log(`Admins (${admins.length}):`, admins.map(({ name, department }) => `${name} (${department})`));

const moderators = RoleFilter.filterByRole(users, "moderator");
console.log(`Moderators (${moderators.length}):`, moderators.map(({ name, department }) => `${name} (${department})`));

// Filter by multiple roles
const privilegedUsers = RoleFilter.filterByRoles(users, ["admin", "moderator"]);
console.log(`Privileged Users (${privilegedUsers.length}):`, privilegedUsers.map(({ name, role }) => `${name} (${role})`));

console.log("\n" + "=" .repeat(70));
console.log("📊 Role Hierarchy Filtering:");

// Filter by role hierarchy
const moderatorAndAbove = RoleFilter.filterByRoleHierarchy(users, "moderator");
console.log(`Moderator level and above (${moderatorAndAbove.length}):`, 
    moderatorAndAbove.map(({ name, role }) => `${name} (${role})`));

console.log("\n" + "=" .repeat(70));
console.log("✅ Active Users by Role:");

// Filter active users by role
const activeAdmins = RoleFilter.filterActiveUsersByRole(users, "admin");
console.log(`Active Admins (${activeAdmins.length}):`, activeAdmins.map(({ name }) => name));

console.log("\n" + "=" .repeat(70));
console.log("🏢 Role and Department Filtering:");

// Filter by role and department
const itAdmins = RoleFilter.filterByRoleAndDepartment(users, "admin", "IT");
console.log(`IT Admins (${itAdmins.length}):`, itAdmins.map(({ name }) => name));

console.log("\n" + "=" .repeat(70));
console.log("🔐 Permission-based Filtering:");

// Filter by role with specific permission
const usersWithDeletePermission = RoleFilter.filterByRoleWithPermission(users, "admin", "delete");
console.log(`Admins with delete permission (${usersWithDeletePermission.length}):`, 
    usersWithDeletePermission.map(({ name }) => name));

console.log("\n" + "=" .repeat(70));
console.log("🎯 Advanced Multi-criteria Filtering:");

// Advanced filtering
const advancedCriteria = {
    roles: ["admin", "moderator"],
    isActive: true,
    minExperience: 3,
    skills: ["JavaScript"],
    cities: ["New York", "Los Angeles"]
};

const advancedResults = RoleFilter.filterAdvanced(users, advancedCriteria);
console.log(`Advanced filter results (${advancedResults.length}):`, 
    advancedResults.map(({ name, role, profile: { experience } }) => 
        `${name} (${role}, ${experience}y exp)`));

console.log("\n" + "=" .repeat(70));
console.log("🔄 User Data Transformation:");

// Extract basic info
const basicInfo = UserTransformer.extractBasicInfo(users.slice(0, 3));
console.log("Basic Info Sample:", basicInfo);

// Extract profile info with nested destructuring
const profileInfo = UserTransformer.extractProfileInfo(users.slice(0, 2));
console.log("Profile Info Sample:", profileInfo);

console.log("\n" + "=" .repeat(70));
console.log("👑 Role-based Transformation:");

// Transform with role info
const transformedUsers = UserTransformer.transformByRole(users.slice(0, 3));
console.log("Transformed Users Sample:");
transformedUsers.forEach(({ name, role, roleInfo }) => {
    console.log(`  ${roleInfo.badge} ${name} - ${role} (Level ${roleInfo.level})`);
});

console.log("\n" + "=" .repeat(70));
console.log("📈 Role Analytics:");

// Role distribution
const roleDistribution = RoleAnalytics.getRoleDistribution(users);
console.log("Role Distribution:", roleDistribution);

// Role summary
const roleSummary = UserTransformer.createRoleSummary(users);
console.log("Role Summary:");
roleSummary.forEach(summary => {
    console.log(`  ${summary.role}: ${summary.totalUsers} total, ${summary.activeUsers} active, avg exp: ${summary.averageExperience}y`);
});

// Permission analysis
const permissionAnalysis = RoleAnalytics.getPermissionAnalysis(users);
console.log("All Permissions:", permissionAnalysis.allPermissions);
console.log("Permissions by Role:", permissionAnalysis.permissionsByRole);

// Department-role matrix
const departmentRoleMatrix = RoleAnalytics.getDepartmentRoleMatrix(users);
console.log("Department-Role Matrix:", departmentRoleMatrix);

console.log("\n" + "=" .repeat(70));
console.log("🔍 Complex Filtering Examples:");

// Find senior admins in specific departments
const seniorAdmins = users
    .filter(({ role, profile: { experience }, department }) => 
        role === "admin" && experience >= 8 && ["IT", "HR"].includes(department))
    .map(({ name, department, profile: { experience } }) => 
        ({ name, department, experience }));

console.log("Senior Admins in IT/HR:", seniorAdmins);

// Find users who can manage others
const userManagers = users
    .filter(({ permissions }) => permissions.includes("manage_users"))
    .map(({ name, role, department }) => ({ name, role, department }));

console.log("Users who can manage others:", userManagers);

// Find recently joined active users
const recentActiveUsers = users
    .filter(({ isActive, joinedAt }) => {
        const joinDate = new Date(joinedAt);
        const cutoffDate = new Date("2021-01-01");
        return isActive && joinDate >= cutoffDate;
    })
    .map(({ name, role, joinedAt }) => ({ name, role, joinedAt }));

console.log("Recently joined active users:", recentActiveUsers);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RoleFilter,
        UserTransformer,
        RoleAnalytics,
        users
    };
}
