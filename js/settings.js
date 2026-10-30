document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  fetch("../php/getAllBookings.php", {
  credentials: "include"
})
.then(res => res.json())
.then(data => {
  console.log(data);
});
  function loadSettings() {
  fetch("../php/getSettings.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {

    document.getElementById("adminName").value = data.name || "";
    document.getElementById("adminEmail").value = data.email || "";

    document.getElementById("notifications").value = data.notifications || "on";
    document.getElementById("autoConfirm").value = data.autoConfirm || "no";
  });
}
function saveAccount() {
  const name = document.getElementById("adminName").value;
  const email = document.getElementById("adminEmail").value;

  fetch("../php/updateAdminAccount.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email })
  })
  .then(res => res.json())
  .then(data => {
    alert("Account updated ✔");
  });
}
function saveSystem() {
  const notifications = document.getElementById("notifications").value;
  const autoConfirm = document.getElementById("autoConfirm").value;

  fetch("../php/updateSystemSettings.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ notifications, autoConfirm })
  })
  .then(res => res.json())
  .then(data => {
    alert("Settings updated ✔");
  });
}
function resetSystem() {
  const ok = confirm("This will reset system data. Continue?");

  if (!ok) return;

  fetch("../php/resetSystem.php", {
    method: "POST",
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
    alert("System reset complete ✔");
  });
}
});