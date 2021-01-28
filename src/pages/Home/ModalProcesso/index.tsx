import React from 'react';
import PropTypes from 'prop-types';
import { Button, ThemeProvider, Typography } from '@material-ui/core';
import { CheckCircle, Visibility } from '@material-ui/icons';

import DefaultModal from '../../../components/DefaultModal';
import IEncaminhamento from '../../../typescript/IEncaminhamento';
import useStyles, { Buttons } from './styles';

interface IModal {
  open: boolean;
  close(): void;
  encaminhamento?: IEncaminhamento;
}

const ModalProcesso: React.FC<IModal> = ({ open, close, encaminhamento }) => {
  const classes = useStyles();

  return (
    <DefaultModal open={open} close={close}>
      <Typography
        align="center"
        component="h1"
        variant="h4"
        className={classes.title}
      >
        Processo nº {encaminhamento?.processo.numero_processo}
      </Typography>

      <div className={classes.data}>
        <div>
          <span className={classes.key}>Tipo:</span>
          <span className={classes.value}>
            {encaminhamento?.processo.tipo_processo}
          </span>
        </div>
        <div>
          <span className={classes.key}>Data:</span>
          <span className={classes.value}>
            {new Date(
              encaminhamento?.processo.created_at || ''
            ).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className={classes.key}>Prazo:</span>
          <span className={classes.value}>
            {new Date(encaminhamento?.prazo || '').toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className={classes.key}>Tipo de Encaminhamento:</span>
          <span className={classes.value}>
            {encaminhamento?.tipo_encaminhamento.tipo_encaminhamento}
          </span>
        </div>
        <div>
          <span className={classes.key}>Observações:</span>
          <span className={classes.value}>{encaminhamento?.observacoes}</span>
        </div>
      </div>

      <ThemeProvider theme={Buttons}>
        <div style={{ float: 'right' }}>
          <Button variant="contained" color="primary">
            <CheckCircle style={{ marginRight: 8 }} />
            Marcar como Recebido
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 8 }}
          >
            <Visibility style={{ marginRight: 8 }} />
            Visualizar Processo
          </Button>
        </div>
      </ThemeProvider>
    </DefaultModal>
  );
};

ModalProcesso.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  encaminhamento: PropTypes.shape({
    id: PropTypes.number.isRequired,
    recebido: PropTypes.bool.isRequired,
    prazo: PropTypes.string.isRequired,
    observacoes: PropTypes.string.isRequired,
    tipo_encaminhamento: PropTypes.shape({
      tipo_encaminhamento: PropTypes.string.isRequired,
    }).isRequired,
    processo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      numero_processo: PropTypes.number.isRequired,
      tipo_processo: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

ModalProcesso.defaultProps = {
  encaminhamento: undefined,
};

export default ModalProcesso;
