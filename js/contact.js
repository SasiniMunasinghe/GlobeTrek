document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.getElementById("contactForm");
  const messageBox = document.getElementById("contactMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        messageBox.innerText = "Please fill all fields.";
        messageBox.style.color = "red";
        return;
      }

      try {
        const res = await fetch("php/insertQuery.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
        });

        const data = await res.json();

        if (data.success) {
          messageBox.innerText = "Message sent successfully ✔";
          messageBox.style.color = "green";
          contactForm.reset();
        } else {
          messageBox.innerText = "Failed to send message.";
          messageBox.style.color = "red";
        }

      } catch (err) {
        console.error(err);
        messageBox.innerText = "Server error. Try again.";
        messageBox.style.color = "red";
      }
    });
  }

 
  setupNavbar();

});
 // NAVBAR

function setupNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

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