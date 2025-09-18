document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            emailError.textContent = '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailInput.value) {
                emailError.textContent = 'O campo de email é obrigatório.';
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Por favor, insira um email válido.';
            } else {
                const proceed = confirm('Email enviado com sucesso! Clique em "OK" para prosseguir para a página principal.');
                if (proceed) {
                    window.location.href = '/pages/Login/Login.html';
                }
            }
        });
    }
});