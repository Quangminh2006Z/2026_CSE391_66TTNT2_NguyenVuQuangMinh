// Kịch bản:
// - Người dùng nhập tên công việc vào ô input
// - Nhấn nút "Thêm" → thêm công việc mới vào danh sách (dạng <li>)
// - Mỗi mục công việc có nút "Xoá" để xoá mục đó khỏi danh sách
// - Cập nhật số lượng công việc sau mỗi lần thêm/xoá
// - Nếu ô input trống → không thêm (alert thông báo)

//tuong tac local storage
localStorage.setItem("key", "value")

localStorage.getItem("key");

localStorage.removeItem("key");



//hàm để lấy ra array các task được lưu trong local storage
function loadTasks() {
    const data = localStorage.getItem("tasks")
    return data ? JSON.parse(data) : [];
}


//hàm lưu mảng vào local storage
function saveTasks(taskArray) {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}


function renderTask(taskName) {
    let isEditing = false;
    let inputSua = null;



    let phanTuMoi = document.createElement("li");
    phanTuMoi.classList.add("todo-item");

    let spanMoi = document.createElement("span");
    spanMoi.textContent = taskName;

    let buttonXoa = document.createElement("button");
    buttonXoa.textContent = "Xoá";
    buttonXoa.classList.add("btn-delete");

    let buttonSua = document.createElement("button");
    buttonSua.textContent = "Sửa";
    buttonSua.classList.add("btn-edit"); // để CSS sau

    buttonSua.addEventListener("click", function () {
        //tao element input

        //neu la true(mac dinh thi goi ham nay VVV)
        if(!isEditing){
        isEditing = true;
        inputSua = document.createElement("input");
        inputSua.type = "text";
        inputSua.value = spanMoi.textContent;
        inputSua.classList.add("input-edit");

        //thay the span = input
        phanTuMoi.replaceChild(inputSua,spanMoi);

        buttonSua.textContent = "Lưu";
        inputSua.focus();
        }

        //Sau khi sua (edit = true o ham tren) thi goi ham nay
        else{
            //thoat isEditing
            isEditing = false;

            let newTaskName = inputSua.value.trim();
            
            if(!newTaskName){
                inputSua.style.borderColor = "red";
                isEditing = true;
                return;
            }
            spanMoi.textContent = newTaskName;
            phanTuMoi.replaceChild(spanMoi,inputSua);
            buttonSua.textContent = "Sửa";

            //lấy ra mảng trước từ localStorage
            let tasks = loadTasks();

            const viTri = tasks.indexOf(taskName);
            //thay đổi task name thành tenMoi(vừa nhập từ ô input)
            tasks[viTri] = newTaskName;
            saveTasks(tasks);

            taskName = newTaskName;

        }



    })

    buttonXoa.addEventListener("click", function () {
        taskListContainer.removeChild(phanTuMoi);

        // Xoá khỏi localStorage
        let tasks = loadTasks();
        let newTasksList = [];
        // duyệt qua mảng tasks, nếu task[i] = taskname thì không được cho vào mảng mới 
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] !== taskName) {
                newTasksList.push(tasks[i]);
            };
        }

        saveTasks(newTasksList);

        updateTaskCount();
    });
    phanTuMoi.appendChild(spanMoi);
    phanTuMoi.appendChild(buttonSua);
    phanTuMoi.appendChild(buttonXoa);
    taskListContainer.appendChild(phanTuMoi);
}









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
    if (!taskName) {
        inputTaskName.placeholder = "Vui lòng nhập tên công việc!";
        inputTaskName.style.borderColor = "red";
        return;
    }

    // Render lên giao diện
    renderTask(taskName);

    // Lưu vào localStorage
    let tasks = loadTasks();
    tasks.push(taskName);
    saveTasks(tasks);

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
loadTasks().forEach(taskName => renderTask(taskName));
updateTaskCount();



async function loadTasksFromAPI() {
    const response = await fetch("https://69b81ba5ffbcd02860973448.mockapi.io/tasks");
    const tasks = await response.json();

    tasks.forEach(task => {
        renderTask(task.name);
    });
}



// loadTasksFromAPI() để load task