import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
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
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import PropTypes from 'prop-types';

import useStyles, { Purple } from './styles';

interface IModal {
  open: boolean;
  close(): void;
}

const NovoUsuario: React.FC<IModal> = ({ open, close }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="new-user-modal-title"
      aria-describedby="new-user-modal-description"
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ThemeProvider theme={Purple}>
          <div className={classes.paper}>
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
              {/* On Submit \/ */}
              <form className={classes.formBox}>
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
                  />

                  <TextField
                    label="Nome de Usuário"
                    required
                    className={classes.field}
                    fullWidth
                  />

                  <TextField
                    label="E-mail"
                    type="email"
                    required
                    className={classes.field}
                    fullWidth
                  />

                  <FormControl className={classes.field} fullWidth>
                    <InputLabel id="select-user-type-label">
                      Tipo de Usuário
                    </InputLabel>
                    <Select
                      labelId="select-user-type-label"
                      // value={age}
                      // onChange={handleChange}
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
                  />

                  <TextField
                    label="Confirmar Senha"
                    required
                    className={classes.field}
                    type="password"
                    fullWidth
                  />

                  {/* {loading ? (
                  <div className={classes.progress}>
                    <CircularProgress />
                  </div>
                ) : (
                  ''
                )} */}

                  <FormControl className={classes.subButton} fullWidth>
                    <Button variant="contained" color="primary" type="submit">
                      Cadastrar
                    </Button>
                  </FormControl>
                </div>
              </form>
            </div>
          </div>
        </ThemeProvider>
      </Fade>
    </Modal>
  );
};

NovoUsuario.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default NovoUsuario;
