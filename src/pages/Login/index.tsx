import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  ThemeProvider,
} from '@material-ui/core';

import useStyles, { Theme } from './styles';
import { AuthContext } from '../../contexts/authContext';

const Login: React.FC = () => {
  const classes = useStyles();
  const { loading, signIn } = useContext(AuthContext);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleCheckLembrar = (e: ChangeEvent<HTMLInputElement>) => {
    setLembrar(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    signIn(nomeUsuario, senha, lembrar);
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
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Usuário ou E-mail"
                autoFocus
                value={nomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}
                className={classes.input}
                color="primary"
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
                color="primary"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={lembrar}
                    onChange={handleCheckLembrar}
                  />
                }
                label="Lembrar"
                labelPlacement="start"
                className={classes.lembrar}
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
    </ThemeProvider>
  );
};

export default Login;
