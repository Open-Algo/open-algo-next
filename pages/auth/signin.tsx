import { providers, signIn } from 'next-auth/client';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import styles from '../../styles/signin.module.scss';

interface Provider {
  id: string;
  name: string;
}

export default function SignIn({ providers }) {
  return (
    <Box className={styles.root}>
      <Paper className={styles.paper}>
        {Object.values(providers).map((provider: Provider) => (
          <Box key={provider.name}>
            <Button
              variant="contained"
              onClick={() => signIn(provider.id)}
              className={styles.button}
              style={{ backgroundColor: 'white' }}
            >
              <Image
                src={`/${provider.name}.png`}
                height={20}
                width={20}
                alt={provider.name}
              />
              <Typography>{`Continue with ${provider.name}`}</Typography>
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
