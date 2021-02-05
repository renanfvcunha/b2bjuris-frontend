import React, { useContext } from 'react';

import { AuthContext } from './contexts/authContext';
import Menu from './components/Menu';
import PrimeiroUsuario from './pages/Usuarios/PrimeiroUsuario';
import Login from './pages/Login';

const Auth: React.FC = () => {
  const { signed, hasUser } = useContext(AuthContext);

  if (!hasUser) {
    return <PrimeiroUsuario />;
  }

  if (hasUser && !signed) {
    return <Login />;
  }

  return <Menu />;
};

export default Auth;
