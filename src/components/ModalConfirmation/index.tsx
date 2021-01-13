import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

interface Modal {
  open: boolean;
  close(): void;
  confirmAction(): void;
  title?: string;
  msg: string | JSX.Element;
  cancel: string;
  confirm: string;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Red = createMuiTheme({
  palette: {
    secondary: {
      main: red[800],
    },
  },
});

const ModalConfirmation: React.FC<Modal> = ({
  open,
  close,
  confirmAction,
  title,
  msg,
  cancel,
  confirm,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close} color="primary">
            {cancel}
          </Button>
          <ThemeProvider theme={Red}>
            <Button onClick={confirmAction} color="secondary">
              {confirm}
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ModalConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  cancel: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
};

ModalConfirmation.defaultProps = {
  title: '',
};

export default ModalConfirmation;
