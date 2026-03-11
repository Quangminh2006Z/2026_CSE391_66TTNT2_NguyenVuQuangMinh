console.log("Hello from JavaScript!");
console.log("-----------------");





let name = "Minh";
let yearOfBirth = 2006
let currentYear = 2026
let age = currentYear - yearOfBirth

console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.")

let score = 7.5;
score = 9
// TODO: Dự đoán điều kiện if/else đang làm gì, rồi chạy thử
if (score >= 8) {
    console.log("Giỏi");
} else if (score >= 6.5) {
    console.log("Khá");
} else if (score >= 5) {
    console.log("Trung bình");
} else {
    console.log("Yếu");
}

// TODO: Viết hàm tính điểm trung bình 3 môn
function tinhDiemTrungBinh(m1, m2, m3) {
    let avg = (m1 + m2 + m3) / 3;
    return avg;
}

let diem = tinhDiemTrungBinh(8, 7, 9);
let loai = xepLoai(diem);
console.log("Điểm TB:", diem, " - Xếp loại:", loai);

function xepLoai(avg) {
    let loai;
if (avg >= 8) {

    return loai = "Giỏi";
}
else if (avg>=6.5) { 
    
    return loai = "Khá";
}
else if (avg>=5) { 
    
    return loai = "Trung bình";
}
else {
    
    return loai = "Yếu";
}}


//-----------------DOM-----------------
const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");

btnHello.addEventListener("click", function () {
  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});



const btnRed = document.getElementById("btnRed");

btnRed.addEventListener("click", function () {
  // TODO: Đổi màu nền trang thành đỏ
  document.body.style.backgroundColor = "red";
  
});

const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

nameInput.addEventListener("input", function () {
  const inputName = nameInput.value;
  greeting.textContent = "Xin chào, " + inputName + "!";
});

let fruits = ["Táo", "Chuối", "Cam", "Dưa hấu", "Nho"];

// Thêm phần tử vào CUỐI mảng
fruits.push("Dâu tây");
fruits.push("Xoài");

// Thêm phần tử vào đầu mảng
fruits.unshift("Lựu");

// Xóa phần tử
fruits.pop(); // Xóa phần tử cuối cùng
fruits.shift(); // Xóa phần tử đầu tiên
fruits.splice(2, 1); // Xóa 1 phần tử ở vị trí index 2

// Sử dụng map để tạo mảng viết hoa
let fruitsUpperCase = fruits.map(function(fruit) {
  return fruit.toUpperCase();
});

console.log("Mảng gốc:", fruits);
console.log("Mảng viết hoa:", fruitsUpperCase);

// Tìm vị trí của một phần tử trong mảng
let viTri = fruits.indexOf("Táo");
console.log("Vị trí của 'Cam' trong mảng:", viTri);

let viTri2 = fruits.indexOf("Nho");
console.log("Vị trí của 'Xoài' trong mảng:", viTri2);

console.log("Toi muon an "+ fruits[0]);
console.log("Toi khong muon an "+ fruits[fruits.length-1]);

student = {
    name: "Minh",
    age: 20,
    major: "AI"
};

// Truy cập thuộc tính age bằng dot notation
console.log("Tuổi (dot notation):", student.age);

// Truy cập thuộc tính age bằng bracket notation
console.log("Tuổi (bracket notation):", student["age"]);

const noiDung = document.getElementById("textTest");
const buttonThu = document.getElementById("btnTest");

buttonThu.addEventListener("click", function() {
    console.log("Btn clicked");
    noiDung.textContent = "Bạn đã click vào nút!";
})