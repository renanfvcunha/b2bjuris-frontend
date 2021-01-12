import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  error: boolean;
  setErrorFalse(): void;
  modalMsg: string;
  usuario: {
    id: number;
    nome: string;
    tipo_usuario: string;
  } | null;
  signIn(nomeUsuario: string, senha: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<AuthContextData['usuario'] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const setErrorFalse = () => {
    setError(false);
  };

  const signIn = async (nome_usuario: string, senha: string) => {
    setLoading(true);

    try {
      const response = await api.post('/session', {
        nome_usuario,
        senha,
      });

      setUsuario(response.data.user);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      localStorage.setItem('@Auth:user', JSON.stringify(response.data.user));
      localStorage.setItem('@Auth:token', response.data.token);
    } catch (err) {
      if (err.message === 'Network Error') {
        setModalMsg(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        setModalMsg(err.response.data.msg);
      } else {
        setModalMsg(err);
      }

      setError(true);
      setUsuario(null);
    }

    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('@Auth:user');
    localStorage.removeItem('@Auth:token');

    setUsuario(null);
  };

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Auth:user');
    const storagedToken = localStorage.getItem('@Auth:token');

    if (storagedUser) {
      setUsuario(JSON.parse(storagedUser));
    }

    if (storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!usuario,
        loading,
        error,
        setErrorFalse,
        modalMsg,
        usuario,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
