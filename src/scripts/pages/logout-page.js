export default class LogoutPage {
  async render() {
    return `<section class="container" style="max-width:400px;margin:2rem auto;text-align:center;">
      <h1>Logout</h1>
      <p>Anda telah logout (dummy, tidak ada backend).</p>
      <a href="#/login">Login lagi</a>
    </section>`;
  }
  async afterRender() {
    // Dummy: hapus data login jika ada
    setTimeout(() => { window.location.hash = '/login'; }, 1200);
  }
}
