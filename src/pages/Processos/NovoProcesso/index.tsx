import React, {
  ChangeEvent,
  useState,
  useEffect,
  createRef,
  RefObject,
  FormEvent,
} from 'react';
import {
  TextField,
  Typography,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Tooltip,
} from '@material-ui/core';
import axios from 'axios';

import useStyles, { Purple } from './styles';
import api from '../../../services/api';

const NovoProcesso: React.FC = () => {
  const classes = useStyles();
  const inputFileRef: RefObject<HTMLInputElement> = createRef();

  const [processo, setProcesso] = useState({
    numProcesso: '',
    nomeParte: '',
    assunto: '',
    tipoProcesso: '',
  });

  const [administrativo, setAdministrativo] = useState({
    matricula: '',
    cpf: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    uf: '',
    cidade: '',
    telefone: '',
    observacoes: '',
  });

  const [assuntos, setAssuntos] = useState([
    {
      id: 0,
      assunto: '',
    },
  ]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  const handleChangeTipoProcesso = (e: ChangeEvent<HTMLInputElement>) => {
    setProcesso({
      ...processo,
      tipoProcesso: e.target.value,
    });
  };

  const handleSelectUF = (e: ChangeEvent<{ value: unknown }>) => {
    setAdministrativo({ ...administrativo, uf: e.target.value as string });
  };

  const handleSelectCity = (e: ChangeEvent<{ value: unknown }>) => {
    setAdministrativo({ ...administrativo, cidade: e.target.value as string });
  };

  const handleSelectAssunto = (e: ChangeEvent<{ value: unknown }>) => {
    setProcesso({
      ...processo,
      assunto: e.target.value as string,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let sendProcesso = {};

    if (processo.tipoProcesso === 'administrativo') {
      sendProcesso = Object.assign(processo, administrativo);
    }

    console.log(sendProcesso);
  };

  useEffect(() => {
    const getUFs = async () => {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      );

      const siglas = response.data.map((estado: any) => estado.sigla);

      setUfs(siglas);
    };

    const getAssuntos = async () => {
      const response = await api.get('/assuntos');

      setAssuntos(response.data);
    };

    getAssuntos();
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
    <ThemeProvider theme={Purple}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.contentArea}>
          <div className={classes.addProcessBox}>
            <Typography
              align="center"
              component="h1"
              variant="h4"
              className={classes.addProcessTitle}
            >
              Novo Processo
            </Typography>

            <form encType="multipart/formdata" onSubmit={handleSubmit}>
              <div className={classes.fieldsBox}>
                <TextField
                  label="Número do Processo"
                  variant="outlined"
                  required
                  className={classes.field}
                  value={processo.numProcesso}
                  onChange={e =>
                    setProcesso({ ...processo, numProcesso: e.target.value })
                  }
                />

                <TextField
                  label="Nome da Parte"
                  variant="outlined"
                  required
                  style={{ width: 320 }}
                  className={classes.field}
                  value={processo.nomeParte}
                  onChange={e =>
                    setProcesso({ ...processo, nomeParte: e.target.value })
                  }
                />

                <FormControl
                  variant="outlined"
                  required
                  style={{ minWidth: 150 }}
                  className={classes.field}
                >
                  <InputLabel id="assunto-select-label">Assunto</InputLabel>
                  <Select
                    labelId="assunto-select-label"
                    label="Assunto"
                    value={processo.assunto}
                    onChange={handleSelectAssunto}
                  >
                    {assuntos.map(Assunto => (
                      <MenuItem key={Assunto.id} value={String(Assunto.id)}>
                        {Assunto.assunto}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Tooltip title="Somente arquivos PDF e Word">
                  <Button
                    variant="outlined"
                    className={classes.field}
                    onClick={() => inputFileRef.current?.click()}
                  >
                    Anexos
                  </Button>
                </Tooltip>
                <input
                  ref={inputFileRef}
                  hidden
                  multiple
                  type="file"
                  accept="application/pdf, application/msword,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.template,
                  application/vnd.ms-word.document.macroEnabled.12,
                  application/vnd.ms-word.template.macroEnabled.12"
                />
              </div>

              <div className={classes.tipoProcesso}>
                <FormControl component="fieldset" required>
                  <div className={classes.tipoProcessoItems}>
                    <FormLabel component="legend">Tipo de Processo</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      style={{ display: 'inline' }}
                      value={processo.tipoProcesso}
                      onChange={handleChangeTipoProcesso}
                    >
                      <FormControlLabel
                        value="administrativo"
                        control={<Radio />}
                        label="Administrativo"
                      />
                      <FormControlLabel
                        value="judicial"
                        control={<Radio />}
                        label="Judicial"
                      />
                      <FormControlLabel
                        value="oficio"
                        control={<Radio />}
                        label="Ofício"
                      />
                    </RadioGroup>
                  </div>
                </FormControl>
              </div>

              {processo.tipoProcesso === 'administrativo' ? (
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
              ) : (
                <div />
              )}

              <div className={classes.subButtonBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.subButton}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default NovoProcesso;
