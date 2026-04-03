const searchbar = document.getElementById('searchbar');
const cards = document.querySelectorAll('.package-card');
const resultsLayout = document.getElementById('resultsLayout');
const descriptionBox = document.getElementById('packageDescription');

searchbar.addEventListener('input', () => {
    const searchValue = searchbar.value.toLowerCase().trim();

    let found = false;

    cards.forEach(card => {
        const name = card.getAttribute('data-name');

       if (name.startsWith(searchValue) && searchValue !== "") {
            card.style.display = "grid";
            found = true;
            descriptionBox.innerHTML = `<p>${card.getAttribute('data-desc')}</p>`;
        } else {
            card.style.display = "none";
        }

            
    });

    if (searchValue === "" || !found) {
        descriptionBox.innerHTML = "";
        resultsLayout.classList.remove('active');
    } else {
        resultsLayout.classList.add('active');
    }
    
    if (searchValue === "") {
        // RESET EVERYTHING
        cards.forEach(card => {
            card.style.display = "grid";
        });

        descriptionBox.classList.remove("active");
        descriptionBox.innerHTML = "";

        resultsLayout.classList.remove("active");

    } else if (found) {
        // SHOW DESCRIPTION PANEL ONLY WHEN SOMETHING IS FOUND
        descriptionBox.classList.add("active");
        resultsLayout.classList.add("active");
    }
});


// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});


// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// FOOTER YEAR
document.addEventListener("DOMContentLoaded", () => {
    const footerYear = document.getElementById("footer-year");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});