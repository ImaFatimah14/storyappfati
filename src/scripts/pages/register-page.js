export default class RegisterPage {
  async render() {
    return `
      <section class="container" style="max-width:400px;margin:2rem auto;">
        <h1 style="text-align:center;">Register</h1>
        <form id="register-form" class="add-story-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit"><i class="fa-solid fa-user-plus"></i> Daftar</button>
        </form>
        <p style="text-align:center;margin-top:1rem;">Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </section>
    `;
  }
  async afterRender() {
    document.getElementById('register-form').addEventListener('submit', e => {
      e.preventDefault();
      alert('Registrasi dummy: fitur backend belum diimplementasikan.');
      window.location.hash = '/login';
    });
  }
}
