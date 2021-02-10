import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Button,
  ThemeProvider,
  Tooltip,
  Fab,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DefaultModal from '../../../components/DefaultModal';
import useStyles, { Purple } from './styles';
import api from '../../../services/api';
import catchHandler from '../../../utils/catchHandler';

interface IModal {
  open: boolean;
  close(): void;
  setSuccess(): void;
}

const NovoUsuario: React.FC<IModal> = ({ open, close, setSuccess }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  const handleChangeTipoUsuario = (e: ChangeEvent<{ value: unknown }>) => {
    setTipoUsuario(e.target.value as string);
  };

  const clearFields = () => {
    setNome('');
    setNomeUsuario('');
    setEmail('');
    setTipoUsuario('');
    setSenha('');
    setConfSenha('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/usuarios', {
        nome,
        nome_usuario: nomeUsuario,
        email,
        tipo_usuario: tipoUsuario,
        senha,
        conf_senha: confSenha,
      });

      toast.success(response.data.msg, {
        position: 'top-center',
      });
      setSuccess();
      clearFields();
      close();
    } catch (err) {
      catchHandler(
        err,
        'Erro ao cadastrar usuário. Tente novamente ou contate o suporte.'
      );
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={Purple}>
      <DefaultModal open={open} close={close}>
        <Tooltip
          title="Voltar"
          aria-label="back"
          className={classes.backBtn}
          onClick={close}
        >
          <Fab color="primary" size="small">
            <ArrowBack />
          </Fab>
        </Tooltip>
        <div className={classes.form}>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <div className={classes.formRoot}>
              <Typography
                variant="h5"
                className={classes.title}
                align="center"
                color="secondary"
              >
                Novo Usuário
              </Typography>

              <TextField
                label="Nome Completo"
                required
                className={classes.field}
                fullWidth
                value={nome}
                onChange={e => setNome(e.target.value)}
              />

              <TextField
                label="Nome de Usuário"
                required
                className={classes.field}
                fullWidth
                value={nomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}
              />

              <TextField
                label="E-mail"
                type="email"
                required
                className={classes.field}
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <FormControl required className={classes.field} fullWidth>
                <InputLabel id="select-user-type-label">
                  Tipo de Usuário
                </InputLabel>
                <Select
                  labelId="select-user-type-label"
                  value={tipoUsuario}
                  onChange={handleChangeTipoUsuario}
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="procurador">Procurador</MenuItem>
                  <MenuItem value="usuario">Usuário Comum</MenuItem>
                </Select>
              </FormControl>

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

              <FormControl className={classes.subButton} fullWidth>
                <Button variant="contained" color="primary" type="submit">
                  Cadastrar
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      </DefaultModal>
    </ThemeProvider>
  );
};

NovoUsuario.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default NovoUsuario;
