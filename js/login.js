document.addEventListener("DOMContentLoaded", () =>{

    const loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit", function(e){
            e.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let message = document.getElementById("message");

            if(email === "" || password ==="") {
                message.style.color ="red";
                message.innerText = "Please fill all fields";
                return;
            }

            let founderUser = users.find(user =>
                user.email === email && user.password === password
            );

            if(!founderUser){
                message.style.color = "red";
                message.innerText = "Invalid email or password";
                return;
            }

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("roke", founderUser.role);

            message.style.color = "green";
            message.innerText = "Login successful... redirecting";

            setTimeout(() => {
                if(founderUser.role === "admin"){
                    window.location.href= "admin/dashboard.html";
                }
                else if(founderUser.role === "staff"){
                    window.location.href = "staff/dashboard.html";
                } 
                else{
                    window.location.href = "index.html";
                }
            }, 800);

        })
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

    
    }
})