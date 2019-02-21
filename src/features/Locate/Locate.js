import React, { useEffect, useState } from 'react';
import { Button, FinePrint, Spacing } from 'src/components';
import { ReactComponent as LocationIcon } from 'src/assets/icons/location.svg';
import { WithLocation, WithoutLocation } from 'src/features';

export default function Locate() {
  // The returned coordinates (lat, lon) from the Geolocation API
  const [coords, setCoords] = useState({});
  // The error code from the Geolocation API
  const [errorCode, setErrorCode] = useState(null);
  // Whether or not the user has provided consent to share their location via
  // the Geolocation API prompt
  const [hasConsent, setConsent] = useState(false);
  // Whether or not the user has requested to share their loction via the
  // Geolocation API, i.e., has initiated the Geolocation prompt
  const [hasRequested, setRequested] = useState(false);

  function handleShareLocationClick() {
    setRequested(true);
  }

  useEffect(() => {
    hasRequested &&
      navigator.geolocation.getCurrentPosition(success, error, {
        // Cache the user's position for 5 mins
        maximumAge: 5 * 60 * 1000,
        // Don't keep the user waiting if the position retrieval is taking ages
        timeout: 30 * 1000,
      });
  }, [hasRequested]);

  function success(position) {
    const { latitude, longitude } = position.coords;

    setConsent(true);
    setCoords({ latitude, longitude });
    setRequested(false);
  }

  function error(error) {
    setConsent(false);
    setErrorCode(error.code);
    setRequested(false);
  }

  if (errorCode) {
    return <WithoutLocation error={errorCode} />;
  }

  if (hasConsent) {
    return <WithLocation coords={coords} />;
  }

  return (
    <>
      <Spacing size="small-1x">
        <Button
          icon={<LocationIcon />}
          isLoading={hasRequested}
          onClick={handleShareLocationClick}
          text="Share your location"
        />
      </Spacing>
      <FinePrint>
        Weather Widget&trade; requires your consent in order to display the
        weather for your location.
      </FinePrint>
    </>
  );
}
