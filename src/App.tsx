import React from 'react';
import Auth from './Auth';

import AuthProvider from './contexts/auth';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Auth>
        <Login />
      </Auth>
    </AuthProvider>
  );
};

export default App;
