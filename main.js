document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registrationForm');
    
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const studentData = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                course: document.getElementById('course').value
            };

            // Get existing data from LocalStorage
            let students = JSON.parse(localStorage.getItem('students')) || [];
            
            // Add new student
            students.push(studentData);
            
            // Save back to LocalStorage
            localStorage.setItem('students', JSON.stringify(students));

            // Show success and clear form
            document.getElementById('successMessage').classList.remove('d-none');
            regForm.reset();

            // Hide success after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').classList.add('d-none');
            }, 5000);
        });
    }
});