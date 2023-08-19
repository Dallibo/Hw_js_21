function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function submitForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    var emailError = document.querySelector(".err1");
    var repeatPasswordError = document.querySelector(".err2");
    var passwordMatchError = document.querySelector(".err3");

    if (!validateEmail(email)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }

    if (password !== repeatPassword) {
        repeatPasswordError.style.display = "block";
    } else {
        repeatPasswordError.style.display = "none";
    }

    if (password.length < 6) {
        passwordMatchError.textContent = "Password must be at least 6 characters long";
        passwordMatchError.style.display = "block";
    } else {
        passwordMatchError.style.display = "none";
    }

    if (!validateEmail(email) || password !== repeatPassword || password.length < 6) {
        return;
    }

    setCookie("user_email", email, 7);

    window.location.href = "user_info.html";
}

window.onload = function () {
    var userEmail = getCookie("user_email");
    if (userEmail) {
        window.location.href = "user_info.html";
    }
};