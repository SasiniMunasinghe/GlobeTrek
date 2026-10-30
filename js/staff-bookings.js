document.addEventListener("DOMContentLoaded", () => {
  loadBookings();
});


function loadBookings() {

  fetch("../php/getAllBookings.php")
    .then(res => res.json())
    .then(data => {

      let table = document.getElementById("bookingTable");

      table.innerHTML = `
        <tr>
          <th>Customer</th>
          <th>Package</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      `;

      data.forEach(b => {

        let actionButtons = "";

        if (b.status === "pending") {
          actionButtons = `
            <button onclick="updateStatus(${b.id}, 'confirmed')">Approve</button>
            <button onclick="updateStatus(${b.id}, 'cancelled')">Reject</button>
          `;
        } else {
          actionButtons = `<span style="opacity:0.6;">No actions</span>`;
        }

        table.innerHTML += `
          <tr>
            <td>${b.name}</td>
            <td>${b.title}</td>
            <td>${b.booking_date}</td>
            <td>${b.status}</td>
            <td>${actionButtons}</td>
          </tr>
        `;
      });

    })
    .catch(err => console.log("Error loading bookings:", err));
}


function updateStatus(id, status) {

  let formData = new FormData();
  formData.append("id", id);
  formData.append("status", status);

  fetch("../php/updateBooking.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    if (data.success) {
      loadBookings();
    } else {
      alert("Update failed");
    }

  })
  .catch(err => console.log("Update error:", err));
}