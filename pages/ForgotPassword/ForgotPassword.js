document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            emailError.textContent = '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailInput.value) {
                emailError.textContent = 'O campo de email é obrigatório.';
                event.preventDefault();
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Por favor, insira um email válido.';
                event.preventDefault();
            }
        });
    }
});
