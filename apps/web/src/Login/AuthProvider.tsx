import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import authConfig from './auth_config.json';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}    >
      {children}
      }}
    >
      <AuthSessionHandler>{children}</AuthSessionHandler>
    </Auth0Provider>
  );
};

const AuthSessionHandler = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(token => {
        sessionStorage.setItem('auth_token', token);
      });
    } else {
      sessionStorage.removeItem('auth_token');
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return children;
};

export default AuthProvider;
