/**
 * Exercise 6: Student Management System
 * Create a student management system with add, remove, search functionality.
 */

// Student Management Class
class StudentManager {
    constructor() {
        this.students = [];
        this.nextId = 1;
    }
    
    // Add new student
    addStudent(name, age, grade, email) {
        const student = {
            id: this.nextId++,
            name: name,
            age: age,
            grade: grade,
            email: email,
            createdAt: new Date(),
            isActive: true
        };
        
        this.students.push(student);
        return student;
    }
    
    // Remove student by ID
    removeStudent(studentId) {
        const index = this.students.findIndex(student => student.id === studentId);
        
        if (index !== -1) {
            const removedStudent = this.students.splice(index, 1)[0];
            return removedStudent;
        }
        
        return null;
    }
    
    // Soft delete - mark as inactive
    deactivateStudent(studentId) {
        const student = this.findStudentById(studentId);
        
        if (student) {
            student.isActive = false;
            return student;
        }
        
        return null;
    }
    
    // Find student by ID
    findStudentById(studentId) {
        return this.students.find(student => student.id === studentId);
    }
    
    // Find students by name (partial match)
    findStudentsByName(searchName) {
        return this.students.filter(student => 
            student.name.toLowerCase().includes(searchName.toLowerCase()) &&
            student.isActive
        );
    }
    
    // Find students by grade
    findStudentsByGrade(grade) {
        return this.students.filter(student => 
            student.grade === grade && student.isActive
        );
    }
    
    // Get all active students
    getAllActiveStudents() {
        return this.students.filter(student => student.isActive);
    }
    
    // Get all students (including inactive)
    getAllStudents() {
        return this.students;
    }
    
    // Update student information
    updateStudent(studentId, updates) {
        const student = this.findStudentById(studentId);
        
        if (student) {
            Object.assign(student, updates);
            student.updatedAt = new Date();
            return student;
        }
        
        return null;
    }
    
    // Get statistics
    getStatistics() {
        const activeStudents = this.getAllActiveStudents();
        
        const gradeStats = {};
        activeStudents.forEach(student => {
            gradeStats[student.grade] = (gradeStats[student.grade] || 0) + 1;
        });
        
        const ageStats = {
            min: Math.min(...activeStudents.map(s => s.age)),
            max: Math.max(...activeStudents.map(s => s.age)),
            average: activeStudents.reduce((sum, s) => sum + s.age, 0) / activeStudents.length
        };
        
        return {
            totalStudents: activeStudents.length,
            inactiveStudents: this.students.length - activeStudents.length,
            gradeDistribution: gradeStats,
            ageStatistics: ageStats
        };
    }
}

// Functional approach (alternative implementation)
const studentDatabase = {
    students: [],
    nextId: 1
};

// Functional helper functions
const createStudent = (name, age, grade, email) => ({
    id: studentDatabase.nextId++,
    name,
    age,
    grade,
    email,
    createdAt: new Date(),
    isActive: true
});

const addStudentFunctional = (name, age, grade, email) => {
    const student = createStudent(name, age, grade, email);
    studentDatabase.students.push(student);
    return student;
};

const removeStudentFunctional = (studentId) => {
    const index = studentDatabase.students.findIndex(s => s.id === studentId);
    return index !== -1 ? studentDatabase.students.splice(index, 1)[0] : null;
};

const findStudentFunctional = (predicate) => {
    return studentDatabase.students.filter(predicate);
};

const searchStudentsByName = (searchTerm) => {
    return findStudentFunctional(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        student.isActive
    );
};

// Demo and testing
console.log("🧪 TESTING EXERCISE 6: STUDENT MANAGEMENT SYSTEM");
console.log("=" .repeat(70));

// Create student manager instance
const manager = new StudentManager();

console.log("📝 Adding Students:");
const students = [
    { name: "Nguyễn Văn An", age: 20, grade: "A", email: "an@email.com" },
    { name: "Trần Thị Bình", age: 19, grade: "B", email: "binh@email.com" },
    { name: "Lê Văn Cường", age: 21, grade: "A", email: "cuong@email.com" },
    { name: "Phạm Thị Dung", age: 18, grade: "C", email: "dung@email.com" },
    { name: "Hoàng Văn Em", age: 22, grade: "B", email: "em@email.com" }
];

students.forEach(studentData => {
    const student = manager.addStudent(
        studentData.name, 
        studentData.age, 
        studentData.grade, 
        studentData.email
    );
    console.log(`✅ Added: ${student.name} (ID: ${student.id})`);
});

console.log("\n" + "=" .repeat(70));
console.log("👥 All Active Students:");
manager.getAllActiveStudents().forEach(student => {
    console.log(`ID: ${student.id} | Name: ${student.name} | Age: ${student.age} | Grade: ${student.grade}`);
});

console.log("\n" + "=" .repeat(70));
console.log("🔍 Search Tests:");

// Search by name
console.log("\n🔎 Search by name 'Văn':");
const searchResults = manager.findStudentsByName("Văn");
searchResults.forEach(student => {
    console.log(`  Found: ${student.name} (Grade: ${student.grade})`);
});

// Search by grade
console.log("\n🎓 Students in Grade A:");
const gradeAStudents = manager.findStudentsByGrade("A");
gradeAStudents.forEach(student => {
    console.log(`  ${student.name} - Age: ${student.age}`);
});

console.log("\n" + "=" .repeat(70));
console.log("✏️ Update Student:");
const updatedStudent = manager.updateStudent(1, { 
    age: 21, 
    grade: "A+",
    email: "an.updated@email.com" 
});

if (updatedStudent) {
    console.log(`✅ Updated student: ${updatedStudent.name}`);
    console.log(`  New age: ${updatedStudent.age}`);
    console.log(`  New grade: ${updatedStudent.grade}`);
    console.log(`  New email: ${updatedStudent.email}`);
}

console.log("\n" + "=" .repeat(70));
console.log("🗑️ Remove Student:");
const removedStudent = manager.removeStudent(5);
if (removedStudent) {
    console.log(`❌ Removed: ${removedStudent.name}`);
}

console.log("\n" + "=" .repeat(70));
console.log("💤 Deactivate Student:");
const deactivatedStudent = manager.deactivateStudent(4);
if (deactivatedStudent) {
    console.log(`💤 Deactivated: ${deactivatedStudent.name}`);
}

console.log("\n" + "=" .repeat(70));
console.log("📊 Statistics:");
const stats = manager.getStatistics();
console.log(`Total active students: ${stats.totalStudents}`);
console.log(`Inactive students: ${stats.inactiveStudents}`);
console.log(`Grade distribution:`, stats.gradeDistribution);
console.log(`Age statistics:`, {
    min: stats.ageStatistics.min,
    max: stats.ageStatistics.max,
    average: stats.ageStatistics.average.toFixed(1)
});

console.log("\n" + "=" .repeat(70));
console.log("🔧 Functional Approach Demo:");

// Reset functional database
studentDatabase.students = [];
studentDatabase.nextId = 1;

console.log("\n📝 Adding students (functional approach):");
const functionalStudents = [
    addStudentFunctional("Đỗ Văn Phúc", 20, "A", "phuc@email.com"),
    addStudentFunctional("Ngô Thị Quỳnh", 19, "B", "quynh@email.com"),
    addStudentFunctional("Vũ Văn Sơn", 21, "A", "son@email.com")
];

functionalStudents.forEach(student => {
    console.log(`✅ Added: ${student.name} (ID: ${student.id})`);
});

console.log("\n🔍 Search by name 'Văn' (functional):");
const functionalSearchResults = searchStudentsByName("Văn");
functionalSearchResults.forEach(student => {
    console.log(`  Found: ${student.name}`);
});

// Advanced features demonstration
console.log("\n" + "=" .repeat(70));
console.log("🚀 Advanced Features:");

// Bulk operations
const bulkAddStudents = (studentsData) => {
    return studentsData.map(data => 
        manager.addStudent(data.name, data.age, data.grade, data.email)
    );
};

// Sort students
const sortStudentsByAge = (ascending = true) => {
    const students = manager.getAllActiveStudents();
    return students.sort((a, b) => 
        ascending ? a.age - b.age : b.age - a.age
    );
};

// Filter students by age range
const filterStudentsByAgeRange = (minAge, maxAge) => {
    return manager.getAllActiveStudents().filter(student => 
        student.age >= minAge && student.age <= maxAge
    );
};

console.log("\n📈 Students sorted by age:");
const sortedStudents = sortStudentsByAge();
sortedStudents.forEach(student => {
    console.log(`  ${student.name} - Age: ${student.age}`);
});

console.log("\n🎯 Students aged 19-21:");
const filteredStudents = filterStudentsByAgeRange(19, 21);
filteredStudents.forEach(student => {
    console.log(`  ${student.name} - Age: ${student.age}`);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StudentManager,
        addStudentFunctional,
        removeStudentFunctional,
        findStudentFunctional,
        searchStudentsByName,
        bulkAddStudents,
        sortStudentsByAge,
        filterStudentsByAgeRange
    };
}
