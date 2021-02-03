import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Processos from './pages/Processos';
import NovoProcesso from './pages/Processos/NovoProcesso';
import VisualizarProcesso from './pages/Processos/VisualizarProcesso';
import Usuarios from './pages/Usuarios';
import VisualizarEncaminhamento from './pages/VisualizarEncaminhamento';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/usuarios" component={Usuarios} />

      <Route path="/processos/novo" component={NovoProcesso} />
      <Route path="/processos/:id" component={VisualizarProcesso} />
      <Route path="/processos" component={Processos} />

      <Route path="/encaminhamentos/:id" component={VisualizarEncaminhamento} />
    </Switch>
  );
};

export default Routes;
