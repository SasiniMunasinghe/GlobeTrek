let data = [];

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');


function setupNav() {
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

/*  PAGE LOAD */
fetch("php/get_destinations.php")
  .then(res => res.json())
  .then(res => {
    data = res;
    initPage();
    setupNav(); 
  })
  .catch(err => console.log(err));

function initPage() {

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("place");

  const dest = data.find(d => d.slug === slug);

  if (!dest) {
    document.body.innerHTML = `
      <div style="text-align:center;padding:120px 20px;font-family:sans-serif">
        <h2>Destination not found</h2>
        <a href="destinations.html">← Back</a>
      </div>`;
    return;
  }

  document.getElementById("pageTitle").textContent =
    dest.name + " – GlobeTrek Adventures";

  document.querySelector(".hero").style.backgroundImage =
    `linear-gradient(to top, rgba(4,20,10,0.82), rgba(0,0,0,0.25)), url('${dest.image}')`;

  document.getElementById("title").textContent = dest.name;
  document.getElementById("description").textContent = dest.description;
  document.getElementById("mainImage").src = dest.image;
  document.getElementById("bestTime").textContent = dest.bestTime;

  // activities
  const actList = document.getElementById("activities");
  actList.innerHTML = "";
  dest.activities.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    actList.appendChild(li);
  });

  
  const tipList = document.getElementById("tips");
  tipList.innerHTML = "";
  dest.tips.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    tipList.appendChild(li);
  });

  // map
  if (dest.mapImage) {
    document.getElementById("mapImage").src = dest.mapImage;
  }

  
  const factsContainer = document.getElementById("quickFacts");
  let html = `<h3>Quick Facts</h3>`;

  if (typeof dest.facts === "object") {
    Object.entries(dest.facts).forEach(([key, value]) => {
      html += `
        <div class="fact-row">
          <span class="fact-label">${key}</span>
          <span class="fact-value">${value}</span>
        </div>`;
    });
  }

  factsContainer.innerHTML = html;
}