import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AddStoryPage from '../pages/add-story-page';
import FavoritesPage from '../pages/favorites-page';
import NotFoundPage from '../pages/not-found-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/add': new AddStoryPage(),
  '/favorites': new FavoritesPage(),
  '*': new NotFoundPage(),
};

export default routes;
