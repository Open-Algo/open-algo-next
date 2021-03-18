import { providers, signIn } from 'next-auth/client';
import Image from 'next/image';
import { useTheme } from '@material-ui/core/styles';
import { GetServerSideProps } from 'next';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import styles from '../../styles/signin.module.scss';

interface Provider {
  id: string;
  name: string;
}

export default function SignIn({ providers }) {
  const theme = useTheme();
  return (
    <Box className={styles.root} style={{ height: 'calc(100vh - 100px)' }}>
      <Paper
        className={styles.paper}
        style={{
          backgroundColor: theme.palette.info.main,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        {Object.values(providers).map((provider: Provider) => (
          <Box key={provider.name}>
            <Button
              variant="contained"
              onClick={() => signIn(provider.id)}
              className={styles.button}
              style={{ backgroundColor: 'white' }}
              fullWidth
            >
              <Image
                src={`/${provider.name}.png`}
                height={20}
                width={20}
                alt={provider.name}
              />
              <Typography
                variant="body1"
                style={{ marginLeft: 5 }}
              >{`Continue with ${provider.name}`}</Typography>
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await providers(),
    },
  };
};
