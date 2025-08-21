document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');

      emailError.textContent = '';
      passwordError.textContent = '';

      let isValid = true;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value) {
        emailError.textContent = 'O campo de email é obrigatório.';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        isValid = false;
      }

      if (!passwordInput.value) {
        passwordError.textContent = 'O campo de senha é obrigatório.';
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'A senha deve ter no mínimo 6 caracteres.';
        isValid = false;
      }

      if (isValid) {
        console.log('Formulário válido. Submetendo...');
      } else {
        console.log('Formulário inválido.');
        event.preventDefault();
      }
    });
  }
});