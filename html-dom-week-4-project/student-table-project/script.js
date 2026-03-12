const inputStudentName = document.getElementById("studentName");
const inputStudentScore = document.getElementById("studentScore");
const studentTable = document.getElementById("student-table-body");
const addStudentButton = document.getElementById("addStudentBtn");
const averageScoreElement = document.getElementById("averageScore");

const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");

addStudentButton.addEventListener("click", function () {

    const studentName = inputStudentName.value.trim();
    const studentScore = inputStudentScore.value.trim();

    if (!studentName || studentScore > 100 || studentScore < 0) {
        inputStudentName.style.borderColor = "red";
        inputStudentScore.style.borderColor = "red";
        inputStudentName.placeholder = "Vui lòng nhập tên sinh viên!";
        inputStudentScore.placeholder = "Vui lòng nhập điểm số hợp lệ!";
        return;
    }
    function xepLoai(score) {
        if (score >= 8.5) {
            return "Giỏi";
        }
        else if (score >= 7) {
            return "Khá";
        }
        else if (score >= 5) {
            return "Trung bình";
        }
        else {
            return "Yếu";
        }
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", function () {
        const row = this.closest("tr");
        studentTable.removeChild(row);
        updateRowNumbers();
    });

    const newRow = document.createElement("tr");
    const numberCell = document.createElement("td");
    numberCell.textContent = "";
    const nameCell = document.createElement("td");
    nameCell.textContent = studentName;
    const scoreCell = document.createElement("td");
    scoreCell.textContent = studentScore;
    const gradeCell = document.createElement("td");
    gradeCell.textContent = xepLoai(studentScore);
    if (gradeCell.textContent === "Yếu") {
        gradeCell.style.backgroundColor = "yellow";
    }
    const actionCell = document.createElement("td");
    actionCell.appendChild(deleteButton);

    newRow.appendChild(numberCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(scoreCell);
    newRow.appendChild(gradeCell);
    newRow.appendChild(actionCell);
    studentTable.appendChild(newRow);

    function updateRowNumbers() {
        const trAll = studentTable.querySelectorAll("tr");
        for(let i = 0; i<trAll.length; i++) {
            trAll[i].cells[0].textContent = i + 1;
        }
    }
    updateRowNumbers();

    //diem trung binh
    //lay cot thu 3 cua bang
    function tinhTongSinhVien() {
    const rows = studentTable.querySelectorAll("tr");
    return rows.length;
}

totalStudents.textContent = tinhTongSinhVien();

function tinhDiemTrungBinh() {
    const dsDiem = studentTable.querySelectorAll("tr td:nth-child(3)");
    if (dsDiem.length === 0) return 0;
    
    let tongDiem = 0;
    for (let i = 0; i < dsDiem.length; i++) {
        tongDiem += parseFloat(dsDiem[i].textContent);
    }
    return (tongDiem / dsDiem.length).toFixed(2);
}
averageScore.textContent = tinhDiemTrungBinh();

    inputStudentName.value = "";
    inputStudentScore.value = "";
    inputStudentName.style.borderColor = "";
    inputStudentScore.style.borderColor = "";
})