import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './auth_config.json';

const AuthProvider = ({ children }) => {

  const onRedirectCallback = (appState) => {
    window.location.href = appState?.returnTo || window.location.pathname;
  };

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      redirectUri={authConfig.redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
