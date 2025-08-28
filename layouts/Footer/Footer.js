class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <footer class="footer">
      <a href="../../pages/About/About.html">
        <span>Serpentes Tech ® 2025</span>
      </a>
    </footer>`;
  }
}

customElements.define('app-footer', Footer);