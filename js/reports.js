document.addEventListener("DOMContentLoaded", () => {
  loadReports();
});
fetch("../php/auth_check.php", { credentials: "include" })
  .then(res => res.json())
  .then(data => {
    if (!data.loggedIn || data.role !== "admin") {
      window.location.href = "../login.html";
    }
  });
function loadReports() {
  fetch("../php/getReports.php", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(reportData => {

    document.getElementById("bookings").innerText = reportData.bookings;
    document.getElementById("revenue").innerText = "$" + reportData.revenue;
    document.getElementById("topPackage").innerText = reportData.topPackage;
    document.getElementById("queries").innerText = reportData.queries;

    const bars = document.querySelectorAll(".bar");

    bars.forEach((bar, index) => {
      const value = reportData.monthly[index];

      setTimeout(() => {
        bar.style.height = value + "%";
      }, index * 120);
    });

  });
}