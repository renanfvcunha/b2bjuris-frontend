import React from 'react';
import Auth from './Auth';

import AuthContext from './contexts/auth';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <AuthContext>
      <Auth>
        <Login />
      </Auth>
    </AuthContext>
  );
};

export default App;
