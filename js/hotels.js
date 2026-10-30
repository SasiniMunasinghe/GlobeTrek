document.addEventListener("DOMContentLoaded", () => {

  
  // Hotel Data
 
  const hotelData = {
    colombo: [
      {
        id: "c1",
        name: "Cinnamon Grand Colombo",
        image: "images/hotel1.jpg",
        price: "LKR 34000.00/night",
        rating: "4.7",
        description: "Elegant comfort in the heart of the city."
      },
      {
        id: "c2",
        name: "Shangri-La Colombo",
        image: "images/hotel2.jpeg",
        price: "LKR 34000.00/night",
        rating: "4.8",
        description: "Ocean views and modern luxury."
      }
    ],
    ella: [
      {
        id: "e1",
        name: "98 Acres Resort",
        image: "images/hotel3.jpg",
        price: "LKR 34000.00/night",
        rating: "4.8",
        description: "Nature, silence, and mountain views."
      }
    ],
    sigiriya: [
      {
        id: "s1",
        name: "Water Garden Sigiriya",
        image: "images/hotel4.jpg",
        price: "LKR 34000.00/night",
        rating: "4.9",
        description: "Luxury surrounded by water and stone."
      }
    ]
  };

  
  const params = new URLSearchParams(window.location.search);
  const place = params.get("place");

  const container = document.getElementById("hotelsContainer");
  const title = document.getElementById("hotelTitle");

  if (!container || !title) return;

 
  function createHotelCard(hotel, placeKey) {
    const card = document.createElement("div");
    card.classList.add("hotel-card");

    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}">
      <div class="hotel-info">
        <h3>${hotel.name}</h3>
        <p>${hotel.price}</p>
        <p>⭐ ${hotel.rating}</p>
        <p>${hotel.description}</p>
        <a href="hotel-details.html?id=${hotel.id}&place=${placeKey}">
          View Details
        </a>
      </div>
    `;

    return card;
  }

  
  // Render Hotels
  
  function renderHotels() {
    container.innerHTML = "";

    if (place && hotelData[place]) {
      title.textContent = `Hotels in ${place}`;

      hotelData[place].forEach(hotel => {
        container.appendChild(createHotelCard(hotel, place));
      });

    } else {
      title.textContent = "All Hotels";

      Object.keys(hotelData).forEach(placeKey => {
        hotelData[placeKey].forEach(hotel => {
          container.appendChild(createHotelCard(hotel, placeKey));
        });
      });
    }
  }

  renderHotels();

  // =========================
  // Auth UI
  // =========================
  const isLoggedIn = localStorage.getItem("loggedIn");

  const authLinks = document.querySelector(".auth-links");
  const logoutLink = document.querySelector(".logout-link");
  const logoutBtn = document.getElementById("logoutBtn");
  const myBookingsLink = document.getElementById("myBookingsLink");

  if (authLinks && logoutLink) {
    if (isLoggedIn === "true") {
      authLinks.style.display = "none";
      logoutLink.style.display = "block";
    } else {
      authLinks.style.display = "flex";
      logoutLink.style.display = "none";
    }
  }

  if (myBookingsLink) {
    myBookingsLink.style.display = isLoggedIn === "true" ? "block" : "none";
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      localStorage.removeItem("user");

      window.location.href = "index.html";
    });
  }

  // =========================
  // Navbar
  // =========================
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

});