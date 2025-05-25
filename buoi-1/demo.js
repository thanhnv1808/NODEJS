/**
 * 🚀 DEMO BUỔI 1: Biến, Kiểu dữ liệu, Toán tử, Câu lệnh điều kiện
 * 
 * File này demo tất cả kiến thức đã học trong buổi 1
 * Chạy: node demo.js
 */

console.log("🎯 DEMO BUỔI 1: JavaScript Foundation");
console.log("=====================================\n");

// ===== 1. BIẾN (VARIABLES) =====
console.log("1️⃣ BIẾN (VARIABLES)");
console.log("-------------------");

// var - function scoped, có thể redeclare
var oldStyle = "Không nên dùng var";
var oldStyle = "Có thể redeclare"; // OK nhưng không khuyến khích

// let - block scoped, có thể reassign
let modernStyle = "Dùng let cho biến có thể thay đổi";
modernStyle = "Đã thay đổi giá trị"; // OK

// const - block scoped, không thể reassign
const bestPractice = "Dùng const cho giá trị không đổi";
// bestPractice = "Lỗi!"; // Error!

console.log("✅ var:", oldStyle);
console.log("✅ let:", modernStyle);
console.log("✅ const:", bestPractice);

// ===== 2. KIỂU DỮ LIỆU (DATA TYPES) =====
console.log("\n2️⃣ KIỂU DỮ LIỆU (DATA TYPES)");
console.log("-----------------------------");

// Primitive types
const number = 42;
const string = "Hello World";
const boolean = true;
const undefinedVar = undefined;
const nullVar = null;
const symbol = Symbol('id');
const bigint = 123456789012345678901234567890n;

console.log("📊 Primitive Types:");
console.log(`  Number: ${number} (${typeof number})`);
console.log(`  String: "${string}" (${typeof string})`);
console.log(`  Boolean: ${boolean} (${typeof boolean})`);
console.log(`  Undefined: ${undefinedVar} (${typeof undefinedVar})`);
console.log(`  Null: ${nullVar} (${typeof nullVar})`); // quirk: "object"
console.log(`  Symbol: ${symbol.toString()} (${typeof symbol})`);
console.log(`  BigInt: ${bigint} (${typeof bigint})`);

// Reference types
const object = { name: "John", age: 30 };
const array = [1, 2, 3, 4, 5];
const func = function() { return "I'm a function"; };

console.log("\n📦 Reference Types:");
console.log(`  Object: ${JSON.stringify(object)} (${typeof object})`);
console.log(`  Array: [${array}] (${typeof array}) - isArray: ${Array.isArray(array)}`);
console.log(`  Function: ${func.toString().substring(0, 30)}... (${typeof func})`);

// ===== 3. TOÁN TỬ (OPERATORS) =====
console.log("\n3️⃣ TOÁN TỬ (OPERATORS)");
console.log("----------------------");

const a = 10, b = 3;

console.log("➕ Arithmetic Operators:");
console.log(`  ${a} + ${b} = ${a + b}`);
console.log(`  ${a} - ${b} = ${a - b}`);
console.log(`  ${a} * ${b} = ${a * b}`);
console.log(`  ${a} / ${b} = ${a / b}`);
console.log(`  ${a} % ${b} = ${a % b} (chia lấy dư)`);
console.log(`  ${a} ** ${b} = ${a ** b} (lũy thừa)`);

console.log("\n🔍 Comparison Operators:");
const x = 5, y = "5";
console.log(`  ${x} == "${y}" = ${x == y} (loose equality)`);
console.log(`  ${x} === "${y}" = ${x === y} (strict equality)`);
console.log(`  ${x} != "${y}" = ${x != y}`);
console.log(`  ${x} !== "${y}" = ${x !== y}`);
console.log(`  ${x} > 3 = ${x > 3}`);
console.log(`  ${x} >= 5 = ${x >= 5}`);

console.log("\n🧠 Logical Operators:");
const isLoggedIn = true, isAdmin = false;
console.log(`  ${isLoggedIn} && ${isAdmin} = ${isLoggedIn && isAdmin} (AND)`);
console.log(`  ${isLoggedIn} || ${isAdmin} = ${isLoggedIn || isAdmin} (OR)`);
console.log(`  !${isLoggedIn} = ${!isLoggedIn} (NOT)`);

// ===== 4. CÂU LỆNH ĐIỀU KIỆN =====
console.log("\n4️⃣ CÂU LỆNH ĐIỀU KIỆN");
console.log("---------------------");

// If/Else demo
function demoIfElse(score) {
    console.log(`\n📝 Phân loại điểm ${score}:`);
    
    if (score >= 90) {
        console.log("  🏆 Xuất sắc");
    } else if (score >= 80) {
        console.log("  🥇 Giỏi");
    } else if (score >= 70) {
        console.log("  🥈 Khá");
    } else if (score >= 60) {
        console.log("  🥉 Trung bình");
    } else {
        console.log("  📚 Cần cố gắng thêm");
    }
}

demoIfElse(95);
demoIfElse(75);
demoIfElse(55);

// Switch/Case demo
function demoSwitch(day) {
    console.log(`\n📅 Ngày ${day}:`);
    
    switch (day) {
        case 1:
            console.log("  🌅 Thứ 2 - Bắt đầu tuần mới!");
            break;
        case 2:
            console.log("  💪 Thứ 3 - Tiếp tục cố gắng!");
            break;
        case 3:
            console.log("  🔥 Thứ 4 - Giữa tuần rồi!");
            break;
        case 4:
            console.log("  🎯 Thứ 5 - Sắp cuối tuần!");
            break;
        case 5:
            console.log("  🎉 Thứ 6 - Cuối tuần đến rồi!");
            break;
        case 6:
            console.log("  😴 Thứ 7 - Nghỉ ngơi thôi!");
            break;
        case 7:
            console.log("  🏖️ Chủ nhật - Thư giãn!");
            break;
        default:
            console.log("  ❓ Ngày không hợp lệ");
    }
}

demoSwitch(1);
demoSwitch(5);
demoSwitch(7);

// Ternary operator demo
function demoTernary(age) {
    const status = age >= 18 ? "Người lớn" : "Trẻ em";
    const canVote = age >= 18 ? "có thể" : "chưa thể";
    
    console.log(`\n👤 Tuổi ${age}: ${status}, ${canVote} bầu cử`);
}

demoTernary(25);
demoTernary(15);

// ===== 5. BÀI TẬP THỰC HÀNH =====
console.log("\n5️⃣ BÀI TẬP THỰC HÀNH");
console.log("--------------------");

// Bài 1: Kiểm tra chia hết
function kiemTraChiaHet(num) {
    const chiaHet3 = num % 3 === 0;
    const chiaHet5 = num % 5 === 0;
    
    if (chiaHet3 && chiaHet5) {
        return `${num} chia hết cho cả 3 và 5`;
    } else if (chiaHet3) {
        return `${num} chia hết cho 3`;
    } else if (chiaHet5) {
        return `${num} chia hết cho 5`;
    } else {
        return `${num} không chia hết cho 3 và 5`;
    }
}

console.log("\n🔢 Bài 1 - Kiểm tra chia hết:");
[15, 9, 10, 7].forEach(num => {
    console.log(`  ${kiemTraChiaHet(num)}`);
});

// Bài 2: Tìm số lớn nhất
function timSoLonNhat(a, b, c) {
    return Math.max(a, b, c);
}

console.log("\n🏆 Bài 2 - Tìm số lớn nhất:");
const testCases = [[5, 3, 8], [10, 10, 5], [7, 7, 7]];
testCases.forEach(([a, b, c]) => {
    console.log(`  Số lớn nhất trong [${a}, ${b}, ${c}] là: ${timSoLonNhat(a, b, c)}`);
});

// Bài 3: Phân loại học lực
function phanLoaiHocLuc(diem) {
    if (diem >= 90) return "Xuất sắc";
    if (diem >= 80) return "Giỏi";
    if (diem >= 70) return "Khá";
    if (diem >= 60) return "Trung bình";
    if (diem >= 50) return "Yếu";
    return "Kém";
}

console.log("\n📊 Bài 3 - Phân loại học lực:");
[95, 85, 75, 65, 55, 45].forEach(diem => {
    console.log(`  Điểm ${diem}: ${phanLoaiHocLuc(diem)}`);
});

// ===== 6. TIPS & BEST PRACTICES =====
console.log("\n6️⃣ TIPS & BEST PRACTICES");
console.log("------------------------");

console.log("💡 Tips quan trọng:");
console.log("  ✅ Luôn dùng 'const' trước, chỉ dùng 'let' khi cần reassign");
console.log("  ✅ Tránh dùng 'var' trong code hiện đại");
console.log("  ✅ Dùng '===' thay vì '==' để tránh type coercion");
console.log("  ✅ Đặt tên biến có ý nghĩa: 'userName' thay vì 'u'");
console.log("  ✅ Sử dụng template literals cho string interpolation");

// Demo template literals
const name = "JavaScript";
const version = "ES6+";
console.log(`\n🎯 Template literal: Đang học ${name} ${version}!`);

// Demo type coercion issues
console.log("\n⚠️  Type coercion cần chú ý:");
console.log(`  "5" + 3 = ${"5" + 3} (string concatenation)`);
console.log(`  "5" - 3 = ${"5" - 3} (number subtraction)`);
console.log(`  true + 1 = ${true + 1} (boolean to number)`);
console.log(`  null == undefined = ${null == undefined} (loose equality)`);
console.log(`  null === undefined = ${null === undefined} (strict equality)`);

console.log("\n🎉 HOÀN THÀNH DEMO BUỔI 1!");
console.log("Bạn đã nắm vững các kiến thức cơ bản về JavaScript!");
console.log("➡️  Tiếp theo: Buổi 2 - Vòng lặp, Hàm, Mảng cơ bản");
