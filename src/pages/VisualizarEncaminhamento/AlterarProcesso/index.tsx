import React, {
  ChangeEvent,
  useState,
  useEffect,
  createRef,
  RefObject,
  FormEvent,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import { toast } from 'react-toastify';

import DefaultModal from '../../../components/DefaultModal';
import useStyles, { Red } from './styles';
import api from '../../../services/api';
import { ProcessoContext } from '../../../contexts/processoContext';

interface IModal {
  open: boolean;
  close(): void;
  tipoProcesso?: string;
  idStatus?: string;
  idProcesso?: string;
  refreshData(): Promise<void>;
}

const AlterarProcesso: React.FC<IModal> = ({
  open,
  close,
  tipoProcesso,
  idStatus,
  idProcesso,
  refreshData,
}) => {
  const classes = useStyles();
  const inputFileRef: RefObject<HTMLInputElement> = createRef();
  const { alterarProcesso, success, setSuccessFalse } = useContext(
    ProcessoContext
  );

  const [allStatus, setAllStatus] = useState([
    {
      id: 0,
      status: '',
    },
  ]);
  const [statusSelected, setStatusSelected] = useState<string>('');
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [arquivosUrl, setArquivosUrl] = useState([
    {
      name: '',
      url: '',
    },
  ]);
  const [observacoes, setObservacoes] = useState('');

  const handleSuccess = useCallback(async () => {
    if (success) {
      setArquivosUrl([
        {
          name: '',
          url: '',
        },
      ]);
      setArquivos([]);
      setObservacoes('');
      await refreshData();
      close();
    }
  }, [success, refreshData, close]);

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

  const handleSelectStatus = (e: ChangeEvent<{ value: unknown }>) => {
    setStatusSelected(e.target.value as string);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (idProcesso) {
      alterarProcesso(idProcesso, statusSelected, arquivos, observacoes);
    }
  };

  useEffect(() => {
    const getAllStatus = async () => {
      const response = await api.get(
        `/status/?tipo=${tipoProcesso?.toLowerCase()}`
      );

      setAllStatus(response.data);
      if (idStatus) {
        setStatusSelected(idStatus);
      }
    };

    getAllStatus();
  }, [tipoProcesso, idStatus]);

  useEffect(() => {
    handleSuccess();

    if (success) {
      setSuccessFalse();
    }
  }, [handleSuccess, success, setSuccessFalse]);

  return (
    <DefaultModal open={open} close={close}>
      <Typography
        variant="h5"
        className={classes.title}
        align="center"
        color="secondary"
      >
        Alterar Processo
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl
          variant="outlined"
          required
          fullWidth
          className={classes.field}
        >
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            label="Status"
            value={statusSelected}
            onChange={handleSelectStatus}
          >
            <MenuItem value="0">Sem Status</MenuItem>
            {allStatus.map(stts => (
              <MenuItem key={stts.id} value={String(stts.id)}>
                {stts.status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="Somente arquivos PDF e Word">
          <Button
            variant="outlined"
            className={classes.field}
            onClick={() => inputFileRef.current?.click()}
            fullWidth
          >
            Adicionar Anexos
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

        {arquivos.length !== 0 ? (
          <div className={classes.field}>
            <span>Anexos:</span>
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
                {i !== 0 && i !== arquivos.length ? <span>,&nbsp;</span> : ''}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}

        <TextField
          label="Observações"
          variant="outlined"
          fullWidth
          multiline
          className={classes.field}
          value={observacoes}
          onChange={e => setObservacoes(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.field}
        >
          Salvar
        </Button>
      </form>
    </DefaultModal>
  );
};

AlterarProcesso.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  tipoProcesso: PropTypes.string,
  idStatus: PropTypes.string,
  idProcesso: PropTypes.string,
  refreshData: PropTypes.func.isRequired,
};

AlterarProcesso.defaultProps = {
  tipoProcesso: '',
  idStatus: '0',
  idProcesso: '',
};

export default AlterarProcesso;
