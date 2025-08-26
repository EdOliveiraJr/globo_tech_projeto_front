class Main extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .main {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          width: 100%;
        }
      </style>
      <main class="main">
        <slot></slot>
      </main>
    `;
  }
}

customElements.define('app-main', Main);