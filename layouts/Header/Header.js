class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <a href="/globo_tech_projeto_front/pages/ListsView/ListsView.html">
          <img src="/globo_tech_projeto_front/assets/images/logo.png" width="150px" alt="Logo da Empresa" class="logo">
        </a>
        <div class="user-info">
          <span>Fulano de tal</span>
          <span><i id="logout-icon" class="material-icons">logout</i></span>
        </div>
      </header>
    `;

    this.querySelector("#logout-icon").addEventListener("click", () => {
      window.location.replace("/globo_tech_projeto_front/pages/Login/Login.html");
    });
  }  
}

customElements.define('app-header', Header);