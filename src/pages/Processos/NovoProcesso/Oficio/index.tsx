import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

import useStyles from './styles';
import api from '../../../../services/api';

interface IReferencia {
  id: number;
  numero_processo: number;
  nome_parte: string;
}

interface IOficio {
  oficio: {
    referencia: string;
    secretaria: string;
  };
  setOficio: Dispatch<SetStateAction<IOficio['oficio']>>;
}

const Oficio: React.FC<IOficio> = ({ oficio, setOficio }) => {
  const classes = useStyles();

  const [referencia, setReferencia] = useState<IReferencia | null>(null);

  const [referencias, setReferencias] = useState([
    {
      id: 0,
      numero_processo: 0,
      nome_parte: '',
    },
  ]);
  const [secretarias, setSecretarias] = useState([
    {
      id: 0,
      secretaria: '',
    },
  ]);

  const handleSelectSecretaria = (e: ChangeEvent<{ value: unknown }>) => {
    setOficio({
      ...oficio,
      secretaria: e.target.value as string,
    });
  };

  useEffect(() => {
    const getReferencias = async () => {
      const response = await api.get('/referencias');

      setReferencias(response.data);
    };

    const getSecretarias = async () => {
      const response = await api.get('/secretarias');

      setSecretarias(response.data);
    };

    getReferencias();
    getSecretarias();
  }, []);

  useEffect(() => {
    setOficio({ ...oficio, referencia: String(referencia?.id) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referencia, setOficio]);

  return (
    <div className={classes.fieldsBox}>
      <FormControl
        variant="outlined"
        style={{ minWidth: 160 }}
        className={classes.field}
      >
        <InputLabel id="secretaria-select-label">Secretaria</InputLabel>
        <Select
          labelId="secretaria-select-label"
          label="Secretaria"
          value={oficio.secretaria}
          onChange={handleSelectSecretaria}
        >
          {secretarias.map(secretaria => (
            <MenuItem key={secretaria.id} value={String(secretaria.id)}>
              {secretaria.secretaria}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Autocomplete
        options={referencias}
        getOptionLabel={option => String(option.numero_processo)}
        renderOption={option => (
          <span>
            {String(option.numero_processo)} - {option.nome_parte}
          </span>
        )}
        value={referencia}
        onChange={(e, value) => setReferencia(value)}
        style={{ width: 240 }}
        className={classes.field}
        renderInput={params => (
          <TextField
            {...params}
            label="Processo de Referência"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

Oficio.propTypes = {
  oficio: PropTypes.shape({
    referencia: PropTypes.string.isRequired,
    secretaria: PropTypes.string.isRequired,
  }).isRequired,
  setOficio: PropTypes.func.isRequired,
};

export default Oficio;
