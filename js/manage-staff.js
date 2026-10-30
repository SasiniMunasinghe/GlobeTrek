let staffList = [];

document.addEventListener("DOMContentLoaded", () => {
  loadStaff();
});

/* LOAD STAFF */
function loadStaff() {
  fetch("../php/getStaff.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
    staffList = data || [];
    renderTable();
  });
}

/* RENDER */
function renderTable() {
  const table = document.getElementById("staffTable");

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  `;

  staffList.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.role}</td>
        <td>
          <button onclick="deleteStaff(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* ADD STAFF*/
function addStaff() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let role = document.getElementById("role").value.trim();

  if (!name || !email || !role) {
    alert("Please fill all fields");
    return;
  }

  fetch("../php/addStaff.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, role })
  })
  .then(res => res.json())
  .then(data => {

    console.log("ADD STAFF RESPONSE:", data);

    if (data.success) {

    
      alert(
        "Staff Created Successfully!\n\n" +
        "Temporary Password: " + data.password + "\n\n" +
        "⚠ Save this password — it will not be shown again."
      );

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("role").value = "";

      loadStaff();
    } else {
      alert(data.message || "Failed to add staff");
    }
  });
}

/* DELETE */
function deleteStaff(id) {
  fetch("../php/deleteStaff.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) loadStaff();
    else alert("Failed to delete staff");
  });
}