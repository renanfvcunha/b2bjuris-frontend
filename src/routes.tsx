import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Usuarios from './pages/Usuarios';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/usuarios" component={Usuarios} />
    </Switch>
  );
};

export default Routes;
