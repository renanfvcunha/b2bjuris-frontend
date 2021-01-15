import React, {
  ChangeEvent,
  useState,
  useEffect,
  createRef,
  RefObject,
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

const NovoProcesso: React.FC = () => {
  const classes = useStyles();
  const inputFileRef: RefObject<HTMLInputElement> = createRef();

  const [tipoProcesso, setTipoProcesso] = useState('');
  const [UFs, setUFs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [cidades, setCidades] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  const handleChangeTipoProcesso = (e: ChangeEvent<HTMLInputElement>) => {
    setTipoProcesso(e.target.value);
  };

  const handleSelectUF = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedUF(e.target.value as string);
  };

  const handleSelectCity = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCity(e.target.value as string);
  };

  useEffect(() => {
    const getUFs = async () => {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      );

      const siglas = response.data.map((estado: any) => estado.sigla);

      setUFs(siglas);
    };

    getUFs();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/distritos?orderBy=nome`
      );

      const cities = response.data.map((city: any) => city.nome);

      setCidades(cities);
    };

    getCities();
  }, [selectedUF]);

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

            <form encType="multipart/formdata">
              <div className={classes.fieldsBox}>
                <TextField
                  label="Número do Processo"
                  variant="outlined"
                  required
                  className={classes.field}
                />

                <TextField
                  label="Nome da Parte"
                  variant="outlined"
                  required
                  style={{ width: 320 }}
                  className={classes.field}
                />

                <FormControl
                  variant="outlined"
                  required
                  style={{ minWidth: 150 }}
                  className={classes.field}
                >
                  <InputLabel id="assunto-select-label">Assunto</InputLabel>
                  <Select labelId="assunto-select-label" label="Assunto">
                    <MenuItem value={10}>Assunto 1</MenuItem>
                    <MenuItem value={20}>Assunto 2</MenuItem>
                    <MenuItem value={30}>Assunto 3</MenuItem>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel component="legend">Tipo de Processo</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      style={{ display: 'inline' }}
                      value={tipoProcesso}
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

              {tipoProcesso === 'administrativo' ? (
                <>
                  <div className={classes.fieldsBox}>
                    <TextField
                      label="Matrícula"
                      variant="outlined"
                      style={{ width: 120 }}
                      required
                      className={classes.field}
                    />

                    <TextField
                      label="CPF"
                      variant="outlined"
                      style={{ width: 160 }}
                      required
                      className={classes.field}
                    />

                    <TextField
                      label="Endereço"
                      variant="outlined"
                      style={{ width: 370 }}
                      required
                      className={classes.field}
                    />

                    <TextField
                      label="Número"
                      variant="outlined"
                      style={{ width: 120 }}
                      required
                      className={classes.field}
                    />
                  </div>

                  <div className={classes.fieldsBox}>
                    <TextField
                      label="Complemento"
                      variant="outlined"
                      style={{ width: 320 }}
                      className={classes.field}
                    />

                    <TextField
                      label="Bairro"
                      variant="outlined"
                      style={{ width: 200 }}
                      required
                      className={classes.field}
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
                        value={selectedUF}
                        onChange={handleSelectUF}
                      >
                        {UFs.map(uf => (
                          <MenuItem key={uf} value={uf}>
                            {uf}
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
                        value={selectedCity}
                        onChange={handleSelectCity}
                      >
                        {selectedUF !== '' ? (
                          cidades.map(cidade => (
                            <MenuItem key={cidade} value={cidade}>
                              {cidade}
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
                    />

                    <TextField
                      label="Observações"
                      variant="outlined"
                      style={{ width: 600 }}
                      className={classes.field}
                    />
                  </div>
                </>
              ) : (
                <div />
              )}

              <div className={classes.subButtonBox}>
                <Button
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
