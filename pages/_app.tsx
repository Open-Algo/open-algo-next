import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { Provider as AuthProvider } from 'next-auth/client';

import { UserProvider, useUser } from '../src/context/UserContext';
import { useApollo } from '../lib/apollo';
import Layout from '../src/components/Layout';
import theme from '../src/theme';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Open Algo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <Layout>
              <AuthProvider session={pageProps.session}>
                <Component {...pageProps} />
              </AuthProvider>
            </Layout>
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
