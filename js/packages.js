let allPackages = [];

document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
    setupAuthUI();
    setFooterYear();
    loadAllPackages();
    setupSearch();
});


// LOAD ALL PACKAGES
function loadAllPackages() {

    const container = document.getElementById("packageGrid");
    if (!container) return;

    fetch("php/getPackages.php")
        .then(res => res.json())
        .then(data => {

            allPackages = data; // store globally

            renderPackages(allPackages);

        })
        .catch(err => {
            console.error("Error loading packages:", err);
            container.innerHTML = "<p>Failed to load packages.</p>";
        });
}


// RENDER PACKAGES 
function renderPackages(data) {

    const container = document.getElementById("packageGrid");

    if (!container) return;

    container.innerHTML = data.map(pkg => `
        <div class="package-card">

            <img src="${pkg.image}" alt="${pkg.title}">

            <h3>${pkg.title}</h3>

            <p>${pkg.duration}</p>

            <span>LKR ${pkg.price}</span>

            <a href="package-details.html?id=${pkg.id}">
                View Details
            </a>

        </div>
    `).join("");
}


// SEARCH 
function setupSearch() {

    const searchbar = document.getElementById("searchbar");

    if (!searchbar) return;

    searchbar.addEventListener("input", function () {
        searchPackages(this.value);
    });
}

function searchPackages(query) {

    query = query.toLowerCase();

    const filtered = allPackages.filter(pkg =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.duration.toLowerCase().includes(query)
    );

    renderPackages(filtered);
}


// NAVBAR 
function setupNavbar() {

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}


// AUTH
function setupAuthUI() {

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    const authLinks = document.querySelector(".auth-links");
    const logoutBtn = document.getElementById("logoutBtn");
    const myBookingsLink = document.getElementById("myBookingsLink");

    if (authLinks) authLinks.style.display = isLoggedIn ? "none" : "flex";
    if (myBookingsLink) myBookingsLink.style.display = isLoggedIn ? "block" : "none";

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
}


// FOOTER 
function setFooterYear() {

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
}