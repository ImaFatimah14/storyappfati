// IndexedDB helper for story favorites
import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const STORE_NAME = 'favorites';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveFavorite(story) {
  const db = await getDB();
  return db.put(STORE_NAME, story);
}

export async function getAllFavorites() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function deleteFavorite(id) {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
}
