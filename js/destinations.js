const destinations = [
  { id: "colombo", title: "Colombo", image: "images/colombo.jpg", desc: "Cosmopolitan city with colonial heritage" },
  { id: "galle", title: "Galle", image: "images/galle.jpg", desc: "UNESCO Fort & coastal charm" },
  { id: "hikkaduwa", title: "Hikkaduwa", image: "images/hikkaduwa.jpg", desc: "Beaches & coral reefs" },
  { id: "kandy", title: "Kandy", image: "images/kandy.jpg", desc: "Historic city with rich culture" },
  { id: "unawatuna", title: "Unawatuna", image: "images/unawatuna.jpg", desc: "Golden beaches & palms" },
  { id: "tangalle", title: "Tangalle", image: "images/tangalle.jpg", desc: "Seaside retreat with calm bays" },
  { id: "polonnaruwa", title: "Polonnaruwa", image: "images/polonnaruwa.jpg", desc: "Ancient city ruins" },
  { id: "arugam_bay", title: "Arugam Bay", image: "images/arugam_bay.jpg", desc: "Famous surf destination" },
  { id: "trincomalee", title: "Trincomalee", image: "images/trincomalee.jpg", desc: "Historic port & beaches" },
  { id: "nuwara_eliya", title: "Nuwara Eliya", image: "images/nuwara_eliya.jpg", desc: "Tea hills & cool climate" },
  { id: "ella", title: "Ella", image: "images/ella.jpg", desc: "Mountain views & nature" },
  { id: "mirissa", title: "Mirissa", image: "images/mirissa.jpg", desc: "Sunset beach vibes" },
  { id: "pasikuda", title: "Pasikuda", image: "images/pasikuda.jpg", desc: "Shallow azure waters" },
  { id: "negombo", title: "Negombo", image: "images/negombo.jpg", desc: "Beach town near airport" },
  { id: "yala", title: "Yala", image: "images/yala.jpg", desc: "Safari & wildlife" },
  { id: "jaffna", title: "Jaffna", image: "images/jaffna.jpg", desc: "Cultural & historic north" },
  { id: "anuradhapura", title: "Anuradhapura", image: "images/anuradhapura.jpg", desc: "Sacred ancient capital" },
  { id: "sigiriya", title: "Sigiriya", image: "images/sigiriya.jpg", desc: "Iconic rock fortress" }
];

const container = document.getElementById("destinationsContainer");

destinations.forEach(dest => {
  let card = document.createElement("div");
  card.className = "card";
  card.onclick = () => {
    window.location.href = `destination-details.html?place=${dest.id}`;
  };
  card.innerHTML = `
    <img src="${dest.image}" alt="${dest.title}">
    <div class="card-content">
      <h3>${dest.title}</h3>
      <p>${dest.desc}</p>
      <button>Find Out More</button>
    </div>
  `;
  container.appendChild(card);
  const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }


    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

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