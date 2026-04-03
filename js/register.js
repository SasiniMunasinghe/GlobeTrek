document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let message = document.getElementById("message");

            // check empty
            if (!name || !email || !password || !confirmPassword) {
                message.style.color = "red";
                message.innerText = "Please fill all required fields";
                return;
            }

            // password match
            if (password !== confirmPassword) {
                message.style.color = "red";
                message.innerText = "Passwords do not match";
                return;
            }

            // password length
            if (password.length < 6) {
                message.style.color = "red";
                message.innerText = "Password must be at least 6 characters";
                return;
            }

            // success
            message.style.color = "green";
            message.innerText = "Registration successful!";

            this.reset();
        });
    }


    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }


    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    

});