document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById("navbar");

  
  // LOGIN HANDLER
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("php/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        console.log("LOGIN RESPONSE:", data);

        if (data.status === "success") {

          message.innerText = "Welcome back…";
          message.style.color = "green";

          setTimeout(() => {

            // force password change
            if (data.forceChangePassword === true) {
              window.location.href = "changePassword.html";
              return;
            }

            // role-based routing
            switch (data.role) {
              case "admin":
                window.location.href = "/webAssignment/admin/dashboard.html";
                break;

              case "staff":
                window.location.href = "/webAssignment/staff/staff-dashboard.html";
                break;

              default:
                window.location.href = "index.html";
                break;
            }

          }, 800);

        } else {
          message.innerText = data.message;
          message.style.color = "red";
        }

      } catch (err) {
        console.error("Login error:", err);
        message.innerText = "Something went wrong. Try again.";
        message.style.color = "red";
      }
    });
  }

 
  // HAMBURGER MENU

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

  
  // NAVBAR SCROLL EFFECT
 
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

});