document.addEventListener("DOMContentLoaded", () => {

  let loggedIn = false;

  
  window.authUser = null;

  
  // CHECK LOGIN STATE
  
  fetch("php/auth_check.php", { credentials: "include" })
    .then(res => res.json())
    .then(data => {

      console.log("AUTH STATE:", data);

      window.authUser = data; 

      loggedIn = data.loggedIn === true;

      const role = (data.role || "").toLowerCase().trim();

      const loginBtns = document.querySelectorAll(".login-btn");
      const registerBtns = document.querySelectorAll(".register-btn");

      const logoutItem = document.getElementById("logoutItem");
      const myBookings = document.getElementById("myBookingsLink");
      const myMessages = document.getElementById("myMessagesLink");
      const authLinks = document.getElementById("authLinks");

      const userMenu = document.getElementById("userMenu");

      
      // UI VISIBILITY CONTROL
      
      loginBtns.forEach(btn => {
        btn.style.display = loggedIn ? "none" : "inline-block";
      });

      registerBtns.forEach(btn => {
        btn.style.display = loggedIn ? "none" : "inline-block";
      });

      if (userMenu) {
        userMenu.style.display = loggedIn ? "flex" : "none";
      }

      if (logoutItem) logoutItem.style.display = loggedIn ? "flex" : "none";
      if (myBookings) myBookings.style.display = loggedIn ? "flex" : "none";
      if (myMessages) myMessages.style.display = loggedIn ? "flex" : "none";

      if (authLinks) authLinks.style.display = loggedIn ? "none" : "flex";

  
      
    
      const path = window.location.pathname;

      if (loggedIn) {

      
        if (role === "admin" && path.includes("index.html")) {
          window.location.href = "/webAssignment/admin/dashboard.html";
        }

        if (role === "staff" && path.includes("index.html")) {
          window.location.href = "/webAssignment/staff/staff-dashboard.html";
        }

      }

    })
    .catch(err => console.log("Auth check failed:", err));


  // GLOBAL LOGOUT HANDLER
 
  document.addEventListener("click", async (e) => {

    if (e.target && e.target.id === "logoutBtn") {
      e.preventDefault();

      try {
        await fetch("php/logout.php", { credentials: "include" });
      } catch (err) {
        console.log("Logout error:", err);
      }

      window.location.href = "/webAssignment/index.html";
    }
  });


 
  // USER DROPDOWN MENU
  
  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdown");

  if (userIcon && dropdown) {
    userIcon.addEventListener("click", (e) => {
      e.preventDefault();

      dropdown.style.display =
        dropdown.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", (e) => {
      if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

});