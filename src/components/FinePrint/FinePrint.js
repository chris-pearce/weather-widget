import React from 'react';
import PropTypes from 'prop-types';
import styles from './FinePrint.module.css';

export default function FinePrint(props) {
  const { children } = props;

  return <small className={styles.root}>{children}</small>;
}

FinePrint.propTypes = {
  children: PropTypes.node.isRequired,
};
