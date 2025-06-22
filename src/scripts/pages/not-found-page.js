export default class NotFoundPage {
  async render() {
    return `
      <section class="container" style="text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p>Halaman tidak ditemukan.</p>
        <a href="#/" class="brand-name">Kembali ke Beranda</a>
      </section>
    `;
  }
  async afterRender() {}
}
