document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      // Previne o envio padrão do formulário para lidarmos com a lógica de forma assíncrona.
      event.preventDefault();
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');

      // Limpa as mensagens de erro anteriores
      emailError.textContent = '';
      passwordError.textContent = '';

      let isValid = true;
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Validação do lado do cliente
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

      // Se os dados do formulário forem válidos, tenta autenticar o usuário.
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

  try {
    // Faz a requisição para a API buscando pelo email
    const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
        throw new Error('Falha ao conectar com o servidor.');
    }

    const users = await response.json();
    
    // Procura por um usuário que corresponda ao email E à senha.
    // Em uma aplicação real, a senha seria tratada com hash.
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Se o usuário for encontrado, redireciona para a página de listas.
      console.log('Login bem-sucedido!', user);
      window.location.href = '../ListsView/ListsView.html';
    } else {
      // Caso contrário, exibe uma mensagem de erro.
      passwordError.textContent = 'Usuário ou senha inválidos.';
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    passwordError.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
  }
}
