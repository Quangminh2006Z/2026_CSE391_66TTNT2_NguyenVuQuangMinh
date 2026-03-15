// ===== Hàm tiện ích =====
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);

    field.classList.add("is-invalid");
    field.classList.remove("is-valid");

    let feedback = field.nextElementSibling;

    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
        feedback = document.createElement("div");
        feedback.classList.add("invalid-feedback");
        field.parentNode.insertBefore(feedback, field.nextSibling);
    }
    feedback.textContent = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");

    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = "";
    }
}

function showErrorRadioCheckbox(groupName, message) {
    const old = document.getElementById("error-" + groupName);
    if (old) old.remove();

    const container = document.querySelector(`[name="${groupName}"]`)
                        ?.closest(".col-12");

    const div = document.createElement("div");
    div.id = "error-" + groupName;
    div.classList.add("text-danger", "mt-1", "small");
    div.textContent = message;

    container.appendChild(div);
}

function clearErrorRadioCheckbox(groupName) {
    const old = document.getElementById("error-" + groupName);
    if (old) old.remove();
}

// ===== Hàm validate từng trường =====

// Lỗi 1 đã sửa: đổi validateFullName → validateFullname (n thường)
function validateFullname() {
    const val = document.getElementById("fullName").value.trim();

    if (!val) {
        // Lỗi 2 đã sửa: truyền "fullName" thay vì val
        showError("fullName", "Họ và tên không được để trống.");
        return false;
    }
    if (val.length < 3) {
        showError("fullName", "Họ và tên phải có ít nhất 3 ký tự.");
        return false;
    }
    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(val)) {
        showError("fullName", "Họ và tên chỉ chứa chữ cái và khoảng trắng.");
        return false;
    }

    clearError("fullName");
    return true;
}

function validateEmail() {
    const val = document.getElementById("inputEmail4").value.trim();

    if (!val) {
        showError("inputEmail4", "Email không được để trống.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError("inputEmail4", "Email không đúng định dạng (name@domain.com).");
        return false;
    }

    clearError("inputEmail4");
    return true;
}

function validatePhone() {
    const val = document.getElementById("inputPhone").value.trim();

    if (!val) {
        showError("inputPhone", "Số điện thoại không được để trống.");
        return false;
    }
    if (!/^0\d{9}$/.test(val)) {
        showError("inputPhone", "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.");
        return false;
    }

    clearError("inputPhone");
    return true;
}

function validatePassword() {
    const val = document.getElementById("inputPassword4").value;

    if (!val) {
        showError("inputPassword4", "Mật khẩu không được để trống.");
        return false;
    }
    if (val.length < 8) {
        showError("inputPassword4", "Mật khẩu phải có ít nhất 8 ký tự.");
        return false;
    }
    if (!/[A-Z]/.test(val)) {
        showError("inputPassword4", "Mật khẩu phải có ít nhất 1 chữ hoa.");
        return false;
    }
    if (!/[a-z]/.test(val)) {
        showError("inputPassword4", "Mật khẩu phải có ít nhất 1 chữ thường.");
        return false;
    }
    if (!/[0-9]/.test(val)) {
        showError("inputPassword4", "Mật khẩu phải có ít nhất 1 chữ số.");
        return false;
    }

    clearError("inputPassword4");
    return true;
}

function validateConfirmPassword() {
    const pass    = document.getElementById("inputPassword4").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!confirm) {
        showError("confirmPassword", "Vui lòng xác nhận mật khẩu.");
        return false;
    }
    if (pass !== confirm) {
        showError("confirmPassword", "Mật khẩu xác nhận không khớp.");
        return false;
    }

    clearError("confirmPassword");
    return true;
}

function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');

    if (!selected) {
        showErrorRadioCheckbox("gender", "Vui lòng chọn giới tính.");
        return false;
    }

    clearErrorRadioCheckbox("gender");
    return true;
}

function validateTerms() {
    const checked = document.getElementById("agreeTerms").checked;

    if (!checked) {
        showErrorRadioCheckbox("agreeTerms", "Bạn phải đồng ý với điều khoản.");
        return false;
    }

    clearErrorRadioCheckbox("agreeTerms");
    return true;
}

// ===== Gắn sự kiện blur =====
document.getElementById("fullName")
    .addEventListener("blur", validateFullname);

document.getElementById("inputEmail4")
    .addEventListener("blur", validateEmail);

document.getElementById("inputPhone")
    .addEventListener("blur", validatePhone);

document.getElementById("inputPassword4")
    .addEventListener("blur", validatePassword);

document.getElementById("confirmPassword")
    .addEventListener("blur", validateConfirmPassword);

// ===== Gắn sự kiện input =====
document.getElementById("fullName")
    .addEventListener("input", () => clearError("fullName"));

document.getElementById("inputEmail4")
    .addEventListener("input", () => clearError("inputEmail4"));

document.getElementById("inputPhone")
    .addEventListener("input", () => clearError("inputPhone"));

document.getElementById("inputPassword4")
    .addEventListener("input", () => clearError("inputPassword4"));

document.getElementById("confirmPassword")
    .addEventListener("input", () => clearError("confirmPassword"));

// ===== Xử lý submit =====
document.getElementById("registerForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const isValid =
            validateFullname()        &
            validateEmail()           &
            validatePhone()           &
            validatePassword()        &
            validateConfirmPassword() &
            validateGender()          &
            validateTerms();

        if (isValid) {
            const name = document.getElementById("fullName").value.trim();
            alert(`Đăng ký thành công! 🎉 Xin chào, ${name}!`);

            this.reset();
            document.querySelectorAll(".is-valid")
                .forEach(el => el.classList.remove("is-valid"));
        }
    });