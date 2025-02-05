const APIKEY = "67a33d9e2b46a681adb90fcf";
const APIURL = "https://longnai-022b.restdb.io/rest/gameusers";
document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("Login").addEventListener("click", function (e) {
        e.preventDefault(); 
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        fetch(`${APIURL}?q={"email": "${email}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY
            }
        })
        .then(response => response.json())
        .then(users => {
            if (users.length === 0) {
                alert("Email not found, Please sign up first! :( ");
            } else if (users[0].password === password) {
                window.location.href = "welcome.html";
            } else {
                alert("Wrong password! :( ");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("An error occurred, Please try again! :( ");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("SignUp").addEventListener("click", function (e) {
        e.preventDefault();

        let username = document.getElementById("signup-username").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;

        if (!username || !email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        fetch(`${APIURL}?q={"email": "${email}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => response.json())
        .then(existingUsers => {
            if (existingUsers.length > 0) {
                alert("Email has already been registered, Please log in! :)");
                return;
            }

            let NewUser = { "username": username, "email": email, "password": password };

            fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY
                },
                body: JSON.stringify(NewUser)
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("Sign-up successful! You can now log in :)");
                    window.location.href = "login.html";
                } else {
                    alert("Sign-up failed, Try again :( ");
                }
            })
            .catch(error => {
                console.error("Error during user creation:", error);
                alert("An error occurred, Please try again! :( ");
            });
        })
        .catch(error => {
            console.error("Error checking email:", error);
            alert("An error occurred, Please try again! :( ");
        });
    });
});

const effect = document.querySelector('.effect');
const buttons = document.querySelectorAll('nav button');

buttons.forEach(button => {

    button.addEventListener('click', e => {

        const x = e.target.offsetLeft;

        buttons.forEach(btn => {
            btn.classList.remove('active');
        })

        e.target.classList.add('active');

        anime({
            targets: '.effect',
            left: `${x}px`,
            opacity: '1',
            duration: 600
        })

    })

})