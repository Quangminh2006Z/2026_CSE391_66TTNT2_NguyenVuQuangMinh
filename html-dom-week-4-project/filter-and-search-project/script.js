const inputStudentName = document.getElementById("studentName");
const inputStudentScore = document.getElementById("studentScore");
const studentTable = document.getElementById("student-table-body");
const addStudentButton = document.getElementById("addStudentBtn");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const filteredStudentInput = document.getElementById("filteredStudent");
const filteredGrade = document.getElementById("filteredGrade");
const sortScoreHeader = document.getElementById("sortScore");

let sortOrder = null;


function xepLoai(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

// ✅ Mảng gốc — không bao giờ bị thay đổi khi lọc/tìm kiếm
const studentList = [];

// ✅ Mảng kết quả sau khi applyFilters()
let filteredStudents = [];

// ✅ Hàm duy nhất xử lý lọc/tìm kiếm/sắp xếp
function applyFilters() {
    const keyword = filteredStudentInput.value.trim().toLowerCase();
    const grade = filteredGrade.value;
    filteredStudents = studentList.filter(sv => {
        const matchName =  sv.name.toLowerCase().includes(keyword) ;
        const matchGrade = grade === "" || xepLoai(sv.score) === grade;
        return matchName && matchGrade;
    });

    if (sortOrder === "asc") {
        filteredStudents.sort(function(a, b) {
            return a.score - b.score;
        });
    } else if (sortOrder === "desc") {
        filteredStudents.sort(function(a, b) {
            return b.score - a.score;
        });
    }


    capNhatThongKe();
    renderTable();
}

function renderTable() {
    if (filteredStudents.length === 0) {
        studentTable.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted fst-italic">Không có kết quả</td>
            </tr>`;
        capNhatThongKe();
        return;
    }

    studentTable.innerHTML = "";

    filteredStudents.forEach((student, index) => {
        const gradeText = xepLoai(student.score);

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td style="${gradeText === 'Yếu' ? 'background-color: yellow' : ''}">${gradeText}</td>
            <td><button class="btn btn-danger btn-sm" data-index="${studentList.indexOf(student)}">Xóa</button></td>
        `;
        studentTable.appendChild(newRow);
    });

    capNhatThongKe();
}

function tinhTongSinhVien() {
    return studentList.length;
}

function tinhDiemTrungBinh() {
    if (studentList.length === 0) return 0;
    const tong = studentList.reduce((sum, sv) => sum + sv.score, 0);
    return (tong / studentList.length).toFixed(2);
}

function capNhatThongKe() {
    totalStudents.textContent = filteredStudents.length;

    if (filteredStudents.length === 0) {
        averageScore.textContent = 0;
        return;
    }

    let tongDiem = 0;
    for (let i = 0; i < filteredStudents.length; i++) {
        tongDiem += filteredStudents[i].score;
    }
    averageScore.textContent = (tongDiem / filteredStudents.length).toFixed(2);
}


studentTable.addEventListener("click", function (e) {
    if (e.target.matches("button[data-index]")) {
        const index = parseInt(e.target.dataset.index);
        studentList.splice(index, 1);
        applyFilters(); // gọi applyFilters thay vì renderTable
    }
});

addStudentButton.addEventListener("click", function () {
    const studentName = inputStudentName.value.trim();
    const studentScore = inputStudentScore.value.trim();

    if (!studentName || studentScore > 10 || studentScore < 0 || studentScore === "") {
        inputStudentName.style.borderColor = "red";
        inputStudentScore.style.borderColor = "red";
        inputStudentName.placeholder = "Vui lòng nhập tên sinh viên!";
        inputStudentScore.placeholder = "Vui lòng nhập điểm số hợp lệ!";
        return;
    }

    studentList.push({ name: studentName, score: parseFloat(studentScore) });
    applyFilters(); // gọi applyFilters thay vì renderTable

    inputStudentName.value = "";
    inputStudentScore.value = "";
    inputStudentName.style.borderColor = "";
    inputStudentScore.style.borderColor = "";
});


filteredStudentInput.addEventListener("input", applyFilters);
filteredGrade.addEventListener("change",applyFilters);
['studentName', 'studentScore'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
        if (e.key === 'Enter') addStudentButton.click();
    });
});

sortScoreHeader.addEventListener("click", function() {
    if (sortOrder === null || sortOrder === "desc") {
        sortOrder = "asc";
        sortScoreHeader.textContent = "Điểm ▲";
    } else {
        sortOrder = "desc";
        sortScoreHeader.textContent = "Điểm ▼";
    }
    applyFilters();
});