document.addEventListener("DOMContentLoaded", () => {
    loadPackages();
});

let editMode = false;
let editId = null;


function loadPackages() {

    fetch("../php/getPackages.php")
        .then(res => res.json())
        .then(data => {

            let table = document.getElementById("packageTable");

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
                        <td><img src="../${pkg.image}" width="80"></td>
                        <td>
                            <button onclick="editPackage(${pkg.id})">Edit</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Load error:", err));
}


function addPackage() {

    let formData = new FormData();

    formData.append("title", document.getElementById("pkgName").value);
    formData.append("price", document.getElementById("pkgPrice").value);
    formData.append("duration", document.getElementById("pkgDuration").value);
    formData.append("description", document.getElementById("pkgDesc").value);

    let imageFile = document.getElementById("pkgImage").files[0];
    if (imageFile) {
        formData.append("image", imageFile);
    }

    let url = editMode ? "../php/updatePackage.php" : "../php/addPackage.php";

    if (editMode) {
        formData.append("id", editId);
    }

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        if (data.success) {
            alert(editMode ? "Package updated" : "Package added");

            resetForm();
            loadPackages();
        } else {
            alert("Operation failed");
        }
    })
    .catch(err => console.error("Save error:", err));
}


function editPackage(id) {

    fetch("../php/getPackages.php")
        .then(res => res.json())
        .then(data => {

            let pkg = data.find(p => p.id == id);

            document.getElementById("pkgName").value = pkg.title;
            document.getElementById("pkgPrice").value = pkg.price;
            document.getElementById("pkgDuration").value = pkg.duration;
            document.getElementById("pkgDesc").value = pkg.description;

            editMode = true;
            editId = id;

            document.querySelector(".form-box button").innerText = "Update Package";
        })
        .catch(err => console.error(err));
}


function resetForm() {

    document.getElementById("pkgName").value = "";
    document.getElementById("pkgPrice").value = "";
    document.getElementById("pkgDuration").value = "";
    document.getElementById("pkgDesc").value = "";
    document.getElementById("pkgImage").value = "";

    editMode = false;
    editId = null;

    document.querySelector(".form-box button").innerText = "Add Package";
}