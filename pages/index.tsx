import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Box, Typography } from '@material-ui/core';
import styles from '../styles/Home.module.scss';

export default function Home({ session }) {
  return (
    <Box className={styles.root}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        {session ? `Hey, ${session.user.name}!` : 'Hey!'}
      </Typography>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};
