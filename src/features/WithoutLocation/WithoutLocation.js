import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FinePrint, Link, Notification, Spacing } from 'src/components';
import { Withlocation } from 'src/features';
import { ReactComponent as LocationIcon } from 'src/assets/icons/location.svg';
import { ReactComponent as ReloadIcon } from 'src/assets/icons/reload.svg';

export default function WithoutLocation(props) {
  const [fallbackData, setFallbackData] = useState(null);
  const [fallbackError, setFallbackError] = useState(null);
  const [isFallbackDataLoading, setFallbackDataLoading] = useState(false);
  const [isFallbackLocation, setFallbackLocation] = useState(false);
  const [isPageReload, setPageReload] = useState(false);
  const { error } = props;

  const isPermissionDenied = error === 1;
  const notifications = {
    // PERMISSION_DENIED
    1: `as you did not grant permission to share your location`,
    // POSITION_UNAVAILABLE
    2: `as your location could not be determined. For instance, one or more of the location providers used in the location acquisition process reported an internal error that caused the process to fail entirely 🙁`,
    // TIMEOUT
    3: `as the time limit that was applied to successfully acquire your location has elapsed 🙁`,
  };

  function handleFallbackLocationClick() {
    setFallbackLocation(true);
  }

  function handlePageReloadClick() {
    setPageReload(true);
  }

  function PageReloadButton() {
    return (
      <Button
        icon={<ReloadIcon />}
        onClick={handlePageReloadClick}
        text="Reload the page and try again"
      />
    );
  }

  useEffect(() => {
    isPageReload && window.location.reload();
  }, [isPageReload]);

  useEffect(() => {
    isFallbackLocation && fetchFallbackData();
  }, [isFallbackLocation]);

  async function fetchFallbackData() {
    setFallbackDataLoading(true);

    try {
      const response = await fetch('//extreme-ip-lookup.com/json');
      const data = await response.json();

      if (data.status === 'fail') {
        throw Error(data.message);
      }

      setFallbackData(data);
      setFallbackDataLoading(false);
    } catch (error) {
      setFallbackError(error);
      setFallbackDataLoading(false);
    }
  }

  if (fallbackData) {
    return <Withlocation fallbackCoords={fallbackData} />;
  }

  if (fallbackError) {
    return (
      <Notification isLiveRegion type="error">
        <Spacing>
          <p>
            Sorry, something went wrong whilst trying to retrieve data from the
            eXTReMe-IP-Lookup.com API.
          </p>
          <p>
            <strong>API Response:</strong> {fallbackError.message}.
          </p>
        </Spacing>
        <PageReloadButton />
      </Notification>
    );
  }

  return (
    <Notification isLiveRegion type={isPermissionDenied ? 'warning' : 'error'}>
      <Spacing size="large-1x">
        <p>
          Weather Widget&trade; was unable to display the weather in your
          location {notifications[error]}.
        </p>
      </Spacing>
      {isPermissionDenied ? (
        <>
          <Spacing size="small-1x">
            <Button
              icon={<LocationIcon />}
              isLoading={isFallbackDataLoading}
              onClick={handleFallbackLocationClick}
              text="Use IP Geolocation"
            />
          </Spacing>
          <FinePrint>
            Weather Widget&trade; can retrieve your location, albeit less
            accurately, based on your IP address using{' '}
            <Link
              text="eXTReMe-IP-Lookup.com"
              url="https://extreme-ip-lookup.com/"
            />
            .
          </FinePrint>
        </>
      ) : (
        <PageReloadButton />
      )}
    </Notification>
  );
}

WithoutLocation.propTypes = {
  error: PropTypes.number.isRequired,
};
