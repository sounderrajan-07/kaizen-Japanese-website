document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Hardcoded Admin Credentials
    if (user === 'admin' && pass === 'admin123') {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        const errorMsg = document.getElementById('loginError');
        errorMsg.classList.remove('d-none');
    }
});