// Protection: Redirect if not logged in
if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
}

function loadStudents() {
    const tableBody = document.getElementById('studentTableBody');
    const noData = document.getElementById('noDataMessage');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    if (students.length === 0) {
        tableBody.innerHTML = '';
        noData.classList.remove('d-none');
        return;
    }

    noData.classList.add('d-none');
    tableBody.innerHTML = students.map(student => `
        <tr>
            <td class="ps-4 text-muted small">${student.date}</td>
            <td class="fw-bold">${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td><span class="badge bg-soft-danger text-danger">${student.course}</span></td>
            <td class="text-end pe-4">
                <button onclick="deleteStudent(${student.id})" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).reverse().join(''); // Show latest first
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}

function logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'admin-login.html';
}

// Initial Load
document.addEventListener('DOMContentLoaded', loadStudents);