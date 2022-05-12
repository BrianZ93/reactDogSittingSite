import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { FirebaseAppProvider, useFirebaseApp } from '@use-firebase/app';
import { firebaseConfig }from './firebaseConfig';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

export const masterUserId = process.env.REACT_APP_MASTER_USER



const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>,
  </Auth0Provider>
);
  

export default clientId

