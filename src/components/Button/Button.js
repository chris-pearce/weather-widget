import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.module.css';

export default function Button(props) {
  const { loadingText, icon, isDisabled, isLoading, onClick, text } = props;

  return (
    <button
      className={classnames(styles.root, { [styles.isLoading]: isLoading })}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      type="button"
    >
      {icon && icon}
      <span>{isLoading ? loadingText : text}</span>
    </button>
  );
}

Button.propTypes = {
  loadingText: PropTypes.string,
  icon: PropTypes.element,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  loadingText: 'Loading…',
  isDisabled: false,
  isLoading: false,
};
