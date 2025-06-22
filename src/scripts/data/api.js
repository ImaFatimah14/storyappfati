import CONFIG from '../config';

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

export async function getStories() {
  const token = localStorage.getItem('token');
  const fetchResponse = await fetch(ENDPOINTS.STORIES, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const responseJson = await fetchResponse.json();
  return responseJson.listStory;
}

export async function postStory({ description, photo, lat, lon }) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('description', description);
  formData.append('lat', lat);
  formData.append('lon', lon);
  formData.append('photo', photo);
  const response = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  return response.json();
}