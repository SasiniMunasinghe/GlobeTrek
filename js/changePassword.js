function updatePassword() {

  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("msg");

  if (!newPass || !confirmPass) {
    msg.innerText = "Fill both fields";
    msg.style.color = "red";
    return;
  }

  if (newPass !== confirmPass) {
    msg.innerText = "Passwords do not match";
    msg.style.color = "red";
    return;
  }

  fetch("php/changePassword.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ password: newPass })
  })
  .then(res => res.json())
.then(data => {

  console.log("RESPONSE:", data);

  if (data.success) {

    msg.innerText = "Password updated!";
    msg.style.color = "green";

    setTimeout(() => {

      // ADMIN
      if (data.role === "admin") {
        window.location.href = "/webAssignment/admin/dashboard.html";
      }

      // STAFF
      else if (data.role === "staff") {
        window.location.href = "/webAssignment/staff/staff-dashboard.html";
      }

      // USER
      else {
        window.location.href = "/webAssignment/myaccount.html";
      }

    }, 1000);

  } else {

    msg.innerText = data.message || "Update failed";
    msg.style.color = "red";

  }

})
  .catch(err => {
    console.error(err);
    msg.innerText = "Error occurred";
    msg.style.color = "red";
  });
}