document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');

  if (signUpForm) {
    signUpForm.addEventListener('submit', function(event) {
      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      const birthDateInput = document.getElementById('birthDate');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');
      const confirmPasswordError = document.getElementById('confirmPassword-error');
      const birthDateError = document.getElementById('birthDate-error');

      [nameError, emailError, passwordError, confirmPasswordError, birthDateError].forEach(e => e.textContent = '');

      if (!nameInput.value) {
        nameError.textContent = 'O campo de nome é obrigatório.';
        isValid = false;
      }

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
      
      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'A confirmação de senha é obrigatória.';
        isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'As senhas não coincidem.';
        isValid = false;
      }

      if (!birthDateInput.value) {
        birthDateError.textContent = 'A data de nascimento é obrigatória.';
        isValid = false;
      }

      if (isValid) {
        console.log('Formulário de cadastro válido. Submetendo...');
      } else {
        console.log('Formulário de cadastro inválido.');
        event.preventDefault();
      }
    });
  }
});