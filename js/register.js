document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // password match check
        if (password !== confirmPassword) {
            message.style.color = "red";
            message.innerText = "Passwords do not match";
            return;
        }

        try {
            const res = await fetch("php/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (data.status === "success") {
                message.style.color = "green";
                message.innerText = "Registered successfully. Redirecting to login...";

                form.reset();

                // redirect after 1.5 seconds
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

            } else {
                message.style.color = "red";
                message.innerText = data.message || "Registration failed";
            }

        } catch (error) {
            console.error(error);
            message.style.color = "red";
            message.innerText = "Something went wrong";
        }
    });

});