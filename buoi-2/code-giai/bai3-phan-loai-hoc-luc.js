/**
 * Exercise 3: Grade Classification
 * Write a program to classify academic performance based on scores.
 * 
 * Grading Scale:
 * - 90-100: Excellent
 * - 80-89: Good  
 * - 70-79: Fair
 * - 60-69: Average
 * - 50-59: Poor
 * - 0-49: Fail
 */

// Method 1: Using if/else
function classifyGrade1(score) {
    console.log(`\n=== Classifying grade for score ${score} ===`);
    
    let grade;
    
    if (score < 0 || score > 100) {
        grade = "Invalid score (0-100)";
    } else if (score >= 90) {
        grade = "Excellent";
    } else if (score >= 80) {
        grade = "Good";
    } else if (score >= 70) {
        grade = "Fair";
    } else if (score >= 60) {
        grade = "Average";
    } else if (score >= 50) {
        grade = "Poor";
    } else {
        grade = "Fail";
    }
    
    console.log(`Grade: ${grade}`);
    return grade;
}

// Method 2: Using switch/case with Math.floor
function classifyGrade2(score) {
    console.log(`\n=== Classifying grade for score ${score} (Method 2) ===`);
    
    if (score < 0 || score > 100) {
        console.log("Grade: Invalid score (0-100)");
        return "Invalid score (0-100)";
    }
    
    let grade;
    const range = Math.floor(score / 10);
    
    switch (range) {
        case 10:
        case 9:
            grade = "Excellent";
            break;
        case 8:
            grade = "Good";
            break;
        case 7:
            grade = "Fair";
            break;
        case 6:
            grade = "Average";
            break;
        case 5:
            grade = "Poor";
            break;
        default:
            grade = "Fail";
    }
    
    console.log(`Grade: ${grade}`);
    return grade;
}

// Method 3: Using ternary operator (nested)
function classifyGrade3(score) {
    console.log(`\n=== Classifying grade for score ${score} (Method 3) ===`);
    
    const grade = (score < 0 || score > 100) 
        ? "Invalid score (0-100)"
        : (score >= 90) ? "Excellent"
        : (score >= 80) ? "Good"
        : (score >= 70) ? "Fair"
        : (score >= 60) ? "Average"
        : (score >= 50) ? "Poor"
        : "Fail";
    
    console.log(`Grade: ${grade}`);
    return grade;
}

// Method 4: Using object mapping
function classifyGrade4(score) {
    console.log(`\n=== Classifying grade for score ${score} (Method 4) ===`);
    
    if (score < 0 || score > 100) {
        console.log("Grade: Invalid score (0-100)");
        return "Invalid score (0-100)";
    }
    
    const gradeScale = [
        { min: 90, max: 100, grade: "Excellent" },
        { min: 80, max: 89, grade: "Good" },
        { min: 70, max: 79, grade: "Fair" },
        { min: 60, max: 69, grade: "Average" },
        { min: 50, max: 59, grade: "Poor" },
        { min: 0, max: 49, grade: "Fail" }
    ];
    
    const result = gradeScale.find(range => score >= range.min && score <= range.max);
    const grade = result ? result.grade : "Undefined";
    
    console.log(`Grade: ${grade}`);
    return grade;
}

// Method 5: Return detailed information
function classifyGradeDetailed(score) {
    // Input validation
    if (typeof score !== 'number' || isNaN(score)) {
        return {
            error: "Score must be a number",
            input: score
        };
    }
    
    if (score < 0 || score > 100) {
        return {
            error: "Score must be between 0-100",
            input: score
        };
    }
    
    // Determine grade
    let grade, color, emoji, advice;
    
    if (score >= 90) {
        grade = "Excellent";
        color = "🟢";
        emoji = "🏆";
        advice = "Outstanding! Keep up the excellent work!";
    } else if (score >= 80) {
        grade = "Good";
        color = "🔵";
        emoji = "🥇";
        advice = "Very good! Try a little harder!";
    } else if (score >= 70) {
        grade = "Fair";
        color = "🟡";
        emoji = "🥈";
        advice = "Pretty good! Keep trying harder!";
    } else if (score >= 60) {
        grade = "Average";
        color = "🟠";
        emoji = "🥉";
        advice = "Need to work harder for better results!";
    } else if (score >= 50) {
        grade = "Poor";
        color = "🔴";
        emoji = "😐";
        advice = "Need to review and study more diligently!";
    } else {
        grade = "Fail";
        color = "⚫";
        emoji = "😞";
        advice = "Need a serious study plan!";
    }
    
    // Additional calculations
    const pointsNeededForNext = score >= 90 ? 0 : 
        score >= 80 ? 90 - score :
        score >= 70 ? 80 - score :
        score >= 60 ? 70 - score :
        score >= 50 ? 60 - score : 50 - score;
    
    const nextLevel = score >= 90 ? "Already at highest level" :
        score >= 80 ? "Excellent" :
        score >= 70 ? "Good" :
        score >= 60 ? "Fair" :
        score >= 50 ? "Average" : "Poor";
    
    return {
        score: score,
        grade: grade,
        color: color,
        emoji: emoji,
        advice: advice,
        pointsNeededForNext: pointsNeededForNext,
        nextLevel: nextLevel,
        percentage: `${score}%`,
        status: score >= 80 ? "Pass" : "Need Improvement"
    };
}

// Method 6: Classification with multiple criteria
function classifyGradeAdvanced(score, multiplier = 1) {
    const actualScore = score * multiplier;
    
    if (actualScore < 0 || actualScore > 100) {
        return {
            error: "Score after multiplier must be between 0-100",
            originalScore: score,
            multiplier: multiplier,
            actualScore: actualScore
        };
    }
    
    const result = classifyGradeDetailed(actualScore);
    
    return {
        ...result,
        originalScore: score,
        multiplier: multiplier,
        actualScore: actualScore
    };
}

// Test cases
console.log("🧪 TESTING EXERCISE 3: GRADE CLASSIFICATION");
console.log("===========================================");

const testScores = [95, 85, 75, 65, 55, 45, 100, 0, 50, 89.5];

testScores.forEach(score => {
    classifyGrade1(score);
});

console.log("\n" + "=".repeat(50));
console.log("📊 DETAILED INFORMATION:");

testScores.forEach(score => {
    const result = classifyGradeDetailed(score);
    if (result.error) {
        console.log(`\n❌ Score ${score}: ${result.error}`);
    } else {
        console.log(`\n${result.emoji} Score ${result.score}:`);
        console.log(`  - Grade: ${result.color} ${result.grade}`);
        console.log(`  - Status: ${result.status}`);
        console.log(`  - Advice: ${result.advice}`);
        if (result.pointsNeededForNext > 0) {
            console.log(`  - Need ${result.pointsNeededForNext} more points to reach "${result.nextLevel}"`);
        }
    }
});

console.log("\n" + "=".repeat(50));
console.log("🔍 TESTING SPECIAL CASES:");

const specialCases = [
    "hello",
    -10,
    150,
    NaN,
    null,
    undefined
];

specialCases.forEach(score => {
    const result = classifyGradeDetailed(score);
    console.log(`\nInput: ${score}`);
    if (result.error) {
        console.log(`  ❌ ${result.error}`);
    } else {
        console.log(`  ✅ ${result.grade}`);
    }
});

// Bonus: Class statistics
function analyzeClassGrades(scoreList) {
    if (!Array.isArray(scoreList) || scoreList.length === 0) {
        return { error: "Invalid score list" };
    }
    
    const results = scoreList.map(score => classifyGradeDetailed(score))
                            .filter(result => !result.error);
    
    if (results.length === 0) {
        return { error: "No valid scores" };
    }
    
    const statistics = {
        "Excellent": 0,
        "Good": 0,
        "Fair": 0,
        "Average": 0,
        "Poor": 0,
        "Fail": 0
    };
    
    results.forEach(result => {
        statistics[result.grade]++;
    });
    
    const totalStudents = results.length;
    const averageScore = results.reduce((sum, result) => sum + result.score, 0) / totalStudents;
    const highestScore = Math.max(...results.map(result => result.score));
    const lowestScore = Math.min(...results.map(result => result.score));
    
    return {
        totalStudents: totalStudents,
        averageScore: Math.round(averageScore * 100) / 100,
        highestScore: highestScore,
        lowestScore: lowestScore,
        statistics: statistics,
        percentages: Object.keys(statistics).reduce((acc, key) => {
            acc[key] = Math.round((statistics[key] / totalStudents) * 100 * 100) / 100 + "%";
            return acc;
        }, {})
    };
}

console.log("\n" + "=".repeat(50));
console.log("🎯 BONUS - CLASS STATISTICS:");

const classScores = [95, 87, 76, 82, 91, 68, 54, 73, 89, 92, 45, 78, 85, 67, 94];
const stats = analyzeClassGrades(classScores);

console.log(`\nClass statistics (${stats.totalStudents} students):`);
console.log(`📊 Average score: ${stats.averageScore}`);
console.log(`🏆 Highest score: ${stats.highestScore}`);
console.log(`📉 Lowest score: ${stats.lowestScore}`);
console.log("\n📈 Grade distribution:");

Object.keys(stats.statistics).forEach(grade => {
    const count = stats.statistics[grade];
    const percentage = stats.percentages[grade];
    if (count > 0) {
        console.log(`  ${grade}: ${count} students (${percentage})`);
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        classifyGrade1,
        classifyGrade2,
        classifyGrade3,
        classifyGrade4,
        classifyGradeDetailed,
        classifyGradeAdvanced,
        analyzeClassGrades
    };
}
