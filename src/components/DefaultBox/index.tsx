import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const DefaultBox: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentBox}>
      <div className={classes.contentArea}>{children}</div>
    </div>
  );
};

DefaultBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultBox;
