import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DefaultModal from '../../../../components/DefaultModal';
import api from '../../../../services/api';
import useStyles from './styles';
import catchHandler from '../../../../utils/catchHandler';

interface IModal {
  open: boolean;
  idProcesso: string;
  close(): void;
  setSuccess(): void;
}

const EncaminharProcesso: React.FC<IModal> = ({
  open,
  idProcesso,
  close,
  setSuccess,
}) => {
  const classes = useStyles();

  const [idProcurador, setIdProcurador] = useState('');
  const [idTipoEncaminhamento, setIdTipoEncaminhamento] = useState('');
  const [prazo, setPrazo] = useState(new Date());
  const [observacoes, setObservacoes] = useState('');

  const [procuradores, setProcuradores] = useState([
    {
      id: 0,
      nome: '',
    },
  ]);
  const [tiposEncaminhamento, setTiposEncaminhamento] = useState([
    {
      id: 0,
      tipo_encaminhamento: '',
    },
  ]);

  const handleChangeIdProcurador = (e: ChangeEvent<{ value: unknown }>) => {
    setIdProcurador(e.target.value as string);
  };

  const handleChangeIdTipoEncaminhamento = (
    e: ChangeEvent<{ value: unknown }>
  ) => {
    setIdTipoEncaminhamento(e.target.value as string);
  };

  const handleChangePrazo = (e: ChangeEvent<{ value: unknown }>) => {
    setPrazo(e.target.value as Date);
  };

  const getProcuradores = async () => {
    try {
      const response = await api.get('/procuradores');

      setProcuradores(response.data);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar os procuradores. Tente novamente ou contate o suporte.'
      );
    }
  };

  const getTiposEncaminhamento = async () => {
    try {
      const response = await api.get('/tiposencaminhamento');

      setTiposEncaminhamento(response.data);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar os tipos de encaminhamento. Tente novamente ou contate o suporte.'
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`/encaminhamentos/${idProcesso}`, {
        id_usuario: Number(idProcurador),
        id_tipo_encaminhamento: Number(idTipoEncaminhamento),
        prazo: prazo.toString(),
        observacoes,
      });

      toast.success(response.data.msg, {
        position: 'top-center',
      });
      setSuccess();
      close();
    } catch (err) {
      catchHandler(
        err,
        'Erro ao encaminhar processo. Tente novamente ou contate o suporte.'
      );
    }
  };

  useEffect(() => {
    getProcuradores();
    getTiposEncaminhamento();
  }, []);

  return (
    <DefaultModal open={open} close={close}>
      <Typography
        variant="h5"
        className={classes.title}
        align="center"
        color="secondary"
      >
        Encaminhar Processo
      </Typography>

      <div className={classes.formBox}>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <FormControl required className={classes.field} fullWidth>
            <InputLabel id="select-procurador-label">Procurador</InputLabel>
            <Select
              labelId="select-procurador-label"
              value={idProcurador}
              onChange={handleChangeIdProcurador}
            >
              {procuradores.map(procurador => (
                <MenuItem key={procurador.id} value={String(procurador.id)}>
                  {procurador.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required className={classes.field} fullWidth>
            <InputLabel id="select-forward-type-label">
              Tipo de Encaminhamento
            </InputLabel>
            <Select
              labelId="select-forward-type-label"
              value={idTipoEncaminhamento}
              onChange={handleChangeIdTipoEncaminhamento}
            >
              {tiposEncaminhamento.map(tipo => (
                <MenuItem key={tipo.id} value={String(tipo.id)}>
                  {tipo.tipo_encaminhamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Prazo"
            type="date"
            fullWidth
            required
            className={classes.field}
            InputLabelProps={{ shrink: true }}
            value={prazo}
            onChange={handleChangePrazo}
          />

          <TextField
            label="Observações"
            className={classes.field}
            fullWidth
            multiline
            value={observacoes}
            onChange={e => setObservacoes(e.target.value)}
          />

          <FormControl className={classes.subButton} fullWidth>
            <Button variant="contained" color="primary" type="submit">
              Encaminhar
            </Button>
          </FormControl>
        </form>
      </div>
    </DefaultModal>
  );
};

EncaminharProcesso.propTypes = {
  open: PropTypes.bool.isRequired,
  idProcesso: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default EncaminharProcesso;
