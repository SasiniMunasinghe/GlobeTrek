document.addEventListener("DOMContentLoaded", () => {


fetch("php/auth_check.php", { credentials: "include" })
  .then(res => res.json())
  .then(data => {
    

    if (!data.loggedIn) {
      window.location.href = "login.html";
      return;
    }

    loadBookings();
  });

  
  function loadBookings() {

  fetch("php/getUserBooking.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
  console.log("BOOKING RESPONSE:", data);

    const container = document.getElementById("bookingsContainer");

    if (!container) return;

    if (!data.success || data.bookings.length === 0) {
      container.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    container.innerHTML = data.bookings.map(b => `
      <div class="booking-card">
        <h3>${b.title}</h3>
        <p><strong>Name:</strong> ${b.name}</p>
        <p><strong>Date:</strong> ${b.booking_date}</p>
        <p><strong>People:</strong> ${b.people}</p>
        <p><strong>Status:</strong> ${b.status}</p>
        <p><strong>Notes:</strong> ${b.notes || "None"}</p>
      </div>
    `).join("");
  });
}
const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // NAV SCROLL
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }
});