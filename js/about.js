document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");


    window.addEventListener("scroll", () => {
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

        // Close menu when clicking a link (clean UX)
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    const revealElements = document.querySelectorAll(".card, .team-card, .story-text");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => {
        el.classList.add("hidden");
        revealObserver.observe(el);
    });
    const slider = document.getElementById("awardsSlider");

let scrollAmount = 0;

setInterval(() => {
    if (!slider) return;

    scrollAmount += 300;

    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
    }

    slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });

}, 3000);

});