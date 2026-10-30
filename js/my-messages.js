document.addEventListener("DOMContentLoaded", () => {
  loadMessages();
  setupNavbar();
});

function loadMessages() {
  fetch("php/getMyMessages.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => renderMessages(data))
  .catch(err => console.error(err));
}

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

function renderMessages(messages) {
  const box = document.getElementById("messagesBox");
  box.innerHTML = "";

  if (messages.length === 0) {
    box.innerHTML = "<p>No messages found.</p>";
    return;
  }

  messages.forEach(msg => {
    box.innerHTML += `
      <div class="card">
        <p><b>Your Message:</b> ${msg.message}</p>

        <p><b>Status:</b> 
          <span class="status ${msg.status}">
            ${msg.status}
          </span>
        </p>

        <p><b>Reply:</b> 
          ${msg.reply ? msg.reply : "No reply yet"}
        </p>

        <small>${msg.created_at}</small>
      </div>
    `;
  });
}