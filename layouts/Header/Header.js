class Header extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <a href="/pages/ListsView/ListsView.html">
          <img src="/assets/images/logo.png" width="150px" alt="Logo da Empresa" class="logo">
        </a>
        <div class="user-info" style="display: none;">
          <span id="welcome-message"></span>
          <i id="logout-icon" class="material-icons" title="Sair">logout</i>
        </div>
      </header>
    `;

    const userInfoDiv = this.querySelector(".user-info");
    const welcomeMessage = this.querySelector("#welcome-message");
    const logoutIcon = this.querySelector("#logout-icon");
    
    const userId = sessionStorage.getItem("loggedInUserId");

    if (userId) {
      userInfoDiv.style.display = 'flex';
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          welcomeMessage.textContent = `Bem-vindo, ${user.name}!`;
        } else {
          welcomeMessage.textContent = 'Bem-vindo!';
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
        welcomeMessage.textContent = 'Bem-vindo!';
      }
    }

    logoutIcon.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja sair?")) {
        sessionStorage.removeItem('loggedInUserId');
        window.location.replace("/pages/Login/Login.html");
      }
    });
  }
}

customElements.define('app-header', Header);
