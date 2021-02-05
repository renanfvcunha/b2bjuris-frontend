import React, { FormEvent, useContext, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';

import useStyles from './styles';
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
    <main className={classes.content}>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/assets/images/logoUnoCollect.png"
            alt="Logo B2B Juris"
            width="200"
            height="200"
          />

          <Typography component="h1" variant="h6">
            Bem-Vindo(a). Cadastre um novo usuário para começar.
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="nome"
              autoFocus
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de Usuário"
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
              id="email"
              label="E-mail"
              name="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
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

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confPassword"
              label="Confirmar Senha"
              type="password"
              id="confPassword"
              autoComplete="current-password"
              value={confSenha}
              onChange={e => setConfSenha(e.target.value)}
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
  );
};

export default PrimeiroUsuario;
