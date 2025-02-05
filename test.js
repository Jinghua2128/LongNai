const APIKEY = "67a33d9e2b46a681adb90fcf";
const APIURL = "https://longnai-022b.restdb.io/rest/gameusers";
document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("Login").addEventListener("click", function (e) {
        // Prevent default action of the button
        e.preventDefault(); 

        //[STEP 2]: Let's retrieve form data
        // For now, we assume all information is valid
        // You are to do your own data validation
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;
        

        //checking if email exists in data base
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

        // 表单验证
        if (!username || !email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        // 检查邮箱是否已存在
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

            // 创建新用户
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
                    window.location.href = "login.html"; // 跳转到登录页面
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