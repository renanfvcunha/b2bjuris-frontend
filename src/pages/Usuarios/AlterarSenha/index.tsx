import React, { useState, FormEvent, useContext } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Button,
  ThemeProvider,
  CircularProgress,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import passwdStyle, { theme } from './style';
import api from '../../../services/api';
import catchHandler from '../../../utils/catchHandler';
import DefaultBox from '../../../components/DefaultBox';
import { AuthContext } from '../../../contexts/authContext';

const AlterarSenha: React.FC = () => {
  const classes = passwdStyle();

  const { usuario } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState('');
  const [conf_senha, setConfSenha] = useState('');

  const clearFields = () => {
    setSenha('');
    setConfSenha('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.patch(`/alterarsenha/${usuario?.id}`, {
        senha,
        conf_senha,
      });

      toast.success(response.data.msg, {
        position: 'top-center',
      });
      clearFields();
    } catch (err) {
      catchHandler(
        err,
        'Ops, erro ao cadastrar senha. Tente novamente ou contate o suporte.'
      );
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <DefaultBox>
          <div className={classes.centerItems}>
            <div className={classes.form}>
              <form className={classes.formBox} onSubmit={handleSubmit}>
                <div className={classes.formRoot}>
                  <Typography
                    align="center"
                    component="h1"
                    variant="h4"
                    className={classes.addProcessTitle}
                  >
                    Formulário Ateração de Senha
                  </Typography>

                  <TextField
                    label="Senha"
                    required
                    className={classes.field}
                    style={{ marginTop: 0 }}
                    type="password"
                    fullWidth
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                  />

                  <TextField
                    label="Confirmar Senha"
                    required
                    className={classes.field}
                    type="password"
                    fullWidth
                    value={conf_senha}
                    onChange={e => setConfSenha(e.target.value)}
                  />

                  {loading ? (
                    <div className={classes.progress}>
                      <CircularProgress />
                    </div>
                  ) : (
                    ''
                  )}

                  <FormControl className={classes.subButton} fullWidth>
                    <Button variant="contained" color="primary" type="submit">
                      Alterar Senha
                    </Button>
                  </FormControl>
                </div>
              </form>
            </div>
          </div>
        </DefaultBox>
      </main>
    </ThemeProvider>
  );
};

export default AlterarSenha;
