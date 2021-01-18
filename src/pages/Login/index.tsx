import React, { useState, useContext, FormEvent } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
} from '@material-ui/core';

import useStyles from './styles';
import { AuthContext } from '../../contexts/authContext';

const Login: React.FC = () => {
  const classes = useStyles();
  const { loading, signIn } = useContext(AuthContext);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    signIn(nomeUsuario, senha);
  };

  return (
    <main className={classes.content}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/assets/images/logoUnoCollect.png"
            alt="Logo B2B Juris"
            width="200"
            height="200"
          />
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário ou E-mail"
              name="username"
              autoFocus
              value={nomeUsuario}
              onChange={e => setNomeUsuario(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

            {loading ? (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            ) : (
              ''
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Login;
