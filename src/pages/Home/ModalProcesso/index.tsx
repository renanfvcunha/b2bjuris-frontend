import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Fab,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowBack, CheckCircle, Visibility } from '@material-ui/icons';
import { toast } from 'react-toastify';

import DefaultModal from '../../../components/DefaultModal';
import IEncaminhamento from '../../../typescript/IEncaminhamento';
import useStyles, { Buttons } from './styles';
import ModalConfirmation from '../../../components/ModalConfirmation';
import api from '../../../services/api';

interface IModal {
  open: boolean;
  close(): void;
  encaminhamento?: IEncaminhamento;
  setSuccess(): void;
}

const ModalProcesso: React.FC<IModal> = ({
  open,
  close,
  encaminhamento,
  setSuccess,
}) => {
  const classes = useStyles();

  const [modalConfirmation, setModalConfirmation] = useState(false);

  const handleModalClose = () => {
    if (modalConfirmation) {
      setModalConfirmation(false);
    }
  };

  const markAsReceived = async () => {
    try {
      await api.patch(`/encaminhamentos/${encaminhamento?.id}`, {
        recebido: true,
      });

      setSuccess();
      setModalConfirmation(false);
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
          'Erro ao marcar processo como recebido. Tente novamente ou contate o suporte.'
        );
      }
    }
  };

  const breakTextArea = (text: string) => {
    const newText = text.split('\n').map(str => (
      <div key={Math.random()} className={classes.value}>
        <span>{str}</span>
        <br />
      </div>
    ));

    return newText;
  };

  return (
    <ThemeProvider theme={Buttons}>
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
            {breakTextArea(String(encaminhamento?.observacoes))}
          </div>
        </div>

        <div style={{ float: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalConfirmation(true)}
          >
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
        <ModalConfirmation
          open={modalConfirmation}
          close={handleModalClose}
          confirmAction={markAsReceived}
          title="Alerta"
          msg={`Deseja marcar o processo nº ${encaminhamento?.processo.numero_processo} como recebido?`}
          cancel="Cancelar"
          confirm="Marcar"
        />
      </DefaultModal>
    </ThemeProvider>
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
  setSuccess: PropTypes.func.isRequired,
};

ModalProcesso.defaultProps = {
  encaminhamento: undefined,
};

export default ModalProcesso;
