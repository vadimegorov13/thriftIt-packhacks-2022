import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Image from 'next/image';
import { AuthProvider } from '../hooks/useAuth';
import { Global } from '@mantine/core';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>ThriftIt</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Global
          styles={[
            {
              '@font-face': {
                fontFamily: 'Billy',
                src: `url('/fonts/Billy-Bold.woff2') format("woff2")`,
                fontWeight: 700,
                fontStyle: 'normal',
              },
            },
            {
              '@font-face': {
                fontFamily: 'Billy',
                src: `url('/fonts/Billy-Regular.woff2') format("woff2")`,
                fontWeight: 400,
                fontStyle: 'normal',
              },
            },
          ]}
        />
        <AuthProvider>
          {/* <Image
            src="/images/background.png"
            alt="background image"
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            
          /> */}
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </>
  );
};

export default App;
