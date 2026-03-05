import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  Link,
  createHashHistory,
} from '@tanstack/react-router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import CatanPage from './pages/CatanPage';
import SevenWondersPage from './pages/SevenWondersPage';
import DicePage from './pages/DicePage';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-parchment text-forest font-body">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CatanPage,
});

const catanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catan',
  component: CatanPage,
});

const sevenWondersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/7-wonders',
  component: SevenWondersPage,
});

const diceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dice',
  component: DicePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  catanRoute,
  sevenWondersRoute,
  diceRoute,
]);

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  history: hashHistory,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export { Link };
