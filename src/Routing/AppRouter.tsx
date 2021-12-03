import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';

const AppRouter: React.FC = () => {
  const isAuth = true;
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ component, path }) => (
          <Route path={path} component={component} exact key={path} />
        ))}
      {publicRoutes.map(({ component, path }) => (
        <Route path={path} component={component} exact key={path} />
      ))}
    </Switch>
  );
};

export default AppRouter;
