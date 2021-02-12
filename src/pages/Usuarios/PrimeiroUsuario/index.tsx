import React, { FormEvent, useContext, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
} from '@material-ui/core';

import useStyles, { Theme } from './styles';
import { AuthContext } from '../../../contexts/authContext';

const PrimeiroUsuario: React.FC = () => {
  const classes = useStyles();
  const { loading, storeFirstUser } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    storeFirstUser(nome, nomeUsuario, email, senha, confSenha);
  };

  return (
    <ThemeProvider theme={Theme}>
      <main className={classes.content}>
        <Container maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img
              src="/assets/images/b2bJurisLogo.png"
              alt="Logo B2B Juris"
              width="200"
              height="200"
            />

            <Typography component="h1" variant="h6" className={classes.title}>
              Bem-Vindo(a). Cadastre um novo usuário para começar.
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Nome"
                autoFocus
                value={nome}
                onChange={e => setNome(e.target.value)}
                className={classes.input}
              />

              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Nome de Usuário"
                autoFocus
                value={nomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}
                className={classes.input}
              />

              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="E-mail"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={classes.input}
              />

              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className={classes.input}
              />

              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Confirmar Senha"
                type="password"
                autoComplete="current-password"
                value={confSenha}
                onChange={e => setConfSenha(e.target.value)}
                className={classes.input}
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
                Cadastrar e Entrar
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default PrimeiroUsuario;
