const hotelData = {
  c1: {
    name: "Cinnamon Grand Colombo",
    image: "images/hotel1.jpg",
    price: "$120/night",
    rating: "4.7",
    description: "Elegant comfort in the heart of Colombo.",
    link: "https://www.cinnamonhotels.com/cinnamon-grand-colombo",
    experience: "Wake up in the heart of Colombo with soft golden light and a quiet sense of luxury surrounding you.",
    gallery: [
      "images/hotel1.jpg",
      "images/hotel1-1.jpg",
      "images/hotel1-2.jpg"
    ],
    reviews: [
      { name: "Sarah", text: "Absolutely stunning place. Peaceful and luxurious." }
    ]
  },

  c2: {
    name: "Shangri-La Colombo",
    image: "images/hotel2.jpeg",
    price: "$200/night",
    rating: "4.8",
    description: "Overlooking the Indian Ocean.",
    link: "https://www.shangri-la.com/colombo/shangrila/",
    experience: "Wake up in the heart of Colombo with soft golden light and a quiet sense of luxury surrounding you.",
    gallery: [
      "images/hotel2.jpeg",
      "images/hotel2-1.jpg",
      "images/hotel2-2.jpg"
    ],
    reviews: [
      { name: "Daniel", text: "Service was top-notch. Highly recommend." }
    ]
  },

  e1: {
    name: "98 Acres Resort",
    image: "images/hotel3.jpg",
    price: "$180/night",
    rating: "4.8",
    description: "A peaceful retreat in Ella.",
    link: "https://www.resort98acres.com/",
    experience: "Wake up in the heart of Colombo with soft golden light and a quiet sense of luxury surrounding you.",
    gallery: [
      "images/hotel3.jpg",
      "images/hotel3-1.jpg",
      "images/hotel3-2.jpg"
    ],
    reviews: []
  },

  s1: {
    name: "Water Garden Sigiriya",
    image: "images/hotel4.jpg",
    price: "$250/night",
    rating: "4.9",
    description: "Luxury villas surrounded by nature.",
    link: "https://www.watergardensigiriya.com/",
    experience: "Wake up in the heart of Colombo with soft golden light and a quiet sense of luxury surrounding you.",
    gallery: [
      "images/hotel4.jpg",
      "images/hotel4-1.jpg",
      "images/hotel4-2.jpg"
    ],
    reviews: []
  }
};


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hotel = hotelData[id];


const titleEl = document.getElementById("hotelTitle");
const imgEl = document.getElementById("hotelImage");
const descEl = document.getElementById("hotelDescription");
const ratingEl = document.getElementById("hotelRating");
const priceEl = document.getElementById("hotelPrice");
const expEl = document.getElementById("hotelExperience");
const galleryContainer = document.getElementById("hotelGallery");
const reviewsContainer = document.getElementById("reviewsContainer");
const bookBtn = document.getElementById("bookBtn");


if (hotel) {

  if (titleEl) titleEl.textContent = hotel.name;
  if (imgEl) imgEl.src = hotel.image;
  if (descEl) descEl.textContent = hotel.description;
  if (ratingEl) ratingEl.textContent = hotel.rating;
  if (priceEl) priceEl.textContent = hotel.price;
  if (expEl) expEl.textContent = hotel.experience;

  //  Gallery
  if (galleryContainer) {
    hotel.gallery.forEach(img => {
      const image = document.createElement("img");
      image.src = img;
      image.alt = hotel.name;
      galleryContainer.appendChild(image);
    });
  }

  // Reviews
  if (reviewsContainer) {
    hotel.reviews.forEach(review => {
      const div = document.createElement("div");
      div.classList.add("review");

      div.innerHTML = `
        <p class="review-text">"${review.text}"</p>
        <p class="review-name">- ${review.name}</p>
      `;

      reviewsContainer.appendChild(div);
    });
  }

  //  Add review
  const submitBtn = document.getElementById("submitReview");

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const name = document.getElementById("reviewName").value;
      const text = document.getElementById("reviewText").value;

      if (name && text && reviewsContainer) {
        const newReview = document.createElement("div");
        newReview.classList.add("review");

        newReview.innerHTML = `
          <p class="review-text">"${text}"</p>
          <p class="review-name">- ${name}</p>
        `;

        reviewsContainer.appendChild(newReview);

        document.getElementById("reviewName").value = "";
        document.getElementById("reviewText").value = "";
      }
    });
  }

  // Book button
  if (bookBtn) {
    bookBtn.href = hotel.link;
    bookBtn.target = "_blank";
    bookBtn.rel = "noopener noreferrer";
  }

} else {
  document.body.innerHTML = "<h2 style='text-align:center;'>Hotel not found</h2>";
}

//  Scroll animation
function revealOnScroll() {
  const sections = document.querySelectorAll(
    ".hotel-details-container, .hotel-gallery, .hotel-experience, .hotel-reviews"
  );

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
document.addEventListener("DOMContentLoaded", () => {

  const isLoggedIn = localStorage.getItem("loggedIn");

  const authLinks = document.querySelector(".auth-links");
  const logoutLink = document.querySelector(".logout-link");
  const myBookingsLink = document.getElementById("myBookingsLink");

  // Auth UI
  if (authLinks && logoutLink) {
    if (isLoggedIn === "true") {
      authLinks.style.display = "none";
      logoutLink.style.display = "block";
      if (myBookingsLink) myBookingsLink.style.display = "block";
    } else {
      authLinks.style.display = "flex";
      logoutLink.style.display = "none";
      if (myBookingsLink) myBookingsLink.style.display = "none";
    }
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");

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
});
//  Navbar
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

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
document.addEventListener("DOMContentLoaded", () => {
    let myBookingsLink = document.getElementById("myBookingsLink");

    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {
        myBookingsLink.style.display = "block";
    } else {
        myBookingsLink.style.display = "none";
    }
});