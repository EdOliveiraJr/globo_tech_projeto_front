class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <footer class="footer"><span>Serpentes Tech ® 2025</span></footer>`;
  }
}

customElements.define('app-footer', Footer);