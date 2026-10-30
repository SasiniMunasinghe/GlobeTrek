document.addEventListener("DOMContentLoaded", loadQueries);

function loadQueries() {
  fetch("../php/getQuery.php")
    .then(res => res.json())
    .then(data => {
      renderQueries(data);
    })
    .catch(err => console.error("Error loading queries:", err));
}

function renderQueries(queries) {
  const box = document.getElementById("queriesBox");
  box.innerHTML = "";

  if (queries.length === 0) {
    box.innerHTML = "<p>No queries found.</p>";
    return;
  }

  queries.forEach(q => {
  box.innerHTML += `
    <div class="query-card">
      <div class="query-meta">${q.name}</div>
      <p><b>Email:</b> ${q.email}</p>
      <p>${q.message}</p>
      <p><b>Status:</b> ${q.status}</p>

      <input type="text" id="reply-${q.id}" placeholder="Write reply">
      <button onclick="sendReply(${q.id})">Send Reply</button>
    </div>
  `;
});
}


// placeholder for now (next step we connect DB reply system)
function sendReply(id) {
  const reply = document.getElementById(`reply-${id}`).value;

  fetch("../php/replyQuery.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${id}&reply=${encodeURIComponent(reply)}`
  })
  .then(res => res.json())
  .then(data => {
    alert("Reply sent ✔");
    loadQueries();
  })
  .catch(err => console.error(err));
}