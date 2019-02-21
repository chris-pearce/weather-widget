import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Spacing.module.css';

export default function Spacing(props) {
  const { children, size } = props;

  return <div className={classnames({ [styles[size]]: size })}>{children}</div>;
}

Spacing.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([
    'small-1x',
    'small-2x',
    'default',
    'large-1x',
    'large-2x',
  ]),
};

Spacing.defaultProps = {
  size: 'default',
};
