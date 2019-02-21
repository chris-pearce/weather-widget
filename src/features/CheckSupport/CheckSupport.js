import React, { useEffect, useState } from 'react';
import { Emoji, Link, Notification } from 'src/components';
import { Locate } from 'src/features';

export default function CheckSupport() {
  const [isSupported, setSupport] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setSupport(false);
    }
  }, [isSupported]);

  if (isSupported) {
    return <Locate />;
  }

  return (
    <Notification type="error">
      <p>
        Sorry, the{' '}
        <Link
          text="Geolocation API"
          url="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API"
        />{' '}
        is not supported in your device/browser{' '}
        <Emoji emoji="🙁" label="Slightly frowning face" />. Weather
        Widget&trade; requires support in order to display the weather in your
        location.
      </p>
      <p>
        <Link text="See here" url="https://caniuse.com/#feat=geolocation" /> for
        support and you might want to consider{' '}
        <Link text="upgrading" url="https://browsehappy.com/" />.
      </p>
    </Notification>
  );
}
