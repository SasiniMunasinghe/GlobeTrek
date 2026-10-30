let bookings = [];

document.addEventListener("DOMContentLoaded", () => {
  loadBookings();
});

function loadBookings() {
  fetch("../php/getAllBookings.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
    bookings = data || [];
    render(bookings);
  })
  .catch(err => {
    console.error("Load bookings error:", err);
  });
}
function filterBookings(type) {
  currentFilter = type;

  if (type === "all") {
    render(bookings);
    return;
  }

  const filtered = bookings.filter(b =>
    (b.status || "pending").toLowerCase() === type.toLowerCase()
  );

  render(filtered);
}
function render(list) {
  const container = document.getElementById("bookingContainer");

  if (!container) return;

  if (!list.length) {
    container.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  container.innerHTML = list.map(b => `
    <div class="booking-card">
      <h3>${b.title ?? 'No Package'}</h3>

      <p><strong>Name:</strong> ${b.name ?? '-'}</p>
      <p><strong>Date:</strong> ${b.booking_date ?? '-'}</p>
      <p><strong>People:</strong> ${b.people ?? '-'}</p>

      <p class="status ${b.status ?? 'pending'}">
        Status: ${b.status ?? 'pending'}
      </p>

      <div class="actions">
        <button onclick="updateStatus(${b.id}, 'confirmed')" class="confirm">
          Confirm
        </button>

        <button onclick="updateStatus(${b.id}, 'cancelled')" class="cancel">
          Cancel
        </button>
      </div>
    </div>
  `).join("");
}function updateStatus(id, status) {
  fetch("../php/updateBooking.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id, status })
  })
  .then(res => res.json())
  .then(data => {
    console.log("UPDATE RESPONSE:", data);

    if (data.success) {
      loadBookings(); // refresh UI
    } else {
      alert("Failed to update booking");
    }
  })
  .catch(err => {
    console.error("Update error:", err);
  });
}