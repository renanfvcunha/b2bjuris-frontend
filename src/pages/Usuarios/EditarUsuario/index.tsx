import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
import IUsuario from '../../../typescript/IUsuario';
import useStyles, { Purple } from './styles';
import api from '../../../services/api';

interface IModal {
  open: boolean;
  close(): void;
  setSuccess(): void;
  idUser?: string;
}

const EditarUsuario: React.FC<IModal> = ({
  open,
  close,
  setSuccess,
  idUser,
}) => {
  const classes = useStyles();

  const [usuario, setUsuario] = useState<IUsuario>();
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
    setSenha('');
    setConfSenha('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(`/usuarios/${idUser}`, {
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
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(
          'Erro ao cadastrar usuário. Tente novamente ou contate o suporte.'
        );
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get(`/usuarios/${idUser}`);

      setUsuario(response.data);
    };

    getUser();
  }, [idUser]);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setNomeUsuario(usuario.nome_usuario);
      setEmail(usuario.email);
      setTipoUsuario(usuario.tipo_usuario);
    }
  }, [usuario]);

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
                Editar {usuario ? usuario.nome.split(' ')[0] : ''}
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
                className={classes.field}
                style={{ marginTop: 0 }}
                type="password"
                fullWidth
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />

              <TextField
                label="Confirmar Senha"
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
                  Salvar
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      </DefaultModal>
    </ThemeProvider>
  );
};

EditarUsuario.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  idUser: PropTypes.string,
};

EditarUsuario.defaultProps = {
  idUser: '',
};

export default EditarUsuario;
