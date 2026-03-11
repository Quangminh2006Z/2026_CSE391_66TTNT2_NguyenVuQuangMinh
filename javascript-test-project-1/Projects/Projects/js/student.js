// Kịch bản:
// - Có bảng danh sách sinh viên với 2 dòng mẫu
// - Người dùng nhập Họ tên + Email → nhấn "Thêm sinh viên" → thêm dòng mới vào bảng
// - Mỗi dòng có nút "Xoá" → xoá dòng đó khỏi bảng
// - Sau mỗi lần thêm/xoá → cập nhật lại cột STT cho đúng thứ tự

// Bước 1: Truy xuất các phần tử DOM cần tác động
const inputStudentName = document.getElementById("inputStudentName");
const inputStudentEmail = document.getElementById("inputStudentEmail");
const btnAddStudent = document.getElementById("btnAddStudent");
const studentTableBody = document.getElementById("studentTableBody");

// Bước 2: Gắn sự kiện xoá cho các nút "Xoá" có sẵn trong bảng


// Gợi ý: Dùng querySelectorAll để lấy tất cả nút .btn-delete trong studentTableBody
const existingDeleteButtons = studentTableBody.querySelectorAll(".btn-delete");


for (let i = 0; i < existingDeleteButtons.length; i++) {
    existingDeleteButtons[i].addEventListener("click", function () {
        
        // TODO: Xoá dòng <tr> chứa nút này
        //       Gợi ý: this.closest("tr") để lấy dòng cha
        //       Gợi ý: studentTableBody.removeChild(row) để xoá
        // TODO: Gọi hàm updateStudentOrder() để cập nhật lại STT

        //lấy thẻ tr là 'CHA' gần nhất, duyệt từ con lên cha 
        const row = this.closest("tr");

        //nếu tìm thấy cha là row (true), studentTableBody sẽ xóa row
        if (row) {
            studentTableBody.removeChild(row);
        }
        // Cập nhật lại STT
        updateStudentOrder();
    });
}

// Bước 3: Gắn sự kiện click cho nút "Thêm sinh viên"
btnAddStudent.addEventListener("click", function () {
    // Bước 3.1: Lấy giá trị từ các ô input
    const studentName = inputStudentName.value.trim();
    const studentEmail = inputStudentEmail.value.trim();

    // Bước 3.2: Kiểm tra dữ liệu nhập
    // TODO: Nếu studentName hoặc studentEmail rỗng
    //       → alert("Vui lòng nhập đầy đủ thông tin!") rồi return
    if(!studentName || !studentEmail){
        inputStudentEmail.placeholder="Vui lòng nhập Email!";
        inputStudentName.placeholder="Vui lòng nhập tên!"
        inputStudentName.style.borderColor = "red";
        inputStudentEmail.style.borderColor = "red";
        return;
    }

    // Bước 3.3: Tạo dòng <tr> mới
    // TODO: Tạo phần tử <tr> bằng document.createElement("tr")
    const newRow = document.createElement("tr");
    // Bước 3.4: Tạo các ô <td> cho STT, Họ tên, Email, Hành động
    // TODO: Tạo <td> cho STT → textContent tạm = ""
    const tdSTT = document.createElement("td");
    tdSTT.textContent = "";
    // TODO: Tạo <td> cho Họ tên → textContent = studentName
    const tdStudentName = document.createElement("td");
    tdStudentName.textContent = studentName;
    // TODO: Tạo <td> cho Email → textContent = studentEmail
    const tdStudentEmail = document.createElement("td");
    tdStudentEmail.textContent = studentEmail;
    // TODO: Tạo <td> cho Hành động → chứa nút "Xoá"
    const tdAction = document.createElement("td");

    // Bước 3.5: Tạo nút "Xoá" trong ô Hành động
    
    // TODO: Tạo <button> có class "btn-delete" và textContent = "Xoá"
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("btn-delete");
    newDeleteBtn.textContent = "Xoá";
    // TODO: Gắn sự kiện click cho nút xoá:
    //       - Xoá dòng <tr> khỏi bảng
    //       - Gọi updateStudentOrder()
    newDeleteBtn.addEventListener("click", function() {
        const row = this.closest("tr");
        if (row) {
            studentTableBody.removeChild(row);
        }
        updateStudentOrder();
    });
    // Thêm nút vào tdAction
    tdAction.appendChild(newDeleteBtn);

    // Bước 3.6: Ghép các <td> vào <tr>, rồi thêm <tr> vào <tbody>
    // TODO: appendChild từng <td> vào <tr>
    newRow.appendChild(tdSTT);
    newRow.appendChild(tdStudentName);
    newRow.appendChild(tdStudentEmail);
    newRow.appendChild(tdAction);
    // TODO: appendChild <tr> vào studentTableBody
    studentTableBody.appendChild(newRow);

    // Bước 3.7: Xoá giá trị ô input và cập nhật STT
    // TODO: Đặt inputStudentName.value = "" và inputStudentEmail.value = ""
    inputStudentName.value = "";
    inputStudentEmail.value = "";
    // TODO: Gọi hàm updateStudentOrder()
    updateStudentOrder();
});

// Bước 4: Hàm cập nhật lại số thứ tự
function updateStudentOrder() {
   const trAll = studentTableBody.querySelectorAll("tr");

   for(let i = 0;i<trAll.length;i++){
        trAll[i].cells[0].textContent = i+1;
   }
    
}
