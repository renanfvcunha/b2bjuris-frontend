import React from 'react';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles';

interface IModal {
  open: boolean;
  close(): void;
}

const HistoricoProcesso: React.FC<IModal> = ({ open, close }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="new-user-modal-title"
      aria-describedby="new-user-modal-description"
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h1>Teste</h1>
        </div>
      </Fade>
    </Modal>
  );
};

HistoricoProcesso.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default HistoricoProcesso;
