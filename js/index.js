let slides = document.querySelectorAll(".slide")

let index = 0
function nextSlide(){
    slides[index].classList.remove("active")

    index++

    if(index >= slides.length){
        index = 0
    }
    slides[index].classList.add("active")
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const footerYear = document.getElementById("footer-year");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});

setInterval(nextSlide,4000)