import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { authRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../Hooks/storeHooks';
import { LOGIN_ROUTE } from './constants';

const AppRouter: React.FC = () => {
  const { isAuth } = useAppSelector((store) => store.userReducer);
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ component, path }) => (
          <Route path={path} component={component} exact key={path} />
        ))}
      {publicRoutes.map(({ component, path }) => (
        <Route path={path} component={component} exact key={path} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
