import React from 'react';
import { ToastContainer } from 'react-toastify';

import Auth from './Auth';
import AuthProvider from './contexts/authContext';
import PageTitleProvider from './contexts/pageTitleContext';
import ProcessoProvider from './contexts/processoContext';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PageTitleProvider>
        <ProcessoProvider>
          <Auth />
          <ToastContainer position="top-center" />
        </ProcessoProvider>
      </PageTitleProvider>
    </AuthProvider>
  );
};

export default App;
