import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

import useStyles from './styles';

interface IAdministrativo {
  administrativo: {
    matricula: string;
    cpf: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    uf: string;
    cidade: string;
    telefone: string;
    observacoes: string;
  };
  setAdministrativo: Dispatch<
    SetStateAction<IAdministrativo['administrativo']>
  >;
}

const Administrativo: React.FC<IAdministrativo> = ({
  administrativo,
  setAdministrativo,
}) => {
  const classes = useStyles();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  const handleSelectUF = (e: ChangeEvent<{ value: unknown }>) => {
    setAdministrativo({ ...administrativo, uf: e.target.value as string });
  };

  const handleSelectCity = (e: ChangeEvent<{ value: unknown }>) => {
    setAdministrativo({ ...administrativo, cidade: e.target.value as string });
  };

  useEffect(() => {
    const getUFs = async () => {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      );

      const siglas = response.data.map((estado: any) => estado.sigla);

      setUfs(siglas);
    };

    getUFs();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${administrativo.uf}/distritos?orderBy=nome`
      );

      const cities = response.data.map((city: any) => city.nome);

      setCidades(cities);
    };

    getCities();
  }, [administrativo.uf]);

  return (
    <>
      <div className={classes.fieldsBox}>
        <TextField
          label="Matrícula"
          variant="outlined"
          style={{ width: 120 }}
          required
          className={classes.field}
          value={administrativo.matricula}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              matricula: e.target.value,
            })
          }
        />

        <TextField
          label="CPF"
          placeholder="xxx.xxx.xxx-xx"
          variant="outlined"
          style={{ width: 160 }}
          required
          className={classes.field}
          value={administrativo.cpf}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              cpf: e.target.value,
            })
          }
        />

        <TextField
          label="Endereço"
          variant="outlined"
          style={{ width: 370 }}
          required
          className={classes.field}
          value={administrativo.endereco}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              endereco: e.target.value,
            })
          }
        />

        <TextField
          label="Número"
          variant="outlined"
          style={{ width: 120 }}
          required
          className={classes.field}
          value={administrativo.numero}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              numero: e.target.value,
            })
          }
        />
      </div>

      <div className={classes.fieldsBox}>
        <TextField
          label="Complemento"
          variant="outlined"
          style={{ width: 320 }}
          className={classes.field}
          value={administrativo.complemento}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              complemento: e.target.value,
            })
          }
        />

        <TextField
          label="Bairro"
          variant="outlined"
          style={{ width: 200 }}
          required
          className={classes.field}
          value={administrativo.bairro}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              bairro: e.target.value,
            })
          }
        />

        <FormControl
          variant="outlined"
          required
          style={{ minWidth: 100 }}
          className={classes.field}
        >
          <InputLabel id="uf-select-label">UF</InputLabel>
          <Select
            labelId="uf-select-label"
            label="UF"
            value={administrativo.uf}
            onChange={handleSelectUF}
          >
            {ufs.map(UF => (
              <MenuItem key={UF} value={UF}>
                {UF}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          required
          style={{ minWidth: 150 }}
          className={classes.field}
        >
          <InputLabel id="cidade-select-label">Cidade</InputLabel>
          <Select
            labelId="cidade-select-label"
            label="Cidade"
            value={administrativo.cidade}
            onChange={handleSelectCity}
          >
            {administrativo.uf !== '' ? (
              cidades.map(Cidade => (
                <MenuItem key={Cidade} value={Cidade}>
                  {Cidade}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Selecione uma UF</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>

      <div className={classes.fieldsBox}>
        <TextField
          label="Telefone"
          placeholder="(xx) xxxx-xxxx"
          variant="outlined"
          style={{ width: 200 }}
          required
          className={classes.field}
          value={administrativo.telefone}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              telefone: e.target.value,
            })
          }
        />

        <TextField
          label="Observações"
          variant="outlined"
          style={{ width: 600 }}
          className={classes.field}
          value={administrativo.observacoes}
          onChange={e =>
            setAdministrativo({
              ...administrativo,
              observacoes: e.target.value,
            })
          }
        />
      </div>
    </>
  );
};

Administrativo.propTypes = {
  administrativo: PropTypes.shape({
    matricula: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    complemento: PropTypes.string.isRequired,
    bairro: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    cidade: PropTypes.string.isRequired,
    telefone: PropTypes.string.isRequired,
    observacoes: PropTypes.string.isRequired,
  }).isRequired,
  setAdministrativo: PropTypes.func.isRequired,
};

export default Administrativo;
