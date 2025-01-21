const BASE_URL = 'https://interactivedev-7676.restdb.io/rest';
const API_KEY = '<677f2236306a940f5e829b81>';

// Lottie animation for loading
const loadingAnimation = lottie.loadAnimation({
    container: document.getElementById('loading-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets6.lottiefiles.com/private_files/lf30_editor_jzzdmonp.json',
});

function toggleLoading(show) {
    const animation = document.getElementById('loading-animation');
    animation.style.display = show ? 'block' : 'none';
}

// Utility functions for RestDB
async function fetchData(collection) {
    const response = await fetch(`${BASE_URL}/${collection}`, {
        headers: { 'Content-Type': 'application/json', 'x-apikey': API_KEY },
    });
    return response.json();
}

async function createData(collection, data) {
    const response = await fetch(`${BASE_URL}/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-apikey': API_KEY },
        body: JSON.stringify(data),
    });
    return response.json();
}

// Form handlers
document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    toggleLoading(true);

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const grade = document.getElementById('grade').value;

    try {
        await createData('users', { email, username, password, grade });
        alert('Sign up successful!');
    } catch (error) {
        alert('Error during sign-up.');
    } finally {
        toggleLoading(false);
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    toggleLoading(true);

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const users = await fetchData('users');
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
        alert('Login successful!');
        document.getElementById('profile-page').style.display = 'block';
        } else {
        alert('Invalid username or password.');
        }
    } catch (error) {
        alert('Error during login.');
    } finally {
        toggleLoading(false);
    }
});