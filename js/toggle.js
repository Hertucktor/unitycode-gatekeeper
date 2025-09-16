const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const toggleIcon = togglePassword.querySelector('i');

togglePassword.addEventListener('click', function () {
const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
passwordInput.setAttribute('type', type);

// Icon ändern
if (type === 'text') {
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
} else {
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
}
});