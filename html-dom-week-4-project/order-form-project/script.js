const prices = {
    "Áo"  : 150000,
    "Quần": 200000,
    "Giày": 350000,
    "Túi" : 250000
};


function showError(fieldId, message) {
    const field = document.getElementById(fieldId);

    // Tô đỏ viền
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");

    // Tìm div lỗi ngay bên dưới → gán text
    const feedback = field.nextElementSibling;
    if (feedback) {
        feedback.textContent = message;
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);

    // Tô xanh viền
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");

    // Xóa text lỗi
    const feedback = field.nextElementSibling;
    if (feedback) {
        feedback.textContent = "";
    }
}

function showErrorRadio(message) {
    document.getElementById("error-payment").textContent = message;
}

function clearErrorRadio() {
    document.getElementById("error-payment").textContent = "";
}

function validateProduct() {
    const val = document.getElementById("productName").value;

    if (!val) {
        showError("productName", "Vui lòng chọn sản phẩm.");
        return false;
    }

    clearError("productName");
    return true;
}

function validateQuantity() {
    const val = document.getElementById("quantity").value.trim();
    const num = Number(val);
    // Number("5") → 5
    // Number("")  → 0
    // Number("abc") → NaN

    if (!val) {
        showError("quantity", "Số lượng không được để trống.");
        return false;
    }
    if (!Number.isInteger(num) || num < 1 || num > 99) {
        showError("quantity", "Số lượng phải là số nguyên từ 1 đến 99.");
        return false;
    }

    clearError("quantity");
    return true;
}

function validateDate() {
    const val = document.getElementById("deliveryDate").value;
    // val có dạng "2025-03-15" hoặc "" nếu chưa chọn

    if (!val) {
        showError("deliveryDate", "Vui lòng chọn ngày giao hàng.");
        return false;
    }

    // Chuẩn hóa ngày hôm nay về 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Ngày tối đa = hôm nay + 30 ngày
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(0, 0, 0, 0);

    // Ngày người dùng chọn
    const selected = new Date(val);

    if (selected.getTime() < today.getTime()) {
        showError("deliveryDate", "Ngày giao không được là ngày trong quá khứ.");
        return false;
    }
    if (selected.getTime() > maxDate.getTime()) {
        showError("deliveryDate", "Ngày giao không được quá 30 ngày từ hôm nay.");
        return false;
    }

    clearError("deliveryDate");
    return true;
}

function validateAddress() {
    const val = document.getElementById("address").value.trim();

    if (!val) {
        showError("address", "Địa chỉ không được để trống.");
        return false;
    }
    if (val.length < 10) {
        showError("address", "Địa chỉ phải có ít nhất 10 ký tự.");
        return false;
    }

    clearError("address");
    return true;
}

function validateNote() {
    const val = document.getElementById("note").value;
    // Không trim() vì muốn đếm cả khoảng trắng

    // Không bắt buộc → chỉ kiểm tra nếu có nhập
    if (val.length > 200) {
        showError("note", "Ghi chú không được quá 200 ký tự.");
        return false;
    }

    clearError("note");
    return true;
}

function validatePayment() {
    const selected = document.querySelector('input[name="payment"]:checked');

    if (!selected) {
        showErrorRadio("Vui lòng chọn phương thức thanh toán.");
        return false;
    }

    clearErrorRadio();
    return true;
}

function updateNoteCount() {
    const note    = document.getElementById("note");
    const counter = document.getElementById("noteCount");
    const current = note.value.length;  // số ký tự hiện tại

    // Cập nhật hiển thị "45/200"
    counter.textContent = current + "/200";

    if (current > 200) {
        // Vượt quá → chữ đỏ
        counter.classList.remove("text-muted");
        counter.classList.add("text-danger");

        // Hiện lỗi ở ô textarea
        showError("note", "Ghi chú không được quá 200 ký tự.");
    } else {
        // Bình thường → chữ xám
        counter.classList.remove("text-danger");
        counter.classList.add("text-muted");

        // Xóa lỗi nếu đang có
        clearError("note");
    }
}


function updateTotal() {
    // 1. Lấy sản phẩm đang chọn
    const product  = document.getElementById("productName").value;

    // 2. Lấy số lượng, chuyển sang số
    const quantity = Number(document.getElementById("quantity").value);

    // 3. Lấy giá từ object prices
    //    Nếu chưa chọn sản phẩm → giá = 0
    const price = prices[product] || 0;

    // 4. Tính tổng
    const total = price * quantity;

    // 5. Hiển thị vào ô totalPrice
    document.getElementById("totalPrice").value =
        total > 0
            ? Number(total).toLocaleString("vi-VN") + " ₫"
            : "0 ₫";
}
document.getElementById("note").addEventListener("input", updateNoteCount);

document.getElementById("quantity").addEventListener("input", updateTotal);

document.getElementById("productName").addEventListener("change", updateTotal);

// ===== Blur — validate khi rời ô =====
document.getElementById("productName")
    .addEventListener("change", validateProduct);

document.getElementById("quantity")
    .addEventListener("blur", validateQuantity);

document.getElementById("deliveryDate")
    .addEventListener("blur", validateDate);

document.getElementById("address")
    .addEventListener("blur", validateAddress);

// ===== Input — xóa lỗi khi gõ lại =====
document.getElementById("quantity")
    .addEventListener("input", () => clearError("quantity"));

document.getElementById("address")
    .addEventListener("input", () => clearError("address"));

document.getElementById("deliveryDate")
    .addEventListener("input", () => clearError("deliveryDate"));

function showConfirmBox() {
    // Lấy thông tin từ form
    const product  = document.getElementById("productName").value;
    const quantity = document.getElementById("quantity").value;
    const total    = document.getElementById("totalPrice").value;
    const date     = document.getElementById("deliveryDate").value;

    // Định dạng ngày từ "2025-03-15" → "15/03/2025"
    const dateParts = date.split("-");          // ["2025", "03", "15"]
    const dateFormatted = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    //                     "15"              "03"              "2025"

    // Điền vào các thẻ strong trong confirmBox
    document.getElementById("cf_product").textContent  = product;
    document.getElementById("cf_quantity").textContent = quantity;
    document.getElementById("cf_total").textContent    = total;
    document.getElementById("cf_date").textContent     = dateFormatted;

    // Hiện div xác nhận
    document.getElementById("confirmBox").style.display = "block";

    // Cuộn xuống để người dùng thấy div
    document.getElementById("confirmBox").scrollIntoView({ behavior: "smooth" });
}

// Nút Xác nhận → thông báo thành công
document.getElementById("btnConfirm")
    .addEventListener("click", function () {
        const product = document.getElementById("productName").value;

        // Ẩn div xác nhận
        document.getElementById("confirmBox").style.display = "none";

        // Thông báo thành công
        alert(`Đặt hàng thành công! 🎉 Sản phẩm "${product}" đang được xử lý.`);

        // Reset form
        document.getElementById("orderForm").reset();

        // Xóa viền xanh sau reset
        document.querySelectorAll(".is-valid")
            .forEach(el => el.classList.remove("is-valid"));

        // Reset tổng tiền và đếm ký tự
        document.getElementById("totalPrice").value = "0 ₫";
        document.getElementById("noteCount").textContent = "0/200";
    });

// Nút Hủy → ẩn div, quay lại form
document.getElementById("btnCancel")
    .addEventListener("click", function () {
        document.getElementById("confirmBox").style.display = "none";
    });

document.getElementById("orderForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        // Gọi tất cả validate cùng lúc bằng &
        const isValid =
            validateProduct()  &
            validateQuantity() &
            validateDate()     &
            validateAddress()  &
            validateNote()     &
            validatePayment();

        if (isValid) {
            // Không alert ngay — hiện div xác nhận
            showConfirmBox();
        }
    });