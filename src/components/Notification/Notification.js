import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';
import { capitalise } from 'src/utils';

export default function Notification(props) {
  const { children, isLiveRegion, type } = props;
  const liveRegionAttrs = isLiveRegion && {
    role: 'status',
    'aria-live': 'polite',
  };

  return (
    <div
      {...liveRegionAttrs}
      className={classnames(styles.root, { [styles[type]]: type })}
    >
      <h2 className={styles.heading}>{capitalise(type)} message:</h2>
      {children}
    </div>
  );
}

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  isLiveRegion: PropTypes.bool,
  type: PropTypes.oneOf(['error', 'information', 'success', 'warning']),
};

Notification.defaultProps = {
  isLiveRegion: false,
  type: 'information',
};
