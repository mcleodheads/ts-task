import React from 'react';
import AppRouter from './Routing/AppRouter';
import Header from './Components/Header';
import { useAppSelector } from './Hooks/storeHooks';

const App: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  return (
    <div>
      {isAuth ? (
        <div>
          <Header />
        </div>
      ) : null}
      <AppRouter />
    </div>
  );
};

export default App;
