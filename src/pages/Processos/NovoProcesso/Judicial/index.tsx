import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles';
import api from '../../../../services/api';

interface IJudicial {
  judicial: {
    tipoAcao: string;
    poloPassivo: string;
    valorCausa: string;
  };
  setJudicial: Dispatch<SetStateAction<IJudicial['judicial']>>;
}

const Judicial: React.FC<IJudicial> = ({ judicial, setJudicial }) => {
  const classes = useStyles();
  const [tiposAcao, setTiposAcao] = useState([
    {
      id: 0,
      tipo_acao: '',
    },
  ]);

  const handleSelectTipoAcao = (e: ChangeEvent<{ value: unknown }>) => {
    setJudicial({
      ...judicial,
      tipoAcao: e.target.value as string,
    });
  };

  useEffect(() => {
    const getTiposAcao = async () => {
      const response = await api.get('/tiposdeacao');

      setTiposAcao(response.data);
    };

    getTiposAcao();
  }, []);

  return (
    <div className={classes.fieldsBox}>
      <FormControl
        variant="outlined"
        required
        style={{ minWidth: 160 }}
        className={classes.field}
      >
        <InputLabel id="tipo-acao-select-label">Tipo de Ação</InputLabel>
        <Select
          labelId="tipo-acao-select-label"
          label="Tipo de Ação"
          value={judicial.tipoAcao}
          onChange={handleSelectTipoAcao}
        >
          {tiposAcao.map(tipoAcao => (
            <MenuItem key={tipoAcao.id} value={String(tipoAcao.id)}>
              {tipoAcao.tipo_acao}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Polo Passivo"
        variant="outlined"
        style={{ width: 200 }}
        required
        className={classes.field}
        value={judicial.poloPassivo}
        onChange={e =>
          setJudicial({
            ...judicial,
            poloPassivo: e.target.value,
          })
        }
      />

      <FormControl className={classes.field} variant="outlined">
        <InputLabel htmlFor="valor-causa">Valor da Causa</InputLabel>
        <OutlinedInput
          label="Valor da Causa"
          id="valor-causa"
          value={judicial.valorCausa}
          onChange={e =>
            setJudicial({
              ...judicial,
              valorCausa: e.target.value,
            })
          }
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
    </div>
  );
};

Judicial.propTypes = {
  judicial: PropTypes.shape({
    tipoAcao: PropTypes.string.isRequired,
    poloPassivo: PropTypes.string.isRequired,
    valorCausa: PropTypes.string.isRequired,
  }).isRequired,
  setJudicial: PropTypes.func.isRequired,
};

export default Judicial;
