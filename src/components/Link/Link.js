import React from 'react';
import PropTypes from 'prop-types';
import styles from './Link.module.css';

/**
 * NOTE: it might seem excessive to have this as a component but because all
 * links are external, due to the app not having any routes, they all need to
 * use `target="blank"` to avoid page refreshes. When `target="blank"` is used
 * we also need to apply `rel="noopener noreferrer"` to keep things secure (see:
 * https://mathiasbynens.github.io/rel-noopener/).
 */
export default function Link(props) {
  const { text, url } = props;

  return (
    <a
      className={styles.root}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {text}
    </a>
  );
}

Link.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
