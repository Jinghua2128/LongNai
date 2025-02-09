const APIKEY = "67a33d9e2b46a681adb90fcf";
const APIURL = "https://longnai-022b.restdb.io/rest/gameusers";

// Blob animation
function animateBlob() {
    anime({
        targets: '.blob',
        translateX: function() { return anime.random(-300, 300); },
        translateY: function() { return anime.random(-50, 50); },
        scale: function() { return anime.random(0.8, 1.2); },
        borderRadius: function() { return anime.random(20, 80) + '%'; },
        duration: 20000,
        easing: 'easeInOutQuad',
        complete: animateBlob
    });
}

// Progress card update
function updateProgressCard(works, percentage) {
    $('.card__indicator-amount').text(works);
    $('.card__indicator-percentage').text(percentage + '%');
    $('.card__progress progress').val(percentage);
}

// Streak counter
function updateStreak(days) {
    $('#days').text(days);
    if (days > 0) {
        $('.flame').removeClass('inactive');
    } else {
        $('.flame').addClass('inactive');
    }
}

// Play button hover effect
$('.play_btn').hover(
    function() {
        anime({
            targets: this.querySelectorAll('.corner'),
            scale: 1.25,
            rotate: 45,
            duration: 200
        });
    },
    function() {
        anime({
            targets: this.querySelectorAll('.corner'),
            scale: 1,
            rotate: 45,
            duration: 200
        });
    }
);

// Navigation bar
$('nav button').click(function() {
    const x = $(this).position().left;
    $('nav button').removeClass('active');
    $(this).addClass('active');
    anime({
        targets: '.effect',
        left: x,
        opacity: 1,
        duration: 600
    });
});

// User authentication
function login(email, password) {
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
            alert("Email not found, Please sign up first!");
        } else if (users[0].password === password) {
            localStorage.setItem('email', email);
            window.location.href = "index.html";
        } else {
            alert("Wrong password!");
        }
    })
    .catch(error => {
        console.error("Login error:", error);
        alert("An error occurred, Please try again!");
    });
}

// Streak functionality
function getFormattedDate() {
    return new Date().toISOString().split("T")[0];
}

function isConsecutiveDay(previousDateStr) {
    const todayStr = getFormattedDate();
    const prevDate = new Date(previousDateStr);
    prevDate.setDate(prevDate.getDate() + 1);
    const nextDateStr = prevDate.toISOString().split("T")[0];
    return nextDateStr === todayStr;
}

function fetchUserData() {
    const email = localStorage.getItem('email');
    fetch(`${APIURL}/${email}`, {
        method: "GET",
        headers: { "x-apikey": APIKEY }
    })
    .then(response => response.json())
    .then(data => {
        const lastInteraction = data.lastInteraction || "2007-07-08";
        const currentStreak = data.streakDays || 0;
        localStorage.setItem("lastInteractionDate", lastInteraction);
        localStorage.setItem("currentStreak", currentStreak);
        updateStreak(currentStreak);
    })
    .catch(error => console.error("Error fetching user data:", error));
}

function recordInteraction() {
    const email = localStorage.getItem('email');
    const todayDate = getFormattedDate();
    let lastInteractionDate = localStorage.getItem('lastInteractionDate') || "2007-07-08";
    let currentStreak = parseInt(localStorage.getItem('currentStreak')) || 0;
    let updatedStreak = 0;

    if (isConsecutiveDay(lastInteractionDate)) {
        updatedStreak = currentStreak + 1;
        $('#successSound')[0].play();
    } else if (lastInteractionDate !== todayDate) {
        updatedStreak = 1;
        $('#failSound')[0].play();
    } else {
        return;
    }

    fetch(`${APIURL}/${email}`, {
        method: "PUT",
        headers: {
            "x-apikey": APIKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            streakDays: updatedStreak,
            lastInteraction: todayDate
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("An error had occurred.");
        localStorage.setItem('lastInteractionDate', todayDate);
        localStorage.setItem('currentStreak', updatedStreak);
        updateStreak(updatedStreak);
    })
    .catch(error => console.error("Error updating user data:", error));
}

$(document).ready(function() {
    animateBlob();
    fetchUserData();

    $('.play_btn').click(recordInteraction);

    // Example usage of updateProgressCard
    updateProgressCard(20, 25);
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'login.html';
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulate login
            if (username === 'user' && password === 'password') {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Sign Up Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newUsername = document.getElementById('new_username').value;
            const newPassword = document.getElementById('new_password').value;

            // Simulate signup
            if (newUsername && newPassword) {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'login.html';
            } else {
                document.getElementById('error-message').textContent = 'Please fill in all fields.';
            }
        });
    }

    // Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;

            // Simulate password reset
            if (email) {
                alert('Password reset instructions sent to your email.');
            } else {
                alert('Please enter your email.');
            }
        });
    }

    const forgotPasswordBtn = document.getElementById('forgot_password_btn');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', function() {
            window.location.href = 'forgot-password.html';
        });
    }

    const playBtn = document.getElementById('play_btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            window.location.href = 'play.html';
        });
    }

    // Lottie Animation Click
    const lottiePlayer = document.querySelector('dotlottie-player');
    if (lottiePlayer) {
        lottiePlayer.addEventListener('click', function() {
            // Simulate updating streak in the database
            alert('Streak updated!');
        });
    }
});

function goBack() {
    window.history.back();
}