document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      
      event.preventDefault();
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');

      
      emailError.textContent = '';
      passwordError.textContent = '';

      let isValid = true;
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailError.textContent = 'O campo de email é obrigatório.';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        isValid = false;
      }

      if (!password) {
        passwordError.textContent = 'O campo de senha é obrigatório.';
        isValid = false;
      }

      if (isValid) {
        authenticateUser(email, password);
      } else {
        console.log('Formulário inválido.');
      }
    });
  }
});

/**
 * Autentica o usuário de forma assíncrona, consultando a API.
 * @param {string} email O email do usuário.
 * @param {string} password A senha do usuário.
 */
async function authenticateUser(email, password) {
  const passwordError = document.getElementById('password-error');
  
  const API_BASE_URL = 'http://localhost:3000';

  try {
    const response = await fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
        throw new Error('Falha ao conectar com o servidor.');
    }

    const users = await response.json();
    

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      
      console.log('Login bem-sucedido!', user);
      sessionStorage.setItem('loggedInUserId', user.id); 
      window.location.href = '../ListsView/ListsView.html';
    } else {
      
      passwordError.textContent = 'Email ou senha inválidos.';
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    passwordError.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
  }
}
