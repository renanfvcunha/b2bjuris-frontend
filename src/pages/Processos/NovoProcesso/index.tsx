import React, {
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
  createRef,
  RefObject,
  FormEvent,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
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
  Fab,
} from '@material-ui/core';
import { ArrowBack, RemoveCircle } from '@material-ui/icons';

import { toast } from 'react-toastify';
import useStyles, { Purple, Red } from './styles';
import DefaultBox from '../../../components/DefaultBox';
import { PageTitleContext } from '../../../contexts/pageTitleContext';
import { ProcessoContext } from '../../../contexts/processoContext';
import api from '../../../services/api';
import Administrativo from './Administrativo';
import Judicial from './Judicial';
import Oficio from './Oficio';
import catchHandler from '../../../utils/catchHandler';

const NovoProcesso: React.FC = () => {
  const classes = useStyles();
  const inputFileRef: RefObject<HTMLInputElement> = createRef();
  const history = useHistory();
  const { handleSetPageTitle } = useContext(PageTitleContext);
  const { cadastrarProcesso, success, setSuccessFalse } = useContext(
    ProcessoContext
  );

  const [arquivos, setArquivos] = useState<File[]>([]);
  const [arquivosUrl, setArquivosUrl] = useState([
    {
      name: '',
      url: '',
    },
  ]);
  const [processo, setProcesso] = useState({
    numProcesso: '',
    nomeParte: '',
    assunto: '',
    tipoProcesso: '',
    observacoes: '',
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
  });
  const [judicial, setJudicial] = useState({
    tipoAcao: '',
    poloPassivo: '',
    valorCausa: '',
  });
  const [oficio, setOficio] = useState({
    referencia: '',
    secretaria: '',
  });

  const [assuntos, setAssuntos] = useState([
    {
      id: 0,
      tipo: '',
      assunto: '',
    },
  ]);

  const handleChangeTipoProcesso = (e: ChangeEvent<HTMLInputElement>) => {
    setProcesso({
      ...processo,
      tipoProcesso: e.target.value,
    });
  };

  const goBack = useCallback(() => {
    if (success) {
      history.push('/processos');
    }
  }, [success, history]);

  const handleSelectAssunto = (e: ChangeEvent<{ value: unknown }>) => {
    setProcesso({
      ...processo,
      assunto: e.target.value as string,
    });
  };

  const pickFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { files } = e.target;
      const newFiles: File[] = [];
      const newFilesUrl: { name: string; url: string }[] = [];
      for (let i = 0; i < files.length; i += 1) {
        newFiles.push(files[i]);
        newFilesUrl.push({
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        });
      }

      const addFiles = [...arquivos];
      const exists = addFiles.find(file => {
        const newFileExists = newFiles.find(newFile => {
          if (file.name === newFile.name) {
            return newFile;
          }
          return undefined;
        });
        return newFileExists;
      });
      if (exists) {
        toast.warning('Há arquivo(s) com o mesmo nome na lista de anexos.');
        return;
      }
      addFiles.push(...newFiles);
      setArquivos(addFiles);

      const addFilesUrl = [...arquivosUrl];
      addFilesUrl.push(...newFilesUrl);
      setArquivosUrl(addFilesUrl);
    }
  };

  const removeFiles = (i: number) => {
    const removedFile = [...arquivos];
    removedFile.splice(i - 1, 1);
    setArquivos(removedFile);

    const removedFileUrl = [...arquivosUrl];
    removedFileUrl.splice(i, 1);
    setArquivosUrl(removedFileUrl);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    cadastrarProcesso(processo, administrativo, judicial, oficio, arquivos);
  };

  useEffect(() => {
    document.title = 'Novo Processo - B2B Juris';
    handleSetPageTitle('Novo Processo');
  }, [handleSetPageTitle]);

  useEffect(() => {
    const getAssuntos = async () => {
      try {
        const response = await api.get('/assuntos');

        setAssuntos(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os assuntos de processos. Tente novamente ou contate o suporte.'
        );
      }
    };

    getAssuntos();
  }, []);

  useEffect(() => {
    goBack();

    if (success) {
      setSuccessFalse();
    }
  }, [goBack, success, setSuccessFalse]);

  return (
    <ThemeProvider theme={Purple}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <DefaultBox scrollable>
          <Tooltip
            title="Voltar"
            aria-label="back"
            className={classes.backBtn}
            onClick={() => history.goBack()}
          >
            <Fab color="primary" size="small">
              <ArrowBack />
            </Fab>
          </Tooltip>
          <Typography
            align="center"
            component="h1"
            variant="h4"
            className={classes.addProcessTitle}
          >
            Novo Processo
          </Typography>

          <div className={classes.tipoProcesso}>
            <FormControl component="fieldset" required>
              <div className={classes.tipoProcessoItems}>
                <FormLabel component="legend">Tipo de Processo</FormLabel>
                <RadioGroup
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
                  {processo.tipoProcesso !== '' ? (
                    assuntos.map(Assunto =>
                      Assunto.tipo === processo.tipoProcesso ? (
                        <MenuItem key={Assunto.id} value={String(Assunto.id)}>
                          {Assunto.assunto}
                        </MenuItem>
                      ) : (
                        <div key={Assunto.id} />
                      )
                    )
                  ) : (
                    <MenuItem value="">Selecione um tipo de processo</MenuItem>
                  )}
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
                onChange={pickFiles}
              />
            </div>

            {arquivos.length !== 0 ? (
              <div className={classes.attachments}>
                <span>Anexos:&nbsp;</span>
                {arquivosUrl.map((arquivo, i) => (
                  <div key={arquivo.name}>
                    <a href={arquivo.url}>{arquivo.name}</a>
                    {i !== 0 ? (
                      <ThemeProvider theme={Red}>
                        <Tooltip
                          title="Remover Arquivo"
                          aria-label="removeFile"
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeFiles(i)}
                        >
                          <RemoveCircle fontSize="small" color="primary" />
                        </Tooltip>
                      </ThemeProvider>
                    ) : (
                      <div />
                    )}
                    {i !== 0 && i !== arquivos.length ? (
                      <span>,&nbsp;</span>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}

            {processo.tipoProcesso === 'administrativo' ? (
              <Administrativo
                administrativo={administrativo}
                setAdministrativo={setAdministrativo}
              />
            ) : (
              <div />
            )}

            {processo.tipoProcesso === 'judicial' ? (
              <Judicial judicial={judicial} setJudicial={setJudicial} />
            ) : (
              <div />
            )}

            {processo.tipoProcesso === 'oficio' ? (
              <Oficio oficio={oficio} setOficio={setOficio} />
            ) : (
              <div />
            )}

            <div className={classes.fieldsBoxLeft}>
              <TextField
                label="Observações"
                variant="outlined"
                fullWidth
                multiline
                className={classes.field}
                value={processo.observacoes}
                onChange={e =>
                  setProcesso({
                    ...processo,
                    observacoes: e.target.value,
                  })
                }
              />
            </div>

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
        </DefaultBox>
      </main>
    </ThemeProvider>
  );
};

export default NovoProcesso;
