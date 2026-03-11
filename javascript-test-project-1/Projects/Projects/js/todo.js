// Kịch bản:
// - Người dùng nhập tên công việc vào ô input
// - Nhấn nút "Thêm" → thêm công việc mới vào danh sách (dạng <li>)
// - Mỗi mục công việc có nút "Xoá" để xoá mục đó khỏi danh sách
// - Cập nhật số lượng công việc sau mỗi lần thêm/xoá
// - Nếu ô input trống → không thêm (alert thông báo)

// Bước 1: Truy xuất các phần tử DOM cần tác động
//the input trong div search-row
const inputTaskName = document.getElementById("inputTaskName");
//the button trong div search-row
const btnAddTask = document.getElementById("btnAddTask");
//the ul chứa các li công việc
const taskListContainer = document.getElementById("taskList");
//the p dem tong cong viec
const taskCountInfo = document.getElementById("taskCountInfo");

// Bước 2: Gắn sự kiện click cho nút "Thêm"
btnAddTask.addEventListener("click", function () {
    // Bước 2.1: Lấy giá trị từ ô input và loại bỏ khoảng trắng thừa
    const taskName = inputTaskName.value.trim();
    
    // Bước 2.2: Kiểm tra nếu ô input trống thì hiển thị thông báo
    // TODO: Nếu taskName rỗng → alert("Vui lòng nhập tên công việc!") rồi return
    if(!taskName) {
        inputTaskName.placeholder = "Vui lòng nhập tên công việc!";
        inputTaskName.style.borderColor = "red";
        return;
    }

    // Bước 2.3: Tạo phần tử <li> mới chứa tên công việc
    // TODO: Tạo phần tử <li> mới bằng document.createElement("li")
    // TODO: Thêm class "todo-item" cho <li>
    let phanTuMoi = document.createElement("li");
    phanTuMoi.classList.add("todo-item");
    // Bước 2.4: Tạo <span> chứa tên công việc
    // TODO: Tạo phần tử <span> mới
    // TODO: Gán textContent = taskName cho <span>
    let spanMoi = document.createElement("span");
    spanMoi.textContent = taskName;
    // Bước 2.5: Tạo nút "Xoá" cho mục công việc
    // TODO: Tạo phần tử <button> mới
    // TODO: Gán textContent = "Xoá"
    // TODO: Thêm class "btn-delete" cho nút
    let buttonXoa = document.createElement("button");
    buttonXoa.textContent = "Xoá";
    buttonXoa.classList.add("btn-delete");

    // Bước 2.6: Gắn sự kiện click cho nút "Xoá"
    // TODO: Khi click nút xoá → xoá phần tử <li> cha ra khỏi danh sách
    //       Gợi ý: dùng taskListContainer.removeChild(newTaskItem)
    // TODO: Sau khi xoá, gọi hàm updateTaskCount()
    buttonXoa.addEventListener("click", function() {
        taskListContainer.removeChild(phanTuMoi);
        updateTaskCount();
    })
    // Bước 2.7: Ghép các phần tử lại và thêm vào danh sách
    // TODO: appendChild <span> và <button> vào <li>
    // TODO: appendChild <li> vào taskListContainer
    taskListContainer.appendChild(phanTuMoi);
    phanTuMoi.appendChild(spanMoi);
    phanTuMoi.appendChild(buttonXoa);
    // Bước 2.8: Xoá giá trị ô input và cập nhật số lượng
    // TODO: Đặt inputTaskName.value = ""
    // TODO: Gọi hàm updateTaskCount()
    inputTaskName.value = "";
    updateTaskCount();
});

// Bước 3: Hàm cập nhật số lượng công việc
function updateTaskCount() {
    let taskNumber = taskListContainer.children.length;
    // TODO: Đếm số phần tử con của taskListContainer
    //       Gợi ý: taskListContainer.children.length
    // TODO: Cập nhật nội dung taskCountInfo: "Tổng: X công việc"
    taskCountInfo.textContent = "Tổng: " + taskNumber + " công việc";
}
