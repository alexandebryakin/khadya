import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import client from './api/apollo/client';
import './index.scss';
import { BottomPanelContextProvider } from './lib/BottomPanel';
import AppRoutes from './navigation/AppRoutes.component';
import { AuthContextProvider } from './providers/AuthProvider';
import reportWebVitals from './reportWebVitals';
import common_en_us from './translations/en-US/common.json';

i18next.init({
  // Article: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-i18next
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en-US',
  debug: true,
  fallbackLng: 'en-US',
  resources: {
    'en-US': {
      common: common_en_us, // 'common' is our custom namespace
    },
  },
});

const COLORS = {
  PRIMARY: '#fb8500',
};

const themeConfig: ConfigProviderProps['theme'] = {
  token: {
    colorPrimary: COLORS.PRIMARY,
    borderRadius: 8,
    colorLink: COLORS.PRIMARY,
    colorLinkHover: COLORS.PRIMARY,
  },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <React.StrictMode>
        <ConfigProvider theme={themeConfig}>
          <I18nextProvider i18n={i18next}>
            <BottomPanelContextProvider>
              <AppRoutes />
            </BottomPanelContextProvider>
          </I18nextProvider>
        </ConfigProvider>
      </React.StrictMode>
    </AuthContextProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
