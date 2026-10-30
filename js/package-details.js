document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
   
    setFooterYear();
    loadPackageDetails();
});

// LOAD PACKAGE 
function loadPackageDetails() {
    const container = document.getElementById("packageContainer");
    const id = new URLSearchParams(window.location.search).get("id");

    if (!container) return;

    if (!id) {
        container.innerHTML = "<h2>Package not found</h2>";
        return;
    }

    fetch(`php/getPackageById.php?id=${id}`)
        .then(res => res.json())
        .then(pkg => {

            if (!pkg || Object.keys(pkg).length === 0) {
                container.innerHTML = "<h2>Package not found</h2>";
                return;
            }

            renderPackage(pkg);
        })
        .catch(err => {
            console.error("Error loading package:", err);
            container.innerHTML = "<h2>Something went wrong loading this package.</h2>";
        });
}

// RENDER 
function renderPackage(pkg) {
    const container = document.getElementById("packageContainer");
    if (!container) return;

    container.innerHTML = `
        <h1>${pkg.title}</h1>

        <div class="hero-image">
            <!-- FIXED IMAGE PATH -->
            <img src="${pkg.image}" alt="${pkg.title}">
        </div>

        <div class="info">
            <p><strong>Duration:</strong> ${pkg.duration}</p>
            <p><strong>Price:</strong> LKR ${pkg.price}</p>
            <p><strong>Accommodation:</strong> ${pkg.accommodation}</p>
            <p><strong>Activities:</strong> ${pkg.activities}</p>
        </div>

        <div class="description">
            <p>${pkg.description}</p>
        </div>

        <a href="booking.html?package=${pkg.id}" class="btn">
            Book Now
        </a>
    `;
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


// FOOTER 
function setFooterYear() {
    const footerYear = document.getElementById("footer-year");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
}