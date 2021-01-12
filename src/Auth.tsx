import React, { useContext } from 'react';

import { AuthContext } from './contexts/auth';
import Home from './pages/Home';
import Login from './pages/Login';

const Auth: React.FC = () => {
  const { signed } = useContext(AuthContext);

  if (signed) {
    return <Home />;
  }

  return <Login />;
};

export default Auth;
