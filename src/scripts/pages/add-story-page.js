import L from 'leaflet';
import { postStory } from '../data/api';

export default class AddStoryPage {
  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita Baru</h1>
        <form id="add-story-form" class="add-story-form">
          <div class="form-group">
            <label for="description">Deskripsi <i class="fa-solid fa-pen"></i></label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div class="form-group">
            <label for="photo">Ambil Gambar <i class="fa-solid fa-camera"></i></label>
            <input type="file" id="photo" name="photo" accept="image/*" capture="environment" required />
            <img id="preview" alt="Preview" style="display:none;max-width:100%;margin-top:10px;" />
          </div>
          <div class="form-group">
            <label for="map">Pilih Lokasi <i class="fa-solid fa-location-dot"></i></label>
            <div id="map" style="height:200px;"></div>
            <input type="hidden" id="lat" name="lat" />
            <input type="hidden" id="lon" name="lon" />
          </div>
          <button type="submit"><i class="fa-solid fa-plus"></i> Tambah Cerita</button>
        </form>
        <div id="form-message" role="alert" style="margin-top:1rem;"></div>
      </section>
    `;
  }

  async afterRender() {
    // Kamera preview
    const photoInput = document.getElementById('photo');
    const preview = document.getElementById('preview');
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.src = ev.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        preview.style.display = 'none';
      }
    });

    // Peta & marker
    const map = L.map('map').setView([-6.2, 106.8], 5);
    const baseLayers = {
      'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }),
      'Stamen Toner': L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design',
      })
    };
    baseLayers['OpenStreetMap'].addTo(map);
    L.control.layers(baseLayers).addTo(map);
    let marker;
    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      document.getElementById('lat').value = lat;
      document.getElementById('lon').value = lng;
      if (marker) marker.setLatLng([lat, lng]);
      else marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup('Lokasi dipilih').openPopup();
    });

    // Submit form
    document.getElementById('add-story-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const photo = document.getElementById('photo').files[0];
      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;
      const messageDiv = document.getElementById('form-message');
      if (!photo || !lat || !lon) {
        messageDiv.textContent = 'Semua data (gambar & lokasi) wajib diisi.';
        messageDiv.style.color = 'red';
        return;
      }
      messageDiv.textContent = 'Mengirim data...';
      messageDiv.style.color = 'black';
      try {
        const result = await postStory({ description, photo, lat, lon });
        if (result && result.message === 'Story created successfully') {
          messageDiv.textContent = 'Cerita berhasil ditambahkan!';
          messageDiv.style.color = 'green';
          setTimeout(() => {
            window.location.hash = '/';
          }, 1200);
        } else {
          messageDiv.textContent = result.message || 'Gagal menambah cerita.';
          messageDiv.style.color = 'red';
        }
      } catch (err) {
        messageDiv.textContent = 'Terjadi kesalahan saat mengirim data.';
        messageDiv.style.color = 'red';
      }
    });
  }
}
