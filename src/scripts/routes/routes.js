import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AddStoryPage from '../pages/add-story-page';
import FavoritesPage from '../pages/favorites-page';
import NotFoundPage from '../pages/not-found-page';
import LoginPage from '../pages/login-page';
import RegisterPage from '../pages/register-page';
import FollowPage from '../pages/follow-page';
import LogoutPage from '../pages/logout-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/add': new AddStoryPage(),
  '/favorites': new FavoritesPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/follow': new FollowPage(),
  '/logout': new LogoutPage(),
  '*': new NotFoundPage(),
};

export default routes;
