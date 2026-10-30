document.addEventListener("DOMContentLoaded", () => {
  loadAccount();

  document
    .getElementById("saveProfile")
    .addEventListener("click", saveProfile);
});

async function loadAccount() {
  const res = await fetch("php/getMyAccount.php", {
    credentials: "include"
  });

  const data = await res.json();

  userName.value = data.user.name;
  userEmail.value = data.user.email;


  totalBookings.innerText = data.bookings.total || 0;
  pendingBookings.innerText = data.bookings.pending || 0;
  confirmedBookings.innerText = data.bookings.confirmed || 0;

  totalMessages.innerText = data.messages.total || 0;
  replyCount.innerText = data.messages.replied || 0;
}

async function saveProfile() {
  const name = userName.value.trim();
  const email = userEmail.value.trim();
  const msg = document.getElementById("profileMsg");

  const res = await fetch("php/updateProfile.php", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    credentials:"include",
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();

  if (data.success) {
    msg.innerText = "Saved successfully ✔";
    msg.style.color = "#7cff9f";
  } else {
    msg.innerText = data.message;
    msg.style.color = "#ff8080";
  }
}