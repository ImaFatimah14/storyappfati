import { getStories } from '../../data/api';
import L from 'leaflet';

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Daftar Cerita</h1>
        <div id="stories-list" class="stories-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const stories = await getStories();
    const storiesList = document.getElementById('stories-list');
    storiesList.innerHTML = stories.map((story, idx) => `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="${story.name}" class="story-img"/>
        <h2>${story.name}</h2>
        <p><i class="fa-solid fa-location-dot"></i> ${story.lat && story.lon ? `${story.lat.toFixed(3)}, ${story.lon.toFixed(3)}` : 'Lokasi tidak tersedia'}</p>
        <p>${story.description}</p>
        <p><small>${story.createdAt}</small></p>
        <button class="fav-btn" data-id="${story.id}" data-name="${story.name}" data-photo="${story.photoUrl}" data-description="${story.description}"><i class="fa-solid fa-heart"></i> Favorit</button>
        <div id="map-${idx}" class="story-map" style="height:200px;" role="region" aria-label="Peta lokasi cerita ${story.name}"></div>
      </article>
    `).join('');

    // Render peta untuk setiap story
    stories.forEach((story, idx) => {
      if (story.lat && story.lon) {
        const map = L.map(`map-${idx}`).setView([story.lat, story.lon], 13);
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
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`<b>${story.name}</b><br>${story.description}`).openPopup();
      } else {
        document.getElementById(`map-${idx}`).innerHTML = '<em>Lokasi tidak tersedia</em>';
      }
    });

    // Tambahkan event listener untuk tombol favorit
    storiesList.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const story = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          photoUrl: btn.dataset.photo,
          description: btn.dataset.description
        };
        const { saveFavorite } = await import('../../utils/idb');
        await saveFavorite(story);
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Disimpan';
        btn.disabled = true;
      });
    });
  }
}
