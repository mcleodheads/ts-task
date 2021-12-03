import { IRouting } from '../Types/RoutingTypes/Routing';
import { HOME_ROUTE, LOGIN_ROUTE, TABLE_ROUTE } from './constants';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Table from '../Pages/Table';

export const publicRoutes: IRouting[] = [
  {
    path: LOGIN_ROUTE,
    component: Login,
  },
];

export const authRoutes: IRouting[] = [
  {
    path: HOME_ROUTE,
    component: Home,
  },
  {
    path: TABLE_ROUTE,
    component: Table,
  },
];

const routes = {
  publicRoutes,
  authRoutes,
};

export default routes;
