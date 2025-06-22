import { getAllFavorites, deleteFavorite } from '../utils/idb';

export default class FavoritesPage {
  async render() {
    return `
      <section class="container">
        <h1>Story Favorit</h1>
        <div id="favorites-list" class="stories-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const favorites = await getAllFavorites();
    const list = document.getElementById('favorites-list');
    if (!favorites.length) {
      list.innerHTML = '<p>Belum ada story favorit.</p>';
      return;
    }
    list.innerHTML = favorites.map(story => `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="${story.name}" class="story-img"/>
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <button class="remove-fav" data-id="${story.id}"><i class="fa-solid fa-trash"></i> Hapus</button>
      </article>
    `).join('');
    list.querySelectorAll('.remove-fav').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        await deleteFavorite(btn.dataset.id);
        this.afterRender();
      });
    });
  }
}
