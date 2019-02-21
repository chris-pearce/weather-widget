import React from 'react';
import PropTypes from 'prop-types';

export default function Emoji(props) {
  const { emoji, label } = props;

  return (
    <span aria-label={`${label} emoji`} role="img">
      {emoji}
    </span>
  );
}

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
