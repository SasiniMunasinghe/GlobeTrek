const data = {
    sigiriya: {
        title: "Sigiriya Cultural Tour",
        duration: "3 Days / 2 Nights",
        price: "LKR 43900.00",
        heroImage: "images/sigiriya.jpg",
        images: [
            "images/sigiriya1.jpg",
            "images/sigiriya2.jpeg",
        ],
        itinerary: [
            "Day 1 - Arrival & village tour",
            "Day 2 - Climb Sigiriya Rock Fortress",
            "Day 3 - Cultural show & departure",
        ],
        accommodation: "4-star hotel with breakfast",
        activities: "Hiking, cultural tours, sightseeing"
    },

    ella: {
        title: "Ella Adventure Tour",
        duration: "2 Days / 1 Night",
        price: "LKR 56000.00",
        heroImage: "images/ella.jpg", // FIXED
        images: [
            "images/ella.jpg",
            "images/ella1.jpg",
            "images/ella2.jpeg",
        ],
        itinerary: [
            "Day 1 - Train ride & explore Ella",
            "Day 2 - Little Adam's Peak hike",
        ],
        accommodation: "Mountain view guesthouse",
        activities: "Hiking, nature, photography"
    },

    yala: {
        title: "Yala Safari Tour",
        duration: "3 Days / 2 Nights",
        price: "LKR 37400.00",
        heroImage: "images/yala.jpg",
        images: [
            "images/yala.jpg",
            "images/yala1.jpg",
            "images/yala2.jpg",
        ],
        itinerary: [
            "Day 1 - Arrival & safari",
            "Day 2 - Full day wildlife safari",
            "Day 3 - Departure"
        ],
        accommodation: "Safari lodge",
        activities: "Wildlife safari, photography"
    },

    kandy: {
        title: "Kandy Heritage Tour",
        duration: "2 Days / 1 Night",
        price: "LKR 45000.00",
        heroImage: "images/kandy.jpg",
        images: [
            "images/kandy.jpg",
            "images/lake.jpeg",
            "images/kandy1.jpeg",
        ],
        itinerary: [
            "Day 1 - Temple of the Tooth visit",
            "Day 2 - Cultural show & city tour",
        ],
        accommodation: "City hotel",
        activities: "Cultural tour, sightseeing"
    },

    nuwara: {
        title: "Nuwara Eliya Tea Tour",
        duration: "3 Days / 2 Nights",
        price: "LKR 39000.00",
        heroImage: "images/nuwara2.jpg",
        images: [
            "images/nuwara2.jpg",
            "images/nuwara.jpeg",
            "images/nuwara1.jpeg",
        ],
        itinerary: [
            "Day 1 - Tea plantations",
            "Day 2 - Lake Gregory visit",
            "Day 3 - Departure"
        ],
        accommodation: "Tea estate hotel",
        activities: "Tea tasting, nature walks"
    },

    galle: {
        title: "Galle Beach Escape",
        duration: "2 Days / 1 Night",
        price: "LKR 45000.00",
        heroImage: "images/galle1.jpg",
        images: [
            "images/gallefort.jpg",
            "images/galle1.jpg",
            "images/galle2.jpg",
        ],
        itinerary: [
            "Day 1 - Beach relaxation",
            "Day 2 - Galle Fort visit"
        ],
        accommodation: "Beach resort",
        activities: "Beach, sightseeing"
    }
};
function getPackage() {

    let params = new URLSearchParams(window.location.search)
    return params.get("package")
}

function loadPackage() {
    let id = getPackage()
    let pkg = data[id]
    let container = document.getElementById("packageContainer")

    if (!pkg) {
        container.innerHTML = "<h2>Package not found</h2>"
        return
    }

let heroHTML = `<img src="${pkg.heroImage}" alt="${pkg.title}">`;

let galleryHTML = pkg.images.map(img => `<img src="${img}" alt="Tour image">`).join("");

    let itineraryHTML = pkg.itinerary.map(day => `<li>${day}</li>`).join("")

   container.innerHTML = `
    <h1>${pkg.title}</h1>

    <div class="hero-image">
        ${heroHTML}
    </div>

    <div class="gallery">
        ${galleryHTML}
    </div>

  
    
    
    <div class="info">
    <p><strong>Duration:</strong>${pkg.duration}</p>
    <p><strong>Price:</strong>${pkg.price}</p>
    <p><strong>Accomodation:</strong>${pkg.accommodation}</p>
    <p><strong>Activities:</strong>${pkg.activities}</p>
    </div>
    <div class="itinerary">
    <h3>Itinerary</h3>
    <ul>
    ${itineraryHTML}
    </ul>
    </div>
    <a href = "booking.html?package=${id}" class="btn">Book Now</a>`
}
document.addEventListener("DOMContentLoaded", loadPackage)
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

