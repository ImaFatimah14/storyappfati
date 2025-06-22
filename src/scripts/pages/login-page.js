export default class LoginPage {
  async render() {
    return `
      <section class="container" style="max-width:400px;margin:2rem auto;">
        <h1 style="text-align:center;">Login</h1>
        <form id="login-form" class="add-story-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
        <p style="text-align:center;margin-top:1rem;">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </section>
    `;
  }
  async afterRender() {
    document.getElementById('login-form').addEventListener('submit', e => {
      e.preventDefault();
      alert('Login dummy: fitur backend belum diimplementasikan.');
      window.location.hash = '/';
    });
  }
}
