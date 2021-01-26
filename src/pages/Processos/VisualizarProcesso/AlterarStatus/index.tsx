import React, { useState, useEffect, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles from './styles';
import api from '../../../../services/api';

interface IModal {
  open: boolean;
  close(): void;
  idProcesso?: string;
  tipoProcesso?: string;
  status?: {
    status: string;
  } | null;
  setSuccess(): void;
}

const AlterarStatus: React.FC<IModal> = ({
  open,
  close,
  idProcesso,
  tipoProcesso,
  status,
  setSuccess,
}) => {
  const classes = useStyles();

  const [allStatus, setAllStatus] = useState([
    {
      id: 0,
      status: '',
    },
  ]);
  const [statusSelected, setStatusSelected] = useState('');

  const handleSelectStatus = (e: ChangeEvent<{ value: unknown }>) => {
    setStatusSelected(e.target.value as string);
  };

  const handleChangeStatus = async () => {
    try {
      const response: AxiosResponse<{ msg: string }> = await api.patch(
        `/processos/${idProcesso}`,
        {
          status: statusSelected,
        }
      );

      toast.success(response.data.msg);
      setSuccess();
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
          'Erro ao alterar status. Tente novamente ou contate o suporte.'
        );
      }
    }
  };

  useEffect(() => {
    const getAllStatus = async () => {
      const response = await api.get(`/status/?tipo=${tipoProcesso}`);

      setAllStatus(response.data);
    };
    getAllStatus();
  }, [tipoProcesso]);

  return (
    <DefaultModal open={open} close={close}>
      <div>
        <span className={classes.key}>Status Atual:</span>
        <span className={classes.value}>
          {status && status !== null ? status.status : 'Sem Status'}
        </span>
      </div>

      <FormControl
        variant="outlined"
        required
        fullWidth
        style={{ marginTop: 12 }}
      >
        <InputLabel id="assunto-select-label">Status</InputLabel>
        <Select
          labelId="assunto-select-label"
          label="Status"
          value={statusSelected}
          onChange={handleSelectStatus}
        >
          {allStatus.map(stts => (
            <MenuItem key={stts.id} value={String(stts.id)}>
              {stts.status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 12 }}
        onClick={handleChangeStatus}
      >
        Alterar
      </Button>
    </DefaultModal>
  );
};

AlterarStatus.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  idProcesso: PropTypes.string,
  tipoProcesso: PropTypes.string,
  status: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }),
  setSuccess: PropTypes.func.isRequired,
};

AlterarStatus.defaultProps = {
  idProcesso: '',
  tipoProcesso: '',
  status: { status: '' },
};

export default AlterarStatus;
