document.addEventListener("DOMContentLoaded", () => {

    let currentUser = null;
    let package_id = new URLSearchParams(window.location.search).get("package");

    fetch("php/auth_check.php", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (data.loggedIn) {
            currentUser = data; 
        }
    });

    setupNavbar(); 

    const input = document.getElementById("packageName");
    if (input) input.value = package_id || "Not Selected";

    const form = document.getElementById("bookingForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const people = document.getElementById("people").value;
        const notes = document.getElementById("notes").value;
        const message = document.getElementById("message");

        if (!name || !email || !date || !people) {
            message.style.color = "red";
            message.innerText = "Please fill all required fields";
            return;
        }

        if (!currentUser) {
            message.style.color = "red";
            message.innerText = "Please login first";
            return;
        }

        const bookingData = {
            user_id: currentUser.user_id,
            package_id,
            name,
            email,
            phone,
            booking_date: date,
            people,
            notes
        };

        fetch("php/createBooking.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(bookingData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                message.style.color = "green";
                message.innerText = "Booking successful!";
                form.reset();
            } else {
                message.style.color = "red";
                message.innerText = data.message;
            }
        })
        .catch(err => {
            console.error(err);
            message.innerText = "Server error";
        });
    });
});


//NAVBAR 
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