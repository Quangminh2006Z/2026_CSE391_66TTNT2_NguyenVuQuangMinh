const inputStudentName = document.getElementById("studentName");
const inputStudentScore = document.getElementById("studentScore");
const studentTable = document.getElementById("student-table-body");
const addStudentButton = document.getElementById("addStudentBtn");
const averageScoreElement = document.getElementById("averageScore");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");



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
const studentList = [];

function tinhTongSinhVien() {

    return studentList.length;
}

function tinhDiemTrungBinh() {
    if (studentList.length === 0)  return 0 ;

    let tongDiem = 0;
    for (let i = 0; i < studentList.length; i++) {
        tongDiem += studentList[i].score;
    }
    return (tongDiem / studentList.length).toFixed(2);
}

function capNhatThongKe() {
    totalStudents.textContent = tinhTongSinhVien();
    averageScore.textContent = tinhDiemTrungBinh();
}



function renderTable() {
    // Xóa tất cả hàng cũ
    studentTable.innerHTML = "";

    // Vẽ lại toàn bộ bảng từ mảng studentList
    studentList.forEach((student, index) => {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.setAttribute("data-index",index);

        



        const newRow = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        const scoreCell = document.createElement("td");
        scoreCell.textContent = student.score;
        const gradeCell = document.createElement("td");
        gradeCell.textContent = xepLoai(student.score);
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

    });
    capNhatThongKe()
}


studentTable.addEventListener("click",function(e){
    if(e.target.classList.contains("btn-danger")){
        const index = e.target.getAttribute("data-index");
        studentList.splice(index,1);
        renderTable();
    }
});

addStudentButton.addEventListener("click", function () {

    const studentName = inputStudentName.value.trim();
    const studentScore = inputStudentScore.value.trim();

    if (!studentName || studentScore > 10 || studentScore < 0) {
        inputStudentName.style.borderColor = "red";
        inputStudentScore.style.borderColor = "red";
        inputStudentName.placeholder = "Vui lòng nhập tên sinh viên!";
        inputStudentScore.placeholder = "Vui lòng nhập điểm số hợp lệ!";
        return;
    }
    

    //them phan tu vua nhap vao mang
    studentList.push({
        name: studentName,
        score: parseFloat(studentScore)
    });



    //render
    renderTable();

    inputStudentName.value = "";
    inputStudentScore.value = "";
    inputStudentName.style.borderColor = "";
    inputStudentScore.style.borderColor = "";
    capNhatThongKe();
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('addStudentBtn').click();
    }
});

