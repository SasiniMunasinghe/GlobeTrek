let slides = document.querySelectorAll(".slide");
let index = 0;

function nextSlide() {
  if (!slides.length) return;

  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {




  // HAMBURGER
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

  // SLIDER START
  if (slides.length) {
    setInterval(nextSlide, 4000);
  }

});