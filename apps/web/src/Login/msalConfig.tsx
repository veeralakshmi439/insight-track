import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "f03da725-2a66-423f-8ca7-80569df4d349",
    authority: "https://login.microsoftonline.com/1853d7b2-17b1-45bd-9ee3-27775cfa4f13",
    redirectUri: "https://insight-track-web-app.resilience-works.io/auth",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
