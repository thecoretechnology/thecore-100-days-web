const pageName = () => document.body.dataset.page || "";

class LottieHeader extends HTMLElement {
  connectedCallback() {
    const active = pageName();
    const links = [
      ["home", "index.html", "Home"],
      ["about", "about.html", "About"],
      ["projects", "projects.html", "Work"],
      ["services", "services.html", "Services"],
      ["archive", "index.html#archive", "Archive"],
      ["contact", "contact.html", "Contact"],
    ];
    this.innerHTML = `
      <header class="site-header" aria-label="Primary navigation">
        <a class="wordmark" href="index.html" aria-label="Lottie home">lottie</a>
        <button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-menu"><span></span></button>
        <nav class="site-menu" id="site-menu">
          ${links
            .map(
              ([key, href, label]) =>
                `<a href="${href}"${active === key ? ' class="active" aria-current="page"' : ""}>${label}</a>`,
            )
            .join("")}
        </nav>
      </header>`;
  }
}

class LottieFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-main">
          <div>
            <a class="footer-email" href="mailto:hello@lottiebennet.com">hello@lottiebennet.com</a>
            <div class="socials">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
              <a href="https://tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok">TK</a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <a href="index.html">Home</a><a href="about.html">About</a>
            <a href="projects.html">Work</a><a href="services.html">Services</a>
            <a href="contact.html">Contact</a>
          </nav>
        </div>
        <div class="footer-meta">
          <span>©2026 LOTTIE</span><a href="https://lottie-portfolio.framer.website/legal/terms-and-conditions">Terms</a>
          <a href="https://lottie-portfolio.framer.website/legal/privacy-policy">Privacy Policy</a><span>Designed by ambie</span>
        </div>
      </footer>`;
  }
}

customElements.define("lottie-header", LottieHeader);
customElements.define("lottie-footer", LottieFooter);
