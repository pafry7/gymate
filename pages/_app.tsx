import "mapbox-gl/dist/mapbox-gl.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import React from "react";
import { theme } from "theme";
import { Header } from "components/Header";
import { AuthProvider } from "context/AuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Gymate</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Header />
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
