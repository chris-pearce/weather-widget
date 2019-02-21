import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

export default function Layout(props) {
  const { children } = props;

  return (
    <main className={styles.root}>
      <h1 className={styles.heading}>
        <strong>Weather</strong> Widget&trade;
      </h1>
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
