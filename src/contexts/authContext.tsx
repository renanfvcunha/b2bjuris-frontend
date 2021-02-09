import React, { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { AxiosResponse } from 'axios';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  usuario: {
    id: number;
    nome: string;
    tipo_usuario: string;
  } | null;
  signIn(nomeUsuario: string, senha: string, lembrar: boolean): Promise<void>;
  signOut(): void;
  hasUser: boolean;
  storeFirstUser(
    nome: string,
    nomeUsuario: string,
    email: string,
    senha: string,
    confSenha: string
  ): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<AuthContextData['usuario'] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [hasUser, setHasUser] = useState(true);

  const signIn = async (
    nome_usuario: string,
    senha: string,
    lembrar: boolean
  ) => {
    setLoading(true);

    try {
      window.history.pushState('', '', '/');

      const response = await api.post('/session', {
        nome_usuario,
        senha,
        lembrar: true,
      });

      setUsuario(response.data.user);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      api.defaults.headers['Content-Type'] = 'application/json';

      if (lembrar) {
        localStorage.setItem('@Auth:user', JSON.stringify(response.data.user));
        localStorage.setItem('@Auth:token', response.data.token);
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(
          'Erro desconhecido ao fazer login. Tente novamente ou contate o suporte.'
        );
      }

      setUsuario(null);
    }

    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('@Auth:user');
    localStorage.removeItem('@Auth:token');

    setUsuario(null);
    window.history.pushState('', '', '/');
  };

  const checkHasUser = async () => {
    const response: AxiosResponse<{ hasUser: boolean }> = await api.get(
      '/checkhasuser'
    );

    setHasUser(response.data.hasUser);
  };

  const storeFirstUser = async (
    nome: string,
    nomeUsuario: string,
    email: string,
    senha: string,
    confSenha: string
  ) => {
    setLoading(true);

    try {
      const response = await api.post('/storefirstuser', {
        nome,
        nome_usuario: nomeUsuario,
        email,
        senha,
        conf_senha: confSenha,
      });

      setUsuario(response.data.user);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      api.defaults.headers['Content-Type'] = 'application/json';

      setHasUser(true);
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(
          'Erro desconhecido ao cadastrar usuário. Tente novamente ou contate o suporte.'
        );
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    checkHasUser();

    const storagedUser = localStorage.getItem('@Auth:user');
    const storagedToken = localStorage.getItem('@Auth:token');

    if (storagedUser) {
      setUsuario(JSON.parse(storagedUser));
    }

    if (storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      api.defaults.headers['Content-Type'] = 'application/json';
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!usuario,
        loading,
        usuario,
        signIn,
        signOut,
        hasUser,
        storeFirstUser,
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
