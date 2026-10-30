document.addEventListener("DOMContentLoaded", loadPackages);

let editMode = false;

/* LOAD */
function loadPackages() {

    fetch("../php/getPackages.php")
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("packageTable");

            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            `;

            data.forEach(pkg => {
                table.innerHTML += `
                    <tr>
                        <td>${pkg.title}</td>
                        <td>${pkg.price}</td>
                        <td>${pkg.duration}</td>
                        <td>${pkg.description}</td>
                        <td><img src="../${pkg.image}"></td>
                        <td>
                            <button onclick="editPackage(${pkg.id}, '${pkg.title}', '${pkg.price}', '${pkg.duration}', '${pkg.description}')">Edit</button>
                            <button onclick="deletePackage(${pkg.id})" style="background:red;color:white;">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

/* SAVE (ADD / UPDATE) */
function savePackage() {

    let formData = new FormData();

    formData.append("id", document.getElementById("packageId").value);
    formData.append("title", document.getElementById("pkgName").value);
    formData.append("price", document.getElementById("pkgPrice").value);
    formData.append("duration", document.getElementById("pkgDuration").value);
    formData.append("description", document.getElementById("pkgDesc").value);

    let image = document.getElementById("pkgImage").files[0];
    if (image) formData.append("image", image);

    let url = editMode ? "../php/updatePackage.php" : "../php/addPackage.php";

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        alert(data.success ? "Success" : "Failed");

        resetForm();
        loadPackages();
    });
}

/* EDIT */
function editPackage(id, title, price, duration, desc) {

    document.getElementById("packageId").value = id;
    document.getElementById("pkgName").value = title;
    document.getElementById("pkgPrice").value = price;
    document.getElementById("pkgDuration").value = duration;
    document.getElementById("pkgDesc").value = desc;

    editMode = true;
}

/* DELETE */
function deletePackage(id) {

    if (!confirm("Delete this package?")) return;

    fetch("../php/deletePackages.php", {
        method: "POST",
        credentials: "include", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "id=" + encodeURIComponent(id)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert(data.success ? "Deleted" : data.message);
        loadPackages();
    })
    .catch(err => console.error(err));
}
/* RESET */
function resetForm() {
    document.getElementById("packageId").value = "";
    document.getElementById("pkgName").value = "";
    document.getElementById("pkgPrice").value = "";
    document.getElementById("pkgDuration").value = "";
    document.getElementById("pkgDesc").value = "";

    editMode = false;
}